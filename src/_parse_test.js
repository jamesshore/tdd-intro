// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const parse = require("./parse");
const Card = require("./card");
const Table = require("./table");

describe("Parse", function() {

	describe("single card", function() {

		it("passes through starter status", function() {
			assert.deepEqual(parse.card("3C", true), new Card("3", "C", true), "should be starter");
			assert.deepEqual(parse.card("3C", false), new Card("3", "C", false), "should not be starter");
		});

		it("parses rank", function() {
			assert.deepEqual(parse.card("AC", false), new Card("A", "C", false));
			assert.deepEqual(parse.card("2C", false), new Card("2", "C", false));
			assert.deepEqual(parse.card("3C", false), new Card("3", "C", false));
			assert.deepEqual(parse.card("4C", false), new Card("4", "C", false));
			assert.deepEqual(parse.card("5C", false), new Card("5", "C", false));
			assert.deepEqual(parse.card("6C", false), new Card("6", "C", false));
			assert.deepEqual(parse.card("7C", false), new Card("7", "C", false));
			assert.deepEqual(parse.card("8C", false), new Card("8", "C", false));
			assert.deepEqual(parse.card("9C", false), new Card("9", "C", false));
			assert.deepEqual(parse.card("0C", false), new Card("10", "C", false));
			assert.deepEqual(parse.card("JC", false), new Card("J", "C", false));
			assert.deepEqual(parse.card("QC", false), new Card("Q", "C", false));
			assert.deepEqual(parse.card("KC", false), new Card("K", "C", false));
		});

		it("parses suit", function() {
			assert.deepEqual(parse.card("3C", false), new Card("3", "C", false));
			assert.deepEqual(parse.card("3S", false), new Card("3", "S", false));
			assert.deepEqual(parse.card("3H", false), new Card("3", "H", false));
			assert.deepEqual(parse.card("3D", false), new Card("3", "D", false));
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
			const cards = [
				new Card("A", "H", false),
				new Card("2", "D", false),
				new Card("3", "S", false),
				new Card("4", "C", false),
				new Card("5", "H", true),
			];
			const expected = new Table(cards);

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

function createCard({ rank="A", suit="S", starter=false } = {}) {
	return new Card(rank, suit, starter);
}