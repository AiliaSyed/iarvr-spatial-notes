---
title: 'Lab 02: Preparing the Parkour Challenge'
date: '2026-11-03T10:00:00+01:00'
draft: false
category: 'Labs'
status: 'Assignment & early ideas'
cover: 'images/parkour.svg'
description: 'The assigned parkour scene, its locomotion and interaction requirements, and early design directions before implementation.'
---

## The assignment

The course provides a VR parkour environment with a route, coins, banners and object-interaction stations. According to the course discussion, this challenge is also the **final project**: implement a locomotion technique **and** an object interaction technique in the provided Unity scene.

The course scene is available in the [VR Locomotion Parkour repository](https://github.com/teamdarmstadt/VR-locomotion-parkour).

## My first design directions

For locomotion I am considering a **virtual e-scooter**: take hold of the handlebars, accelerate and steer through the course without moving around physically.

For object interactions I am exploring **spell-activated telekinesis**. A short path-tracing gesture would enable remote manipulation: the right hand for rotation and the left for lateral movement. The required controls for height and depth will be decided after reviewing the tasks in Unity.

## What needs to be investigated

- How does the existing parkour scene implement movement and object tasks?
- Can the scooter provide adequate control on curves while remaining comfortable?
- Can the telekinesis controls satisfy all station tasks?
- How should the user switch between riding and object interaction?

## Implementation record

*Not completed yet. I will document scene inspection, scripts, actual tests, screenshots, problems and evaluation once I start working on the parkour.*

The course also asks us to report travel time and collected coins; those measurements can help evaluate the chosen locomotion technique.
