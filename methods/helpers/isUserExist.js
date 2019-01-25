import bcrypt from 'bcryptjs';
import mongodb from './mongodb.js';


const isExist = async(data = {"username":null , "email":null , model:"user"}) =>{
	const data_d = Object.assign({},data);
	delete data_d.model
	const user = await mongodb.read({
		model:data.model,
		data:data_d
	});

	return (user.length > 0 )? true:false	
}

export default isExist;


// validate the email in the database