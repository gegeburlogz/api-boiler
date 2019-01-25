import logger from '../../helpers/logger.js'

const reponse = async(ctx,next) => {
 try{
 	await next();
 }catch(err){
 	let Response = {
 		"success":false,
 		"message":[]
 	}
 	logger(err,"")
 	if (err.message === "format" ) {
 		Response.message.push({
 			"path":"File",
 			"message":"Invalid file type. Accepts .jpg, .png, .svg, .gif"
 		})
 	}else if(err.message === "File too large"){
 		Response.message.push({
 			"path":"File",
 			"message":"File size is too large.Below 100kb"
 		})		
 	}
 	ctx.status = 200
 	ctx.body = Response
 }
}

export default reponse;