// Copyright Titanium I.T. LLC.
"use strict";

const score = require("./score");
const assert = require("chai").assert;
const parse = require("./parse");
const AllCards = require("./all_cards");

describe("Score", function() {

	it("scores all combinations of pairs", function() {
		assert.equal(score.calculate(createCards(["2H", "2D"])), 2, "should score pair");
		assert.equal(score.calculate(createCards(["2H", "2D", "2S"])), 6, "should score triple");
		assert.equal(score.calculate(createCards(["2H", "2D", "2S", "2C"])), 12, "should score quadruple");
		assert.equal(score.calculate(createCards(["2H", "2D", "4H", "5S"])), 2, "should ignore non-pair cards");
	});

	it("scores straights", function() {
		assert.equal(score.calculate(createCards(["2H", "3C", "4D"])), 3, "should score straight");
		assert.equal(score.calculate(createCards(["2H", "3C", "4D", "5S"])), 4, "should only score straight once");
	});

	it("scores flushes", function() {
		assert.equal(score.calculate(createCards(["2H", "5H", "7H", "9H"])), 4, "should score flush");
		assert.equal(
			score.calculate(createCards(["2H", "5H", "7H", "9H"], "JH")),
			5,
			"should only score flush once");
	});

	it("scores nobs", function() {
		assert.equal(score.calculate(createCards(["JH"], "3H")), 1, "should score nobs");
	});

});

function createCards(handStrings, starterString) {
	const handCards = handStrings.map((handStrings) => parse.card(handStrings), false);
	const starterCards = starterString === undefined ? [] : [ parse.card(starterString, true) ];

	return new AllCards([ ...handCards, ...starterCards ]);
}