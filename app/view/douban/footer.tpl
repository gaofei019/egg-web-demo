<nav aria-label="Page navigation" class="text-center">
  {% if(search==true) %}
    {% set pUrl="?q="+q+"&p=" %}
  {% else %}
    {% set pUrl=category+"?p=" %}
  {% endif %}
  <ul class="pagination">
    <li {% if(currentPage==1) %}class="disabled"{% endif %}>
      <a href="{{pUrl}}{{currentPage-1}}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {% if(totalCount < 6) %}
      {% set endCount = totalCount+1 %}
    {% else %}
      {% set endCount = startCount+5 %}
    {% endif %}
    {% for i in range(startCount, endCount) %}
      {% if(currentPage == i) %}
        <li class="active">
          <a href="{{pUrl}}{{i}}">{{i}}</a>
        </li>
      {% else %}
        <li>
          <a href="{{pUrl}}{{i}}">{{i}}</a>
        </li>
      {% endif %}
    {% endfor %}
    <li {% if(currentPage == totalCount) %}class="disabled"{% endif %}>
      <a href="{{pUrl}}{{+currentPage+1}}" {% if(currentPage == totalCount) %}class="disabled"{% endif %} aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>