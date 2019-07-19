// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.card = function card(cardString) {
	let rank = cardString[0];
	const suit = cardString[1];
	if (rank === "0") rank = "10";

	if (!Card.RANKS.includes(rank)) throw new Error(`invalid rank: ${rank}`);
	if (!Card.SUITS.includes(suit)) throw new Error(`invalid suit: ${suit}`);

	return new Card(rank, suit);
};