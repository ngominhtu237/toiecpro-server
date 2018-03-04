var express = require('express');
var router = express.Router();
const multer = require('multer');
const unirest = require('unirest');
const appRoot = require('app-root-path');
const mPathOne = appRoot.resolve('/public/resource/photo/test1/partone');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, mPathOne);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})

// const fileFilter = (req, { mimetype }, cb) =>
//   cb(null, Boolean(allowTypes.indexOf(mimetype) > -1));

// const uploadConfig = {
//     fields: 17,
//     files: 17,
//     fileSize: 100 * 1048576,
//     parts: 17
// };

const uploader = multer({
    storage,
    // fileFilter,
    // limits: uploadConfig
})

router.get('/create', (req, res, next) => {
    res.render('parts-form/create-part-1-form', {
        title: 'Create Part One'
    });
});


router.post('/create', uploader.fields([
        {
            name: 'picture_example'
        },
        {
            name: 'audio'
        },
        {
            name: 'photo_1'
        },
        {
            name: 'photo_2'
        },
        {
            name: 'photo_3'
        },
        {
            name: 'photo_4'
        },
        {
            name: 'photo_5'
        },
        {
            name: 'photo_6'
        },
        {
            name: 'photo_7'
        },
        {
            name: 'photo_8'
        },
        {
            name: 'photo_9'
        },
        {
            name: 'photo_10'
        }
    ]),
    (req, rex, next) => {
        // console.log(req.files);

        var arrPhoto = [];
        var arrOptionA = [];
        var arrOptionB = [];
        var arrOptionC = [];
        var arrOptionD = [];
        var arrAnswer = [];
        for(let i=1; i<=10; i++){
            arrPhoto[i]   = req.files['photo_' + i][0].path;
            arrOptionA[i] = req.body['optionA_' + i];
            arrOptionB[i] = req.body['optionB_' + i];
            arrOptionC[i] = req.body['optionC_' + i];
            arrOptionD[i] = req.body['optionD_' + i];
            arrAnswer[i] = req.body['answer_' + i];
        }

        unirest.post('http://localhost:8000/parts/test')
            .headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .send({
                "information": req.body.information,
                "direction": req.body.direction,
                "answer_example": req.body.answer_example,
                "picture_example": req.files.picture_example[0].path,
                "full_audio": req.files.audio[0].path,
                "arrPhoto"  : arrPhoto,
                "arrOptionA": arrOptionA,
                "arrOptionB": arrOptionB,
                "arrOptionC": arrOptionC,
                "arrOptionD": arrOptionD,
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
    });

module.exports = router;