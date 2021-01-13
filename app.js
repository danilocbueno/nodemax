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

app.listen(3000);
