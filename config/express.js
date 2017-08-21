var express = require('express'); // express
var load = require('express-load'); // express-load
var bodyParser = require('body-parser'); // body-parser

module.exports = function(){
    
    var app = express();
    
    app.set('view engine', 'ejs'); // view engine pré definido no express
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);
    
    return app;

}