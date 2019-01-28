import {logger,capitalize,mongodb,permissions} from '../../../helpers';
import {super_role} from '../../../../configs/cnfServer.js';
// import {Types} from 'mongoose';


export default {
	getIdolGroup:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[],
			"data":null
		}
		try{
			const get = await mongodb.read({
				"model":"idol_group",
				"data":{"_id":args.input}
			});
			const images = await mongodb.read({
				"model":"images",
				"data":{"tag":get[0].tag}
			})
			console.log("hello")
			let responseData ={
				"description":get[0].description,
				"groupname":get[0].groupname,
				"idolname":get[0].idolname,
				"tag":get[0].tag,
				"images":images[0].images
			}
			Response.data = responseData
			Response.message = null
			Response.success = true

		}catch(err){
			return logger(err,"getIdolGroup");
		}

		return Response;
	}
}