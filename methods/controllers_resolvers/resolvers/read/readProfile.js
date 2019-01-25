import {logger,mongodb,permissions} from '../../../helpers';

export default {
	profile:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[],
			"data":null
		};

		try{
			const permission = await permissions(ctx.auth);
			
			if (!permission.success){
				return permission;
			}
			
			const user = await mongodb.read({
				"model":"user",
				"data":{
					"_id":permission.data.id
				}
			});

			Response.data = {
				"firstname":user[0].firstname,
				"lastname":user[0].lastname,
				"email":user[0].email,
				"dateOfBirth":user[0].birthdate,
				"country":user[0].address.country,
				"phoneNumber":user[0].phone,
				"profileimage":user[0].profileimage
			};
			Response.success = true


		}catch(err){
			return logger(err,"readProfile");
		}

		if(Response.message.length < 1){
			Response.message = null;
		}

		return Response
	}
}