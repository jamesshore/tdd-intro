// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");
const Table = require("./table");

exports.allCards = function allCards(allCardsString) {
	if(allCardsString.length !== 10) throw new Error(`Expected 5 cards but got ${allCardsString.length / 2}`);

	const groups = /(..)(..)(..)(..)(..)/.exec(allCardsString);
	const cards = groups.slice(1).map((group) => exports.card(group));

	const hand = cards.slice(0, 4);
	const starter = exports.card(groups[5]);
	return new Table(hand, starter);
};

exports.card = function card(cardString) {
	let rank = cardString[0];
	const suit = cardString[1];
	if (rank === "0") rank = "10";

	if (!Card.RANKS.includes(rank)) throw new Error(`Unknown rank '${rank}' in card '${cardString}'`);
	if (!Card.SUITS.includes(suit)) throw new Error(`Unknown suit '${suit}' in card '${cardString}'`);

	return new Card(rank, suit);
};