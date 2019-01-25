import multer from 'koa-multer';
import fileType from 'file-type';
import fs from 'fs';
import logger from '../../helpers/logger.js'

const fileFilter = (req,file,cb) => {
	cb(new Error('I don\'t have a clue!'))
	cb(null, false)
}
const mimetype = {
	"image/jpeg":".jpg",
	"image/png":".png",
	"image/svg+xml":".svg",
	"image/svg":".svg",
	"image/jpg":".jpg",
	"image/gif":".gif",
}


const storage = multer.diskStorage({
  destination:(req,file, cb) => {
    cb(null, 'resources')
  },
  filename: function (req, file, cb) {
    cb(null, "profile" + '-' + Date.now()+mimetype[file.mimetype])
  }
})


// const upload = 




// const received = async (ctx,next) =>{
// 	try{
// 		multer({
// 	// fileFilter:fileFilter,
// 			storage: storage
// 		});
// 	}catch(err){
// 		logger(err,"Upload File")
// 	}
// 	ctx.body =  "hello"
// }

export default multer({
	fileFilter:fileFilter,
	storage: storage
});