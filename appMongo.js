require("dotenv").config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database-mongo');

//importando os modelos


//importando os arquivos de rotas
const adminRoutes = require('./routes/admin');
const routesShop = require('./routes/shop');
const routesTurbo = require('./routes/turbo');
const routesCategory = require('./routes/category');

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

//criando um novo middleware que coloca o usuario em toda requisicao (objeto sequelize)
app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));
})

//importando as rotas
app.use('/admin', adminRoutes);
//app.use(routesShop);
//app.use(routesTurbo);
//app.use(routesCategory);

//pagina 404
app.use(errorController.get404);

mongoConnect(client => {
    console.log(client);
})

//para poder garantir o deploy no heroku
const port = process.env.PORT || 3000;
app.listen(port);
