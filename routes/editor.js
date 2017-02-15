var express = require('express');
var ft = require('../service/GetFileTree.js');
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

module.exports = router;
