const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

//importando os arquivos de rotas
const adminRoutes = require('./routes/admin');
const routesShop = require('./routes/shop');

const app = express();

//configurando o template engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);

//configurando o bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//servido arquivos estáticos!
app.use(express.static(path.join(__dirname, 'public')));

//importando as rotas
app.use('/admin', adminRoutes);
app.use(routesShop);

//pagina 404
app.use((req, res, next) => {
  //res.send(404, "Página não encontrada!");
  //res.status(404).send("404");  // ou essa
  //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', {pageTitle: 'Page not Found'});
});

//para poder garantir o deploy no heroku
const port = process.env.PORT || 3000;
app.listen(port);
