var fs = require('fs');
var Path = require('path');

var readJSON = module.exports.readJSON = function(fileName, defaultValue) {
	return JSON.parse(fs.readFileSync(fileName));
}

var writeJSON = module.exports.writeJSON = function(fileName, object) {
	return fs.writeFileSync(fileName, JSON.stringify(object, null, '\t'));
}

var fileExists = module.exports.fileExists = function(path) {

	try {
		fs.accessSync(path);		
		return true;
	}
	catch (error) {
	}

	return false;		
}


var mkdir = module.exports.mkdir = function(path, mode) {

    if (typeof mode === 'undefined')
        mode = 0777 & (~process.umask());
	
	if (!fileExists(path))
		fs.mkdirSync(path, mode);		
}


var mkpath = module.exports.mkpath = function (path, mode) {

    path = Path.resolve(path);

    if (typeof mode === 'undefined')
        mode = 0777 & (~process.umask());

    try {
        if (!fs.statSync(path).isDirectory()) {
            throw new Error(path + ' exists and is not a directory');
        }
    } 
    catch (error) {
		if (error.code === 'ENOENT') {
			mkpath(Path.dirname(path), mode);
			fs.mkdirSync(path, mode);
		}
		else {
			throw error;
		}
	}
};
