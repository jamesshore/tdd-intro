// Copyright Titanium I.T. LLC.
"use strict";

const VALID_RANKS = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];
const VALID_SUITS = [ "S", "C", "H", "D" ];

module.exports = class Card {

	constructor(rank, suit) {
		this._rank = rank;
		this._suit = suit;
	}

	static isValidRank(rank) {
		return VALID_RANKS.includes(rank);
	}

	static isValidSuit(suit) {
		return VALID_SUITS.includes(suit);
	}

};