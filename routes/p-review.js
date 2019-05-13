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
  $aa.query('select a.*,b.title as title,c.nickname as author from reviews a,article b,user c where a.art_id = b.id AND a.author_id = c.id and a.art_id = '+req.query.id +' ORDER BY a.`createtime` DESC ',function(error,result,fieleds){
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
router.post('/add', function(req, res, next) {
  var data={
    art_id:req.body.id, 
    content:req.body.content, 
    author_id:req.body.author_id,
    status:0,
    createtime:Math.floor(Date.now()/1000),
    updatetime:Math.floor(Date.now()/1000),
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
  var fieled = '( type,title,content,author_id,status,comments,createtime,updatetime,dest,views)';
    $aa.query("insert into review "+ fieled + " values (" + values + ")",function(error,result,fieleds){
      var data = {};
      if(error){
        data=returndata(error.errno,result,error.sqlMessage);
      }else{
        data=returndata(0,result);
      }
      res.json(data);
  })
});
module.exports = router;

