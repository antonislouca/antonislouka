---
layout: default
title: Publications
permalink: /publications/
---

{% assign all = site.data.publications %}
{% assign years = all | map: "year" | uniq | sort | reverse %}

{% for y in years %}
<div class="pub-year-block">
  <h2 class="pub-year">{{ y }}</h2>
  <ul class="pub-list">
  {% assign year_pubs = all | where: "year", y %}
  {% for pub in year_pubs %}
    <li class="pub">
      <span class="tag">{{ pub.type }}</span>
      <span class="pub-title">{{ pub.title }}</span>
      <div class="pub-authors">{{ pub.authors | markdownify | remove: '<p>' | remove: '</p>' }}</div>
      <div class="pub-venue">{{ pub.venue }}, {{ pub.year }}{% if pub.status %} <span class="pub-status">({{ pub.status }})</span>{% endif %}</div>
      {% if pub.abstract %}<div class="pub-abstract">{{ pub.abstract }}</div>{% endif %}
      {% if pub.links or pub.bibtex %}
      <div class="pub-links">
        {% for l in pub.links %}<a class="pub-link" href="{{ l.url | relative_url }}" target="_blank" rel="noopener noreferrer">{{ l.name }}</a>{% endfor %}
        {% if pub.bibtex %}
          <button class="pub-link bib-toggle" data-target="bib-{{ pub.title | slugify }}">BibTeX</button>
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
  </ul>
</div>
{% endfor %}
