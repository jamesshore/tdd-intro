// Copyright Titanium I.T. LLC.
"use strict";

const VALID_RANKS = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

module.exports = class Card {

	constructor(rank) {
		this._rank = rank;
	}

	static isValidRank(rank) {
		return VALID_RANKS.includes(rank);
	}

};