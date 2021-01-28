const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

//importando os modelos
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');

//importando os arquivos de rotas
const adminRoutes = require('./routes/admin');
const routesShop = require('./routes/shop');
const routesTurbo = require('./routes/turbo');

const app = express();

//configurando o template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);

//configurando o bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//servido arquivos estáticos!
app.use('/public', express.static(path.join(__dirname, 'public')));

//criando um novo middleware que coloca o usuario em toda requisicao (objeto sequelize)
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

//importando as rotas
app.use('/admin', adminRoutes);
app.use(routesShop);
app.use(routesTurbo);

//pagina 404
app.use(errorController.get404);

//relacionando os modelos
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//sequelize (sincroniza o models com o banco em si)
sequelize.sync({ force: true})
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            User.create({ name: 'Max', email: 'test@test.com' });
        }
        return Promise.resolve(user);
    })
    .then(user => {
        console.log(user);
    })
    .catch(err => {
        console.log(err);
    });

//para poder garantir o deploy no heroku
const port = process.env.PORT || 3000;
app.listen(port);
