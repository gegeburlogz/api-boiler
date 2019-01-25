import {logger,capitalize,mongodb,permissions} from '../../../helpers';
import {super_role} from '../../../../configs/cnfServer.js'

export default {
	NewRole:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[]
		}
		let hasErrors = false
		
		const permission = await permissions(ctx.auth,"roles_n_permission","create");
		if (!permission.success){
			return permission;
		}

		try{
			const fields = ["create",'update',"delete","read","view"];

			if(args.input.name === super_role){
				Response.message.push({
					"path":"Name",
					"message":"Role name already exists."
				});

				return Response;
			}
			let data = {
				"name":args.input.name,
				"description":args.input.description,
				'create':null,
				"read":null,
				"update":null,
				"delete":null,
				"view":null,
				"meta":{
					"created":Date.now(),
					"lastupdate":Date.now()
				}
			}
			for (var i = 0; i < fields.length; i++) {
				if(args.input[fields[i]] !== null){
					if(!Array.isArray(args.input[fields[i]])){
						Response.push({
							"path":args.input[fields[i]],
							"message":"Field must be a array"
						});

						hasErrors = true
					}else{
						data[fields[i]] = args.input[fields[i]]
					}
				}
			}

			if(hasErrors){
				return Response
			}

			await mongodb.create({
				"model":"roles_n_permission",
				"data":data
			});
			if(Response.message.length < 1){
				Response.message = null
			}
			Response.success = true


		}catch(err){
			return logger(err,"create roles permission");
		}

		return Response;
	}
}