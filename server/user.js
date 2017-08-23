const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 注册
router.post('/register', (req, res) => {
  User.findOne({username: req.body.username}).then(user => {
      if (user === null) {
        //执行注册
        User.create(req.body, (err, user) => {
          if (err) {
            res.json({code: 500, message: '注册失败'})
          } else {
            res.json({code: 0, message: '注册成功，等待2s直接登录', user})
          }
        })
      } else {
        res.json({code: 500, message: '该用户已经注册，请登录'})
      }
    }
  )
})

//登录验证
router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}).then(user => {
      if (user === null) {
        res.json({code: 500, message: '该用户暂未注册'})
      } else {
        if (user.password === req.body.password) {
          res.json({code: 0, message: '登陆成功', user})
        } else {
          res.json({code: 500, message: '密码输入错误，请重新输入'})
        }
      }
    }
  )
})

module.exports = router
