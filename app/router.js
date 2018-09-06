'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //router.get('/', controller.home.index);
    router.get('/', controller.douban.index.index);
  router.get('/news', controller.news.list);
  //app.redirect('/','/douban/index');

    // 电影
    app.get('/douban/index', controller.douban.index.index);
    app.get('/douban/more/:category', controller.douban.index.getMore);
    app.get('/douban/searchMovie', controller.douban.index.searchMovie);
    app.get('/douban/movieDetail/:movieid', controller.douban.index.movieDetail);

    // 用户
    app.get('/user/index/:id', controller.user.user.index);
    app.post('/user/update/:id', controller.user.user.update);
    app.get('/user/add/', controller.user.user.add);
    app.get('/user/delete/:id', controller.user.user.delete);
    app.post('/user/addAction', controller.user.user.addAction);
    app.get('/user/userList', controller.user.user.userList);

    app.get('/login/login', controller.login.login);
    app.post('/login/loginAction', controller.login.loginAction);
    app.get('/login/logout', controller.login.logout);

    // 评论
    app.post('/comments/add', controller.douban.comments.addComments);
};