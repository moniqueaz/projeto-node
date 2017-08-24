function ProdutosDAO(app){
    this._app = app;
}

ProdutosDAO.prototype.lista = function(callback){
    this._app.infra.connectionFactory(function(err, connection) {
        connection.query('select * from produtos', function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

ProdutosDAO.prototype.salva = function(produto, callback){
    this._app.infra.connectionFactory(function(err, connection) {
        connection.query('insert into produtos set ?', produto, function(erros, results) {
            connection.release();
            callback(erros,results);
        });
    });
}

module.exports = function(){
    return ProdutosDAO;
}
