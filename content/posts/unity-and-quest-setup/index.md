---
title: 'Lab 01: From an Empty Unity Scene to XR and Agentic Coding'
date: '2026-11-15T23:00:00+01:00'
lastmod: '2026-11-16T01:00:00+01:00'
draft: false
category: 'Labs'
status: 'XR tracking tested · MCP installed · coding-agent practice next'
cover: 'images/unity.svg'
description: 'My first Unity scene, Quest 3S tracking, an unexpected NVIDIA/Meta Link issue, and how ChatGPT helped me shape my parkour ideas.'
imagecaption: 'Illustration of the Unity development environment, not a screenshot.'
---

> **Screenshot tip:** Click any screenshot to open the image viewer, then zoom in or use **Original ↗** to inspect its full resolution. The screenshots below are individual captures from my Unity setup, not reduced multi-image collages.

## Part I — My first steps with Unity

### Installation and first impressions

I started by downloading [Unity](https://unity.com/download) and installing **Unity 6.3 LTS** through Unity Hub. I also installed **Visual Studio Code** as my editor for future C# scripts. For Quest development, I included **Android Build Support**, **OpenJDK**, and the **Android SDK & NDK tools**. They will allow me to build Android applications that can run directly on the headset.

I use Unity version `6000.3.28f1`.

After creating a project with the **3D Built-In Render Pipeline** template, I was greeted by an almost empty editor window. There was a lot to take in: the Scene view, Hierarchy, Inspector and Project panel were all new interfaces to understand at once.

To get oriented, I followed the beginning of the tutorial [*How To Make a VR Game in 2 Hours – Complete Beginner Tutorial Unity 6*](https://www.youtube.com/watch?v=H8dWVlZKQu4). It was particularly useful because it introduced Unity through a VR-focused example. I followed roughly the first **23 minutes**, not the entire two-hour tutorial.

### Creating my first scene

I created a new scene called **Main VR Scene** and added a **Plane** at `(0, 0, 0)` as a simple ground surface. Next, I created a material in the Assets folder and dragged it onto the Plane. I chose green to suggest grass without needing any textures or detailed scenery.

![Unity 6.3 LTS: the untouched default scene with Main Camera and Directional Light](/iarvr-spatial-notes/images/lab01/initial-scene.webp)

*Figure 1: My first Unity project, before adding any objects.*

![The green Plane and its Ground Material in the Inspector](/iarvr-spatial-notes/images/lab01/green-plane.webp)

*Figure 2: The Plane after I applied a green material. Both screenshots are provided individually so the editor text can be inspected in detail.*

This was a simple step, but it helped me understand the relationship between **GameObjects, their Transform components, project assets, and materials**. I could now see my first own object in the Scene view instead of an empty grid.

### Connecting my Quest 3S through Meta Horizon Link

My next goal was to see the Unity scene inside my headset. I installed **Meta Horizon Link** on the PC and added my **Meta Quest 3S** under its Devices section. Since the PC and headset were connected to the same network, I chose the Wi-Fi-based Link option rather than a USB cable.

The familiar PC VR environment reminded me of my earlier Oculus Rift S experiences — but unfortunately also brought back an old kind of frustration.

![Connecting the Quest 3S through Meta Horizon Link](/iarvr-spatial-notes/images/lab01/link-connection.webp)

*Figure 3: Meta Horizon Link recognizes my Quest 3S and Touch controllers.*

### An unexpected graphics-driver problem

During the first wireless Link sessions, the image in the headset sometimes froze or appeared heavily distorted. I even noticed it when trying *Beat Saber*. Meta Horizon Link then displayed a warning about a **known issue involving an NVIDIA graphics driver**, advising a return to driver **591.86 or earlier**.

![Meta Horizon Link's NVIDIA driver compatibility warning](/iarvr-spatial-notes/images/lab01/driver-warning.webp)

*Figure 4: The driver warning in Meta Horizon Link. The text recommends driver version 591.86 or earlier.*

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

![Unity XR Plug-in Management before installation](/iarvr-spatial-notes/images/lab01/xr-plugin-install.webp)

*Figure 5: Installing XR Plug-in Management from Project Settings.*

![OpenXR enabled for the desktop build target](/iarvr-spatial-notes/images/lab01/openxr-desktop.webp)

*Figure 6: The desktop OpenXR provider in Unity Project Settings.*

![Meta Quest Support enabled in Android OpenXR features](/iarvr-spatial-notes/images/lab01/openxr-android.webp)

*Figure 7: The Android OpenXR configuration, including Meta Quest Support.*

After that, I could see the Unity scene in the headset — but the viewpoint initially stayed fixed when I moved my head. Adding a **Tracked Pose Driver (Input System)** component to the camera and configuring its tracking inputs fixed the issue in my test: the camera now responded to my physical headset movements.

![The Main Camera in Unity with its Tracked Pose Driver configuration](/iarvr-spatial-notes/images/lab01/camera-tracking.webp)

*Figure 8: Inspecting the camera's tracking components when headset motion did not initially affect the view.*

### XR Interaction Toolkit and controller tracking

The next step was installing the **XR Interaction Toolkit**, version **3.3.2**, from **Window → Package Manager → Unity Registry**. I imported its **Starter Assets** sample, which contains useful prefabs and input actions for XR development.

![XR Interaction Toolkit 3.3.2 samples and Starter Assets](/iarvr-spatial-notes/images/lab01/toolkit-samples.webp)

*Figure 9: The XR Interaction Toolkit samples in Unity Package Manager.*

I added an **XR Origin (VR)** to the scene and used it as the new player rig, with the **Tracking Origin Mode** set to **Floor**. This allows the headset's tracked height to be represented relative to the floor. As part of the rig setup, I used a Camera Offset object and child objects for the left and right hands.

![XR Origin settings for the VR Player](/iarvr-spatial-notes/images/lab01/xr-origin.webp)

*Figure 10: The VR Player's XR Origin, configured to use Floor tracking.*

For each hand, I added a **Tracked Pose Driver (Input System)** and connected its **Position**, **Rotation**, and **Tracking State** inputs to the corresponding actions in the Starter Assets:

| Left hand | Right hand |
| --- | --- |
| `XRI Left/Position` | `XRI Right/Position` |
| `XRI Left/Rotation` | `XRI Right/Rotation` |
| `XRI Left/Tracking State` | `XRI Right/Tracking State` |

The left and right tracking references were assigned separately to the matching input actions.

![Unity Tracked Pose Driver setup for the left hand](/iarvr-spatial-notes/images/lab01/controller-actions.webp)

*Figure 11: Mapping the left hand to the corresponding XRI Position, Rotation and Tracking State actions.*

Finally, I placed the supplied controller prefabs under the respective hand objects. Their **Controller Animator** components can animate controller elements from the configured input actions.

![Controller prefab and Controller Animator settings in Unity](/iarvr-spatial-notes/images/lab01/controller-prefab.webp)

*Figure 12: The controller prefab and animator input assignments.*

![Both controller models assigned to the XR Player hierarchy](/iarvr-spatial-notes/images/lab01/final-scene.webp)

*Figure 13: My completed first VR rig, with both controllers under their respective hand objects.*

**My first successful test:** When I entered Play Mode and looked through the Quest 3S, I could see my green ground and both virtual controllers. My head movements were also reflected in the view. For a first Unity VR experiment, that felt like a real milestone.

### A small tracking mistake: Poke Position versus Position

Later, while preparing a separate VR scene for the **Reverse Classroom spectator-camera tutorial**, I encountered a confusing issue: **the left controller model remained near the floor** instead of following my left hand, while the right controller behaved normally.

I inspected the **Tracked Pose Driver (Input System)** on `Left Hand`. Its tracking mode and update type looked correct, but I had accidentally chosen **`XRI Left/Poke Position`** for the *Position Input* instead of the intended **`XRI Left/Position`**.

![Unity Input Action Reference selector listing several similar XRI Left position actions](/iarvr-spatial-notes/images/lab01/tracking-input-mistake.png)

*Figure: When filtering for "xri left/p", several entries look similar. The correct controller tracking reference in my rig is **XRI Left/Position**, not **XRI Left/Poke Position**.*

It was a **simple configuration oversight**, but it made the issue look like a much larger XR tracking problem. Once I identified the wrong action and selected the intended pose input, there was no reason to reinstall the XR packages. This reminded me to compare action references carefully—especially when several options have almost identical names.

I also used ChatGPT to narrow down the investigation: rather than changing multiple settings at once, I compared the left and right input assignments and traced the problem to one field. This is an example of **AI-assisted debugging advice**, not a claim that a coding agent automatically diagnosed or fixed the Unity scene.

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
| Unity MCP integration | MCP for Unity 10.3.0 installed; the setup wizard detected Codex as a client; a successful live agent-to-editor tool session has not yet been documented |

I have **not yet implemented my parkour techniques with Codex**. This entry records the design phase; actual agent-written code, model identifiers, exact prompts, diffs, test logs and timing measurements will be covered when I start hands-on work in the next lab.

### Installing MCP for Unity

To prepare for real agentic coding, I decided to connect Codex more closely to the running Unity editor rather than relying solely on exchanging code snippets and screenshots in chat.

I opened **Unity → Window → Package Manager → Add package from git URL** and installed [MCP for Unity](https://github.com/CoplayDev/unity-mcp) by Coplay:

```text
https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main
```

![Installing MCP for Unity through the Git URL in Unity Package Manager](/iarvr-spatial-notes/images/lab01/mcp-package-install.png)

*Figure: Installing the Unity MCP integration with the Git URL in Package Manager.*

After installation, **MCP for Unity version 10.3.0** appeared in the project's package list.

![Package Manager showing MCP for Unity 10.3.0 installed](/iarvr-spatial-notes/images/lab01/mcp-package-installed.png)

*Figure: MCP for Unity 10.3.0 listed as an installed Git package.*

The setup wizard checked the required local tools. In my environment it detected **Python 3.14.2**, **uv 0.11.8** and **Git 2.54.0.windows.1**, and reported that all requirements were met.

![MCP Setup wizard showing Python, uv and Git available](/iarvr-spatial-notes/images/lab01/mcp-system-requirements.png)

*Figure: The setup wizard verifies the local dependencies before configuring a client.*

The next screen detected **CodeBuddy CLI**, **Codex** and **VS Code GitHub Copilot** as possible clients. I selected Codex for the configuration step.

![MCP Setup showing Codex and other detected clients](/iarvr-spatial-notes/images/lab01/mcp-client-selection.png)

*Figure: Codex is among the MCP clients detected by the setup wizard.*

**What this confirms:** The MCP package was installed in Unity and the wizard found the necessary tools and Codex client. These screenshots alone do **not** demonstrate that Codex has already called Unity tools successfully or edited and tested a Unity scene. Verifying that end-to-end connection, documenting the exact model and agent permissions, and recording a concrete code change will be part of the next practical exercise.

### Why the MCP setup matters

A normal chat can help me reason about a problem, but a properly connected coding agent can potentially inspect the project structure, scene components and diagnostic output directly, subject to the tools and permissions available. I want to use that capability carefully: **plan first, inspect the proposed changes, test inside Unity, and keep a record of what the agent did versus what I verified myself**.

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
