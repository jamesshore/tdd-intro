// Copyright Titanium I.T. LLC.
"use strict";

const score = require("./score");
const assert = require("chai").assert;
const parse = require("./parse");
const AllCards = require("./all_cards");

describe("Score", function() {

	it("scores all combinations of pairs", function() {
		assert.equal(score.calculate(createCards("2H", "2D")), 2, "should score pair");
		assert.equal(score.calculate(createCards("2H", "2D", "2S")), 6, "should score triple");
		assert.equal(score.calculate(createCards("2H", "2D", "2S", "2C")), 12, "should score quadruple");
		assert.equal(score.calculate(createCards("2H", "2D", "4H", "5S")), 2, "should ignore non-pair cards");
	});

	it("scores straights", function() {
		assert.equal(score.calculate(createCards("2H", "3H", "4H")), 3, "should score straight");
		assert.equal(score.calculate(createCards("2H", "3H", "4H", "5H")), 4, "should only score straight once");
	});

});

function createCards(...cardStrings) {
	return new AllCards(cardStrings.map((cardString) => parse.card(cardString), false));
}