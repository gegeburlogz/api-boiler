import {logger,mongodb,permissions} from '../../../helpers';


export default {
	newIdolGroup:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[]
		}

		const permission = await permissions(ctx.auth,"idol_group","create");
		if (!permission.success){
			return permission;
		}

		try{

			let data = {
				"description":args.input.description,
				"groupname":args.input.groupname,
				"idolname":args.input.idolname,
				"tag":args.input.tag,
				"meta":{
					"created":Date.now(),
				}
			}
			
			await mongodb.create({
				"model":"idol_group",
				"data":data
			});

			Response.success = true
			Response.message = null

		}catch(err){
			return logger(err,"newIdolGroup");
		}

		return Response;
	}
}