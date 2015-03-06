module.exports = function(scope, data) {
    return ['a', {
            class: 'control snippet snippet_scope_' + scope,
            href: '/stuff/' + data.slug
        },
        data.name || data.slug,
        data.description
            ? ['div', { class: 'description' }, data.description]
            : ''
    ];
}
