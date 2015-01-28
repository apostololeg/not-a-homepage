var stuff = require('../bower.json').dependencies;

function index(req, res){

    res.render('index', {
        title: 'test',
        content: 'Welcome!',
        stuff: Object.keys(stuff)
    });

};


exports.index = index;
