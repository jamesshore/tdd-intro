// Copyright Titanium I.T. LLC.
"use strict";

const assert = require("chai").assert;
const Card = require("./card");

describe("Card", function() {

	it("says if a rank is valid or not", function() {
		assert.equal(Card.isValidRank("A"), true, "valid rank");
		assert.equal(Card.isValidRank("M"), false, "invalid rank");
	});

	it("says if a suit is valid or not", function() {
		assert.equal(Card.isValidSuit("H"), true, "valid suit");
		assert.equal(Card.isValidSuit("Q"), false, "invalid suit");
	});

});