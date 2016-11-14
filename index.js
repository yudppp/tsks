'use strict';

var pkg = require('./package');
var emoji = require('node-emoji')

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

	if (options.help) {
		printHelp();
	} else if (options.version) {
		printVersion();
	} else {
		return showList();
	}
};