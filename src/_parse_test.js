// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const parse = require("./parse");
const Card = require("./card");
const Table = require("./table");

describe("Parse", function() {

	describe("single card", function() {

		it("parses rank", function() {
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

		it("parses suit", function() {
			assert.deepEqual(parse.card("3C"), new Card("3", "C"));
			assert.deepEqual(parse.card("3S"), new Card("3", "S"));
			assert.deepEqual(parse.card("3H"), new Card("3", "H"));
			assert.deepEqual(parse.card("3D"), new Card("3", "D"));
		});

		it("throws exception if rank can't be parsed", function() {
			assert.throws(() => parse.card("XC"), "Unknown rank 'X' in card 'XC'");
		});

		it("throws exception if suit can't be parsed", function() {
			assert.throws(() => parse.card("3X"), "Unknown suit 'X' in card '3X'");
		});

	});


	describe("all cards", function() {

		it("converts to object", function() {
			const hand = [
				new Card("A", "H"),
				new Card("2", "D"),
				new Card("3", "S"),
				new Card("4", "C"),
			];
			const starter = new Card("5", "H");
			const expected = new Table(hand, starter);

			const table = parse.allCards("AH2D3S4C5H");
			assert.deepEqual(table, expected);
		});

		it("throws exception if not exactly five cards", function() {
			assert.throws(() => parse.allCards("JH5D5S5C"), "Expected 5 cards but got 4");
			assert.throws(() => parse.allCards("JH5D5S5C5HJH"), "Expected 5 cards but got 6");
			assert.throws(() => parse.allCards("JH5D5S5C5"), "Expected 5 cards but got 4.5");
		});

	});

});