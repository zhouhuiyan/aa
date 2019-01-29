var express = require('express');
var router = express.Router();
var $aa = require('../db/db');

/* GET article listing. */
router.get('/', function(req, res, next) {
  $aa.query('select * from article',function(error,result,fieleds){
    if(error) throw error;
    res.json(result);
  })
  // res.send('respond with a resource');
});

router.get('/user', function(req, res, next) {
  $aa.query('select * from test',function(error,result,fieleds){
    if(error) throw error;
    res.json(result);
  })
  // res.json({
  //   name: 'ddafdasfd11'
  // })
});

module.exports = router;

