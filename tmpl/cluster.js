var snippet = require('./snippet.js');

module.exports = function(data) {
    return ['div', { class: 'control cluster cluster_scope_'+data.slug },
        ['div', { class: 'title' }, data.name || data.slug],
        data.description
            ? ['div', { class: 'description' }, data.description]
            : '',
        ['div', { class: 'inner' }].concat(data.items.map(snippet.bind(this, data.slug)))
    ];
}
