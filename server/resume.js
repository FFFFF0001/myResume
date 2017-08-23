const express = require('express')
const router = express.Router()
const Resume = require('../models/resume')

// 查询Resume
router.post('/resume', (req, res) => {
  Resume.findOne({username: req.body.username}).then(resume => {
      if (resume === null) {
        res.json({code: 500, message: '暂无数据'})
      } else {
        res.json({code: 0, message: '', resume})
      }
    }
  )
})

// 添加
router.post('/resume/add', (req, res) => {
  Resume.create(req.body, (err, resume) => {
    if (err) {
      res.json(err)
    } else {
      res.json(resume)
    }
  })
})

//同步
router.put('/resume', (req, res) => {
  Resume.findOneAndUpdate({username: req.body.username}
    , {
      $set: {name: req.body.name, info: req.body.info}
    }, {
      new: true
    })
    .then(resume => {
        console.log('同步到的resume数据为', resume)
        res.json(resume)
      }
    )
    .catch(err => res.json(err))
})

module.exports = router
