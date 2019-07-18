# TDD Intro

This repository and its associated video series has everything you need to conduct an introductory workshop on test-driven development. It uses JavaScript and Node.js.

To learn more, check out the "facilitator" branch using `git checkout facilitator` and re-open this README file.

Alternatively, visit the project repository on github: [https://github.com/jamesshore/tdd-intro](https://github.com/jamesshore/tdd-intro)


## Prerequisites

You need the following programs to use this repository:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)


## Running the Program

The program is a simple scoring tool for the [Cribbage card game](http://www.cribbage.org/NewSite/rules/rule1.asp). It's run from the command-line, like this:

```sh
$ ./run.sh JH5D5S5C5H
29
```

On Windows, use `run` instead of `./run.sh`.

That command means "score a hand consisting of Jack of Hearts, 5 of Diamonds, 5 of Spades, and 5 of Clubs, with the 5 of Hearts as the starter card." (This happens to be the highest-scoring hand in Cribbage.) Each card is represented by a pair of characters.

1. The first character is the rank of the card, with '0' representing '10': A, 2, 3, 4, 5, 6, 7, 8, 9, 0, J, Q, K.
2. The second character is the suit of the card: H, S, D, C referring to Hearts, Spades, Diamonds, and Clubs respectively.

Depending on which branch of the repository you check out, the program be partially implemented as an exercise for you to complete. See [the facilitator branch](https://github.com/jamesshore/tdd-intro) for more details.

Here are all the commands that are available:

* `./run.sh` (`run` on Windows): Run the program.
* `./build.sh` (`build` on Windows): Run the build script, which will automatically lint the code and run its tests.
* `./watch.sh quick` (`watch quick` on Windows): Run the build script on files that have changed, and re-run it every time a file changes. On MacOS, it will also play a sound indicating build success or failure.
* `./clean.sh` (`clean` on Windows): Delete files created by the build.


## Writing the Program

For details about writing the program, see the [the facilitator branch](https://github.com/jamesshore/tdd-intro). Here are the main facts:

* The program is written in JavaScript and uses Node.js.
* The test framework is [Mocha](https://mochajs.org/).
* The assertion library is [Chai](https://www.chaijs.com/).
* Source code is in the `src/` folder. Command-line infrastructure, including the entry point to the program, is in `src/cli/`.
* The main module is `src/score.js`. The command-line infrastructure calls `analyze()` in that module. It provides `analyze()` with a string representing the first command-line parameter (or `undefined` if there wasn't one) and then prints whatever `analyze()` returns.
* Tests are run from the `src/` folder. They must start with an underscore and end with `_test`, like this: `src/_score_test.js`.
* Build infrastructure is in the `build/` folder. You can ignore it.


## Cribbage Scoring Rules

Cribbage scoring is based on a hand of four cards plus a "starter" card. The score is calculated by finding all combinations of cards that meet the following criteria:

* Pair of cards: 2 points
* Straight of three cards or more: 1 point per card
	* Aces are low, so A, 2, 3 is a valid straight, but Q, K, A is not.
* 4-card flush excluding starter card: 4 points
* 5-card flush including starter card: 5 points
* Jack in the hand whose suit matches the starter card's suit: 1 point
* Card values that add up to 15: 2 points
	* Aces' values are 1.
	* Jacks, Queens, and Kings' values are 10.
	* All other cards' values are equal to their numbers.
	* Example: King + Ace + 4 = 10 + 1 + 4 = 15.

Every unique combination of cards can be used. For example, a hand consisting of 7 of Hearts, 8 of Spades, 8 of Hearts, 8 of Diamonds, with a starter card of 9 of Clubs can be scored as follows:

* 8 of Spades + 8 of Hearts: pair (2 points)
* 8 of Spades + 8 of Diamonds: pair (2 points)
* 8 of Hearts + 8 of Diamonds: pair (2 points)
* 7 of Hearts + 8 of Spades + 9 of Clubs: straight (3 points)
* 7 of Hearts + 8 of Hearts + 9 of Clubs: straight (3 points)
* 7 of Hearts + 8 of Diamonds + 9 of Clubs: straight (3 points)
* 7 of Hearts + 8 of Spades: adds up to 15 (2 points)
* 7 of Hearts + 8 of Hearts: adds up to 15 (2 points)
* 7 of Hearts + 8 of Diamonds: adds up to 15 (2 points)

Total score: 21 (a very good hand!)