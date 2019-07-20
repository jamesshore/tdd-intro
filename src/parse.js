// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.card = function(cardString) {
	let rank = cardString[0];
	const suit = cardString[1];
	if (rank === "0") rank = "10";

	if (!Card.isValidRank(rank)) throw new Error(`Unrecognized rank '${rank}' in card '${cardString}'`);
	if (!Card.isValidSuit(suit)) throw new Error(`Unrecognized suit '${suit}' in card '${cardString}'`);

	return new Card(rank, suit);
};