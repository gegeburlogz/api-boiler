import mongoose from 'mongoose';
const Schema = mongoose.Schema;

module.exports = mongoose.model('idol_group',
	new Schema({
		firstname:String,
		lastname:String,
		middlename:String,
		description:String,
		groupname:String,
		idolname:String,
		profileimage:String,
		tag:String,
		// meta
		meta:{
			created:Date,
			lastupdate:Date,
			status:Boolean,
		}
	})
);
