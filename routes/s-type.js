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
router.get('/alist', function(req, res, next) {
  $aa.query('select * from type where status = 0',function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data);
  })
});
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
  var querys = 'select count(*) as count from type';
  $aa.query(querys,function(e,r,f){
    if(e) throw e;
    count = JSON.parse(JSON.stringify(r[0])).count;
  })
  $aa.query('select * from type LIMIT '+offset*page_size+', '+page_size,function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,{count:count,typelist:result});
    }
    res.json(data);
  })
});

router.post('/add', function(req, res, next) {
  var data={
    name:req.body.name, 
  }
  var values = [];
  for(element in data){
    var datas = data[element];
    if(element == 'name'){
      datas = "'"+data[element]+"'";
    }
    values.push(datas);
  };
  values = values.join(',');
    $aa.query("insert into type (name) values ('" + req.body.name + "')",function(error,result,fieleds){
      var data = {};
      if(error){
        data=returndata(error.errno,result,error.sqlMessage);
      }else{
        data=returndata(0,result);
      }
      res.json(data);
  })
});
router.post('/edit', function(req, res, next) {
  var data={
    name:req.body.name, 
  }
    $aa.query("update type set name = '"+data.name+"' where id = "+req.body.id,function(error,result,fieleds){
      var data = {};
      if(error){
        data=returndata(error.errno,result,error.sqlMessage);
      }else{
        data=returndata(0,result);
      }
      res.json(data);
  })
});
router.get('/view', function(req, res, next) {
  var query = 'select * from type';
  if(req.query.id){
  query = 'select * from type where id = '+req.query.id;
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
router.post('/del', function(req, res, next) {
  var status = 1;
  var id = 1;
  id = req.body.id;
  $aa.query('update type set status='+status+' where id = '+id,function(error,result,fieleds){
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

