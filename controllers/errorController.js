exports.get404 = (req, res, next) => {
    //res.send(404, "Página não encontrada!");
    //res.status(404).send("404");  // ou essa
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page not Found' });
};