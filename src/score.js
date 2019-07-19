// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.analyze = function(cardsString) {
	return 19;
};

exports.calculate = function(allCards) {
	const previousStraights = [];
	const combinations = allCards.combinations();
	combinations.sort((a, b) => b.length - a.length);   // doing larger sets first makes the subset checks work

	return combinations.reduce((accumulator, cards) => {
		const straightScore = scoreStraight(previousStraights, cards);
		if (straightScore > 0) previousStraights.push(cards);

		return accumulator +
			scorePair(cards) +
			straightScore;
	}, 0);
};

function scorePair(cards) {
	if (cards.length !== 2) return 0;
	return Card.isPair(cards[0], cards[1]) ? 2 : 0;
}

function scoreStraight(previousStraights, cards) {
	if (!Card.isStraight(cards)) return 0;

	const alreadyScored = previousStraights.some((previousStraight) => Card.isSubset(cards, previousStraight));
	if (alreadyScored) return 0;

	return cards.length;
}