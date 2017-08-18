var express = require('express'); // express
var load = require('express-load'); // express-load

module.exports = function(){
    
    var app = express();
    
    app.set('view engine', 'ejs'); // view engine pré definido no express
    app.set('views', './app/views');

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);
    
    return app;

}