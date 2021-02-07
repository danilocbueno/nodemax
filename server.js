require("dotenv").config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const multer = require('multer');

const flash = require('connect-flash');
const csurf = require('csurf');

const errorController = require('./controllers/errorController');
const errorHandler = require('errorhandler');
const sequelize = require('./util/database');

//importando os modelos
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');


const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const Category = require('./models/category');

//importando os arquivos de rotas
const adminRoutes = require('./routes/admin');
const routesShop = require('./routes/shop');
const routesTurbo = require('./routes/turbo');
const routesCategory = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

const moment = require('moment');
moment.locale('pt-br');

const dayjs = require('dayjs');
const localePtBr = require('dayjs/locale/pt-br');
dayjs.locale(localePtBr);

const app = express();

//configurando o template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);

//configurando o bodyparser
//app.use(bodyParser.raw({ type: 'application/vnd.turbo-stream.html' }))
app.use(bodyParser.urlencoded({ extended: true }));

//Trocando o bodyParser pelo formidable
/*
app.use(formidable({
    uploadDir: path.join(__dirname, 'public', 'upload'),
    keepExtensions: true
}));
*/

//UPLOAD
//app.use(multer().single('imageUrl'));

//usei porque o formidable salva os dados parseados em req.fields enquanto que algumas bibliotecas (express-validation) espera os dados em req.body


//servido arquivos estáticos!
app.use('/public', express.static(path.join(__dirname, 'public')));

//configurando a sessão
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}));

//configurando as mensagens entre as requests..
app.use(flash());

//criando um novo middleware que coloca o usuario em toda requisicao (objeto sequelize)

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

/*
app.use((req, res, next) => {
    console.log("AQUI!!!");
    console.log(req.body);
    console.log(req.fields);
    if (req.fields) {
        req.body = req.fields;
    }
    next();
});
*/

//VAI TOMAR NO CU, LEIA A PORRA DA DOCUMENTACAO!
const csrfProtection = csurf();
app.use(csrfProtection);

//configurando as variaveis para todas as sessoes
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    //CSRF!
    res.locals._csrf = 'fakecsrf';
    res.locals._csrf = req.csrfToken();
    res.locals._csrfForm = `<input type="hidden" name="_csrf" value="${res.locals._csrf}">`;

    //flash
    res.locals.msg = req.flash('msg');
    res.locals.validationFailure = req.flash('validationFailure');

    //helpers
    res.locals.formatDate = (date) => {
        //const momentDate = moment(date);
        const moment = dayjs(date);
        //return momentDate.format("dddd (D) [de] MMMM [de] YYYY [ás] h:mm a");
        return moment.format("DD [de] MMMM [de] YYYY (dddd), [ás] HH:mm"); // display
    }
    next();
});

// Custom server error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.message)
        if (!err.statusCode) { err.statusCode = 500 } // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message
        })
    }

    next()
});

//app.use(errors());

if ('development' == app.get('env')) {
    app.use(errorHandler());
}


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//importando as ROTAS!
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

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsTo(Product);


//sequelize (sincroniza o models com o banco em si)
sequelize.sync()
    .then(result => {
        //return User.findByPk(1);
        //console.log(result);
    }).catch(err => {
        console.log(err);
    });

//para poder garantir o deploy no heroku
const port = process.env.PORT || 3000;
app.listen(port);
