# TDD Intro: Facilitator Guide

This guide describes how to conduct an introductory TDD workshop.

Table of contents:

1. About the Workshop
2. Learning Goals
3. Resources
4. Preparing for the Workshop
5. Conducting the Workshop


## About the Workshop

This repository and its [associated video series](https://www.letscodejavascript.com/v3/episodes/tdd_intro) are designed to allow you to facilitate an introductory workshop on test-driven development (TDD) for programmers. The workshop is three hours long, but can easily be extended to a full day. You don't need to be a programmer or TDD expert yourself.

The workshop consists of four videos and associated exercises. The first three videos provide context and explain how TDD works; the final video provides an extended example of TDD in action.

1. [Start Here](https://www.letscodejavascript.com/v3/comments/tdd_intro/2) (4m 08s)
2. [Test Infrastructure](https://www.letscodejavascript.com/v3/comments/tdd_intro/3) (10m 54s)
3. [The Core TDD Cycle](https://www.letscodejavascript.com/v3/comments/tdd_intro/4) (8m 46s)
4. [TDD in Practice](https://www.letscodejavascript.com/v3/comments/tdd_intro/5) (43m 57s)

The workshop can also be conducted as an individual self-study exercise. The opening video for the self-study variant [is here](https://www.letscodejavascript.com/v3/comments/tdd_intro/1).

If you would like to bring me (James Shore) on-site to conduct TDD training or other technical coaching with your teams, [contact me](https://www.jamesshore.com/Consulting/Contact.html).


## Learning Goals

By the end of the workshop, participants will be able to:

1. Explain the core TDD red-green-refactor loop.
2. Use tests to drive the design of the example application.
3. Take small, predictable steps as they work on the example application.


## Resources

In addition to this facilitator guide, the following materials are available:

* Source code repository: [github.com/jamesshore/tdd-intro](https://github.com/jamesshore/tdd-intro/)
* Video series: [letscodejavascript.com/v3/episodes/tdd_intro](https://www.letscodejavascript.com/v3/episodes/tdd_intro)
* Pre-workshop email template: [prep-email.md](https://github.com/jamesshore/tdd-intro/blob/facilitator/facilitator/prep-email.md)
* Slides from Agile 2019 session: [tdd-intro-slides.pdf](https://github.com/jamesshore/tdd-intro/blob/facilitator/facilitator/tdd-intro-slides.pdf)


## Preparing for the Workshop

The workshop can be scheduled for a half day (three hours) or a full day. First, watch all the videos and familiarize yourself with this facilitator guide. Prior to the workshop, prepare the venue and ensure participants' computers are ready.

If you don't have a programming background yourself, consider partnering with a senior developer or tech lead in your company. This is optional, but helpful.

### Prepare the Venue

1. Decide whether participants will work individually, pair program, or mob program, and arrange the seating accordingly.
2. Ensure the screen is large enough for everyone to see the example code clearly.
3. Convey a professional mood by tidying the space and neatly setting out materials.
4. For maximum impact, especially when conducting a full-day workshop, provide food and drink and use an off-site venue.

### Ensure Computers Are Ready

The workshop requires everyone to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed, as well as a copy of the source code repository.

Use [this email template](https://github.com/jamesshore/tdd-intro/blob/facilitator/facilitator/prep-email.md) to tell participants how to set up their computers.

Be sure to double-check prior to the workshop as people often forget to finish setting up their computers in advance.


## Conducting the Workshop

The workshop is split into two parts:

1. Understanding TDD (45 min)
	1. First three videos (25 min)
	2. Two exercises (10-15 min)

2. Practicing TDD (2 hr 15 min+)
	1. Final video (45 min)
	2. Several coding exercises (90+ min)

Total time: 3+ hours

### Part I: Understanding TDD

In the first part of the workshop, you'll play the first three videos, which will provide an overview of TDD. At the end of each video (except the first one), the video will prompt viewers to think about an issue. You'll facilitate an exercise about that prompt.

1. Video: Start Here (4 min) (optional)
2. Video: Test Infrastructure (11 min)
3. Exercise: Think about your current infrastructure (5-10 min)
4. Video: The Core TDD Cycle (9 min)
5. Exercise: Reflect on the TDD cycle (5-10 min)

Part I time: 45 min

### Part II: Practicing TDD

In the second part of the workshop, participants will follow along with the final video in an extended coding exercise. At various points, the video will prompt participants to think about an issue or do some coding. You'll facilitate discussions about the prompts. During the coding sections, you'll keep an eye out for common mistakes.

1. Follow along with video: Introduce the problem.
2. Exercise @2m18s: How can we break down the problem?
3. Follow along with video: Break down the problem into "parse" and "score."
4. Follow along with video: Break down "parse" into "parse many cards" and "parse one card."
5. Follow along with video: Break down "parse one card" into "parse rank" and "parse suit."
6. Follow along with video: Break down "parse rank" into "create 'parse' file."
7. Follow along with video: Create tests, 'parse' file, and 'card' file.
8. Follow along with video: Solve "parse rank" problem.
9. Exercise @18m40s: How can we refactor the code?
10. Optional exercise @22m20s: How can we refactor?
11. Exercise @24m34s: What should we do next?
12. Exercise @24m44s: Code next step, "parse suit," yourself.
13. Follow along with video: Solve "parse suit" problem.
13. Follow along with video: Options for writing good tests look like.
14. Exercise @40m42: What do you think is the best way to write tests?
15. Final exercise: Continue coding on your own.

Part II time: 2 hr 15 min+

### Common TDD Pitfalls

As participants conduct the coding exercises, keep an eye out for these common mistakes:

1. Observe: Spending too long on the "red" step.
	* The typical mistake: Taking big steps instead of small steps
	* How to facilitate: Ask, "How could you break this problem down smaller?"

2. Observe: Spending too long on the "green" step.
	* The typical mistake: Seeking perfection rather than waiting to refactor
	* How to facilitate: Ask, "Could you solve in this problem in a simple, dumb way, then refactor?"

3. Observe: Not running tests very often.
	* The typical mistake: Tests that are too big, or writing multiple tests at once
	* How to facilitate: Ask, "How could you build this test up incrementally?"

### After the Videos End

After the final video ends, participants are prompted to continue coding on their own. However, it's okay if they don't finish. The problem is large enough that they probably won't be able to finish it during the workshop, even the full-day version.

Although there's many valid paths to completion, this is the most straightforward way to continue the exercise after the video ends:

1. Solve the "parse all cards" problem.
2. Break down the "score" half of the program into multiple pieces.
3. Solve each piece of "score" (in any order):
	1. Score pairs of cards
	2. Score straights
	3. Score flushes
	4. Score Jacks ("nobs")
	5. Score 15s
	6. Score multiple combinations
4. Connect it all together.


## Issues or Questions?

If you have any trouble, please [open an issue](https://github.com/jamesshore/tdd-intro/issues) on the Github repository.

