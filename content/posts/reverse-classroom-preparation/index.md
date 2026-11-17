---
title: 'Reverse Classroom: Building a VR Spectator Camera in Unity'
date: '2026-11-16T02:00:00+01:00'
lastmod: '2026-11-16T04:31:34+01:00'
draft: false
category: 'Reverse Classroom'
status: 'Implementation and presentation completed'
cover: 'images/spectator-camera-cover.svg'
imagecaption: 'Illustration of the two spectator views: a smoothed first-person view and an external third-person camera.'
description: 'From a shaky headset mirror to a smoothed first-person spectator view and an external third-person camera — implementation, code, videos, problems, and ideas for my Parkour Challenge.'
---

## 1. Tutorial — What I wanted to learn

For my IARVR **Reverse Classroom** assignment, I was **assigned** the topic [*How To Make a VR Spectator Camera – Unity VR Tutorial*](https://www.youtube.com/watch?v=4Z52P6jbSlE), by Valem. I followed the assigned tutorial in Unity and built both camera setups myself.

When someone plays a VR game, their headset view is tailored to them: the camera responds immediately to even tiny head movements. But people watching from a desktop monitor, a stream, or a recorded video have different needs. The normal mirrored VR view can look **jittery or uncomfortable to watch**, even when those tiny movements are not noticeable to the person wearing the headset. And a first-person view does not always show what the player's body or hands are doing.

The tutorial addresses these two challenges with complementary solutions:

| Camera technique | Idea | Spectator benefit |
| --- | --- | --- |
| **Smoothed first-person camera** | A separate desktop camera follows the XR headset camera with interpolation. | Less sudden visual movement while keeping the player's perspective. |
| **Third-person spectator camera** | An additional camera renders an external view into a Render Texture, displayed through a UI Raw Image. | The audience can see the player's representation and what happens around them. |

I approached the tutorial as a small experiment rather than simply following instructions: **What does each camera improve, how does the setup work, and when would I actually use it in my own project?**

## 2. My implementation path

### 2.1 Starting with a working XR scene

I created a fresh Unity project for the Reverse Classroom experiment, separate from my previous Lab 01 scene. I confirmed that **XR Plug-in Management**, **OpenXR**, and **XR Interaction Toolkit with Starter Assets** were available, then recreated the XR Origin and the left/right controller setup from Lab 01. I used my **Meta Quest 3S** with **Meta Horizon Link** for testing.

To make the player recognizable from the outside, I added a simple head representation under the XR camera: a **Sphere** for the head and a **Cube** to indicate its front. It is deliberately a placeholder, not a finished avatar. When viewed from the XR camera itself, these objects can obstruct the player's vision, so a more polished version would hide the head mesh from the headset camera while keeping it visible to spectator cameras.

![Unity scene with an XR Origin and a simple sphere-and-cube head representation](/iarvr-spatial-notes/images/reverse-classroom/01-vr-player-setup.png)

*Figure 1 — My simple VR player representation. I wanted something visible for an external spectator camera before building a detailed avatar.*

### 2.2 Observing the problem: jitter in the desktop view

Before adding a separate spectator camera, I recorded the ordinary mirrored VR output in Unity. Although I tried to keep my head still, I could see subtle, ongoing movement in the desktop view. This was distracting to me as a spectator and could become tiring in a tutorial, showcase, or Let's Play video.

Importantly, **I did not perceive the same problem inside the VR headset**. My observation was about the desktop recording, not evidence that the headset tracking itself was malfunctioning. I did not measure jitter numerically; the following clip is the visual baseline for my comparison.

**Video — The problem before smoothing:** The original mirrored headset view in Unity.

{{< spectator-video src="images/reverse-classroom/the-problem.mp4" poster="images/reverse-classroom/problem-poster.webp" label="Before / Original headset mirror" caption="The Problem.mp4 — the ordinary desktop mirror before adding any spectator-camera smoothing." >}}

*The video shows my initial observation in the Unity test scene; I did not measure the amount of jitter quantitatively.*

### 2.3 Creating the smoothed spectator camera

I created a new camera at the scene root and named it **Smooth Follow Camera**. It is deliberately separate from the XR Origin, because the headset should still use its own tracked **Main Camera**.

I configured the camera in the Inspector:

| Setting | My value | Why I used it |
| --- | --- | --- |
| Audio Listener | Removed | Avoid another active listener alongside the XR camera. |
| Target Eye | `None` | Keep the spectator camera out of the stereo headset output. |
| Rendering Priority | `1` | Give it priority in my URP desktop rendering setup. |
| Field of View | `75°` | Show a slightly wider audience view. |
| Near Clipping Plane | `0.15` | Allow closer geometry to appear before clipping. |
| Target Display | `Display 1` | Use the desktop display for the spectator feed. |

**One distinction I learned:** `Target Eye = None` concerns XR rendering, not the camera's field of view. The spectator camera has its own FOV because it is a separate Camera component with its own projection settings.

![Smooth Follow Camera in the Unity Inspector, including FOV, priority and output settings](/iarvr-spatial-notes/images/reverse-classroom/02-smoothed-camera-settings.png)

*Figure 2 — Settings for my separate Smooth Follow Camera in Unity 6.3 LTS (URP).* 

### 2.4 Writing the SmoothFollow C# script

The next step was to make the spectator camera follow the player's head without instantly copying every small movement. I added a C# component named `SmoothFollow` and edited the script in my code editor.

This is the implementation I used for the tutorial:

```csharp
using UnityEngine;

public class SmoothFollow : MonoBehaviour
{
    public Transform target;

    [Range(0, 1)]
    public float positionDamping;

    [Range(0, 1)]
    public float rotationDamping;

    void OnEnable()
    {
        transform.position = target.position;
        transform.rotation = target.rotation;
    }

    void Update()
    {
        transform.position = Vector3.Lerp(
            transform.position,
            target.position,
            positionDamping
        );

        transform.rotation = Quaternion.Lerp(
            transform.rotation,
            target.rotation,
            rotationDamping
        );
    }
}
```

![The SmoothFollow script open in the C# editor](/iarvr-spatial-notes/images/reverse-classroom/03-smoothfollow-script.png)

*Figure 3 — My `SmoothFollow.cs` implementation using `Vector3.Lerp` and `Quaternion.Lerp`.*

Here is how I understand its main parts:

- `target` is the **XR Main Camera Transform**, which supplies the desired position and orientation.
- `[Range(0, 1)]` exposes each damping value as a slider in the Unity Inspector, so I can adjust the behavior without editing code each time.
- `OnEnable()` places the spectator camera at the target when the component is enabled, avoiding a slow journey from some unrelated starting position.
- In `Update()`, the camera interpolates toward the target's current position and rotation on each frame.

**Understanding `Lerp`:** I initially found the tutorial's explanation about the camera slowing as it approaches the target confusing. The formula made it clearer:

`Lerp(A, B, t) = (1 − t) × A + t × B`

At a factor of `0.3`, the new result is **70% of the current value and 30% of the target**. When the target stays still, the gap gets smaller every frame; each subsequent step therefore becomes smaller. This produces a gradual, easing follow motion. The same general idea applies to rotation, using quaternion interpolation.

A value close to `0` follows slowly, while `1` copies the target immediately and therefore provides no smoothing. I assigned the XR Main Camera as the target and experimented with small damping values in the Inspector.

![Smooth Follow component with the Main Camera assigned as its target](/iarvr-spatial-notes/images/reverse-classroom/04-smoothfollow-inspector.png)

*Figure 4 — The target reference and damping sliders exposed in the Inspector.*

There are two technical limitations worth remembering for future projects. First, this tutorial version assumes `target` has already been assigned when `OnEnable()` runs; otherwise it can throw an error. Second, the simple `Lerp` call uses a **fixed factor per rendered frame**, so its responsiveness varies with frame rate. It is a good first implementation for learning, but a time-based smoothing formula would be preferable for consistent behavior across devices.

### 2.5 Testing the smoother view

I started the scene again through Meta Horizon Link and recorded the desktop spectator output. The motion appeared **noticeably steadier** than the original headset mirror, and the camera followed the view with a slight delay rather than reacting to every tiny motion at once.

**Video — The view after adding SmoothFollow.cs:** Compare the camera motion with the recording in section 2.2.

{{< spectator-video src="images/reverse-classroom/smooth-follow.mp4" poster="images/reverse-classroom/smooth-poster.webp" label="After / Smoothed spectator view" caption="SmoothFollowCamera.mp4 — the desktop spectator view after adding positional and rotational interpolation." >}}

*This is a visual before-and-after comparison, not a controlled quantitative measurement.*

For a controlled comparison in the future, I could use the same scripted movement and record quantitative image-motion measurements. For this lab, the before/after videos provide a **visual demonstration rather than a measured scientific result**.

### 2.6 Creating a third-person spectator camera

The second half of the tutorial adds an outside view, similar to watching a video-game character rather than seeing only through the player's eyes.

I created an empty root GameObject called **Third Person Spectator** and added a **Quad** beneath it. This quad serves as a virtual monitor on which I can show the camera's output. I positioned it in front of the player, and scaled it to approximately `X = 1.6` and `Y = 0.9`, maintaining a **16:9** proportion.

Next, I created a **Camera** underneath the quad and rotated it `180°` around the Y-axis so that its view faced the player's representation. I removed the Audio Listener and set `Target Eye = None`, because this is not supposed to become a second headset camera. I used a camera priority of `1` in my scene.

![The Third Person Spectator object and scene layout in Unity](/iarvr-spatial-notes/images/reverse-classroom/05-third-person-scene.png)

*Figure 5 — The Third Person Spectator setup, including the Quad and the external camera.*

![Third-person camera configuration in the Unity Inspector](/iarvr-spatial-notes/images/reverse-classroom/06-third-person-camera-settings.png)

*Figure 6 — The separate Camera object, oriented toward the player representation.*

### 2.7 Sending the camera output to a Render Texture

I created a **Render Texture** asset named `Third Person Camera RT` under the project's Assets folder and configured its resolution to **1920 × 1080**. I assigned the texture to the spectator camera's **Output Texture** field.

![Render Texture settings with the 1920x1080 resolution](/iarvr-spatial-notes/images/reverse-classroom/07-render-texture.png)

*Figure 7 — The Full HD Render Texture used for the spectator camera feed.*

![The spectator Camera referencing Third Person Camera RT as Output Texture](/iarvr-spatial-notes/images/reverse-classroom/08-camera-output.png)

*Figure 8 — The Camera renders into the Render Texture rather than directly into the default display.*

I then applied that Render Texture to the quad so that the quad displayed what the external camera was seeing. I switched its material to an **Unlit** shader, which prevents the appearance of the screen from being darkened or tinted by scene lights.

![The quad's material set to URP Unlit](/iarvr-spatial-notes/images/reverse-classroom/09-unlit-shader.png)

*Figure 9 — Using an Unlit material to display the texture consistently.*

At this stage I understood an important distinction: **rendering an image** and **displaying that image** are two different steps. Once a camera has an Output Texture assigned, its render output goes into that texture. In my setup, it no longer appeared as the normal Game View on its own.

### 2.8 Displaying the feed with Canvas and Raw Image

To display the Render Texture in the desktop output, I created a **Canvas** and then a **UI → Raw Image** element beneath the Third Person Spectator hierarchy. I assigned `Third Person Camera RT` to the Raw Image's **Texture** field and configured the UI rect to fill the area.

![Creating a Raw Image UI element under the spectator hierarchy](/iarvr-spatial-notes/images/reverse-classroom/10-raw-image.png)

*Figure 10 — Adding the Raw Image element to show the spectator feed in Unity's Game View.*

![Unity Game View with the third-person feed assigned to the Raw Image](/iarvr-spatial-notes/images/reverse-classroom/11-raw-image-result.png)

*Figure 11 — The spectator feed displayed in the Game View through a Raw Image.*

A possible complication is **camera feedback**: if the external camera renders the quad that already displays its own output, a screen-inside-a-screen effect may occur. A more refined project should place the quad outside the capture or exclude its layer from the spectator camera using the **Culling Mask**.

## 3. Demonstration — Comparing the three views

I recorded three short Unity sessions, with each recording placed next to the implementation step it demonstrates. The original mirrored headset output appears in **section 2.2**, and the smoothed first-person view in **section 2.5**. The videos are web-optimized, silent copies of my original recordings; I retained the full-size source clips separately.

### Third-person spectator view in action

This final video shows the external camera view and the simple representation of the VR player. I turn around to demonstrate how the scene can be observed from outside the player's first-person perspective.

{{< spectator-video src="images/reverse-classroom/third-person.mp4" poster="images/reverse-classroom/third-person-poster.webp" label="Third-person spectator camera" caption="ThirdPersonCam.mp4 — external view of the player representation in my Unity prototype." >}}

All three recordings come from my **small test scene**, not the final Parkour Challenge. The third-person camera is currently an external viewpoint; I have **not yet added an automatic follow/orbit controller** for a moving scooter player.

## 4. Experience — What went well, and what did not

The tutorial was generally manageable, especially after the XR setup experience I gained in Lab 01. The small test scene helped me focus on camera behavior instead of building a complex environment at the same time.

The main problems and design decisions I encountered were:

| Observation or challenge | What I did or learned |
| --- | --- |
| The default desktop mirror looks shaky even when I try to hold my head still. | Created a separate camera that follows the XR Main Camera using interpolation. |
| A second camera could interfere with the XR output or audio. | Kept the headset Main Camera separate, removed the spectator Audio Listener and configured Target Eye appropriately. |
| Smooth follow should be adjustable without editing code repeatedly. | Added Inspector sliders using `[Range(0, 1)]`. |
| Camera output was redirected to a Render Texture. | Used a Raw Image on a Canvas to show that feed in the Game View. |
| A textured quad can be influenced by lighting. | Switched the preview material to an Unlit shader. |
| Seeing a player from outside requires a visible representation. | Built a simple sphere-and-cube head as a first prototype. |

I also realized that *smoothness is a trade-off*: if the damping is too low, the spectator camera may lag behind fast movements; if it is too high, the smoothing effect becomes weak. I need to tune this based on the type of footage, not just choose a number that looks nice in the Inspector.

A limitation of the current proof of concept is that I did not perform an independent recording-quality benchmark, compare multiple frame rates, or create a free-moving third-person camera control. Those would be reasonable next experiments, but they are **not results I can claim from this tutorial session**.

## 5. Learnings — The most useful ideas

My main takeaways are:

1. **The VR player's camera and the audience's camera have different requirements.** Headset tracking should be responsive, while the spectator view may benefit from smoothing and a different composition.
2. **Lerp can create a simple smooth-follow effect.** Repeated interpolation makes the camera approach the tracked target gradually. It also introduces lag and can be frame-rate-dependent when used with a constant per-frame factor.
3. **Render Textures make a camera feed reusable.** A camera can write to a texture, which can then be displayed on a 3D surface or in a Raw Image UI element.
4. **An external viewpoint provides information the player cannot see directly.** For demonstrations, it makes controller movement, body orientation and nearby objects easier to explain.
5. **Small architecture decisions matter.** Separating XR and spectator cameras, avoiding duplicate Audio Listeners, and thinking about camera visibility layers makes the setup more reliable.

If I had to pick one main strength, it would be **the ability to choose a viewpoint for the audience without changing the player's VR experience**. That is a very practical idea for showing and explaining VR interaction techniques.

## 6. Usefulness — Applying this to my Parkour Challenge

My IARVR end project combines **e-scooter locomotion** with **spell-activated telekinetic object manipulation**. I can already see where each spectator technique would be useful:

| Parkour moment | Proposed spectator view | What it could show |
| --- | --- | --- |
| Riding the virtual e-scooter through curves | **Third person** | The player representation, steering direction, track, and nearby obstacles. |
| Drawing a gesture to activate telekinesis | **Smoothed first person** | The path or gesture from the player's perspective without excessive micro-movements. |
| Moving and rotating an object with both hands | **Either view, depending on the demonstration** | First person for precise input; third person for the spatial relationship between hands, object and target. |
| Preparing the final project presentation | **A mix of both** | Clearer recordings and a more understandable explanation to people who are not wearing the headset. |

The useful next step is to create a simple **spectator-mode switch** for demonstrations, and potentially add follow/orbit behavior to the third-person camera as the player drives around the parkour. These are ideas for the future, **not features I implemented as part of the tutorial**.

## Conclusion

I started with a shaky mirrored VR view and ended with two useful approaches for observing VR activity: a **smoothed first-person spectator camera** and a **third-person camera using a Render Texture**. Working through both gave me a much clearer understanding of Unity Cameras, XR tracking, interpolation, render targets and UI textures.

More importantly, I can now distinguish **what the player needs to see** from **what an audience needs to see**. I expect that distinction to be helpful when I record and present my end project.

## Presentation — Slide deck

I turned this implementation journal into a **13-slide English Reverse Classroom presentation**. The slides cover the assigned tutorial, my Unity implementation, demonstrations, problems and solutions, learnings, and how I might use the techniques in my Parkour end project.

The PowerPoint contains **presenter notes** and embedded demo videos on the relevant slides. The PDF below is a convenient browser-readable version; it shows still frames instead of playing the videos.

{{< spectator-slides pdf="files/reverse-classroom/VR_Spectator_Camera.pdf" pptx="files/reverse-classroom/VR_Spectator_Camera.pptx" >}}

## Resources

- [Valem — How To Make a VR Spectator Camera (YouTube)](https://www.youtube.com/watch?v=4Z52P6jbSlE)
- [Unity — XR Interaction Toolkit](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@3.3/manual/index.html)
- [Unity Scripting API — Vector3.Lerp](https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html)
- [Unity Scripting API — Camera.targetTexture](https://docs.unity3d.com/ScriptReference/Camera-targetTexture.html)

*All implementation screenshots and demo recordings in this article are from my own Unity test scene. The article is based on my work following the tutorial; unimplemented improvements are marked as future ideas.*
