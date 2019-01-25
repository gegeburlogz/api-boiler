import {logger,capitalize,encryptpassword,validateemail,mongodb,isEmailExist} from '../../../helpers';


export default {
	create_user:async(args,ctx) => {
		let Response = {
			"success":false,
			"message":[]
		}
		try{
			let data = {
				"firstname":capitalize(args.input.firstname),
				"lastname":capitalize(args.input.lastname),
				"email":args.input.email,
				"password":await encryptpassword(args.input.password),
				"meta":{
					"account":true,
					"created":Date.now()
				}
			}

			if(!validateemail(data.email)){
				Response.message.push({
					"path":"Email",
					"message":"Invalid email address."
				});
				return Response;
			}

			if(await isEmailExist(data.email)) {
				Response.message.push({
					"path":"Email",
					"message":"This email address already exist"
				});
				return Response;
			}
			
			const newuser = await mongodb.create({model:"user",data:data});
			Response.success = true


		}catch(err){
			return logger(err,"create_user");
		}

		return Response;
	}
}