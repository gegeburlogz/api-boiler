import {logger,capitalize,mongodb,permissions} from '../../../helpers';
import {super_role} from '../../../../configs/cnfServer.js'

export default {
	DeleteRoles:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[]
		}


		const permission = await permissions(ctx.auth,"roles_n_permission","delete");
		if (!permission.success){
			return permission;
		}

		const RolesId = args.input


		try{
			await mongodb.delete({
				"model":"roles_n_permission",
				"data":{
					"_id":{
						"$in":RolesId
					}
				}
			},true);
			await mongodb.update(
				{
					"model":"user_admin",
					"query":{
						"roles":{
							"$in":RolesId
					} },
					"data":{
						"$pull":{
							"roles":{
								"$in":RolesId
							}
						}	
					}
				},{},true
			);

			Response.success = true
			Response.message = null
		}catch(err){
			return logger(err,"Delete roles permission");
		}

		return Response;
	}
}