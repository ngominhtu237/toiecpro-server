var express = require('express');
var router = express.Router();
const unirest = require('unirest');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;