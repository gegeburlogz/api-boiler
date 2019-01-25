import path from 'path';
import fs from 'fs';

fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;

	if(fs.lstatSync(__dirname+"/"+file).isDirectory()){
		fs.readdirSync(__dirname+"/"+file).forEach((innerFile) => {
			module.exports[path.basename(file+"_"+innerFile, '.js')] = require(path.join(__dirname+"/"+file, innerFile)).default;
		})
	}else{
		module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file)).default;
	}
});
