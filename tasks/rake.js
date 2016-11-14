'use strict';

module.exports = {
	getTasks: function(exec, cwd) {
		var cmd = `cd ${cwd}; rake -T`;
		try {
			var result = "" + exec(cmd, {stdio:[null]});
			return result.split('\n').map((v) => {
				return v.split('  ')[0]
			}).filter((v) => {
				return v != ''
			})
		} catch (e) {
			return [];
		}
	}
}