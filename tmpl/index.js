var t = require('./_templater'),
    stuff = require('../stuff.json'),
    cluster = require('./cluster.js');

function css(url) {
    return ['link', { rel: 'stylesheet', href: url }];
}

function js(url) {
    return ['script', { src: url }];
}

module.exports = function(data) {
    return t([
        ['html',
            ['head',
                ['title', data.title],
                ['meta', {
                    name: 'viewport',
                    content: 'width=device-width,maximum-scale=1,initial-scale=1,user-scalable=0'
                }],
                ['link', {
                    rel: "shortcut icon",
                    href: "/favicon.png",
                    type: "image/png"
                }],
                css('/index.css'),
                ['script', {
                    'data-main': '/require-config.js',
                    src: '/lib/requirejs/require.js'
                }]
            ],
            ['body', { class: 'page' },
                ['div', { class: 'content' }].concat(stuff.clusters.map(cluster)),
                ['div', { class: 'hint' },
                    ['div', { class: 'keys' },
                        ['div', { class: 'key key_up' }],
                        ['div', { class: 'key key_left' }],
                        ['div', { class: 'key key_down' }],
                        ['div', { class: 'key key_right' }],
                    ]
                ],
                ['div', { class: 'footer' },
                    'поехавшие интерфейсы', ['br'],
                    '2014 – 2015'
                ]
            ]
        ]
    ]);
}
