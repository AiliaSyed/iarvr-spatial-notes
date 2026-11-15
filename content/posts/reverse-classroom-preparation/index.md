---
title: 'Reverse Classroom: Building a VR Spectator Camera'
date: '2026-11-16T00:50:00+01:00'
draft: false
category: 'Reverse Classroom'
status: 'Tutorial selected · Implementation pending'
cover: 'images/classroom.svg'
description: 'Preparing to reproduce and explain two spectator camera approaches in Unity: a smooth first-person spectator view and a controllable third-person camera.'
---

## The topic

For my IARVR Reverse Classroom session I selected the tutorial **[How To Make a VR Spectator Camera – Unity VR Tutorial](https://www.youtube.com/watch?v=4Z52P6jbSlE)** by Valem Tutorials (published 21 May 2023).

The aim is to understand a technique, implement it independently, demonstrate the result, and explain both the decisions and challenges along the way.

**Status:** This entry documents my preparation. I have not yet implemented or tested either camera technique.

## 1. Tutorial — What it teaches

According to the tutorial author's description, the tutorial covers two ideas:

- **Smooth first-person spectator camera:** The spectator view follows the VR player's perspective with smoothed movement, making desktop recordings easier to watch.
- **Controllable third-person spectator camera:** A separate external viewpoint can be controlled while the user is in VR.

These cameras are meant to provide views for **people watching or recording the VR experience**, not to replace the headset camera. The exact scripts and Unity setup still need to be verified while following the full video.

## 2. My path — Planned implementation

I already have a Unity 6.3 LTS project with OpenXR, XR Interaction Toolkit 3.3.2, a Quest 3S, and head/controller tracking running through Meta Horizon Link.

I plan to:

1. Duplicate my working Unity scene so the original XR setup remains unchanged.
2. Inspect the complete tutorial and identify its scripts, camera hierarchy and Unity version.
3. Add a separate camera for the spectator output while preserving the VR headset camera.
4. Implement and tune the smoothed follow behavior in a short movement test.
5. Implement the controllable third-person view described in the tutorial.
6. Compare the different spectator outputs and record a short demo.

The 2023 tutorial may use APIs or inspector settings different from Unity 6.3. I will document any adaptations instead of silently claiming the steps work unchanged.

## 3. Demonstration — Still to be recorded

My planned demo will show:

- The ordinary headset perspective compared with the smoothed spectator output.
- Slow and fast head movement to illustrate the smoothing difference.
- A controllable third-person camera showing the player or an interaction from outside.

I will embed a video or provide a downloadable recording once these features actually work. **No demo result exists yet.**

## 4. Experience — Work in progress

After implementing the tutorial, I will document which steps were straightforward, which caused problems, relevant Unity Console messages, the fixes I tried, and the outcome of each test. I will include my own screenshots and important code snippets.

## 5. Learnings — To complete after testing

I want to learn how multiple cameras can coexist in an XR project, how a spectator view can follow a tracked pose smoothly, and which trade-offs occur between responsive movement and visually stable recordings.

An important principle to test is that **camera smoothing should affect the audience view, not head tracking inside the headset**.

## 6. Usefulness for my final Parkour Challenge

For the final IARVR project, I plan to develop **e-scooter locomotion** and **spell-activated telekinetic object manipulation** in the provided parkour scene.

A spectator camera could make it much easier to document and demonstrate this work:

- A smooth first-person recording can show how the e-scooter responds to steering.
- A third-person view can make hand coordination and telekinetic object rotation more understandable to people watching the presentation.
- The same footage can serve as evidence in my Spatial Notes blog and later project evaluation.

These are **potential applications**, not features already implemented in the parkour.

## Presentation requirements

My presentation must cover: the tutorial, my implementation process, a live or video demonstration, problems and solutions, learnings, and concrete usefulness for current or future projects.

## References

- [Original tutorial — Valem, 2023](https://www.youtube.com/watch?v=4Z52P6jbSlE)
- [Unity — Spectating VR](https://unity.com/blog/games/spectating-vr)

*This is a living course journal. I will update this post with actual steps, screenshots, code, measurements and reflections after working through the tutorial.*
