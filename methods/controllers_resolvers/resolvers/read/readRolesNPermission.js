import {logger,capitalize,mongodb,permissions} from '../../../helpers';
import {super_role} from '../../../../configs/cnfServer.js'


export default {
	GetRoles:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[],
			"data":null
		}
		try{
			const permission = await permissions(ctx.auth,"roles_n_permission","read");
			if (!permission.success){
				return permission;
			}

			const roles = await mongodb.read({
				"model":"roles_n_permission",
				"data":{}
			});


			const index = roles.filter(role=>role.name === super_role)
			if (index > -1) {
			  roles.splice(index, 1);
			}
			Response.data = roles
			Response.message = null
			Response.success = true

		}catch(err){
			return logger(err,"create roles permission");
		}

		return Response;
	}
}