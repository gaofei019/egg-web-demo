'use strict';

module.exports = app => {
    class Douban extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config.douban;
            this.doubanBaseUrl = this.config.doubanBaseUrl;
            this.inTheaters = this.config.inTheaters;
            this.comingSoon = this.config.comingSoon;
            this.top250 = this.config.top250;
            this.subject = this.config.subject;
        }
        * request(api, opts) {
            const options = Object.assign({
                dataType: 'json',
                timeout: [ '30s', '30s' ],
            }, opts);

            const result = yield this.ctx.curl(`${this.doubanBaseUrl}/${api}`, options);
            return result.data;
        }

        // 获取首页数据
        * getMovies(category) {
            let inTheatersMovies = yield this.getCateMovies(this.inTheaters);
            let ComingSoonMovies = yield this.getCateMovies(this.comingSoon);
            let Top250Movies = yield this.getCateMovies(this.top250);
            let movies = [];
            movies.push(inTheatersMovies, ComingSoonMovies, Top250Movies);
            return movies;
        }

        // 根据in_theater coming_soon top250 分类获取电影数据
        * getCateMovies(category, p=1) {
            // 每页展示12条数据
            let count = 12;
            let start = (p-1)*count;
            let url = category + '?' + 'start=' + start + '&count=' + count;
            let cateMovies = yield this.request(url, {
                dataType: 'json',
            });
            cateMovies.categoryUrl = '/douban/more/' + category;
            return cateMovies;
        }

        // 搜索电影
        * searchMovies(q='', p=1) {
            let count = 12;
            let start = (p-1)*count;
            let url = 'search?q=' + q + '&start=' + start + '&count=' + count;
            let result = yield this.request(url, {
                dataType: 'json',
            });
            result.category = '/douban/searchMovie';
            return result;
        }

        // 电影详情页
        * getMovieDetail(movieId) {
            let url = this.subject + '/' + movieId;
            let detail = yield this.request(url, {
                dataType: 'json',
            });
            return detail;
        }
    }
    return Douban;
}