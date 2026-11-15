---
title: 'Parkour Challenge: E-Scooter & Telekinesis'
date: '2026-11-15T20:00:00+01:00'
category: 'Final Project'
description: 'My planned IARVR final project: an e-scooter locomotion technique and spell-activated telekinetic object manipulation in the course parkour.'
cover: 'images/parkour-hero.svg'
imagecaption: 'Early concept illustration. No finished Unity implementation is shown.'
---

## The actual course project

After discussing the requirements with the course team, I learned that **Lab 02's Parkour Challenge is the final project**. It requires an original **locomotion technique** and an **object interaction technique** inside the provided Unity parkour scene. I no longer need to build the separate spellcasting survival game I originally pitched.

Rather than discarding the interesting part of that idea, I want to adapt its motion-based interaction to the course environment.

**Current status:** Planning and concept development. Lab 01 and the parkour implementation still need to be completed and documented.

## Locomotion — a virtual e-scooter

My idea is to travel through the course using a **virtual e-scooter**:

- Step onto a stationary virtual scooter.
- Hold the virtual handlebars with the controllers.
- Use a simple input to accelerate or brake.
- Steer by moving or turning the handlebars.
- Navigate curves, obstacles, banners and coin routes.

The player remains physically in a safe, stationary play area. The exact handling, speed limits and comfort measures need to be tested.

## Object interaction — spell-activated telekinesis

At the parkour's object interaction stations, I want to activate **telekinesis** by completing a short, two-handed path-tracing gesture. Triggers and selected Grip checkpoints provide the input.

Once activated, telekinesis allows me to manipulate the required objects at a distance:

- **Right hand:** Rotate the selected object.
- **Left hand:** Move the object sideways.
- **Both hands:** Coordinate positioning and rotation to solve a station task.

How to control height and depth, and how to map the controls to the actual station goals, is still open. That decision will be made after inspecting the existing parkour scene and its objects.

This is **one object interaction system** with a spell-like activation step, not a separate game with four spells, enemies or lives.

## Proposed interaction flow

1. Ride the scooter toward an object task.
2. Stop and release the handlebars to enter interaction mode.
3. Perform a brief path-tracing gesture to activate telekinesis.
4. Manipulate the object with both hands until the station goal is satisfied.
5. Return to the scooter and continue along the course.

## Development plan

1. **Lab 01:** Get familiar with Unity and Meta Quest 3S development.
2. **Inspect the provided parkour:** Identify object tasks, relevant scripts and navigation restrictions.
3. **Implement scooter locomotion:** Build simple handlebars, movement, turning and stop/start behavior.
4. **Implement object manipulation:** Test object selection, rotation and translation before adding gestures.
5. **Add spell activation:** Implement short 3D paths and reliable checkpoint detection.
6. **Integrate and test:** Run the full course, check usability and comfort, and record timings and observations.
7. **Document and reflect:** Explain design changes, code, experiments, problems and test outcomes.

## Why this direction interests me

My first VR experiences taught me how much comfort and reliable input can shape an otherwise enjoyable experience. Here I can experiment with both: a more physical way of navigating and a coordinated, two-handed way of manipulating objects.

The most important goal is not visual complexity. It is to design techniques that are understandable, controllable and practical to evaluate in the parkour.

## Credits and development approach

The parkour scene is provided by the course team: [VR Locomotion Parkour](https://github.com/teamdarmstadt/VR-locomotion-parkour).

I may use ChatGPT Codex for explanations, C# assistance and debugging. The design decisions, understanding of the implementation, practical testing and evaluation are my own responsibility.

*This page describes planned functionality. I will replace or extend it with implementation evidence as the project develops.*
