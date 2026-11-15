# Spatial Notes — IARVR Learning Journal

An English-language learning and development journal for **Interaction in Virtual and Augmented Reality** at TU Darmstadt (winter semester 2026/27).

This public website documents personal VR reflections, Unity labs, the Reverse Classroom, and the course's **Parkour Challenge** — an e-scooter locomotion technique paired with spell-activated telekinetic object manipulation.

## Publishing posts

Create a new Markdown file in `content/posts/<slug>/index.md`. Add front matter such as:

```yaml
---
title: 'Example: My next lab'
date: '2026-11-15T20:00:00+01:00'
draft: true
category: 'Labs'
status: 'Draft'
cover: 'images/unity.svg'
description: 'What this lab covers.'
---
```

Document objectives, approach, technical details, screenshots, actual results, challenges and reflections. Set `draft: false` to publish the post.

## Local development

Install [Hugo Extended](https://gohugo.io/installation/) and run:

```bash
hugo server -D
```

## Deployment

Push commits to `main`. GitHub Actions automatically builds and deploys the Hugo site when GitHub Pages is enabled and configured to use GitHub Actions.

Website: https://ailiasyed.github.io/iarvr-spatial-notes/

**Editorial rule:** Distinguish experiences and ideas from actual implementations and measured results. Do not claim incomplete exercises or unverified performance comparisons as facts.
