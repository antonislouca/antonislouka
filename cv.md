---
layout: default
title: Experience
permalink: /cv/
---

{% assign p = site.data.profile %}

{% if p.cv_pdf %}
<p><a class="pub-link" href="{{ p.cv_pdf | relative_url }}">Download full CV (PDF)</a></p>
{% endif %}

## Education

<div class="cv-section">
{% for e in site.data.education %}
  <div class="cv-row">
    <div class="cv-when">{{ e.year }}</div>
    <div class="cv-what">
      <strong>{{ e.degree }}</strong>
      <div class="org">{{ e.institution }}</div>
      {% if e.advisor %}
        <div class="detail">Advisor: <a href="{{ e.advisor.url }}">{{ e.advisor.name }}</a></div>
      {% endif %}
      {% if e.detail %}<div class="detail">{{ e.detail | markdownify | remove: '<p>' | remove: '</p>' }}</div>{% endif %}
    </div>
  </div>
{% endfor %}
</div>

## Experience

<div class="cv-section">
{% for x in site.data.experience %}
  <div class="cv-row">
    <div class="cv-when">{{ x.year }}</div>
    <div class="cv-what">
      <strong>{{ x.role }}</strong>
      <div class="org">{{ x.org }}</div>
      {% if x.detail %}<div class="detail">{{ x.detail | markdownify | remove: '<p>' | remove: '</p>' }}</div>{% endif %}
    </div>
  </div>
{% endfor %}
</div>
