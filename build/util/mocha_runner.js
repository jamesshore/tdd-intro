// Copyright Titanium I.T. LLC.
"use strict";

const Mocha = require("mocha");

exports.runTestsAsync = function(options) {
	return new Promise((resolve, reject) => {
		const mocha = new Mocha(options.options);
		options.files.forEach(mocha.addFile.bind(mocha));

		mocha.run(function(failures) {
			if (failures) return reject(new Error("Tests failed"));
			else return resolve();
		});
	});
};
