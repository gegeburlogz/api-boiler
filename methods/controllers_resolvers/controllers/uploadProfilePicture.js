import multer from 'koa-multer';
import fs from 'fs';
import logger from '../../helpers/logger.js';
import permissions from '../../helpers/permissions.js'
import mongodb from '../../helpers/mongodb.js'

const mimetype = {
	"image/jpeg":".jpg",
	"image/png":".png",
	"image/svg+xml":".svg",
	"image/svg":".svg",
	"image/jpg":".jpg",
	"image/gif":".gif",
}


const fileFilter = (req,file,cb) => {
	console.log(file)
	const mime =  Object.keys(mimetype);
	const index = mime.indexOf(file.mimetype);
	if(index < 0 ){
		cb(new Error('format'))
	}else{
		cb(null,true)	
	}
}



const storage = multer.diskStorage({
  destination:(req,file, cb) => {
    cb(null, 'public')
  },
  filename:async function (req, file, cb) {
  		console.log(file)
  		console.log(req.body)
  	const token = await permissions(req.headers.authorization)
  	try{
	  	await mongodb.update({
	  		"model":"user",
	  		"query":{
	  			"_id":token.data.id
	  		},
	  		"data":{
	  			"$set":{
	  				"profileimage":"public/profile"+token.data.id
	  		}}
	  	});
	}catch(err){
		console.log(err)
	}

	try{
	  	await mongodb.update({
	  		"model":"user_admin",
	  		"query":{
	  			"_id":token.data.id
	  		},
	  		"data":{
	  			"$set":{
	  				"profileimage":"public/profile"+token.data.id
	  		}}
	  	});
	}catch(err){
		console.log(err)
	}

    cb(null, "profile"+token.data.id+mimetype[file.mimetype])
  }
})

export default multer({
	"fileFilter":fileFilter,
	"limits":{
		"fileSize":100000
	},
	"storage": storage
});