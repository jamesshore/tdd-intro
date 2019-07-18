// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
"use strict";

const child_process = require("child_process");

exports.runAsync = function(command, args) {
	console.log(`> ${command} ${args.join(" ")}`);
	return spawnAsync(command, args, { stdio: "inherit" });
};

exports.runSilentlyAsync = function(command, args) {
	return spawnAsync(command, args, { stdio: "ignore" });
};

function spawnAsync(command, args, options) {
	return new Promise((resolve, reject) => {
		const child = child_process.spawn(command, args, options);
		child.on("error", reject);
		child.on("exit", resolve);
	});
}