var http = require('http'),
    express = require('express'),
    app = express(),
    path = require('path'),
    cfg = require('../.config.json'),
    mj = require('../static/lib/microjungle/dist/dom.min.js'),
    template = require('../tmpl/index.js');

function configure() {
    app
        .configure(function(){
            app
                .set('port', cfg.port)
                .set('views', __dirname + '/../views')
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
    app.get('/$', function(req, res, next) {
        res.send(template({ title: 'индекс' }));
    });
    // app.get('/:cluster/:feed', function(req, res, next) {
    //     if(!req.params.cluster && req.params.feed) {
    //         next();
    //         res.send(200);
    //     } else {
    //         // console.log('req.params', req.params);
    //         res.send(template({ title: 'индекс 2' }));
    //     }
    // });
}

function startServer() {
    http.createServer(app).listen(cfg.port, cfg.ip, function() {
        console.log('App started at', cfg.port);
    });
}


exports.configure = configure;
exports.startServer = startServer;
