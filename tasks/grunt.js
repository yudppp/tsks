'use strict';

var path = require('path');
var findup = require('findup-sync');
var resolve = require('resolve').sync;

module.exports = {
	getTasks: function(exec, cwd) {
		var gruntpath;
		try {
			gruntpath = resolve('grunt', {basedir: cwd});
		} catch (ex) {
			gruntpath = findup('lib/grunt.js');
			if (!gruntpath) {
				return []
			}
		}

		var grunt = require(gruntpath)
		grunt.help.initTasks()

		var tasks = grunt.help._tasks
		tasks = tasks.map(function(v) {
			return v.name
		})
		return tasks;
	}
}
