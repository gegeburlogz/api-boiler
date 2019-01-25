import configs from '../../configs/cnfServer.js'
import jwt from 'jsonwebtoken'

export default {
	sign:async (payload = {}, expiry = '1h') =>{
		const secret = configs.server_secret;
		const token = await jwt.sign(payload,secret, { 
			"expiresIn": expiry
		});

		return token
	},

	verify:async() =>{
		return {
			"success":true,
			"data":null
		}
	}
}


// wiki
