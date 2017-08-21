const mongoose = require('mongoose')
const resumeSchema = mongoose.Schema({
  name: {type: String, require: true},
  info: {
    header: String,
    job: String,
    location: String,
    sex: String,
    age: String,
    degree: String,
    contact: {
      phone: String,
      email: String,
      weChat: String,
      qq: String
    },
    social: {
      github: String,
      blog: String
    },
    education: [
      {
        school: String,
        major: String,
        date: String
      }
    ],
    skills: [
      {
        skill: String,
        percent: String
      }
    ],
    works: [
      {
        company: String,
        job: String,
        date: String,
        intro: String
      }
    ],
    aboutme: String
  },
  created_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
})
const resume = mongoose.model('Resume', resumeSchema)
module.exports = resume
