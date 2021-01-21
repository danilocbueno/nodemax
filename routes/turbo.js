const express = require('express');
const turboController = require('../controllers/turbo');

const router = express.Router();

//testando o turbo (turbolinks)
router.get('/turbo', turboController.getTurbo);

router.post('/turbo2', (req, res, next) => {
    console.log(req.body.title);
    
    res.redirect('/');
});

module.exports = router;