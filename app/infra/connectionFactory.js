// infra
var mysql = require('mysql');

function createDBConnection(){
    if(!process.env.NODE_ENV){

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs_test'
        });
    }

    if(process.env.NODE_ENV == 'production'){
        var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        /*
            [0] - RegEx completa
            [1] - login
            [2] - senha
            [3] - host
            [4] - db
        */
        return mysql.createConnection({
            host : grupos[3],
            user : grupos[1],
            password : grupos[2],
            database : grupos[4]
        });
    }
}

//wrapper
module.exports = function(){
    return createDBConnection;
}