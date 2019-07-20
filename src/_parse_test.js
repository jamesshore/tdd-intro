// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const parse = require("./parse");
const Card = require("./card");

describe("Parse", function() {

	it("converts a card string to an object with a rank", function() {
		assert.deepEqual(parse.card("AC"), new Card("A"));
		assert.deepEqual(parse.card("2C"), new Card("2"));
		assert.deepEqual(parse.card("3C"), new Card("3"));
		assert.deepEqual(parse.card("4C"), new Card("4"));
		assert.deepEqual(parse.card("5C"), new Card("5"));
		assert.deepEqual(parse.card("6C"), new Card("6"));
		assert.deepEqual(parse.card("7C"), new Card("7"));
		assert.deepEqual(parse.card("8C"), new Card("8"));
		assert.deepEqual(parse.card("9C"), new Card("9"));
		assert.deepEqual(parse.card("0C"), new Card("10"));
		assert.deepEqual(parse.card("JC"), new Card("J"));
		assert.deepEqual(parse.card("QC"), new Card("Q"));
		assert.deepEqual(parse.card("KC"), new Card("K"));
	});

	it("throws exception when using invalid rank", function() {
		assert.throws(
			() => parse.card("XC"),
			"Unrecognized rank 'X' in card 'XC'"
		);
	});

});