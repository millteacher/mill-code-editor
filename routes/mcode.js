var express = require('express');
var codeManagerService=require('../service/CodeManagerService.js');
var mutil=require("mill-n-utils");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>success</h1>' );
});

router.get('/get_all',function  (req, res, next) {
	var promiseResult=codeManagerService.getAll();
	promiseResult.then(function  (data) {
		res.json(data);
	},function  (err) {
		res.send(err);
	});
});
router.get('/get_row/:id',function  (req, res, next) {
	var promiseResult=codeManagerService.getRow({id:req.params.id});
	promiseResult.then(function  (data) {
		res.json(data);
	},function  (err) {
		res.send(err);
	});
});

router.post('/insert',function  (req, res, next) {
	var promiseResult=codeManagerService.insert(req.body.data);
	promiseResult.then(function  () {
		res.send("insert success");
	},function  (err) {
		res.send(err);
	});
});

router.post('/update',function  (req, res, next) {
	var promiseResult=codeManagerService.update(req.body.data);
	promiseResult.then(function  () {
		res.send("update success");
	},function  (err) {
		res.send(err);
	});
});
router.get('/delete_row/:id',function  (req, res, next) {
	console.log(req.params.id);
	var promiseResult=codeManagerService.deleteModel({id:req.params.id});
	promiseResult.then(function  () {
		res.send("delete success");
	},function  (err) {
		res.send(err);
	});
});

router.post('/render_code',function  (req, res, next) {
	let tpl=req.body.data.template;
	let conf=req.body.data.content;
	

	if(tpl&&conf){
		try{
			conf=JSON.parse(conf);
			var result=mutil.ejs.render(tpl,conf);
			res.json({
				state:1,
				message:"代码生成成功",
				data:result
			});
		}catch(err){
			res.json({
				state:-1,
				message:"模板解析错误或代码生成错误,请检查配置",
				data:{}
			});
		}
		
		
	}else{
		res.json({
				state:0,
				message:"代码生成失败,请检查你的参数",
				data:{}
			});
	}

});
module.exports = router;
