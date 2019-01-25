import {isEmailExist,validatePassword,logger,mongodb,validateemail,tokenize,permissions} from '../../../helpers';

export default {
	profileUpdate:async(args,ctx) => {
		let message = [],response = {
			"success":false,
			"message":message
		};

		const permission = await permissions(ctx.auth);
		if (!permission.success){
			return permission;
		}

		try{
			if(!await validatePassword(args.password,"",permission.data.id)){
				message.push({
					"path":"Password",
					"message":"Invalid password"
				});
				return response;
			}

			let dataa = {
				"firstname":args.input.firstname,
				"lastname":args.input.lastname,
				"email":args.input.email,
				"birthdate":args.input.dateOfBirth,
				"address.country":args.input.country,
				"phone":args.input.phoneNumber
			};

			await mongodb.update({
				"model":"user",
				"query":{
					"_id":permission.data.id
				},
				"data":{
					"$set":dataa
				}
			});

			response.success = true
		}catch(err){
			return logger(err,"Profile update");
		}

		if(message.length < 1){
			response.message = null
		}
		return response;
	}
}