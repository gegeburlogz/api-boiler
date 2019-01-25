import path from 'path';
import fs from 'fs';
import _ from 'lodash';

var resolver = {}

fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;

	if(fs.lstatSync(__dirname+"/"+file).isDirectory()){
		fs.readdirSync(__dirname+"/"+file).forEach((innerFile) => {
			 resolver = _.merge(resolver, require(path.join(__dirname+"/"+file, innerFile)).default)
		})
	}else{
		resolver = _.merge(resolver, require(path.join(__dirname, file)).default)
	}
});

export default resolver