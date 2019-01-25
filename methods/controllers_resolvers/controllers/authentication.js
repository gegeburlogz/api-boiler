const authentication = async (ctx,next)=>{
	let response = {
		"success":false,
		"message":[{
			"path":"authorization",
			"message":"Session expired please re-login again."

		}]
	}
	if (!ctx.headers.authorization) {
		ctx.body = response	
	}else{
		console.log(ctx.request.body)
		await next();
	}
	
}




export default authentication;