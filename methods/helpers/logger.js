require("dotenv").config();
import fs from 'fs';
import util from 'util';
let dateNow = Date().toString().split(" ");
let timeDate = dateNow[1]+dateNow[2]+dateNow[3]
const name = "./logs/log_"+timeDate+".lg";
const dir = "./logs";

if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}
const checkLog = (name) =>{
	if (!fs.existsSync(name)) {
		fs.writeFile("./logs/log_"+timeDate+".lg","",(err)=>{ console.log(err)});
	}
}


checkLog(name);
const log_file = fs.createWriteStream(name, {flags : 'a'});

const logError = (error,path,custom = false) => {
	const time = new Date().toLocaleString();
	log_file.write(time+" >> "+ util.format(error) + ' : ' +path+'\n\n');
	return {
		"success":false,
		"message":[{
			"path":path,
			"message":(custom)? error : "Sorry for interruption. Please try again later."
		}]
	}
};

export default logError;