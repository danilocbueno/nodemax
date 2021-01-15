const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//importando os arquivos de rotas
const adminData = require('./routes/admin');
const routesShop = require('./routes/shop');

const app = express();

//configurando o bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//servido arquivos estáticos!
app.use(express.static(path.join(__dirname, 'public')));

//importando as rotas
app.use(adminData.routes);
app.use(routesShop);

//pagina 404
app.use((req, res, next) => {
  //res.send(404, "Página não encontrada!");
  //res.status(404).send("404");  // ou essa
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
