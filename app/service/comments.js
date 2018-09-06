'use strict';

const moment = require('moment');

module.exports = app => {
    class Comments extends app.Service {
        * saveComments(data) {
            if(!data.to) {
                // 如果 to 不存在，则说明是 评论
                let result = null;
                try {
                    result = yield this.app.mysql.insert('comments', {
                        movieId: data.movieId,
                        fromId: data.from,
                        content: data.content,
                        create_time: moment().format('YYYY-MM-DD HH:mm:ss')
                    });
                } catch(error) {
                    console.log('保存评论到数据库错误：',error);
                    this.ctx.body = '保存评论到数据库错误：' + error;
                }
                return result;
            } else {
                // 如果 to 存在，则说明是回复
                let result = null;
                try {
                    result = yield this.app.mysql.insert('reply', {
                        commentId: data.commentId,
                        fromId: data.from,
                        toId: data.to,
                        reply_content: data.content,
                        create_time: moment().format('YYYY-MM-DD HH:mm:ss')
                    });
                } catch(error) {
                    console.log('保存回复到数据库错误：',error);
                    return error;
                }
                return result;
            }
        }
        // 获取电影评论
        * getComments(movieId) {
            let comments = null;
            let ctx = this.ctx;
            try {
                comments = yield this.app.mysql.select('comments', {
                    where: { movieId:  movieId},
                    orders: [['create_time', 'desc']]
                });
            } catch(error) {
                console.log('从数据库查询评论错误：' + error);
                return false;
            }
            if(comments) {
                let userInfo = null;
                try {
                    yield comments.map(function* (item){
                        userInfo = yield ctx.service.userInfo.getUserById(item.fromId);
                        if(userInfo) {
                            item.fromName = userInfo.userName;
                            item.avatar = userInfo.avatar;
                        }
                        return item;
                    });
                } catch(error) {
                    console.log('从数据库查询评论的用户信息错误：' + error);
                    return false;
                }
            }
            return comments;
        }

        // 获取评论对应的回复
        * getReplyByCid(id) {
            let replies = null;
            let ctx = this.ctx;
            try {
                replies = yield this.app.mysql.select('reply', {
                    where: { commentId: id },
                    orders: [['create_time', 'asc']]
                });
            } catch(error) {
                console.log('从数据库查询回复错误：' + error);
                return false;
            }

            if(replies) {
                let fromUserInfo = null;
                let toUserInfo = null;
                try {
                    yield replies.map(function* (item) {
                        [fromUserInfo, toUserInfo] = yield ctx.service.userInfo.getUserByIds([item.fromId, item.toId]);
                        if(fromUserInfo && toUserInfo) {
                            item.fromName = fromUserInfo.userName;
                            item.toName = toUserInfo.userName;
                        }
                        return item;
                    });
                } catch(error) {
                    console.log('从数据库查询回复的用户信息错误：' + error);
                    return false;
                }
            }
            return replies;
        }

    }
    return Comments;
}