import configs from '../../configs/cnfServer.js'
import jwt from 'jsonwebtoken'
import logger from './logger.js'
import mongodb from './mongodb.js'

const permission = async (token,model = null,action = null) => {
	let message = [],response = {
			"success":false,
			"message":message,
			"data":null
		};

	try {

		const secret = configs.server_secret;
		const payload = await jwt.verify(token, secret);
		let user1,user2;
		if(model){
			user1 = await mongodb.read(
				{
					"model":"user",
					"data":{
						"_id":payload.id
					}
				},{
					"select":{
						"roles":1
					}
				}
			);

			user2 = await mongodb.read(
				{
					"model":"user_admin",
					"data":{
						"_id":payload.id
					}
				},{
					"select":{
						"roles":1
					}
				}
			);
			if (user1.length > 0){
				if(!await validateDbpermission(model,action,user1[0].roles)){
					throw new Error("")	
				}
			} else if (user2.length > 0){
				if(!await validateDbpermission(model,action,user2[0].roles)){
					throw new Error("")
				}
			}else {
				throw new Error("")
			}
		}

		response.data =  payload
		response.success = true
	} catch(err) {
		logger(err,"permission");
		message.push({
			"path":"Session",
			"message":"Your session might be expired or not enough permission to this operation."
		});
		return response;
	}

	return response;
}

export default permission

const validateDbpermission = async(model,action,roles) =>{

	if(roles.indexOf(configs.super_role) !== -1){
		return true
	}

	for (var i = 0; i < roles.length; i++) {
		try{
			const permission = await mongodb.read(
			{
				"model":"roles_n_permission",
				"data":{
					"_id":roles[i]
				}
			});

			if(permission[0][action].indexOf(model) !== -1){
				break;
				return true
			}

		}catch(err){
			return false	
		}
	}

	return false;
}