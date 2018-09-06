{% extends "../layout/layout_douban.tpl" %}

{% block content %}
<div class="container">
  <div class="row">
    <table class='list table table-hover table-bordered'>
      <thead>
        <tr>
          <th>用户名</th>
          <th>密码</th>
          <th>注册时间</th>
          <th>最后登录时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {% for item in userList %}
        <tr>
          <td>{{item.userName}}</td>
          <td>{{item.password}}</td>
          <td>{{item.createTime | formatTime}}</td>
          <td>{{item.lastedLoginTime | formatTime}}</td>
          <td class="text-center"><a class='btn btn-danger' href="/user/delete/{{item.id}}">删除</a></td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>
{% endblock %}