const path = require('path');
const rootDir = require('../util/path');

exports.getTurbo = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views/html', 'turbo.html'));
};