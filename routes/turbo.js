const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const bodyParser = require('body-parser');
const turboController = require('../controllers/turboController');

const formidable = require('express-formidable');

const router = express.Router();

//bodyParserTurbo = bodyParser.raw({ type: 'application/vnd.turbo-stream.html' });

//testando o turbo (turbolinks)

router.get('/turbo3', async (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

router.get('/turbo', turboController.getTurbo);

router.post('/turbo2', formidable(), async (req, res, next) => {
    console.log(req.fields);

    //res.setHeader('Accept', 'text/vnd.turbo-stream.html');
    res.setHeader('content-type', 'text/vnd.turbo-stream.html');

    //res.sendFile(path.join(rootDir, 'views/html', 'turbo.html'));
    //res.redirect('/');
    res.end(`<turbo-stream action="replace" id="stream" target="new_message">
    <template>
      <h3 id="mutandis">Turbo Stream to the rescue!</h3>
    </template>
  </turbo-stream>`);
});

module.exports = router;