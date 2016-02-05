var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.cookies.usertoken) return res.redirect("/albums");
  res.render('index', { title: 'It\'s gif not jif' });
});

module.exports = router;
