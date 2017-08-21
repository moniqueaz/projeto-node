// FACTORY METHOD
module.exports = function(app){
    app.get('/produtos', function(req, res){

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err,results){
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
    });
   // app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req, res){
        console.log("cheguei aqui");
        res.render('produtos/form');
    });

    app.post('/produtos', function(req, res){

        var produto = req.body;
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(erros, results){
         //   console.log(erros);
            res.redirect('/produtos');
            //listaProdutos(req, res);
        });

    });
}