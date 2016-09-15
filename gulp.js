'use strict';

module.exports = {
    getTasks: function(exec, cwd) {
        var cmd = `$(npm bin)/gulp --tasks-simple ${cwd}`;
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