module.exports = function(app){

    app.get('/', function(req, res){
       // var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(app);

        produtosDAO.lista(function(err, results) {
            res.render('home/index', {livros: results, urlImagem: '/img/nodejs-featured_large.png', linkImagemCapa: '/img/nodejs-featured_large.png'});
        });
       // connection.end();
    });
}