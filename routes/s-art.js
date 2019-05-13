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
  var querys = 'select count(*) as count from article';
  $aa.query(querys,function(e,r,f){
    if(e) throw e;
    count = JSON.parse(JSON.stringify(r[0])).count;
  })
  $aa.query('select a.*,b.account as author from article a,user b where a.author_id = b.id ORDER BY `createtime` DESC LIMIT '+offset*page_size+', '+page_size,function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,{count:count,artlist:result});
    }
    res.json(data);
  })
});

router.post('/add', function(req, res, next) {
  var data={
    type:req.body.type, 
    title:req.body.title,
    content:req.body.content,
    author_id:1,
    status:0,
    comments:0,
    createtime:Math.floor(Date.now()/1000),
    updatetime:Math.floor(Date.now()/1000),
    dest:req.body.dest,
    views:0,
  }
  var values = [];
  for(element in data){
    var datas = data[element];
    if(element == 'title' || element == 'content' || element == 'dest'){
      datas = '"'+data[element]+'"';
    }
    values.push(datas);
  };
  values = values.join(',');
  var fieled = '( type,title,content,author_id,status,comments,createtime,updatetime,dest,views)';
    $aa.query('insert into article '+fieled+' values (' + values + ')',function(error,result,fieleds){
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
    type:req.body.type, 
    title:req.body.title,
    content:req.body.content,
    author_id:1,
    status:0,
    comments:0,
    createtime:Math.floor(Date.now()/1000),
    updatetime:Math.floor(Date.now()/1000),
    dest:req.body.dest,
    views:0,
  }
  var values = [];
  for(element in data){
    var datas = data[element];
    if(element == 'title' || element == 'content' || element == 'dest'){
      datas = element +"='"+data[element]+"'";
    }else{
      datas = element + "=" +data[element];
    }

    values.push(datas);
  };
  console.log("yyyyy:",values);
  values = values.join(',');
  console.log("rrrrr:",values);

    $aa.query("update article set "+ values + " where id="+req.body.id,function(error,result,fieleds){
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
router.post('/del', function(req, res, next) {
  var status = 1;
  var id = 1;
  id = req.body.id;
  $aa.query('update article set status='+status+' where id = '+id,function(error,result,fieleds){
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

