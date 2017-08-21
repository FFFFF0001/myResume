const express = require('express')
const router = express.Router()
const Resume = require('../models/resume')

// 查询Resume
router.get('/resume', (req, res) => {
  Resume.find({})
    .sort({update_at: -1})
    .then(resume => {
      console.log('查询到的resume数据为', resume);
      res.json(resume)
    })
    .catch(err => {
      res.json(err)
    })
});

// 添加
router.post('/resume', (req, res) => {
  Resume.create(req.body, (err, resume) => {
    if (err) {
      res.json(err)
    } else {
      res.json(resume)
    }
  })
});

//同步
router.put('/resume', (req, res) => {
  Resume.findOneAndUpdate({name: req.body.name}
    , {
      $set: {info: req.body.info}
    }, {
      new: true
    })
    .then(resume => {
      console.log('同步到的resume数据为', resume);
      res.json(resume)
      }
    )
    .catch(err => res.json(err))
});


module.exports = router;
