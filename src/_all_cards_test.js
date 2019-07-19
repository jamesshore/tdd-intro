// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const AllCards = require("./all_cards");
const parse = require("./parse");

describe("All Cards", function() {

	it("finds all combinations", function() {
		assert.deepEqual(createAllCards().combinations(), createCards(), "no cards");
		assert.deepEqual(createAllCards("3C").combinations(), [ createCards("3C") ], "one card");
		assert.deepEqual(
			createAllCards("3C", "4H", "5S").combinations(),
			[
				createCards("3C"),
				createCards("3C", "4H"),
				createCards("3C", "4H", "5S"),
				createCards("3C", "5S"),
				createCards("4H"),
				createCards("4H", "5S"),
				createCards("5S"),
			],
			"three cards"
		);
	});

});

function createAllCards(...cardStrings) {
	return new AllCards(createCards.apply(null, cardStrings));
}

function createCards(...cardStrings) {
	return cardStrings.map((cardString) => parse.card(cardString, false));
}

