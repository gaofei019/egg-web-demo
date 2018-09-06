'use strict';

const moment = require('moment');
const { pagination } = require('../../service/common')

module.exports = app => {
    class IndexController extends app.Controller {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config.douban;
            this.inTheaters = this.config.inTheaters;
            this.comingSoon = this.config.comingSoon;
            this.top250 = this.config.top250;
            this.subject = this.config.subject;
        }
        * index() {
            let ctx = this.ctx;

            let movies = yield ctx.service.douban.getMovies() || [];
            let userInfo = this.ctx.session.userInfo;
            // let userInfo = this.app.locals.userInfo;
            yield ctx.render('douban/index.tpl', { movies: movies, userInfo: userInfo });
        }

        * getMore() {
            let ctx = this.ctx;
            let url = ctx.request.url;
            let arr = url.match(/\/douban\/more\/\w+\?p=(\d+)/);
            let p = 1;
            if(arr !== null) {
                p = arr[1];
            }
            let category = ctx.params.category;

            let movies = yield ctx.service.douban.getCateMovies(category, p) || [];
            let { startCount, totalCount } = pagination(movies.total, p);
            yield ctx.render('douban/morelist.tpl', {
                userInfo: ctx.session.userInfo,
                search: false,
                currentPage: p,
                category: category,
                movies: movies,
                showFooter:true,
                startCount: startCount,
                totalCount: totalCount
            });
        }

        * searchMovie() {
            let ctx = this.ctx;
            let url = ctx.request.url;

            // 下面是用来去除 url中带的csrf，可以去掉，也可以不去掉
            // let formatUrl = url.match(/.+\?.+?(&.+)/)[1];
            // url = url.replace(formatUrl, '');
            // if(formatUrl.indexOf('&p=') !== -1) {
            //   // 如果不是请求第一页数据，也就是url上带 &p=
            //   url = url + formatUrl.replace(/.+(?=&)/,'');
            // }
            let q = '', p=1;
            let arr1 = url.match(/\/douban\/searchMovie\?q=(.*)/);
            if(arr1 !== null) {
                let arr2 = arr1[1].match(/(.*)&p=(\d+)/);
                if(arr2 !== null) {
                    q = arr2[1]
                    p = arr2[2];
                } else {
                    q = arr1[1];
                }
            }
            let movies = yield ctx.service.douban.searchMovies(q, p) || [];
            let category = movies.category;
            let { startCount, totalCount } = pagination(movies.total, p);

            yield ctx.render('douban/morelist.tpl', {
                q: q,
                currentPage: p,
                userInfo: ctx.session.userInfo,
                category: category,
                movies: movies,
                showFooter:true,
                totalCount: totalCount,
                startCount: startCount,
                search: true
            });
        }

        * movieDetail() {
            let ctx = this.ctx;
            let movieId = ctx.params.movieid;
            let movie = yield ctx.service.douban.getMovieDetail(movieId) || [];
            let directors = '';
            movie.directors.forEach((item)=>{
                directors += item.name;
            })
            directors = directors.slice(0, directors.length-1);
            let aka = movie.aka;
            if(aka.length > 3) {
                aka.length = 3;
            }
            let data = {
                title: movie.title,
                average: movie.rating.average,
                directors: directors,
                countries: movie.countries.join(','),
                language: movie.language,
                year: movie.year,
                genres: movie.genres.join(','),
                aka: aka.join(','),
                image: movie.images.large,
                summary: movie.summary
            }

            // 评论
            let comments = yield ctx.service.comments.getComments(movieId);
            if(!comments) {
                ctx.body = '从数据库查询评论错误';
            }
            yield comments.map(function* (item){
                let replies = yield ctx.service.comments.getReplyByCid(item.id) || [];
                if(replies.length > 0) {
                    item.replies = replies;
                }
                return item;
            })
            // console.log('comments:',comments);
            yield ctx.render('douban/detail.tpl', {
                data: data,
                movieId: movieId,
                comments: comments,
                userInfo: this.ctx.session.userInfo
            })
        }
    }
    return IndexController;
}