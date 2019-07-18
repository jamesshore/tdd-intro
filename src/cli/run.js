// Copyright Titanium I.T. LLC.
"use strict";

const score = require("../score");

const arg = process.argv[2];
process.stdout.write(score.analyze(arg) + "\n");