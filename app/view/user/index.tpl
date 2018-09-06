{% extends "../layout/layout_douban.tpl" %}
{% block title %}UserInfo{% endblock %}
{% block content %}
<div class="container">
  <div class="row">
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a class="tab-change" href="#changePwd" aria-controllers='changePwd' role="tab" data-toggle="tab">修改密码</a></li>
      <li role="presentation"><a class="tab-change" href="#changeAvatar" aria-controllers='changeAvatar' role="tab" data-toggle="tab">更换头像</a></li>
    </ul>
    <div class="tab-content tab-content-padding">
      <div role="tabpanel" class="tab-pane active" id="changePwd">
        <form  class="form-horizontal" action="/user/update/{{info.id}}" method="POST">
          <div class="form-group">
            <label for="username" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label">用户名：</label>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
              <input id="username" name="username" value="{{info.userName}}" type="text" class="form-control" data-toggle="tooltip" data-placement="bottom">
            </div>
          </div>
          <div class="form-group">
            <label for="oldpwd" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label control-label">旧密码：</label>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
              <input type="password" class="form-control" id="oldpwd" name="oldpwd" data-toggle="tooltip" data-placement="bottom">
            </div>
          </div>
          <div class="form-group">
            <label for="newpwd" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label control-label">新密码：</label>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
              <input type="password" class="form-control" id="newpwd" name="newpwd" data-toggle="tooltip" data-placement="bottom">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-3 col-lg-5 col-md-5 col-sm-5 col-xs-8 control-label">
              <button type="submit" id="change-pwd" class="change-user-info btn btn-primary pull-left">确认修改</button>
              {% if(info.userName == 'admin') %}
              <a class='btn btn-primary pull-left manager-user' href="/user/userList">管理用户</a>
              {% endif %}
            </div>
          </div>
        </form>
      </div>
      <div role="tabpanel" class="tab-pane" id="changeAvatar">
        <form id="avatar-form" name="avatar-form" class="form-horizontal" action="/user/update/{{info.id}}?_csrf={{ ctx.csrf }}" method="POST" enctype="multipart/form-data">
          <div class="form-group">
            <label for="avatar" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label">头像：</label>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
              <input id="avatar" name="avatar" type="file">
              <img id="avatarPic" src="{{info.avatar}}" style="width:150px; height:150px;" alt="请上传头像">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-3 col-lg-5 col-md-5 col-sm-5 col-xs-8 control-label">
              <button type="submit" id="change-avatar" class="change-user-info btn btn-primary pull-left">确认更换</button>
            </div>
          </div>
        <form>
      </div>
    </div>
  </div>
</div>
{% include '../layout/modal.tpl' %}
{% endblock %}