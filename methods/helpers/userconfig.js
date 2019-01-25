import configs from '../../configs/cnfServer.js'
import action from './mongodb.js'
import logger from './logger.js'
import encryptpassword from "./encryptpassword.js"



const user = async ()=>{
	try{

		let roles;
		try{
			roles = await action.read({
				"model":"roles_n_permission",
				"data":{
					"name":configs.super_role
				}
			});	
		}catch(err){
			console.log("he")
			await createRole();
		}
		
		
		if(roles.length < 1){
			console.log("Administrator role not found. Creating administrator role");
			await createRole();
		}
		let adminaccount;
		try{
			adminaccount = await action.read({
				"model":"user_admin",
				"data":{
					"roles":{
						"$in":configs.super_role
					}
				}
			});
		}catch(err){
			await createAdmin();
		}

		if(adminaccount.length < 1){
			console.log("Administrator account not found. Creating administrator role");
			await createAdmin();
		}
	}catch(err){
		logger(err,"User config");
	}
}
export default user;




const createRole = async () => {
	await action.create({
		"model":"roles_n_permission",
		"data":{
			"name":configs.super_role,
			"description":"A super role for administrator.",
			"create":["all"],
			"read":["all"],
			"update":["all"],
			"delete":["all"],
			"view":["all"],
			"meta":{
				"created":Date.now(),
				"lastupdate":Date.now()
			}
		}
	});
}

const createAdmin = async () => {
	await action.create({
		"model":"user_admin",
		"data":{
			"password": await encryptpassword(configs.admin_secret),
			"username": configs.administrator,
			"roles":[configs.super_role],
			"meta":{
				"created":Date.now(),
				"lastlogin":Date.now(),
				"passwordStatus":true,
				"status":true,
				"account":true
			}
		},
	});
}