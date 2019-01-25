import bcrypt from 'bcryptjs';
import mongodb from './mongodb.js';


const isExist = async(email) =>{
	const user = await mongodb.read({
		model:"user",
		data:{
			"email":email
		}
	});

	return (user.length > 0 )? true:false	
}

export default isExist;


// validate the email in the database