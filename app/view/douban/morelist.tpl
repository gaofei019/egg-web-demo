{% extends "../layout/layout_douban.tpl" %}
{% block content %}
<div class="wrapper">
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>
            <a href="{{movies.categoryUrl}}">{{movies.title}}</a>
          </h3>
        </div>
        <div class="panel-body">
          {% for subject in movies.subjects.slice(0,12) %}
            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">
              <div class="thumbnail">
                <a href="/douban/movieDetail/{{subject.id}}">
                  <img src="{{subject.images.medium}}" alt="{{subject.title}}">
                </a>
                <div class="caption">
                  <h4>{{subject.title}}</h4>
                  <p>
                    <a href="/douban/movieDetail/{{subject.id}}" class="btn btn-primary">观看预告片</a>
                  </p>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
{% block footer %}{% endblock %}
