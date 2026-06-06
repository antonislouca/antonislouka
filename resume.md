---
layout: resume
title: "CV — Antonis Louka"
permalink: /resume/
---

{% assign p = site.data.profile %}

<header class="r-header">
  <div class="r-name-block">
    <h1 class="r-name">{{ p.name }}</h1>
    <p class="r-title">{{ p.title }}{% if p.affiliation %} · {{ p.affiliation }}{% endif %}</p>
  </div>
  <div class="r-contact">
    {% if p.email %}<span><a href="mailto:{{ p.email }}">{{ p.email }}</a></span>{% endif %}
    {% if p.links.github %}<span><a href="https://github.com/{{ p.links.github }}">github.com/{{ p.links.github }}</a></span>{% endif %}
    {% if p.links.scholar %}<span><a href="https://scholar.google.com/citations?user={{ p.links.scholar }}">Google Scholar</a></span>{% endif %}
    {% if p.links.orcid %}<span><a href="https://orcid.org/{{ p.links.orcid }}">ORCID {{ p.links.orcid }}</a></span>{% endif %}
  </div>
</header>

{% if p.bio %}
<section class="r-section">
  <h2 class="r-section-title">About</h2>
  <div class="r-bio">{{ p.bio | markdownify }}</div>
</section>
{% endif %}

<section class="r-section">
  <h2 class="r-section-title">Education</h2>
  {% for e in site.data.education %}
  <div class="r-row">
    <div class="r-when">{{ e.year }}</div>
    <div class="r-what">
      <strong>{{ e.degree }}</strong>
      <div class="r-org">{{ e.institution }}</div>
      {% if e.advisor %}<div class="r-detail">Advisor: <a href="{{ e.advisor.url }}">{{ e.advisor.name }}</a></div>{% endif %}
      {% if e.detail %}<div class="r-detail">{{ e.detail | markdownify | remove: '<p>' | remove: '</p>' }}</div>{% endif %}
    </div>
  </div>
  {% endfor %}
</section>

<section class="r-section">
  <h2 class="r-section-title">Experience</h2>
  {% for x in site.data.experience %}
  <div class="r-row">
    <div class="r-when">{{ x.year }}</div>
    <div class="r-what">
      <strong>{{ x.role }}</strong>
      <div class="r-org">{{ x.org }}</div>
      {% if x.detail %}<div class="r-detail">{{ x.detail | markdownify | remove: '<p>' | remove: '</p>' }}</div>{% endif %}
    </div>
  </div>
  {% endfor %}
</section>

{% assign pubs = site.data.publications %}
{% if pubs.size > 0 %}
<section class="r-section">
  <h2 class="r-section-title">Publications</h2>
  {% assign years = pubs | map: "year" | uniq | sort | reverse %}
  {% for y in years %}
    {% assign year_pubs = pubs | where: "year", y %}
    {% for pub in year_pubs %}
    <div class="r-pub">
      <span class="tag">{{ pub.type }}</span>
      <span class="r-pub-title">{{ pub.title }}</span>
      <div class="r-pub-authors">{{ pub.authors | markdownify | remove: '<p>' | remove: '</p>' }}</div>
      <div class="r-pub-venue">{{ pub.venue }}, {{ pub.year }}{% if pub.status %} <em>({{ pub.status }})</em>{% endif %}</div>
      {% if pub.links %}
      <div class="r-pub-links">
        {% for l in pub.links %}{% if l.url != "" %}<a href="{{ l.url }}">{{ l.name }}</a>{% endif %}{% endfor %}
      </div>
      {% endif %}
    </div>
    {% endfor %}
  {% endfor %}
</section>
{% endif %}
