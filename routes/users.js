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
    res.json(result);
  })
  // res.json({
  //   name: 'ddafdasfd11'
  // })
});

module.exports = router;
