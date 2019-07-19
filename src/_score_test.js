// Copyright Titanium I.T. LLC.
"use strict";

const score = require("./score");
const assert = require("chai").assert;
const parse = require("./parse");

describe("Score", function() {

	it("scores pairs", function() {
		assert.equal(score.combo(createCards("2H", "2D")), 2, "should score matching pair");
		assert.equal(score.combo(createCards("2H", "3D")), 0, "shouldn't score non-pair");
		assert.equal(score.combo(createCards("2H", "2D", "4H")), 0, "shouldn't score three cards w/ pair");
		assert.equal(score.combo(createCards("2H", "2D", "2S")), 0, "shouldn't score three triple");
	});

});

function createCards(...cardStrings) {
	return cardStrings.map((cardString) => parse.card(cardString));
}