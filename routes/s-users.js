var express = require('express');
var router = express.Router();
var $aa = require('../db/db');



// router.all('*', (ctx, next) => {  
//   // 允许来自所有域名请求  
//   ctx.set('Access-Control-Allow-Origin', '*');  
  
//   // 是否允许发送Cookie，ture为运行  
//   ctx.set('Access-Control-Allow-Credentials', true);  
  
//   // 设置所允许的HTTP请求方法  
//   ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');  
  
//   // 服务器支持的所有头信息字段，多个字段用逗号分隔  
//   ctx.set('Access-Control-Allow-Headers', 'x-requested-with, x-ui-request， lang');  
//   next();  
// });  


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', function(req, res, next) {
  $aa.query('select * from user',function(error,result,fieleds){
    if(error) throw error;
    var data={
      status:{
        code:0,
        message:'请求成功',
      },
      data:result
    }
    res.json(data);
  })
});

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

/* GET user listing. */
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
  var querys = 'select count(*) as count from user';
  $aa.query(querys,function(e,r,f){
    if(e) throw e;
    count = JSON.parse(JSON.stringify(r[0])).count;
  })
  var query = 'select a.*,b.dest as role from user a,role b where a.role_id = b.id ORDER BY `createtime` DESC LIMIT '+offset*page_size+', '+page_size;
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
  var query = 'select * from user';
  if(req.query.id){
    
  query = 'select a.*,b.dest as role from user a,role b where a.role_id = b.id and a.id = '+req.query.id;
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
  console.log("hshhs:",req.body.status);
  var status = 0;
  var id = 1;
  status = req.body.status;
  id = req.body.id;
  $aa.query('update user set status='+status+' where id = '+id,function(error,result,fieleds){
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
router.get('/check_exist',function(req, res, next) {
  var querys = "select * from user where account= '"+req.query.account+"'";
  $aa.query(querys,function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data)
  })
});
router.get('/systemlogin',function(req, res, next) {
  var querys = "select * from user where account= '"+req.query.account+"'";
  $aa.query(querys,function(error,result,fieleds){
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
  console.log(req.body);
  var data={
    account:req.body.account, 
    password:req.body.password,
    pwd_salt:12345,
    nickname:req.body.nickname,
    gender:req.body.gender,
    introduce:req.body.introduce,
    status:0,
    identity:0,
    role_id:req.body.role_id,
    createtime:Math.floor(Date.now()/1000),    
  }
  var values = [];
  for(element in data){
    var datas = data[element];
    if(element == 'account' || element == 'password' || element == 'nickname' || element == 'introduce'){
      datas = "'"+data[element]+"'";
    }else{
      datas =data[element];
    }

    values.push(datas);
  };
  console.log("yyyyy:",values);
  values = values.join(',');
  console.log("rrrrr:",values);
  var fieled = "(`account`, `password`, `pwd_salt`, `nickname`, `gender`, `introduce`, `status`, `identity`, `role_id`, `createtime`)";
  $aa.query("insert into user "+fieled + " values ( "+values +")" ,function(error,result,fieleds){
    var data = {};
    if(error){
      data=returndata(error.errno,result,error.sqlMessage);
    }else{
      data=returndata(0,result);
    }
    res.json(data)
  })
});
router.post('/edit', function(req, res, next) {
  console.log(req.body);
  var data={
    account:req.body.account, 
    password:req.body.password,
    pwd_salt:12345,
    nickname:req.body.nickname,
    gender:req.body.gender,
    introduce:req.body.introduce,
    status:0,
    identity:0,
    role_id:req.body.role_id,
    createtime:Math.floor(Date.now()/1000),    
  }
  var values = [];
  for(element in data){
    var datas = data[element];
    if(element == 'account' || element == 'password' || element == 'nickname' || element == 'introduce'){
      datas = element +"='"+data[element]+"'";
    }else{
      datas = element + "=" +data[element];
    }

    values.push(datas);
  };
  console.log("yyyyy:",values);
  values = values.join(',');
  console.log("rrrrr:",values);
    $aa.query("update user set "+ values + " where id="+req.body.id,function(error,result,fieleds){
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


