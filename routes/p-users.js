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

router.get('/login',function(req, res, next) {
  var querys = "select * from user where account= '"+req.query.account+"' AND password= '"+req.query.password+"'";
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

router.post('/reg', function(req, res, next) {
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
    role_id:2,
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
module.exports = router;


