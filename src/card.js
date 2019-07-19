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

	static isPair(card1, card2) {
		return card1._rank === card2._rank;
	}

	static isStraight(cards) {
		if (cards.length < 3) return false;

		cards.sort((a, b) => numericRank(a) - numericRank(b));

		let prevRank = numericRank(cards[0]);
		let result = true;
		for (let i = 1; i < cards.length; i++) {
			const currentRank = numericRank(cards[i]);
			if (currentRank - 1 !== prevRank) result = false;
			prevRank = currentRank;
		}
		return result;
	}
};

function numericRank(card) {
	return NUMERIC_RANKS[card._rank];
}