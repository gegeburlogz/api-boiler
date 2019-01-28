import mongoose from 'mongoose';
const Schema = mongoose.Schema;

module.exports = mongoose.model('images',
	new Schema({
		tag:String,
		images:[],
		// meta
		meta:{
			created:Date,
			lastupdate:Date,
		}
	})
);
