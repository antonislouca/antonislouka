---
layout: default
title: About
---

{% assign p = site.data.profile %}

## About

{{ p.bio | markdownify }}

I am reachable at <a href="mailto:{{ p.email }}">{{ p.email }}</a>.
{% if p.cv_pdf %}A current copy of my [CV is here]({{ p.cv_pdf | relative_url }}).{% endif %}

## News

<ul class="news">
{% assign sorted = site.data.news | sort: "date" | reverse %}
{% for n in sorted limit: 6 %}
  <li>
    <span class="date">{{ n.date | date: "%b %Y" }}</span>
    <span class="text">{{ n.text | markdownify | remove: '<p>' | remove: '</p>' }}</span>
  </li>
{% endfor %}
</ul>

## Selected publications

<ul class="pub-list">
{% assign sel_all = site.data.publications | where: "selected", true %}
{% assign sel_years = sel_all | map: "year" | uniq | sort | reverse %}

{% for y in sel_years %}
  {% assign year_pubs = sel_all | where: "year", y %}
  {% for pub in year_pubs %}
    <li class="pub">
      <span class="tag">{{ pub.type }}</span>
      <span class="pub-title">{{ pub.title }}</span>
      <div class="pub-authors">{{ pub.authors | markdownify | remove: '<p>' | remove: '</p>' }}</div>
      <div class="pub-venue">{{ pub.venue }}, {{ pub.year }}{% if pub.status %} <span class="pub-status">({{ pub.status }})</span>{% endif %}</div>
      
      {% if pub.links or pub.bibtex %}
      <div class="pub-links">
        {% for l in pub.links %}<a class="pub-link" href="{{ l.url | relative_url }}" target="_blank" rel="noopener noreferrer">{{ l.name }}</a>{% endfor %}
        {% if pub.bibtex %}
          <button class="pub-link bib-toggle" data-target="bib-{{ pub.title | slugify }}">bib</button>
        {% endif %}
      </div>
      {% endif %}

      {% if pub.bibtex %}
        <div id="bib-{{ pub.title | slugify }}" class="pub-bibtex" style="display: none;">
          <pre><code>{{ pub.bibtex | escape }}</code></pre>
        </div>
      {% endif %}
    </li>
  {% endfor %}
{% endfor %}
</ul>

[See all publications →]({{ '/publications/' | relative_url }})
