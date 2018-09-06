'use strict';

module.exports = app => {
    class LoginController extends app.Controller {
        * login() {
            yield this.ctx.render('sign/signin.tpl');
        }
        * loginAction() {
            let username = this.ctx.request.body.username
            let pwd = this.ctx.request.body.password

            let user = yield this.ctx.service.userInfo.getUserByName(username);

            if(!user || (user.password != pwd)) {
                console.log('user wrong!');
                return this.ctx.redirect('/login/login')
            }
            yield this.ctx.service.userInfo.updateLastedLoginTime(user.id)
            delete user.password;
            this.ctx.session.userInfo = user;
            // this.app.locals.userInfo = user;
            this.ctx.redirect('/')
        }
        * logout() {
            this.ctx.session = null;
            // this.app.locals.userInfo = null;
            this.ctx.redirect('/login/login');
        }
    }
    return LoginController;
}