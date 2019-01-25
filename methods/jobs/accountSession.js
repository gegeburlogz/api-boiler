import cron from 'node-cron'
import {mongodb} from '../helpers'


const job =()=>{
	cron.schedule('*/5 * * * * *', async ()=>{
		const user = await mongodb.read({
			"model":"user",
			"data":{
				"meta.account":true,
				"meta.status":true
			}
		},{
			"select":"meta"
		});

		const isExpired =  (date) => {
			let dateCnv = new Date(date).getTime();
			let startdate = dateCnv ,
				enddate = (dateCnv + (2*60*60*1000));
			if(Date.now() > enddate){
			   return true
			}else{
			   return false;
			}
		}

		for (var i = 0; i < user.length; i++) {
			if(isExpired(user[i].meta.lastlogin)){
				await mongodb.update({
					"model":"user",
					"data":{
						"$set":{
							"meta.status":false
						}
					}
				})
			}
		}
	});	
}

export default job



