'use strict';
const fs = require('fs');
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533901654633_5001';

  // add your config here
  config.middleware = [];
  // 添加 view 配置
	config.view = {
	  defaultViewEngine: 'nunjucks',
	  mapping: {
	    '.tpl': 'nunjucks',
	  },
	};
	// 添加 news 的配置项
	config.news = {
	  pageSize: 5,
	  serverUrl: 'https://hacker-news.firebaseio.com/v0',
	};

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
    };

    config.staticServer = {
        staticPath: path.join(appInfo.baseDir, 'app'),
        imagePath: '/public/images'
    }
    config.douban = {
        doubanBaseUrl: 'http://api.douban.com/v2/movie',
        inTheaters: 'in_theaters',
        comingSoon: 'coming_soon',
        top250: 'top250',
        subject: 'subject'
    }

    config.mysql = {
        client: {
            host:'localhost',
            port: 8889,
            user: 'root',
            password: 'root',
            database: 'douban_egg'
        },
        app: true,
        agent: false
    };

    config.middleware = [
        'checklogin'
    ]

    config.checklogin = {
        ignore(ctx) {
            let ignoreUrl = [
                '/login/login',
                '/login/loginAction',
                '/login/logout',
                '/user/add',
                '/user/addAction'
            ]
            let url = ctx.request.url
            return ignoreUrl.some((item)=>{
                return url === item;
            })
        }
    }

  return config;
};
