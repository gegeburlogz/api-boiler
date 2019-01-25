import {graphql} from 'graphql';
import graphqlschema from '../../graphqlschema';
import resolvers from '../resolvers'
import cnfServer from '../../../configs/cnfServer.js'


const controller = async(ctx)=>{
	const body = ctx.request.body
	if ( Object.keys(body).length > 0 ) {
		const query = ctx.request.body.query
		const expressGraqp = await graphql(
			graphqlschema,
			query,
			resolvers,
			{
				auth:ctx.headers.authorization
			},
			(ctx.request.body.variables)? ctx.request.body.variables:""
		);

		if (expressGraqp.errors) {
			console.log(expressGraqp.errors)
			ctx.body = "System failure. Please try again later";
			ctx.status = 500
		}
		const functionName = Object.keys(expressGraqp.data);
		if(functionName.length > 1){
			ctx.body = expressGraqp.data;	
		}else{
			ctx.body = expressGraqp.data[functionName[0]]
		}
		
		ctx.status = 200

	} else {
		console.log("3")
		ctx.redirect(cnfServer.home_path);
	}

	
	
}

export default controller;