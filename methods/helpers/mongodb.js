const modela = require('../models/mongodb')
import logger from './logger.js' 
export default {

	create: async(datas = { "model":null , "data":null }) =>{

		const modelname_ = new modela[datas.model](datas.data);
		const get = await modelname_.save().catch((err)=>{
			throw new Error (false)
			logger(err,"mongodb>create>"+modelname_)
		});	
		return get;
		
	},

	read: async(datas = { "model":null, "data":null }, options = { "sort":null, "skip":null, "limit":null, "filter":null, "select":null } ) =>{

		return await modela[datas.model].find(datas.data)
			.sort(options.sort)
			.skip(options.skip)
			.limit(options.limit)
			.select(options.select);

	},

	update: async(datas = { "model":null, "data":null,"query":null }, options = { "upsert":false}, multi=false) =>{
		const update = {
			"true":"updateMany",
			"false":"updateOne"
		}
		return await modela[datas.model][update[multi]](datas.query,datas.data,options).catch(err => {
			logger(err,"mongodb>update>"+datas.model)
			throw new Error (false)
		});
	},

	delete: async(datas = { "model":null, "data":null},multi=false) =>{
		const isDelete = {
			"true":"deleteMany",
			"false":"deleteOne"
		}
		return await modela[datas.model][isDelete[multi]](datas.data).catch(err => {
			logger(err,"mongodb>delete>"+datas.model)
			throw new Error (false)
		});
	}
};