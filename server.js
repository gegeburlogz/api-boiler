import koa from 'koa';
import condom from 'koa-helmet'
import config from "./configs/cnfServer.js";
import cors from "koa2-cors"
import mongodb_con from "./db/mongodb"
import route from "./methods"
// import bodyParser from "koa-bodyparser";
// formidable uninstall
import bodyParser from "koa-body";
import accountSession from "./methods/jobs/accountSession.js";
import userconfig from "./methods/helpers/userconfig.js";


const app = new koa();
app.use(cors({
	"origin":'*'
	}))
	.use(condom()) //  For Securities
	.use(bodyParser({
		"multipart": false,
		"json":true,
		"form":true
	}))// for files and body post datas
   	.use(route.routes())
   	.use(route.allowedMethods())
;

app.listen(config.server_port, () => {
  console.log("Started server on port " + config.server_port);
  mongodb_con();
});

	
accountSession();
userconfig();