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

    function getTasks() {
        var tasks = []
        function addTasks(prefix, t, color) {
            if (Array.isArray(t)) {
                t.forEach(function(v) {
                    tasks.push(prefix + v)
                })
            } else if (typeof t === 'string') {
                tasks.push(prefix + t)
            }
        }
        // npm
        addTasks('npm run ', require('./npm').getTasks(exec, cwd))
        // gulp
        addTasks('gulp ', require('./gulp').getTasks(exec, cwd))
        // grunt
        addTasks('grunt ', require('./grunt').getTasks(exec, cwd))
        // make
        addTasks('make ', require('./make').getTasks(exec, cwd))
        // rake
        addTasks('', require('./rake').getTasks(exec, cwd))

        return tasks
	}

	function showList() {
		log.info(emoji.get('shell') + ' tsks');
        var tasks = getTasks()
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