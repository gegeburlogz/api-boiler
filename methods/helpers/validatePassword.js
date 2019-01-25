import bcrypt from 'bcryptjs';
import mongodb from './mongodb.js';

const isPassword = async(data = {"password":null,"oldpassword":null,"pid":null,"model":"user"}) =>{
	if(data.pid){
		const user = await mongodb.read(
			{
				"model":data.model,
				"data":{
					"_id":data.id
				}
			},{
				"select":{
					"password":1,
				}
			}
		);
		data.oldpassword =  user[0].password;
	}

	return await bcrypt.compare(data.password,data.oldpassword);
}

export default isPassword;


// validate the email in the database