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
/* GET article listing. */
router.get('/', function(req, res, next) {
  $aa.query('select * from type where status = 0',function(error,result,fieleds){
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,{count:count,typelist:result});
    }
    res.json(data);
  })
  // res.send('respond with a resource');
});

module.exports = router;

