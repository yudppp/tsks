'use strict';

module.exports = {
	getTasks: function(exec, cwd) {
		var cmd = `cd ${cwd}; make -rpn | sed -n -e '/^$/ { n ; /^[^ .#][^ ]*:/ { s/:.*$// ; p ; } ; }'`;
		try {
			var result = "" + exec(cmd, {stdio:[null]});
			return result.split('\n').filter((v) => {
				return v != ''
			})
		} catch (e) {
			return [];
		}
	}
}