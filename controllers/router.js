
//post
router.get('/:ctrl?/:act?/:param?', function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
console.log(req.params);
if(req.params.ctrl == 'login'){
  module_holder['login'](req, res);
}
if(req.params.ctrl == 'register'){
  module_holder['register'](req, res);
}
  if (req.params.ctrl) {
    if (req.params.act) {
        if(req.params.param){
            res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act + ' and param : ' + req.params.param)
        }
        else{
            res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act)
        }
    } else {
      res.end('controller : ' + req.params.ctrl + ', but has no action')
    }
  } else {
    res.end('no controller or action')
  }
})



//post
router.post('/submit', function (req, res) {
  
});