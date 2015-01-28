var http = require('http'),
    express = require('express'),
    app = express(),
    routes = require('./routes.js'),
    path = require('path'),
    cfg = require('../.config.json');

function configure() {

    app
        .configure(function(){
            app
                .set('port', cfg.port)
                .set('views', __dirname + '/../views')
                .set('view engine', 'jade')
                .use(app.router)
                .use(express.static(path.join(__dirname, '/../static')))
                .use('/stuff', express.static(path.join(__dirname, '/../stuff')));
        })
        .configure('development', function(){
            app
                .use(express.errorHandler())
                .use(express.logger('dev'));
        });

    // роутинг
    app.get('/', routes.index);
    app.get('/static', function() {
        console.log('/static', arguments);
    });

}

function startServer() {

    http.createServer(app).listen(cfg.port, cfg.ip, function(){
        console.log('App started at', cfg.port);
    });

}


exports.configure = configure;
exports.startServer = startServer;
