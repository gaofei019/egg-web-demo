<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <link rel="icon" href="/public/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/public/css/douban.css"/>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src='https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
    <script src="/public/js/common.js"></script>
    {% block head %}{% endblock %}
    <title>{% block title %}{% endblock %}</title>
  </head>
  <body>
    {% include "../douban/header.tpl" %}
    {% block content %}{% endblock %}
    {% if(showFooter) %}
      {% include "../douban/footer.tpl" %}
    {% endif %}
  </body>
  
</html>