const express = require('express');
const bodyParser = require('body-parser');

//importando os arquivos de rotas
const routesAdmin = require('./routes/admin');
const routesShop = require('./routes/shop');

const app = express();

//configurando o bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//importando as rotas
app.use(routesAdmin);
app.use(routesShop);

//pagina 404
app.use((req, res, next) => {
  res.send(404, "Página não encontrada!");
  //res.status(404).send("404");  // ou essa
});

app.listen(3000);
