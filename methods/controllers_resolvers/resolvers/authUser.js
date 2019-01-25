import {isEmailExist,validatePassword,logger,mongodb,validateemail,tokenize,isUserExist} from '../../helpers';

export default {
	SignIn:async(args,ctx) => {
		const username = args.input.email, password =  args.input.password;
		let Response = {
			"success":false,
			"message":[],
			"data":{
				"token":"",
				"email":""
			}
		}

		try{

			if(!validateemail(username)){
				Response.message.push({
					"path":"Email",
					"message":"Invalid email address."
				});
				delete Response.data
				return Response;
			}

			if(!await isEmailExist(username)){
				Response.message.push({
					"path":"Sign in",
					"message":"Username or Password did not match"
				});
				console.log(Response)
				delete Response.data
				return Response;
			}

			const oldPassword =  await mongodb.read(
				{
					"model":"user",
					"data":{
						"email":username
					}
				},
				{
					"select":{
						"password":1,
						"email":1
					}
				});

			if(!await validatePassword({"password":password,"oldpassword":oldPassword[0].password,"model":"user"})){
				Response.message.push({
					"path":"Sign in",
					"message":"Username or Password did not match"
				});
				return Response;
			}


			const updateuser = await mongodb.update({
				"model":"user",
				"query":{
					"_id":oldPassword[0]._id
				},
				"data":{
					"$set":{
						"meta.status":true,
						"meta.lastlogin":Date.now()
					}
				}
			});

			const token =await tokenize.sign({
				"email":oldPassword[0].email,
				"id":oldPassword[0]._id
			},"2h");
			Response.success = true;
			Response.data.token = token;
			Response.data.email = oldPassword[0].email;
			(Response.message.length > 0)?  "":Response.message = null;

		}catch(err){
			return logger(err,"Sign in")
		}

		return Response;
	},
	AdminSignIn:async(args,ctx) => {
		const username = args.input.username, password =  args.input.password;
		let Response = {
			"success":false,
			"message":[],
			"data":{
				"token":"",
				"email":""
			}
		}

		try{

			if(!await isUserExist({"username":username,"model":"user_admin"})){
				Response.message.push({
					"path":"Sign in",
					"message":"Username or Password did not match"
				});	
				delete Response.data
				return Response;
			}

			const oldPassword =  await mongodb.read(
				{
					"model":"user_admin",
					"data":{
						"username":username
					}
				},
				{
					"select":{
						"password":1,
						"email":1
					}
				});


			if(!await validatePassword({"password":password,"oldpassword":oldPassword[0].password,"model":"user_admin"})){
				Response.message.push({
					"path":"Sign in",
					"message":"Username or Password did not match"
				});
				return Response;
			}



			const updateuser = await mongodb.update({
				"model":"user_admin",
				"query":{
					"_id":oldPassword[0]._id
				},
				"data":{
					"$set":{
						"meta.status":true,
						"meta.lastlogin":Date.now()
					}
				}
			});

			const token =await tokenize.sign({
				"email":oldPassword[0].email,
				"id":oldPassword[0]._id
			},"2h");
			Response.success = true;
			Response.data.token = token;
			Response.data.email = oldPassword[0].email;
			(Response.message.length > 0)?  "":Response.message = null;

		}catch(err){
			return logger(err,"Admin Sign in")
		}

		return Response;
	}
	// SignOut:async(args,ctx) => {
	// 	return args.input
	// },
	// ForgetPassword:async(args,ctx) => {
	// 	return args.input
	// },
}