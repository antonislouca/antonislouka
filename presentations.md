---
layout: default
title: Talks
permalink: /presentations/
---

{% assign sorted = site.data.presentations | sort: "date" | reverse %}

{% assign types = "invited,conference,poster" | split: "," %}
{% assign labels = "Invited talks,Conference talks,Posters" | split: "," %}

{% for t in types %}
  {% assign group = sorted | where: "type", t %}
  {% if group.size > 0 %}
  <h2>{{ labels[forloop.index0] }}</h2>
  <ul class="talks">
    {% for talk in group %}
    <li>
      {% assign primary_link = talk.links | first %}
      <div class="talk-title">
        {% if primary_link %}
          <a href="{{ primary_link.url | relative_url }}" target="_blank" rel="noopener noreferrer">{{ talk.title }}</a>
        {% else %}
          {{ talk.title }}
        {% endif %}
      </div>
      <div class="talk-meta">
        <em>{{ talk.event }}</em> ·
        {{ talk.date | date: "%b %Y" }} ·
        {{ talk.location }}
      </div>
      {% if talk.links.size > 1 %}
      <div class="pub-links">
        {% for l in talk.links offset:1 %}
          <a class="pub-link" href="{{ l.url | relative_url }}" target="_blank" rel="noopener noreferrer">{{ l.name }}</a>
        {% endfor %}
      </div>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}
