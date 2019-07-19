// Copyright Titanium I.T. LLC.
"use strict";

const parse = require("./parse");
const assert = require("chai").assert;
const Card = require("./card");

describe("Card", function() {

	it("recognizes pairs", function() {
		const nineSpades = createCard("9S");
		const nineDiamonds = createCard("9D");
		const eightHearts = createCard("8H");

		assert.isTrue(Card.isPair(nineSpades, nineDiamonds), "should recognize pairs");
		assert.isFalse(Card.isPair(nineSpades, eightHearts), "should recognize non-pairs");
	});

});

function createCard(cardStr) {
	return parse.card(cardStr);
}