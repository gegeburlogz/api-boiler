import routes from 'koa-router';
import controller from './controllers_resolvers/controllers'
const routees = new routes();
import resources from '../public'
const send = require('koa-send');

routees.post('/uploadprofile',
	controller.authentication,
	controller.errorhandler,
	controller.uploadProfilePicture.single('file'),async (ctx) => {
		console.log(ctx.request.body)
		ctx.body = {
			 		"success":false,
			 		"message":null
			 	}
		ctx.status = 200;
	}
);

routees.all('/',async(ctx)=>{ await controller.graphql(ctx)}); //grapqhql

routees.get('/public/:fileid',async (ctx,next) => {
	if (!ctx.params.fileid){
		return ctx.status(400).send('No file indicated.');
	}else{
		await send(ctx,resources(ctx.params.fileid).name);
	}
});

export default routees;