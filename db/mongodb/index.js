import mongoose from 'mongoose';
import config from '../../configs/cnfMongoDb.js'


const dbUrl = config.url+":"+config.port+"/"+config.dbname

const options = {
	"user":config.user,
	"pass":config.pass,
	"useNewUrlParser":true
}

const connection = ()=>{
	mongoose.connect(dbUrl,options,(err)=>{
		if(err){
			console.log('Database timeout');
		}else{
			console.log('Database '+config.dbname+ " is connected.");
		}
	});
}

export default connection;