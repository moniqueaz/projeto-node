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
        // bug no process.env.CLEARDB_DATABASE_URL
        //var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        //console.log(urlDeConexao);
       // var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        /*
            [0] - RegEx completa
            [1] - login
            [2] - senha
            [3] - host
            [4] - db
        */        
        return mysql.createConnection({
            host: '...',
            user:'...',
            password:'...',
            database:'...'
        });
    }
}

//wrapper
module.exports = function(){
    return createDBConnection;
}