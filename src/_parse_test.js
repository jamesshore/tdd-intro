// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const parse = require("./parse");
const Card = require("./card");

describe("Parse", function() {

	it("parses suit of single card", function() {
		assert.deepEqual(parse.card("3C"), new Card("3", "C"));
		assert.deepEqual(parse.card("3S"), new Card("3", "S"));
		assert.deepEqual(parse.card("3H"), new Card("3", "H"));
		assert.deepEqual(parse.card("3D"), new Card("3", "D"));
	});

	it("parses rank of single card", function() {
		assert.deepEqual(parse.card("AC"), new Card("A", "C"));
		assert.deepEqual(parse.card("2C"), new Card("2", "C"));
		assert.deepEqual(parse.card("3C"), new Card("3", "C"));
		assert.deepEqual(parse.card("4C"), new Card("4", "C"));
		assert.deepEqual(parse.card("5C"), new Card("5", "C"));
		assert.deepEqual(parse.card("6C"), new Card("6", "C"));
		assert.deepEqual(parse.card("7C"), new Card("7", "C"));
		assert.deepEqual(parse.card("8C"), new Card("8", "C"));
		assert.deepEqual(parse.card("9C"), new Card("9", "C"));
		assert.deepEqual(parse.card("0C"), new Card("10", "C"));
		assert.deepEqual(parse.card("JC"), new Card("J", "C"));
		assert.deepEqual(parse.card("QC"), new Card("Q", "C"));
		assert.deepEqual(parse.card("KC"), new Card("K", "C"));
	});

	it("throws exception if rank can't be parsed", function() {
		assert.throws(() => parse.card("XC"));
	});

	it("throws exception if suit can't be parsed", function() {
		assert.throws(() => parse.card("3X"));
	});

});