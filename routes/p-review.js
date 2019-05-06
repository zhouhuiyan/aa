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
/* GET review listing. */
router.get('/list', function(req, res, next) {
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

