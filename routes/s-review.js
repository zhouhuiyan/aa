var express = require('express');
var router = express.Router();
var $aa = require('../db/db');

function returndata(code,data,error){
  var returndata = {
    status:{
      code:code,
      message:'请求成功',
    },
    datalist:data
  };
  if(code == 0){
    returndata.status.message='请求成功';
  }else{
    if(error){
      returndata.status.message=error;
    }else{
      returndata.status.message= '请求失败';
    }
  }
  return returndata;
}
function selects(tablename,fields='*',conditions = ''){
  var query = '';
  // SELECT * FROM `zhy_test`.`reviews` ORDER BY `id` DESC LIMIT 0, 1000
  if(tablename){
    query = 'select '+fields+' from '+tablename+' '+conditions
  }
}
/* GET review listing. */
router.get('/list', function(req, res, next) {
  console.log(req);
  console.log(req.query);
  var offset = req.query.offset-1;
  var page_size = req.query.page_size;
  $aa.query('select * from reviews ORDER BY `id` DESC LIMIT '+offset+', '+page_size,function(error,result,fieleds){
    // if(error) throw error;
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data)
  })
});
router.get('/add', function(req, res, next) {
  console.log(req);
  $aa.query('select * from review',function(error,result,fieleds){
    // if(error) throw error;
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data)
  })
});
router.get('/del', function(req, res, next) {
  console.log(req);
  $aa.query('select * from review',function(error,result,fieleds){
    // if(error) throw error;
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data)
  })
});
module.exports = router;

