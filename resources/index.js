import path from 'path';
import fs from 'fs';
import _ from 'lodash';

var path_a = {
	name :"",
};
const readfile = (filename) => {
	let loop = false;
	fs.readdirSync(__dirname).forEach((file) => {
		const current = file.split(".")
		if(current[0] == filename){
			path_a.name = "resources"+"/"+file
			loop = true
		}else{
			if(loop){

			}else{
				path_a.name =  filename+" "+current	
			}
			
		}
	});
	return path_a
}
export default readfile