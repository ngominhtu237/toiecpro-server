var express = require('express');
var router = express.Router();
const unirest = require('unirest');

router.get('/create-test',
  (req, res, next) => {
    unirest.get('http://localhost:8000/categories/get-category')
      .end(function (response) {

        req.category = response.body.category;
        next();
      });
  },
  (req, res, next) => {
    res.render('test-form/create-test', {
      data: req.category
    });
  });

router.post('/create-test',
  (req, rex, next) => {

    // lấy dữ liệu từ form
    let test_name = req.body.test_name;
    let test_description = req.body.test_description;
    let isMainTest = req.body.isMainTest ? true : false;
    let isLocked = req.body.isLocked ? true : false;
    let test_type = req.body.test_type;

    unirest.post('http://localhost:8000/tests/create-test')
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .send({
        "test_name": test_name,
        "test_description": test_description,
        "isMainTest": isMainTest,
        "isLocked": isLocked,
        "testtype_id": testtype_id,
      })
      .end(function (response) {
        console.log(response.body);
        next();
      });
  },
  (req, res, next) => {
    res.render('result', {
      resu: "Success"
    });
  });

module.exports = router;