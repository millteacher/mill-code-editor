var express = require('express');
var codeManagerService=require('../service/CodeManagerService.js');

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

module.exports = router;
