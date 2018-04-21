var  multer=require('multer')
var storage = multer.diskStorage({
  // 设置上传后文件路径，文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  }, 
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    console.log(file)
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
var upload = multer({
  storage: storage
})
module.exports = upload
