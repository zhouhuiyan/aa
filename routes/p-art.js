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
router.get('/list', function(req, res, next) {
  var offset = 1;
  var page_size = 1;
  if(req.query.offset){
    offset = req.query.offset-1;
  }
  if(req.query.page_size){
    page_size = req.query.page_size;
  }
  var count = {};
  var querys = 'select count(*) as count from article where status = 0';
  $aa.query(querys,function(e,r,f){
    if(e) throw e;
    count = JSON.parse(JSON.stringify(r[0])).count;
  })
  $aa.query('select * from article where status = 0 ORDER BY `createtime` DESC LIMIT '+offset*page_size+', '+page_size,function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,{count:count,artlist:result});
    }
    res.json(data);
  })
});
router.get('/view', function(req, res, next) {
  console.log(req);
  console.log(req.query);
  var offset = 1;
  var page_size = 1;
  var query = 'select a.*,b.name as typename,c.nickname as author from article a,type b,user c where a.type = b.id AND a.author_id = c.id';
  if(req.query.id){
  query = 'select a.*,b.name as typename,c.nickname as author from article a,type b,user c where a.id = '+req.query.id+' AND a.type = b.id AND a.author_id = c.id ';
  }
  $aa.query(query,function(error,result,fieleds){
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

