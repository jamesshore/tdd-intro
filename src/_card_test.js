// Copyright Titanium I.T. LLC.
"use strict";

const parse = require("./parse");
const assert = require("chai").assert;
const Card = require("./card");

describe("Card", function() {

	it("recognizes pairs", function() {
		const nineSpades = createHandCard("9S");
		const nineDiamonds = createHandCard("9D");
		const nineDiamondsStarter = createStarterCard("9D");
		const eightHearts = createHandCard("8H");

		assert.isTrue(Card.isPair(nineSpades, nineDiamonds), "should recognize pairs");
		assert.isTrue(Card.isPair(nineSpades, nineDiamondsStarter), "shouldn't care about starter status");
		assert.isFalse(Card.isPair(nineSpades, eightHearts), "should recognize non-pairs");
	});

});

function createHandCard(cardStr) {
	return parse.card(cardStr, false);
}

function createStarterCard(cardStr) {
	return parse.card(cardStr, true);
}