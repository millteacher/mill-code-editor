var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Editor' });
});

module.exports = router;// 访问的路径如果是127.0.0.1:3000/
