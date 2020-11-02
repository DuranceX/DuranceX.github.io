'use strict';

if (!hexo.config.search || !hexo.config.search.enable) {
    return;
}

const pathFn = require('path');
const { stripHTML } = require('hexo-util');

let config = hexo.config.search;

if (!config.path) {
    config.path = 'search.json';
}

if (pathFn.extname(config.path) === '.json') {
    hexo.extend.generator.register('searchdb', function(locals){
        const url_for = hexo.extend.helper.get('url_for').bind(this);

        const parse = item => {
            let _item = {};
            if (item.title) _item.title = item.title;
            if (item.date) _item.date = item.date;
            if (item.path) _item.url = url_for(item.path);
            if (item.tags && item.tags.length > 0) {
                _item.tags = [];
                item.tags.forEach((tag) => {
                    _item.tags.push([tag.name, url_for(tag.path)]);
                });
            }
            _item.categories = [];
            if (item.categories && item.categories.length > 0) {
                item.categories.forEach((cate) => {
                    _item.categories.push([cate.name, url_for(cate.path)]);
                });
            } else {
                _item.categories.push([' ', '']);
            }
            if (item.content) {
                _item.content = stripHTML(item.content.trim().replace(/<pre(.*?)\<\/pre\>/gs, ''))
                    .replace(/\n/g, ' ').replace(/\s+/g, ' ')
                    .replace(new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'g'), '');
            }
            return _item;
        };

        const searchfield = config.field;

        let posts, pages;

        if (searchfield) {
            if (searchfield === 'post') {
                posts = locals.posts.sort('-date');
            } else if (searchfield === 'page') {
                pages = locals.pages;
            } else {
                posts = locals.posts.sort('-date');
                pages = locals.pages;
            }
        } else {
            posts = locals.posts.sort('-date');
            pages = locals.pages;
        }

        let res = [];

        if (posts) {
            posts.each(post => {
                res.push(parse(post));
            });
        }
        if (pages) {
            pages.each(page => {
                res.push(parse(page));
            });
        }

        return {
            path: config.path,
            data: JSON.stringify(res)
        };
    });
}