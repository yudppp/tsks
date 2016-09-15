#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2), {
	boolean: ['help', 'version'],
	alias: {
		h: 'help',
		v: 'version'
	}
});
var exec = require('child_process').execSync;
var cwd = (function getCwd(dir) {
	return dir ? dir : process.cwd();
})(argv._[0]);

require('./')(process, exec, console, cwd, argv);