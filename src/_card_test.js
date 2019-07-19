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

	it("recognizes straights", function() {
		const aceSpades = createHandCard("AS");
		const twoSpades = createHandCard("2S");
		const twoSpadesStarter = createStarterCard("2S");
		const threeSpades = createHandCard("3S");
		const threeHearts = createHandCard("3H");
		const fourSpades = createHandCard("4S");
		const fourDiamonds = createHandCard("4D");
		const fiveSpades = createHandCard("5S");
		const jackSpades = createHandCard("JS");
		const queenSpades = createHandCard("QS");
		const kingSpades = createHandCard("KS");

		assert.isTrue(Card.isStraight([ twoSpades, threeSpades, fourSpades ]), "should recognize straights");
		assert.isTrue(
			Card.isStraight([ twoSpadesStarter, threeSpades, fourSpades ]),
			"shouldn't care about starter status"
		);
		assert.isFalse(Card.isStraight([ twoSpades, threeSpades, fiveSpades ]), "should recognize non-straights");
		assert.isFalse(Card.isStraight([ twoSpades, threeSpades ]), "should require at least three cards");
		assert.isTrue(Card.isStraight([twoSpades, threeHearts, fourDiamonds ]), "shouldn't care about suits");
		assert.isTrue(Card.isStraight([ jackSpades, queenSpades, kingSpades ]), "should recognize face cards");
		assert.isTrue(Card.isStraight([ aceSpades, twoSpades, threeSpades ]), "should recognize ace");
		assert.isFalse(Card.isStraight([ jackSpades, queenSpades, aceSpades ]), "shouldn't think ace is high");
		assert.isTrue(
			Card.isStraight([ aceSpades, twoSpades, threeSpades, fourSpades, fiveSpades ]),
			"should handle more than three cards"
		);
		assert.isFalse(
			Card.isStraight([ aceSpades, twoSpades, threeSpades, fourSpades, kingSpades ]),
			"should require all cards to be part of straight"
		);
		assert.isTrue(Card.isStraight([ threeSpades, twoSpades, fourSpades ]), "should handle out-of-order cards");
	});

	it("recognizes flushes", function() {
		const twoSpadesStarter = createStarterCard("2S");
		const threeSpades = createHandCard("3S");
		const threeHearts = createHandCard("3H");
		const threeHeartsStarter = createStarterCard("3H");
		const fiveSpades = createHandCard("5S");
		const jackSpades = createHandCard("JS");
		const queenSpades = createHandCard("QS");

		assert.isTrue(
			Card.isFlush([ threeSpades, fiveSpades, jackSpades, queenSpades ]),
			"should recognize flushes"
		);
		assert.isFalse(
			Card.isFlush([ threeSpades, threeHearts, jackSpades, queenSpades ]),
			"should recognize non-flushes"
		);
		assert.isFalse(
			Card.isFlush([ threeSpades, fiveSpades, jackSpades ]),
			"should require at least four cards"
		);
		assert.isFalse(
			Card.isFlush([ threeSpades, fiveSpades, jackSpades, twoSpadesStarter ]),
			"should require at least four face cards"
		);
		assert.isTrue(
			Card.isFlush([ threeSpades, fiveSpades, jackSpades, queenSpades, twoSpadesStarter ]),
			"should allow starter card so long as four face card requirement is met"
		);
		assert.isTrue(
			Card.isFlush([ fiveSpades, queenSpades, threeSpades, twoSpadesStarter, jackSpades]),
			"shouldn't care about order"
		);
		assert.isFalse(
			Card.isFlush([ threeSpades, fiveSpades, jackSpades, queenSpades, threeHeartsStarter ]),
			"shouldn't be a flush unless all cards match, even if a subset of cards counts as a flush"
		);
	});

});

function createHandCard(cardStr) {
	return parse.card(cardStr, false);
}

function createStarterCard(cardStr) {
	return parse.card(cardStr, true);
}