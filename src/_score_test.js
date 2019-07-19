// Copyright Titanium I.T. LLC.
"use strict";

const score = require("./score.js");
const assert = require("chai").assert;

describe("Score", function() {

	it("isn't implemented", function() {
		assert.equal(score.analyze(), 19);
	});

});