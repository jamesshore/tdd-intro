// Copyright Titanium I.T. LLC.
"use strict";

module.exports = class AllCards {

	constructor(cards) {
		this._cards = cards;
	}

	combinations() {
		return allCombinations(this._cards);
	}

};

function allCombinations(cards) {
	if (cards.length === 0) return [];

	const [ firstCard, ...remainingCards ] = cards;
	const allRemainingCardCombos = allCombinations(remainingCards);
	const allFirstCardCombos = allRemainingCardCombos.map((combination) => {
		return [ firstCard, ...combination ];
	});

	return [ [firstCard], ...allFirstCardCombos, ...allRemainingCardCombos ];
}