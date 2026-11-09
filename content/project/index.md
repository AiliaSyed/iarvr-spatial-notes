---
title: 'Dual-Path Spellcasting'
date: '2026-11-09T10:00:00+01:00'
category: 'Final Project'
description: 'A VR interaction research prototype turning quick-time events into timed, bimanual path tracing in three-dimensional space.'
cover: 'images/spellcasting-hero.svg'
imagecaption: 'Concept art of the planned interaction, not a screenshot of working software.'
---

## Research idea

Inspired by *osu!*, *Beat Saber*, quick-time events and the spell gestures in *Hogwarts Mystery*, this project examines whether **timed two-handed path tracing** can create engaging, usable VR interaction.

## How it works

The player selects one of four spells with the Quest controller face buttons. Two glowing, spatially positioned paths appear in front of the player. Holding the index-finger triggers activates tracing; Grip presses at designated checkpoints validate milestones while the paths are followed.

- Both hands can progress independently, without enforced synchronization.
- The paths can move through **depth**, not just up, down, left and right.
- A shared countdown imposes time pressure.
- A mistake resets the entire spell.

## Planned gameplay

The player remains in a small VR arena. Simple enemies approach from different directions. Successfully completing a spell allows the player to attack; an enemy reaching the player costs one life. The session ends after three lost lives.

## Implementation roadmap

1. **Input & XR setup:** Test controller Trigger, Grip and tracking.
2. **Single path:** Implement continuous progress, tolerances and visual feedback.
3. **Two hands:** Independent path validation with one shared timer.
4. **Spells & effects:** Configure four patterns and simple visual outcomes.
5. **Enemies & game loop:** Add basic enemies, health and game-over logic.
6. **Evaluation:** Measure completion times, errors, retries and subjective workload.

## Early visualization

![Concept illustration of the VR path-tracing interaction](/iarvr-spatial-notes/images/spellcasting-hero.svg)

*Illustrative concept artwork created before implementation. The final 3D paths will extend in depth.*

## Evaluation direction

A potential question is how different degrees of path complexity affect performance, accuracy and perceived effort. The final experimental design will be defined after the interaction works reliably.

## AI-assisted development

ChatGPT Codex may help write and explain C# scripts, diagnose errors and produce simple textures or visual assets. Design decisions, code understanding, testing and evaluation remain my responsibility.
