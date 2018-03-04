var express = require('express');
var router = express.Router();
const multer = require('multer');
const unirest = require('unirest');
const appRoot = require('app-root-path');
const mPathOne = appRoot.resolve('/public/resource/photo/test1/parttwo');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, mPathOne);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})

const uploader = multer({
    storage,
})

router.get('/create', (req, res, next) => {
    res.render('parts-form/create-part-2-form', {
        title: 'Create Part Two'
    });
});


router.post('/create', uploader.fields([
        {
            name: 'audio'
        }
    ]),
    (req, rex, next) => {
        var arrQuestionName = [];
        var arrOptionA = [];
        var arrOptionB = [];
        var arrOptionC = [];
        var arrAnswer = [];
        for(let i=1; i<=30; i++){
            arrQuestionName[i] = req.body['question_name_' + i];
            arrOptionA[i] = req.body['optionA_' + i];
            arrOptionB[i] = req.body['optionB_' + i];
            arrOptionC[i] = req.body['optionC_' + i];
            arrAnswer[i] = req.body['answer_' + i];
        }

        unirest.post('http://localhost:8000/parts/create-parttwo')
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .send({
                "information": req.body.information ? req.body.information : null,
                "direction": req.body.direction ? req.body.direction : null,
                "full_audio": req.files.audio[0].path,
                "arrQuestionName": arrQuestionName,
                "arrOptionA": arrOptionA,
                "arrOptionB": arrOptionB,
                "arrOptionC": arrOptionC,
                "arrAnswer" : arrAnswer
            })
            .end(function (response) {
                req.result = response.body;
                next();
            });
    },
    (req, res, next) => {
        res.render('result', {
            resu: req.result
        });
    }
);

module.exports = router;