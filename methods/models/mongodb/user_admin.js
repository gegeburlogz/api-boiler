import mongoose from 'mongoose';
const Schema = mongoose.Schema;

module.exports = mongoose.model('user_admin',
	new Schema({
		password:String,
		// details
		username:String,
		email:String,
		fullname:String,
		firstname:String,
		lastname:String,
		middlename:String,
		language:String,
		phone:String,
		birthdate:Date,
		address:{
			country:String,
			city:String,
			street:String,
			state:String
		},
		roles:Array,
		profileimage:String,
		// meta
		meta:{
			created:Date,
			lastlogin:Date,
			isDisabled:Date,
			passwordStatus:Boolean,
			status:Boolean,
			account:Boolean
		}
	})
);
