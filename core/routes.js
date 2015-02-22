var stuff = require('../stuff.json');

function index(req, res){

    res.render('index', {
        title: '😌',
        content: 'Welcome!',
        stuff: stuff.items
    });

};


exports.index = index;
