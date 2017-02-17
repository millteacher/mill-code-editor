var express = require('express');
var ft = require('../service/GetFileTree.js');
var muitls = require('mill-n-utils');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Editor' });
});
/**
req:request,请求
res:response,响应
*/
router.get('/filetree',function  (req, res, next) {
	var fileTreeObj=ft.walk('E:/editor/mill-code-editor',['node_modules','bower_components']);
	res.json(fileTreeObj);
});

router.post('/readFile',function  (req, res, next) {
	if(req.body.path){
		var content=muitls.fs.read(req.body.path);
		res.send(content);
	}
})
router.post('/saveFile',function  (req, res, next) {
	if(req.body.path){
		fs.writeFileSync(req.body.path,req.body.content);
		res.send("完成");//缓存有问题
	}
})

module.exports = router;
