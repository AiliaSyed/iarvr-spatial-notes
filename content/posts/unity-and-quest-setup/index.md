---
title: 'Lab 01: From an Empty Unity Scene to XR and Agentic Coding'
date: '2026-11-15T23:00:00+01:00'
draft: false
category: 'Labs'
status: 'XR setup tested · coding-agent work next'
cover: 'images/unity.svg'
description: 'My first Unity scene, Quest 3S tracking, an unexpected NVIDIA/Meta Link issue, and how ChatGPT helped me shape my parkour ideas.'
imagecaption: 'Illustration of the Unity development environment, not a screenshot.'
---

## Part I — My first steps with Unity

### Installation and first impressions

I started by downloading [Unity](https://unity.com/download) and installing **Unity 6.3 LTS** through Unity Hub. I also installed **Visual Studio Code** as my editor for future C# scripts. For Quest development, I included **Android Build Support**, **OpenJDK**, and the **Android SDK & NDK tools**. They will allow me to build Android applications that can run directly on the headset.

My notes initially recorded Unity version `6000.3.26f1`. Interestingly, one early Unity title-bar screenshot displays `6000.3.28f1`. I still need to double-check which editor version I ultimately used; I do not want the documentation to imply greater precision than my notes support.

After creating a project with the **3D Built-In Render Pipeline** template, I was greeted by an almost empty editor window. There was a lot to take in: the Scene view, Hierarchy, Inspector and Project panel were all new interfaces to understand at once.

To get oriented, I followed the beginning of the tutorial [*How To Make a VR Game in 2 Hours – Complete Beginner Tutorial Unity 6*](https://www.youtube.com/watch?v=H8dWVlZKQu4). It was particularly useful because it introduced Unity through a VR-focused example. I followed roughly the first **23 minutes**, not the entire two-hour tutorial.

### Creating my first scene

I created a new scene called **Main VR Scene** and added a **Plane** at `(0, 0, 0)` as a simple ground surface. Next, I created a material in the Assets folder and dragged it onto the Plane. I chose green to suggest grass without needing any textures or detailed scenery.

![My initial Unity scene and first green plane](/iarvr-spatial-notes/images/lab01-scene.jpg)

*Figure 1: My empty Unity project and the green Plane with its new material.*

This was a simple step, but it helped me understand the relationship between **GameObjects, their Transform components, project assets, and materials**. I could now see my first own object in the Scene view instead of an empty grid.

### Connecting my Quest 3S through Meta Horizon Link

My next goal was to see the Unity scene inside my headset. I installed **Meta Horizon Link** on the PC and added my **Meta Quest 3S** under its Devices section. Since the PC and headset were connected to the same network, I chose the Wi-Fi-based Link option rather than a USB cable.

The familiar PC VR environment reminded me of my earlier Oculus Rift S experiences — but unfortunately also brought back an old kind of frustration.

### An unexpected graphics-driver problem

During the first wireless Link sessions, the image in the headset sometimes froze or appeared heavily distorted. I even noticed it when trying *Beat Saber*. Meta Horizon Link then displayed a warning about a **known issue involving an NVIDIA graphics driver**, advising a return to driver **591.86 or earlier**.

![Meta Horizon Link setup and NVIDIA driver warning](/iarvr-spatial-notes/images/lab01-link-warning.jpg)

*Figure 2: Connecting the Quest 3S to Horizon Link and encountering the driver compatibility warning.*

Following the [Meta troubleshooting page](https://www.meta.com/de-de/help/quest/294035639100350/), I opened the [linked NVIDIA driver download](https://www.nvidia.com/en-us/drivers/details/259272/) and installed an older recommended driver version. Afterwards, I retried the connection: the warning did not reappear in that session, the distorted image was gone, and I could play a Beat Saber level without the previous freezing.

This is an observation from one before-and-after test, **not** proof that every earlier Rift S issue had exactly the same cause or that all Link stability problems are resolved.

{{% personal-note %}}
This part is a personal reflection on the experience, **not an essential setup step or a verified explanation of Meta's intentions**. You can skip it if you are only interested in the technical setup.

I was surprised to encounter another PC VR-related problem after switching to a newer headset. My Rift S had also suffered from freezes and crashes in the past, and I had assumed that age or hardware limitations were the main reasons.

Seeing a driver warning this time made me reconsider that assumption. I wondered why I had to downgrade a graphics driver to get a reliable connection and whether PC VR receives enough attention in a world increasingly focused on standalone headsets. I even briefly wondered whether companies might have an incentive to encourage standalone usage. **That is speculation, not something I have evidence for.** The warning also does not establish that my Rift S problems from previous months were caused by this particular bug.

What matters most to me as a user and as an aspiring XR developer is that a stable connection should not require this much troubleshooting. I hope the compatibility issue gets resolved so that I can iterate in Unity without repeatedly installing APK files just to test minor changes.
{{% /personal-note %}}

### Preparing Unity for XR

With Link working more reliably, I continued setting up Unity. I enabled the option in the PC VR software to allow applications from **unknown sources**, so that I could test development content outside the official store.

At first, pressing Play in Unity did not produce the expected headset experience. In **Project Settings → XR Plug-in Management**, I installed the XR Plug-in Management package and enabled **OpenXR** for both the **desktop (PC)** and **Android** build targets.

I then checked the relevant controller **Interaction Profiles** in the OpenXR settings. For Android, I also enabled the **Meta Quest Support** feature group. Some of these settings showed validation warnings in the Inspector, so the final configuration should still be rechecked before shipping a Quest build.

![OpenXR configured for PC and Quest](/iarvr-spatial-notes/images/lab01-openxr.jpg)

*Figure 3: OpenXR plug-in configuration and the Android Meta Quest Support setting.*

After that, I could see the Unity scene in the headset — but the viewpoint initially stayed fixed when I moved my head. Adding a **Tracked Pose Driver (Input System)** component to the camera and configuring its tracking inputs fixed the issue in my test: the camera now responded to my physical headset movements.

### XR Interaction Toolkit and controller tracking

The next step was installing the **XR Interaction Toolkit**, version **3.3.2**, from **Window → Package Manager → Unity Registry**. I imported its **Starter Assets** sample, which contains useful prefabs and input actions for XR development.

I added an **XR Origin (VR)** to the scene and used it as the new player rig, with the **Tracking Origin Mode** set to **Floor**. This allows the headset's tracked height to be represented relative to the floor. As part of the rig setup, I used a Camera Offset object and child objects for the left and right hands.

For each hand, I added a **Tracked Pose Driver (Input System)** and connected its **Position**, **Rotation**, and **Tracking State** inputs to the corresponding actions in the Starter Assets:

| Left hand | Right hand |
| --- | --- |
| `XRI Left/Position` | `XRI Right/Position` |
| `XRI Left/Rotation` | `XRI Right/Rotation` |
| `XRI Left/Tracking State` | `XRI Right/Tracking State` |

Finally, I placed the supplied controller prefabs under the respective hand objects. Their **Controller Animator** components can animate controller elements from the configured input actions.

![XR Origin and controller prefabs](/iarvr-spatial-notes/images/lab01-controllers.jpg)

*Figure 4: The XR Origin rig and the imported controller prefabs used for tracking.*

**My first successful test:** When I entered Play Mode and looked through the Quest 3S, I could see my green ground and both virtual controllers. My head movements were also reflected in the view. For a first Unity VR experiment, that felt like a real milestone.

One follow-up for my next session: in some editor screenshots the original scene camera and the camera inside the XR rig are both listed. I will check that only the intended camera and Audio Listener remain active, rather than assuming the rig is already configured perfectly.

> **Scope of the test:** This confirms the basic setup I observed through Meta Horizon Link and Unity Play Mode. I have not yet documented a standalone Android APK build or a complete interaction mechanic.

## Part II — Beginning with agentic coding

### What I actually set up

The second half of Lab 01 introduces **agentic coding**. Instead of only asking a chatbot to explain C# syntax, the aim is eventually to let a coding agent inspect a project, suggest plans, make controlled edits, run checks and iterate — while I review the work.

For now, I use **ChatGPT's desktop application and Codex**. I connected ChatGPT to a **local Unity project folder** so that we could look at the provided parkour project together. I also use this conversation for explaining ideas and questioning design decisions.

My tool setup at the time of writing:

| Component | My current use |
| --- | --- |
| Unity 6.3 LTS | Game editor, scenes, XR configuration and testing |
| Meta Quest 3S + Horizon Link | Headset testing via PC VR |
| Visual Studio Code | Intended editor for C# scripts |
| ChatGPT desktop + Codex | Connected to the local project folder; so far used primarily for exploration and planning |
| GitHub / Spatial Notes | Versioned documentation through Hugo and GitHub Pages |
| MCP, agent skills and project instruction files | Specific servers, skills and rules still to be documented when I configure the coding workflow |

I have **not yet implemented my parkour techniques with Codex**. This entry records the design phase; actual agent-written code, model identifiers, exact prompts, diffs, test logs and timing measurements will be covered when I start hands-on work in the next lab.

### From game inspiration to project ideas

I wanted an idea that connected with games and interactions I genuinely enjoy, while still taking VR comfort seriously. In our discussions, I considered different locomotion and interaction techniques, particularly the trade-off between immersion, physical movement and **motion sickness**. I wanted something memorable rather than simply copying conventional thumbstick movement.

My first locomotion idea came from an ordinary moment: **my brother asked me where the electric scooter charging cable was**. That suddenly made me think about how familiar scooter controls might work in VR.

I began sketching a **virtual e-scooter**: stand or sit in place, grab virtual handlebars, accelerate and steer along the parkour track. A familiar real-world control metaphor could be engaging, but it still needs careful testing for precision, comfort and cybersickness. I cannot assume that it will automatically prevent motion sickness.

For the interaction mechanic, I drew on my interest in *Beat Saber*, *osu!*, and **Quick Time Events**. I liked the idea of having to trace a physical gesture rather than press a single button. Watching *Doctor Strange* also made me think of spellcasting as a way to activate **telekinesis**.

We refined the idea together: at an object-interaction station, a short two-handed tracing gesture would activate telekinesis. Afterwards, the **right hand** could control object rotation while the **left hand** moves the object sideways. The player would need to coordinate both hands to place or orient objects correctly. Height, depth and exact task integration remain open design questions.

### How my thinking changed

I originally explored a separate **Dual-Path Spellcasting** game, complete with spells, time pressure and enemies. Later I learned that the actual final project is the provided **Parkour Challenge**, which requires a locomotion technique and an object-interaction technique. Rather than build an unrelated game, I adapted the relevant gesture mechanic into telekinetic object manipulation within the parkour.

This is an important lesson from the planning phase: **a creative idea still has to fit the real assignment and its constraints**. ChatGPT helped me explore possible designs, but I selected the direction, provided the personal inspirations, clarified the course requirements and made the final decisions.

### My prompting approach so far

I did not keep a precise record of every prompt or its duration during the early brainstorming. The following are **paraphrased examples of the questions I asked**, not verbatim transcripts:

- What kinds of VR locomotion and object-interaction techniques could work in the parkour without requiring the player to walk around physically?
- Could a virtual e-scooter offer a more interesting locomotion metaphor than standard joystick controls?
- How could an *osu!*-style path-tracing interaction activate an action through coordinated hand movements?
- Could a short spell gesture enable telekinetic object manipulation at the parkour stations?

The discussions were useful because they revealed open issues, such as mode switching between riding and object manipulation, selecting objects, controlling depth and preventing accidental inputs. These issues still require implementation and user testing.

### What I want to try next

For **Lab 02: Roll-a-Ball in VR**, I want to move beyond brainstorming and actually test an agentic workflow:

1. Define a small, testable feature and let Codex suggest a plan before making changes.
2. Give the agent narrowly scoped access to the relevant Unity files.
3. Review the generated C# code and scene changes rather than accepting them blindly.
4. Run the Unity project and inspect warnings, errors and controller behavior myself.
5. Record the exact prompts, tool configuration, model, elapsed time, unsuccessful attempts, code diffs and screenshots.
6. Make Git commits at useful milestones and document what I learned here.

The course introduces an iterative **Goal → Plan → Act → Check** workflow. It also asks us to record our setup, prompts (including unsuccessful ones), time spent, and screenshots or videos of actual results. These are the records I want to begin collecting consistently as soon as I start implementing with the agent.

The key requirement for myself is simple: **I want to understand the code I end up using**. Agentic tools should make experimentation faster, not replace my understanding of Unity or responsibility for the final results.

## Reflection

I started with an empty Unity scene and a lot of unfamiliar menus. By the end of this first session, I had a green test environment, a Quest 3S connected through Link, working head tracking, and visible controller models. The detour through a graphics-driver problem was frustrating, but it also reinforced how important reliability is for VR development.

The agentic-coding part was mainly a **design exercise so far**, not an implementation benchmark. Still, it helped me turn everyday inspiration, favorite games and movie scenes into two more concrete project concepts: **e-scooter locomotion** and **spell-activated telekinesis**.

My next goal is to test whether Codex can assist with a real, manageable Unity task in Roll-a-Ball — and to document not only what it produces, but what I understand and verify myself.

## Resources

- [Unity download](https://unity.com/download)
- [How To Make a VR Game in 2 Hours — beginner video](https://www.youtube.com/watch?v=H8dWVlZKQu4)
- [Meta Horizon Link troubleshooting](https://www.meta.com/de-de/help/quest/294035639100350/)
- [NVIDIA driver linked from the support instructions](https://www.nvidia.com/en-us/drivers/details/259272/)
- [Course parkour starter project](https://github.com/teamdarmstadt/VR-locomotion-parkour)
