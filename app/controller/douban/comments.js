// 电影详情页的 评论与回复
'use strict';


module.exports = app => {
    class CommentsController extends app.Controller {
        * addComments() {
            let ctx = this.ctx;
            let data = ctx.request.body.comment;
            try {
                let result = yield ctx.service.comments.saveComments(data);
            } catch(error) {
                ctx.body = {
                    success: 0,
                    error: '保存到数据库错误:' + error
                }
                return;
            }
            ctx.body = {success: 1};
        }
    }
    return CommentsController;
}