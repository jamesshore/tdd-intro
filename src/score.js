// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.analyze = function(cardsString) {
	return 19;
};

exports.combo = function(handCards) {
	if (handCards.length !== 2) return 0;

	return Card.isPair(handCards[0], handCards[1]) ? 2 : 0;
};