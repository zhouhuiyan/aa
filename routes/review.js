var express = require('express');
var router = express.Router();
var $aa = require('../db/db');

/* GET one article review listing. */
router.get('/list', function(req, res, next) {
  console.log(req);
  $aa.query('select * from review',function(error,result,fieleds){
    if(error) throw error;
    res.json(result);
  })
  // res.send('respond with a resource');
});
/* GET article listing. */
router.get('/list', function(req, res, next) {
  console.log(req);
  $aa.query('select * from article',function(error,result,fieleds){
    if(error) throw error;
    res.json(result);
  })
  // res.send('respond with a resource');
});
module.exports = router;

