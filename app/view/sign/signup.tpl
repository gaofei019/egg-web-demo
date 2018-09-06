{% extends "../layout/layout_douban.tpl" %}
{% block title %}SignUp{% endblock %}
{% block content %}
<div class="container">
  <form class="form-horizontal" action="/user/addAction" method='POST'>
    <div class="form-group">
      <label for="username" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label">用户名</label>
      <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
        <input type="text" class="form-control" id="username" name="username" placeholder="UserName">
      </div>
    </div>
    <div class="form-group">
      <label for="pwd" class="col-lg-2 col-md-2 col-sm-2 col-xs-3 control-label">密码</label>
      <div class="col-lg-5 col-md-5 col-sm-5 col-xs-8">
        <input type="password" class="form-control" name='pwd' id="pwd" placeholder="Password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-3 col-lg-5 col-md-5 col-sm-5 col-xs-8">
        <button type="submit" class="btn btn-primary">注册</button>
      </div>
    </div>
  </form>
</div>
{% endblock %}