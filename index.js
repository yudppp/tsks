'use strict';

var pkg = require('./package');
var emoji = require('node-emoji')
var inquirer = require('inquirer')

module.exports = function (p, exec, log, cwd, options) {
	function printHelp() {
		log.info(
			'\nUsage:\n  tsks [<path>]\n' +
			'\nOptions:\n  -v --version   Displays app version number\n' +
			'  -h --help      Shows this help message'
		);
	}

	function printVersion() {
		log.info(pkg.version);
	}

	function showList() {
		log.info(emoji.get('shell') + ' tsks');
		var tasks = require('./tasks').getTasks(exec, cwd)
		if (!tasks || !Object.keys(tasks).length) {
			log.info('no task');
			return;
		}
		tasks.forEach(function(task) {
			log.info(task)
		})
	}

	function execList() {
		log.info(emoji.get('shell') + ' tsks');
		var tasks = require('./tasks').getTasks(exec, cwd)
		inquirer.prompt([{
			type: 'list',
			name: 'task',
			message: 'Which do you run task',
			choices: tasks
		}]).then(function(answers){
			console.log(`exec: ${answers.task}`)
			var cmd = `cd ${cwd}; ${answers.task}`;
			require('child_process').exec(cmd, function(error, stdout, stderr) {
				console.log(stdout)
				console.log(stderr)
			});
		})
	}

	if (options.help) {
		printHelp();
	} else if (options.version) {
		printVersion();
	} else if (options.exec){
		return execList();
	} else {
		return showList();
	}
};