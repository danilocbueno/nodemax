require("dotenv").config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const flash = require('connect-flash');

const errorController = require('./controllers/errorController');
const sequelize = require('./util/database');

//importando os modelos
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const Category = require('./models/category');

//importando os arquivos de rotas
const adminRoutes = require('./routes/admin');
const routesShop = require('./routes/shop');
const routesTurbo = require('./routes/turbo');
const routesCategory = require('./routes/category');
const authRoutes = require('./routes/authRoutes');

const app = express();

//configurando o template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);

//configurando o bodyparser
//app.use(bodyParser.raw({ type: 'application/vnd.turbo-stream.html' }))
//app.use(bodyParser.urlencoded({ extended: false, type: ['text/vnd.turbo-stream.html, text/html, application/xhtml+xml'] }));

//Trocando o bodyParser pelo formidable
app.use(formidable());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//servido arquivos estáticos!
app.use('/public', express.static(path.join(__dirname, 'public')));

//configurando a sessão
app.use(session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false, 
    store: new SequelizeStore({
        db: sequelize,
      }),  
}));

//configurando as mensagens entre as requests..
app.use(flash());

//criando um novo middleware que coloca o usuario em toda requisicao (objeto sequelize)
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

//configurando as variaveis para todas as sessoes
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

//importando as rotas
app.use('/admin', adminRoutes);
app.use(routesShop);
app.use(routesTurbo);
app.use(routesCategory);
app.use(authRoutes);

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
sequelize.sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            User.create({ email: 'test@test.com' });
        }
        return Promise.resolve(user);
    })
    .then(user => {
        //user.createCart();
    })
    .catch(err => {
        console.log(err);
    });

//para poder garantir o deploy no heroku
const port = process.env.PORT || 3000;
app.listen(port);
