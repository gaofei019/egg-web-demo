<div class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="row">
      <ul class="head-nav nav list-inline">
        <li class="nav-head-li">
          <a href="/" class="navbar-link nav-title">
            BY豆瓣电影
          </a>
        </li>
        <li class="pull-right">
          {% if(userInfo) %}
            <a class="navbar-link" href="/user/index/{{userInfo.id}}"><img class="thumb-avatar rotate" src="{{userInfo.avatar}}" alt=":-D"></a>
            <a class="navbar-link" href="/user/index/{{userInfo.id}}">{{userInfo.userName}}</a>
            <span class="vertical-line">|</span>
            <a href="/login/logout" class="navbar-link">退出</a>
          {% else %}
            <a id='signin' href="#" class="navbar-link" data-toggle="modal" data-target="#signinModal">登录</a>
            <span class="vertical-line">|</span>
            <a id='signup' href="#" class="navbar-link" data-toggle="modal" data-target="#signupModal">注册</a>
          {% endif %}
        </li>
      </ul>
      </div>
    </div>
  </div>
</div>

<div class="container padding-top">
  <div class="row">
    <div class="page-header clearfix">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <form method='get' action='/douban/searchMovie'>
          <div class="input-group col-lg-4 col-md-4 col-sm-6 col-xs-12 pull-right">
            <input type="text" class="form-control" name='q'>
            <span class="input-group-btn">
              <button class="btn btn-primary" type='submit'>
                搜索
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


<div id="signinModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="signinTitle">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form action="/login/loginAction" method='POST'>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="signinTitle">登录</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="myname">用户名</label>
            <input type="text" id="myname" name='username' class="form-control">
          </div>
          <div class="form-group">
            <label for="mypwd">密码</label>
            <input type="password" id="mypwd" name='password' class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-defaul" type="button" data-dismiss="modal">关闭</button>
          <button class="btn btn-success" type="submit">提交</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div id="signupModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="signupTitle">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <form action="/user/addAction" method='POST'>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="signupTitle">注册</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="mynewName">用户名</label>
            <input type="text" id="mynewName" name="username" class="form-control">
          </div>
          <div class="form-group">
            <label for="mynewpwd">密码</label>
            <input type="password" id="mynewpwd" name="pwd" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-defaul" type="button" data-dismiss="modal">关闭</button>
          <button class="btn btn-success" type="submit">提交</button>
        </div>
      </form>
    </div>
  </div>
</div>