'use strict';

module.exports = {
    getTasks: function(exec, cwd) {
        var pkginfo = {exports: {}}
        try {
            require('pkginfo')(pkginfo, {dir: cwd, include: ['scripts']});
        } catch (e) {
            return []
        }
        return Object.keys(pkginfo.exports.scripts);
    }
}