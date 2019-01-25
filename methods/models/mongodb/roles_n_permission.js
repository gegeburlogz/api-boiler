import mongoose from 'mongoose';
const Schema = mongoose.Schema;

module.exports = mongoose.model('roles_n_permission',
	new Schema({
		name:String,
		description:String,
		create:Array,
		read:Array,
		update:Array,
		delete:Array,
		view:Array,
		meta:{
			created:Date,
			lastupdate:Date
		}
	})
);
