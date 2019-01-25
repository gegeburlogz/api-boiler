import {logger,capitalize,mongodb,permissions} from '../../../helpers';
import {super_role} from '../../../../configs/cnfServer.js'

export default {
	UpdateRole:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[]
		}
		
		let data = {
			"name":args.input.name,
			"description":args.input.description,
			"view":args.input.view,
			"read":args.input.read,
			"update":args.input.update,
			"delete":args.input.delete,
			"create":args.input.create
		}

		const id = args.id

		const permission = await permissions(ctx.auth,"roles_n_permission","update");
		if (!permission.success){
			return permission;
		}

		try{


			const fields = Object.keys(data)
			for (var i = 0; i < fields.length; i++) {
				if(args.input[fields[i]] === null || args.input[fields[i]] === undefined){
					delete data[fields[i]]
				}
			}
			await mongodb.update({
				"model":"roles_n_permission",
				"query":{
					"_id":id
				},
				"data":{
					"$set":data
				}
			});

			Response.success = true
			Response.message = null

		}catch(err){
			return logger(err,"update roles permission");
		}

		return Response;
	}
}