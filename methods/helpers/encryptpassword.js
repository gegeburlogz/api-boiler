import bcrypt from 'bcryptjs'
import random from './random.js'

const to_hash = async(s) =>{
	const hash = await bcrypt.hash(s,random(12,16));
	return hash;
}

export default to_hash;


// use to encrpyt passwords this is using bcrypt libraries