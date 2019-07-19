// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.analyze = function(cardsString) {
	return 19;
};

exports.combo = function(cards) {
	return scorePair(cards) + scoreStraight(cards);
};

function scorePair(cards) {
	if (cards.length !== 2) return 0;
	return Card.isPair(cards[0], cards[1]) ? 2 : 0;
}

function scoreStraight(cards) {
	return Card.isStraight(cards) ? cards.length : 0;
}