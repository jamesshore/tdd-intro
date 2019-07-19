// Copyright Titanium I.T. LLC.
"use strict";

const score = require("../score");

const arg = process.argv[2];
try {
	process.stdout.write(score.analyze(arg) + "\n");
	process.exit(0);
}
catch (err) {
	process.stderr.write(err.message + "\n");
	process.exit(1);
}