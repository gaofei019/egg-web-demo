'use strict';

const moment = require('moment');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const { saveFile } = require('../../service/common');

module.exports = app => {
    class UserController extends app.Controller {
        * index() {
            const ctx = this.ctx;
            const userInfo = ctx.session.userInfo
            const userId = userInfo.id;
            // const userId = this.app.locals.userInfo.id;
            const paramsId = ctx.params.id;
            // console.log(ctx.csrf);
            if(!userId) {
                ctx.redirect('/login/login')
            }
            if(userInfo.userName !== 'admin' && userId != paramsId) {
                return this.ctx.redirect('/user/index/' + userId);
            }
            const info = yield ctx.service.userInfo.getUserById(paramsId);

            yield ctx.render('user/index.tpl', {
                userInfo: userInfo,
                info: info
            });
        }

        * update() {
            let ctx = this.ctx
            let body = ctx.request.body
            let userId = ctx.session.userInfo.id

            if(Object.getOwnPropertyNames(body).length === 0) {
                // 说明是上传文件， 这里也就是修改头像
                // 通过 getFileStream() 读取文件流，
                // 如果表单中存在 input 类型为text 或者 password 的数据，则它们在 stream.fields 中
                const stream = yield ctx.getFileStream();
                let results = null;
                try {
                    results = yield saveFile(stream, this.config);
                } catch (err) {
                    // 释放掉文件流
                    yield sendToWormhole(stream);
                    throw err;
                }

                let updateUserInfo = yield ctx.service.userInfo.updateAvatarById(userId, results);
                if(updateUserInfo > 0) {
                    ctx.body = {
                        success: 1,
                        msg: '更新头像成功！'
                    }
                } else {
                    return ctx.body = {
                        success: 0,
                        error: '更新头像失败！'
                    }
                }
            } else {
                let username = body.username
                let oldpwd = body.oldpwd
                let newpwd = body.newpwd

                if(!userId) {
                    return ctx.redirect('login/login')
                }

                let userInfo = yield ctx.service.userInfo.getUserById(userId)
                if(!userInfo || userInfo.password!=oldpwd) {
                    console.log('userInfo wrong!')
                    return ctx.body = {
                        success: 0,
                        msg: '用户名或密码错误！'
                    }
                }
                let newInfo = {}
                let result = yield ctx.service.userInfo.updatePwdById(userId, username, newpwd);
                if(result>0) {
                    ctx.body = {
                        success: 1,
                        msg: '更新信息成功！'
                    }
                } else {
                    console.log('更新密码失败');
                    return ctx.body = {
                        success: 0,
                        msg: '更新信息失败！'
                    }
                }
            }

            // update 动作完成之后，更新 session
            let newUserInfo = yield this.ctx.service.userInfo.getUserById(userId);
            if(newUserInfo) {
                ctx.session.userInfo = newUserInfo;
            }

            return ctx.body;
        }

        * add() {
            yield this.ctx.render('sign/signup.tpl');
        }

        * addAction() {
            let ctx = this.ctx
            let body = ctx.request.body
            let username = body.username
            let pwd = body.pwd
            let loginTime = moment().format('YYYY-MM-DD HH:mm:ss');

            if(!username || ! pwd) {
                console.log('请将用户信息填写完整');
                return ctx.redirect('/user/add/');
            }
            let user = yield ctx.service.userInfo.getUserByName(username);
            if(user) {
                console.log('用户名已经存在');
                return ctx.redirect('/user/add/');
            }
            let userInfo = {
                userName: username,
                password: pwd,
                createTime: loginTime
            }
            let result = yield ctx.service.userInfo.addUser(userInfo);
            if(result>0) {
                console.log('注册成功');
                return ctx.redirect('/login/login');
            } else {
                console.log('注册失败');
                return ctx.redirect('/user/add');
            }
        }

        * userList() {
            let ctx = this.ctx;
            let userName = ctx.session.userInfo.userName;
            // let userName = this.app.locals.userInfo.userName;
            if(userName!=='admin') {
                console.log('没有管理员权限');
                return ctx.redirect('/');
            }
            let userList = yield ctx.service.userInfo.getUserList();
            // let userInfo = this.app.locals.userInfo;
            let userInfo = ctx.session.userInfo;
            yield ctx.render('user/userList.tpl', {userList: userList, userInfo: userInfo});
        }

        * delete() {
            let ctx = this.ctx;
            let deleteId = ctx.params.id;
            let currentId = ctx.session.userInfo.id;
            // let currentId = this.app.locals.userInfo.id;
            let userInfo = yield ctx.service.userInfo.getUserById(currentId);
            if(!userInfo || userInfo.userName !== 'admin') {
                console.log('用户不存在或者没有管理员权限')
            }
            let result =  yield ctx.service.userInfo.deleteById(deleteId);
            if(result>1) {
                console.log('删除成功');
                ctx.redirect('/user/userList');
            } else {
                console.log('删除失败');
                ctx.redirect('/user/userList');
            }
        }
    }
    return UserController;
}