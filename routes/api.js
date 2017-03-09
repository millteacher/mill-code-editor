var express = require('express');
var CommonService=require('../service/CommonService.js');
var mutil=require("mill-n-utils");
var router = express.Router();
CommonService.setDb('business');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("api");
});

router.get('/get_all/:tableName',function  (req, res, next) {
	var arg=req.query.arg?req.query.arg:[];
	console.log(req.query);
	if(req.query.key){
		var promiseResult=CommonService.getAll(arg,req.params.tableName,req.query.key);
	}else
	var promiseResult=CommonService.getAll(arg,req.params.tableName);
	promiseResult.then(function  (data) {
		res.json(data);
	},function  (err) {
		res.send(err);
	});
});
router.get('/get_row/:tableName/:id',function  (req, res, next) {
	var promiseResult=CommonService.getRow([req.params.id],req.params.tableName);
	promiseResult.then(function  (data) {
		res.json(data);
	},function  (err) {
		res.send(err);
	});
});

router.post('/insert',function  (req, res, next) {
	var promiseResult=CommonService.insert(req.body.data,req.body.table);
	promiseResult.then(function  () {
		res.send("insert success");
	},function  (err) {
		res.send(err);
	});
});

router.post('/update',function  (req, res, next) {
	var promiseResult=CommonService.update(req.body.data,req.body.table);
	promiseResult.then(function  () {
		res.send("update success");
	},function  (err) {
		res.send(err);
	});
});
router.get('/delete_row/:tableName/:id',function  (req, res, next) {
	console.log(req.params.id);
	var promiseResult=CommonService.deleteRow([req.params.id],req.params.tableName);
	promiseResult.then(function  () {
		res.send("delete success");
	},function  (err) {
		res.send(err);
	});
});

router.post('/doSql',function  (req, res, next) {
	var promiseResult=CommonService.doSql(req.body.data,req.body.table,req.body.key);
	promiseResult.then(function  () {
		res.send("doSql success");
	},function  (err) {
		res.send(err);
	});
});

module.exports = router;
