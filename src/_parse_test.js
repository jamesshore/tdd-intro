// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const parse = require("./parse");
const Card = require("./card");

describe("Parse", function() {

	it("converts a card string to an object", function() {
		assert.deepEqual(parse.card("3C"), new Card("3", "C"));
	});

	it("converts the letter '0' to a rank of 10", function() {
		assert.deepEqual(parse.card("0C"), new Card("10", "C"));
	});

	it("throws exception when using invalid rank", function() {
		assert.throws(
			() => parse.card("XC"),
			"Unrecognized rank 'X' in card 'XC'"
		);
	});

	it("throws exception when using invalid suit", function() {
		assert.throws(
			() => parse.card("3X"),
			"Unrecognized suit 'X' in card '3X'"
		);
	});

});