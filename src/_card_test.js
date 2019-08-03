// Copyright Titanium I.T. LLC.
"use strict";

const parse = require("./parse");
const assert = require("chai").assert;
const Card = require("./card");

describe("Card", function() {

	it("knows if a rank is valid or not", function() {
		assert.equal(Card.isValidRank("A"), true, "valid rank");
		assert.equal(Card.isValidRank("M"), false, "invalid rank");
	});

	it("knows if a suit is valid or not", function() {
		assert.equal(Card.isValidSuit("H"), true, "valid suit");
		assert.equal(Card.isValidSuit("Q"), false, "invalid suit");
	});

	it("recognizes pairs", function() {
		const nineSpades = createHandCard("9S");
		const nineDiamonds = createHandCard("9D");
		const nineDiamondsStarter = createStarterCard("9D");
		const eightHearts = createHandCard("8H");

		assert.isTrue(Card.isPair([ nineSpades, nineDiamonds ]), "should recognize pairs");
		assert.isTrue(Card.isPair([ nineSpades, nineDiamondsStarter ]), "shouldn't care about starter status");
		assert.isFalse(Card.isPair([ nineSpades, eightHearts ]), "should recognize non-pairs");
		assert.isFalse(
			Card.isPair([ nineSpades, nineDiamonds, eightHearts ]),
			"should ignore non-pairs with pairs inside"
		);
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

	it("recognizes nobs", function() {
		const twoSpadesStarter = createStarterCard("2S");
		const threeSpades = createHandCard("3S");
		const jackSpades = createHandCard("JS");
		const jackHearts = createHandCard("JH");

		assert.isTrue(Card.isNobs([ jackSpades, twoSpadesStarter ]), "should recognize nobs");
		assert.isFalse(Card.isNobs([ jackHearts, twoSpadesStarter ]), "should recognize non-nobs (wrong suit)");
		assert.isFalse(Card.isNobs([ threeSpades, twoSpadesStarter ]), "should recognize non-nobs (not Jack)");
		assert.isFalse(Card.isNobs([ jackSpades, threeSpades ]), "should recognize non-nobs (not starter)");
		assert.isTrue(Card.isNobs([ twoSpadesStarter, jackSpades ]), "should allow cards in any order");
		assert.isFalse(Card.isNobs([ twoSpadesStarter ]), "shouldn't die when no face cards found");
		assert.isFalse(Card.isNobs([ jackSpades, threeSpades, twoSpadesStarter ]), "extra cards should disqualify");
	});

	it("recognizes fifteens", function() {
		const sevenSpades = createHandCard("7S");
		const eightHearts = createHandCard("8H");
		const eightHeartsStarter = createStarterCard("8H");
		const fiveSpades = createHandCard("5S");
		const fiveDiamonds = createHandCard("5D");
		const fiveHearts = createHandCard("5H");
		const fiveClubs = createHandCard("5C");

		assert.isTrue(Card.isFifteen([ sevenSpades, eightHearts ]), "should recognize 15s");
		assert.isFalse(Card.isFifteen([ sevenSpades, fiveSpades ]), "should recognize non-15s");
		assert.isTrue(Card.isFifteen([ fiveSpades, fiveDiamonds, fiveHearts ]), "should allow more than two cards");
		assert.isFalse(
			Card.isFifteen([ fiveSpades, fiveDiamonds, fiveHearts, fiveClubs ]),
			"should only consider the total, even if a subset of cards adds up to fifteen"
		);
		assert.isTrue(Card.isFifteen([ sevenSpades, eightHeartsStarter ]), "shouldn't care if cards are starters");
	});

	it("recognizes subsets", function() {
		const aceSpades = createHandCard("AS");
		const twoSpades = createHandCard("2S");
		const twoSpadesStarter = createStarterCard("2S");
		const threeSpades = createHandCard("3S");
		const threeHearts = createHandCard("3H");
		const fourSpades = createHandCard("4S");

		assert.isTrue(
			Card.isSubset([ aceSpades, twoSpades ], [ aceSpades, twoSpades, threeHearts, fourSpades ]),
			"should recognize subsets"
		);
		assert.isTrue(
			Card.isSubset([ aceSpades, twoSpades, threeHearts ], [ aceSpades, twoSpades, threeHearts ]),
			"identical sets should be subsets"
		);
		assert.isFalse(
			Card.isSubset([ aceSpades ], [ twoSpades ]),
			"different sets should not be subsets"
		);
		assert.isFalse(
			Card.isSubset([ twoSpades, threeSpades ], [ aceSpades, twoSpades ]),
			"subset that partially overlaps with superset shouldn't iterate past end of superset array"
		);
		assert.isTrue(
			Card.isSubset([], [ aceSpades, twoSpades, threeHearts ]),
			"empty sets should be subsets"
		);
		assert.isFalse(
			Card.isSubset([ aceSpades, twoSpades, threeHearts. fourSpades ], [ aceSpades, twoSpades ]),
			"supersets should not be subsets"
		);
		assert.isTrue(
			Card.isSubset([ twoSpades, threeHearts, aceSpades ], [ aceSpades, twoSpades, threeHearts ]),
			"should ignore order"
		);
		assert.isFalse(
			Card.isSubset([ twoSpades, threeHearts, aceSpades ], [ twoSpadesStarter, threeHearts, aceSpades ]),
			"should consider starter cards different than hand cards"
		);
	});

});

function createHandCard(cardStr) {
	return parse.card(cardStr, false);
}

function createStarterCard(cardStr) {
	return parse.card(cardStr, true);
}