// Copyright Titanium I.T. LLC.
"use strict";

const NUMERIC_RANKS = {
	"A": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"J": 11,
	"Q": 12,
	"K": 13,
};

module.exports = class Card {
	static get RANKS() { return ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; }
	static get SUITS() { return ["C", "S", "H", "D"]; }

	constructor(rank, suit, isStarter) {
		this._rank = rank;
		this._suit = suit;
		this._isStarter = isStarter;
	}

	static isPair(cards) {
		if (cards.length !== 2) return false;

		return cards[0]._rank === cards[1]._rank;
	}

	static isStraight(cards) {
		if (cards.length < 3) return false;

		cards.sort((a, b) => numericRank(a) - numericRank(b));

		let prevRank = numericRank(cards[0]);
		for (let i = 1; i < cards.length; i++) {
			const currentRank = numericRank(cards[i]);
			if (currentRank - 1 !== prevRank) return false;
			prevRank = currentRank;
		}
		return true;
	}

	static isFlush(cards) {
		const faceCards = filterFaceCards(cards);
		if (faceCards.length < 4) return false;

		const targetSuit = cards[0]._suit;
		return cards.every((card) => card._suit === targetSuit);
	}

	static isNobs(cards) {
		const starterCards = filterStarterCards(cards);
		if (starterCards.length !== 1) return false;
		const starter = starterCards[0];

		const faceCards = filterFaceCards(cards);
		if (faceCards.length !== 1) return false;
		const face = faceCards[0];

		const targetSuit = starter._suit;
		return face._rank === "J" && face._suit === targetSuit;
	}

	static isFifteen(cards) {
		const total = cards.reduce((accumulator, card) => accumulator + value(card), 0);
		return total === 15;
	}

	static isSubset(subset, superset) {
		if (subset.length === 0) return true;
		if (subset.length > superset.length) return false;

		subset.sort(compare);
		superset.sort(compare);

		const firstMatchIndex = superset.findIndex((card) => equals(card, subset[0]));
		if (firstMatchIndex === -1) return false;
		if (firstMatchIndex + subset.length > superset.length) return false;

		for (let i = 0; i < subset.length; i++) {
			const subsetCard = subset[i];
			const supersetCard = superset[i + firstMatchIndex];
			if (!equals(subsetCard, supersetCard)) return false;
		}
		return true;
	}

};

function numericRank(card) {
	return NUMERIC_RANKS[card._rank];
}

function value(card) {
	return Math.min(numericRank(card), 10);
}

function filterFaceCards(cards) {
	return cards.filter((card) => !card._isStarter);
}

function filterStarterCards(cards) {
	return cards.filter((card) => card._isStarter);
}

function equals(a, b) {
	return compare(a, b) === 0;
}

function compare(a, b) {
	if (numericRank(a) > numericRank(b)) return 1;
	if (numericRank(a) < numericRank(b)) return -1;

	if (a._suit > b._suit) return 1;
	if (a._suit < b._suit) return -1;

	if (a._isStarter && !b._isStarter) return 1;
	if (!a._isStarter && b._isStarter) return -1;

	return 0;
}
