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
function count(){
  var query = 'select count(*) as count from reviews';
  $aa.query(query,function(error,result,fieleds){
    if(error) throw error;
    return JSON.parse(JSON.stringify(result[0]));
  })
}
/* GET review listing. */
router.get('/list', function(req, res, next) {
  var offset = 1;
  var page_size = 1;
  if(req.query.offset){
    offset = req.query.offset-1;
  }
  if(req.query.page_size){
    page_size = req.query.page_size;
  }
  var data = {};
  var count = {};
  var querys = 'select count(*) as count from reviews';
  $aa.query(querys,function(e,r,f){
    if(e) throw e;
    count = JSON.parse(JSON.stringify(r[0])).count;
  })
  var query = 'select a.*,b.title as title,c.nickname as critics from reviews a,article b,user c where a.art_id = b.id AND a.author_id = c.id ORDER BY a.`createtime` DESC LIMIT '+offset*page_size+', '+page_size;
  $aa.query(query,function(error,result,fieleds){
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,{count:count,reviewlist:result});
    }
    res.json(data)
  })
});
/* GET one review info. */
router.get('/view', function(req, res, next) {
  console.log(req);
  console.log(req.query);
  var offset = 1;
  var page_size = 1;
  var query = 'select a.*,b.title as title,c.nickname as critics from reviews a,article b,user c where a.art_id = b.id AND a.author_id = c.id';
  if(req.query.id){
  query = 'select a.*,b.title as title,c.nickname as critics from reviews a,article b,user c where a.id = '+req.query.id+' AND a.art_id = b.id AND a.author_id = c.id ';
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
router.post('/edit_state', function(req, res, next) {
  console.log("hshhs:",req.body.state);
  var state = 0;
  var id = 1;
  state = req.body.state;
  id = req.body.id;
  $aa.query('update reviews set state='+state+' where id = '+id,function(error,result,fieleds){
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

