// infra
var mysql = require('mysql');
var pool = null;

function _criaPool(){
    if(!process.env.NODE_ENV){

        pool =  mysql.createPool({
             connectionLimit: 100,
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        
        pool =  mysql.createPool({
            connectionLimit: 100,
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs_test'
        });
    }

    if(process.env.NODE_ENV == 'production'){
        //var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
       // var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        /*
            [0] - RegEx completa
            [1] - login
            [2] - senha
            [3] - host
            [4] - db
        */
        pool =  mysql.createPool({
            connectionLimit: 100,
            host: '...',
            user:'...',
            password:'...',
            database:'...'
        });
    }

    // Se a fila ta cheia
    pool.on('enqueue', function () {
        //console.error('Waiting for available connection slot');
    });
}

_criaPool();

var createDBConnection = function(callback) {
    
        return pool.getConnection(function (err, connection) {
            if(err) {
                //return callback(err);
                console.log('Error getting mysql_pool connection: ' + err);
                pool.end(function onEnd(error) {
                    if(error) {
                        console.log('Erro ao terminar o pool: ' + error);
                    }
                    // All connections are now closed once they have been returned with connection.release()
                    // i.e. this waits for all consumers to finish their use of the connections and ends them.
                    // Recria o pool
                    _criaPool();
                });
                return;
            }
            return callback(null, connection);
        });
    
    };

//wrapper
module.exports = function(){
    return createDBConnection;
}