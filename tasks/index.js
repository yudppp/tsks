'use strict';

module.exports = {
	getTasks: function(exec, cwd) {
		var tasks = []
		function addTasks(prefix, t) {
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
}