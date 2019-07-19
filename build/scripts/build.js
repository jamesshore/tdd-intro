// Copyright Titanium I.T. LLC.
"use strict";

checkNodeVersion();

const parseArgs = require("minimist");
const paths = require("../config/paths");
const lint = require("../util/lint_runner.js");
const lintConfig = require("../config/eslint.conf.js");
const pathLib = require("path");
const fs = require("fs");
const promisify = require("util").promisify;
const statAsync = promisify(fs.stat);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const mochaRunner = require("../util/mocha_runner.js");
const mochaConfig = require("../config/mocha.conf.js");
const shell = require("shelljs"); shell.config.fatal = true;

exports.runAsync = async function(args) {
	try {
		const buildStart = Date.now();

		const argv = parseArgs(args);
		if (argv.help || argv.h || argv.T) return showHelp();

		const tasksToRun = argv._.length === 0 ? ["default"] : argv._;
		await runTasksAsync(tasksToRun);

		const elapsedSeconds = (Date.now() - buildStart) / 1000;
		console.log("\n✅  BUILD OK ✅\n(" + elapsedSeconds.toFixed(2) + "s)");

		return null;
	}
	catch (err) {
		console.log(`\n🚨  BUILD FAILURE 🚨\n${err.message}`);
		return err.failedTask;
	}
};

const tasks = {};

task("default", async() => {
	await runTasksAsync([ "clean", "quick" ]);
});

task("quick", async () => {
	await runTasksAsync([ "lint", "test" ]);
});

task("clean", () => {
	console.log("Deleting generated files: .");
	shell.rm("-rf", `${paths.generatedDir}/*`);
});

incrementalTask("test", paths.testDependencies(), async () => {
	process.stdout.write("Testing: ");
	await runTestsAsync(paths.testFiles());
});

task("lint", async () => {
	let header = "Linting: ";
	let footer = "";

	const lintPromises = paths.lintFiles().map(async (lintFile) => {
		const lintDependency = lintDependencyName(lintFile);
		const modified = await isModifiedAsync(lintFile, lintDependency);
		if (!modified) return true;

		process.stdout.write(header);
		header = "";
		footer = "\n";
		const success = await lint.validateFileAsync(lintFile, lintConfig.options);
		if (success) writeDirAndFileAsync(lintDependency, "lint ok");

		return success;
	});

	const successes = await Promise.all(lintPromises);
	const overallSuccess = successes.every((success) => success === true);
	if (!overallSuccess) fail("Lint failed");

	process.stdout.write(footer);
});


function checkNodeVersion() {
	console.log("Checking Node.js version: .");
	const semver = require("semver");

	const actualVersion = process.version;
	const expectedVersion = require("../../package.json").engines.node;
	if (semver.neq(actualVersion, expectedVersion)) {
		console.log(`Caution: Expected Node v${expectedVersion}, but ${actualVersion} is running instead.`);
	}
}


function task(taskName, fn) {
	tasks[taskName] = fn;
}

function incrementalTask(taskName, sourceFiles, fn) {
	task(taskName, async () => {
		const taskFile = `${paths.incrementalDir}/tasks/${taskName}.task`;
		if (!(await isAnyModifiedAsync(sourceFiles, taskFile))) return;

		await fn();
		writeDirAndFileAsync(taskFile, "ok");
	});
}

async function runTestsAsync(testFiles) {
	await mochaRunner.runTestsAsync({
		files: testFiles,
		options: mochaConfig,
	});
}


async function runTasksAsync(tasksToRun) {
	let currentTask;
	try {
		for (const task of tasksToRun) {
			currentTask = task;
			const unknownTasks = tasksToRun.filter((task) => tasks[task] === undefined);
			if (unknownTasks.length > 0) {
				showHelp();
				throw new Error(`Unrecognized task(s): ${unknownTasks.join(", ")}`);
			}
			await tasks[task]();
		}
	}
	catch (err) {
		if (err.failedTask === undefined) err.failedTask = currentTask;
		throw err;
	}
}

async function isAnyModifiedAsync(sources, target) {
	const modifiedPromises = sources.map((source) => isModifiedAsync(source, target));
	const modifiedResults = await Promise.all(modifiedPromises);
	return modifiedResults.some((success) => success === true);
}

async function isModifiedAsync(source, target) {
	try {
		const [sourceStats, targetStats] = await Promise.all([statAsync(source), statAsync(target)]);
		return sourceStats.mtime > targetStats.mtime;
	}
	catch(err) {
		if (err.code === "ENOENT") return true;
		else throw err;
	}
}

async function writeDirAndFileAsync(file, contents) {
	const dir = pathLib.dirname(file);
	await mkdirAsync(dir, { recursive: true });
	await writeFileAsync(file, contents);
}

function fail(message) {
	throw new Error(message);
}

function lintDependencyName(lintFilename) {
	const rootDir = pathLib.resolve(__dirname, "..");
	const filenameRelativeToRoot = lintFilename.replace(rootDir, "");
	return `${paths.incrementalDir}/lint/${filenameRelativeToRoot}.lint`;
}

function showHelp() {
	const name = pathLib.basename(process.argv[1]).split(".")[0];
	console.log(`usage: ${name} [-h|--help|-T|--tasks] <tasks>`);
	console.log("--help  This message");
	console.log();
	console.log("Available tasks:");
	Object.keys(tasks).forEach((task) => console.log(`  ${task}`));
}
