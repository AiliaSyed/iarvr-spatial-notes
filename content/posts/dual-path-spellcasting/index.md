---
title: 'Dual-Path Spellcasting: Designing a Spatial QTE'
date: '2026-11-09T10:00:00+01:00'
draft: false
category: 'Final Project'
status: 'Concept / Pitch'
cover: 'images/spellcasting-hero.svg'
description: 'How rhythm games and quick-time events inspired a two-handed path-tracing interaction technique for VR.'
---

## The motivation

I enjoy the precision and timing of games such as *osu!* and *Beat Saber*, and the concept of Quick Time Events in video games. Tracing spells in the mobile game *Hogwarts Mystery* prompted a question: what would this interaction feel like in **three-dimensional VR**?

## The core interaction

The idea is to select one of four spells using the controller face buttons. Two 3D paths then appear in front of the player — one for each controller. The player holds both index triggers, traces the paths within a limited time, and presses Grip with the middle finger at designated checkpoints.

Both hands can progress independently. If a path is missed, a trigger is released early, or time runs out, the **entire spell must restart**.

![Dual-Path Spellcasting concept art](/iarvr-spatial-notes/images/spellcasting-hero.svg)

*Early concept artwork. This is not a screenshot of an implemented Unity build.*

## Planned demonstration

A stationary VR arena will serve as the test environment: simple enemies approach from different directions, and spells can defeat them. Reaching the player costs a life; after three lost lives, the game ends. The game is deliberately small — its role is to make the interaction testable.

## Questions to investigate

- How does path complexity affect completion times and error rates?
- How demanding is two-handed tracing under time pressure?
- What visual feedback makes checkpoints and mistakes easy to understand?

## Next steps

Set up the XR environment in Unity, validate Trigger and Grip input, and build a **single-hand path-tracing prototype** before adding independent dual-hand progression.
