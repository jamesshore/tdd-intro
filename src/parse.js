// Copyright Titanium I.T. LLC.
"use strict";

const Card = require("./card");

exports.card = function(cardString) {
	let rank = cardString[0];
	if (rank === "0") rank = "10";

	if (!Card.isValidRank(rank)) throw new Error(`Unrecognized rank '${rank}' in card '${cardString}'`);
	return new Card(rank);
};