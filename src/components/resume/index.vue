<template>
  <div id="app">
    <div class="resume">
      <div class="left">
        <div class="brief">
          <div class="avatar">
            <EditImage :src="require('@/assets/default_header.jpeg')" width="212" height="212" :isCircle="true"
                       class="img"></EditImage>
            <div class="name" contenteditable="true">{{resume.name}}</div>
            <div class="job" contenteditable="true">{{resume.info.job}}</div>
            <div class="location">
              <img src="../../assets/location.png" alt="">
              <div class="location-name" contenteditable="true">{{resume.info.location}}</div>
            </div>
          </div>
          <div class="info">
            <ul>
              <li>
                <div class="value" contenteditable="true">{{resume.info.sex}}</div>
                <div class="key" contenteditable="true">性别</div>
              </li>
              <li>
                <div class="value" contenteditable="true">{{resume.info.age}}</div>
                <div class="key" contenteditable="true">年龄</div>
              </li>
              <li>
                <div class="value" contenteditable="true">{{resume.info.degree}}</div>
                <div class="key" contenteditable="true">学历</div>
              </li>
            </ul>
          </div>
        </div>
        <ContextList title="联系方式" :icon="require('@/assets/title-contact.png')">
          <ListItemInfo :title=resume.info.contact.phone
                        :image="require('@/assets/contact-phone.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo :title=resume.info.contact.email
                        :image="require('@/assets/contact-mail.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo :title=resume.info.contact.weChat
                        :image="require('@/assets/social-wechat.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo :title=resume.info.contact.qq
                        :image="require('@/assets/social-qq.png')"
                        slot="listItem">
          </ListItemInfo>
        </ContextList>
        <ContextList title="其他" :icon="require('@/assets/title-contact.png')">
          <ListItemInfo :title=resume.info.social.github
                        :image="require('@/assets/social-github.png')"
                        slot="listItem">
          </ListItemInfo>
          <ListItemInfo :title=resume.info.social.blog
                        :image="require('@/assets/social-dribbble.png')"
                        slot="listItem">
          </ListItemInfo>
        </ContextList>
      </div>
      <div class="right">
        <ContextList title="关于我">
          <ListItemAbout slot="listItem" :about=resume.info.aboutme></ListItemAbout>
        </ContextList>
        <ContextList title="技能" class="skill">
          <div slot="listItem" v-for="skill in resume.info.skills">
            <ListItemSkill :title="skill.skill" :percent="skill.percent"></ListItemSkill>
          </div>
        </ContextList>
        <ContextList title="学业信息">
          <div slot="listItem" v-for="edu in resume.info.education">
            <ListItemEducation :school=edu.school :major=edu.major
                               :date=edu.date></ListItemEducation>
          </div>
        </ContextList>
        <ContextList title="工作经历">
          <div v-for="work in resume.info.works" slot="listItem">
            <ListItemExperience
              :company=work.company
              :job=work.job
              :date=work.date
              :intro=work.intro>
            </ListItemExperience>
          </div>
        </ContextList>
      </div>
    </div>
    <div class="guide">
      <ul>
        <li>
          <img src="../../assets/guide_click_left.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>点击内容</h3>
            <p>去编辑文字和图片</p>
          </div>
        </li>
        <li>
          <img src="../../assets/guide_click_right.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>点击鼠标右键</h3>
            <p>删除条目</p>
          </div>
        </li>
        <li>
          <img src="../../assets/guide_add.png" height="60" width="60" alt="">
          <div class="desc">
            <h3>点击加号</h3>
            <p>添加新条目</p>
          </div>
        </li>
        <li>
          <div class="div-info">保存图片</div>
          <div class="desc">
            <h3>点击保存图片</h3>
            <p>下载原图</p>
          </div>
        </li>
        <li>
          <div class="div-info">同步数据</div>
          <div class="desc">
            <h3>点击同步数据</h3>
            <p>同步配置文件</p>
          </div>
        </li>
      </ul>
    </div>
    <button class="sap" @click="saveAsImage">保存图片</button>
    <button class="sap-info" @click="saveInfo">同步数据</button>
    <button class="sap-edit" @click="editInfo">修改数据</button>
    <mu-dialog :open="showEdit" @close="closeEdit" title="修改基本信息" scrollable>
      <div style="padding:10px">
        <mu-text-field label="姓名" v-model="resume.name" fullWidth labelFloat/>
        <mu-text-field label="职业" v-model="resume.info.job" fullWidth labelFloat/>
        <mu-text-field label="位置" v-model="resume.info.location" fullWidth labelFloat/>
        <mu-text-field label="性别" v-model="resume.info.sex" fullWidth labelFloat/>
        <mu-text-field label="年龄" v-model="resume.info.age" fullWidth labelFloat/>
        <mu-text-field label="学历" v-model="resume.info.degree" fullWidth labelFloat/>
        <mu-text-field label="手机" v-model="resume.info.contact.phone" fullWidth labelFloat/>
        <mu-text-field label="邮箱" v-model="resume.info.contact.email" fullWidth labelFloat/>
        <mu-text-field label="微信" v-model="resume.info.contact.weChat" fullWidth labelFloat/>
        <mu-text-field label="QQ" v-model="resume.info.contact.qq" fullWidth labelFloat/>
        <mu-text-field label="github" v-model="resume.info.social.github" fullWidth labelFloat/>
        <mu-text-field label="博客" v-model="resume.info.social.blog" fullWidth labelFloat/>
        <mu-text-field label="关于我" v-model="resume.info.aboutme" multiLine fullWidth labelFloat/>
      </div>
      <mu-flat-button slot="actions" @click="closeEdit" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="showSecondDialog" label="下一步"/>
    </mu-dialog>


    <mu-dialog :open="showSecond" @close="closeEdit" title="修改个人经历" scrollable>
      <div style="padding:10px" v-for="(skill,index) in resume.info.skills">
        <mu-text-field v-model="resume.info.skills[index].skill" labelFloat label="技能名"
                       style="width: 150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.skills[index].percent" labelFloat label="技能点"
                       style="width:150px;margin: 0 10px 0 10px" type="number"/>
      </div>
      <div style="padding:10px" v-for="(edu,index) in resume.info.education">
        <mu-text-field v-model="resume.info.education[index].school" labelFloat label="学校"
                       style="width: 150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.education[index].major" labelFloat label="专业"
                       style="width:150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.education[index].date" labelFloat label="时间"
                       style="width:150px;margin: 0 10px 0 10px"/>
      </div>
      <div style="padding:10px" v-for="(work ,index) in resume.info.works">
        <mu-text-field v-model="resume.info.works[index].company" labelFloat label="公司"
                       style="width: 150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.works[index].job" labelFloat label="职位"
                       style="width:150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.works[index].date" labelFloat label="时间"
                       style="width:150px;margin: 0 10px 0 10px"/>
        <mu-text-field v-model="resume.info.works[index].intro" labelFloat label="工作内容介绍" fullWidth
                       style="margin: 0 10px 0 10px"/>
      </div>
      <mu-flat-button slot="actions" @click="closeEdit" primary label="取消"/>
      <mu-flat-button slot="actions" @click="finishEdit" primary label="完成"/>
    </mu-dialog>
  </div>
</template>

<script>
  import EditImage from './edit-image'
  import ContextList from './context-list'
  import ListItemAbout from './list-item-about'
  import ListItemSkill from './list-item-skill'
  import ListItemEducation from './list-item-education'
  import ListItemExperience from './list-item-experience'
  import ListItemInfo from './list-item-info'
  import html2canvas from '@/assets/js/html2canvas.js'
  import FileSaver from 'file-saver'

  let info = require('@/resume.config')
  const RESUME = '/resume'
  const RESUME_ADD = '/resume/add'
  export default {
    name: 'app',
    mounted: function () {
      this.initData()
    },
    data: function () {
      return {
        resume: info,
        showEdit: false,
        showSecond: false
      }
    },
    components: {
      ContextList,
      ListItemAbout,
      ListItemSkill,
      ListItemEducation,
      ListItemExperience,
      ListItemInfo,
      EditImage
    },
    methods: {
      initData: function () {
        let self = this
        // 获取用户名
        console.log(this.$route.params.username)
        if (this.$route.params.username === undefined) {
          this.$router.replace({name: 'login'})
        } else {
          // 根据用户名查询简历信息
          self.$http.post(this.HOST + RESUME, {username: this.$route.params.username})
            .then(function (response) {
              console.log(response)
              if (response.data.code === 0) {
                // 查到了数据，展示
                console.log('查到了数据', response)
                self.resume = response.data.resume
                console.log(self.resume)
              } else {
                // 无数据 -> 将默认数据上传
                self.createResume()
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      createResume: function () {
        let self = this
        this.resume.username = this.$route.params.username
        let params = this.resume
        console.log('请求参数', params)
        this.$http.post(this.HOST + RESUME_ADD, params)
          .then(function (response) {
            if (response.data) {
              console.log('向数据库添加数据', response.data)
              self.initData()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      saveAsImage: function () {
        let resume = document.querySelector('.resume')
        html2canvas(resume).then(function (canvas) {
          canvas.toBlob(function (blob) {
            FileSaver.saveAs(blob, '简历.png')
          })
        })
      },
      saveInfo: function () {
        let self = this
        info.username = this.$route.params.username
        let params = info
        console.log('请求参数', params)
        this.$http.put(this.HOST + RESUME, params)
          .then(function (response) {
            if (response.data) {
              console.log('同步数据成功', response.data)
              self.initData()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      editInfo: function () {
        this.showEdit = true
      },
      closeEdit: function () {
        this.showEdit = false
        this.showSecond = false
      },
      showSecondDialog: function () {
        this.showEdit = false
        this.showSecond = true
      },
      finishEdit: function () {
        console.log(this.resume)
        let self = this
        this.resume.username = this.$route.params.username
        let params = this.resume
        console.log('请求参数', params)
        this.$http.put(this.HOST + RESUME, params)
          .then(function (response) {
            if (response.data) {
              self.$vux.toast.show({
                text: '修改成功',
                position: 'middle',
                type: 'success',
                width: '16em'
              })
              self.closeEdit()
              self.initData()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="less">
  body {
    padding: 0;
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
    }
  }

  p {
    margin: 0 0 12px 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    .resume {
      width: 1247px;
      height: 1754px;
      border: 1px solid #dad8d7;
      background-color: white;
      overflow: hidden;
      .left {
        width: 380px;
        height: 100%;
        box-sizing: border-box;
        float: left;
        background-color: #fdfefe;
        .brief {
          height: 630px;
          background-color: #f6f7f7;
          .avatar {
            height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            & > .img {
              margin-bottom: 45px;
            }
            .name {
              font-size: 32px;
              margin-bottom: 14px;
            }
            .job {
              font-size: 24px;
              color: #555;
              margin-bottom: 16px;
            }
            .location {
              display: flex;
              align-itmes: center;
              .location-name {
                font-size: 20px;
                font-weight: bold;
                margin-left: 10px;
              }
            }
          }
          .info {
            height: 128px;
            ul {
              height: 100%;
              display: flex;
              border-top: 1px solid #dad8d7;
              border-bottom: 1px solid #dad8d7;
              li:not(:last-child) {
                border-right: 1px solid #dad8d7;
              }
              li {
                width: 33.3333333%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                .value {
                  margin-bottom: 10px;
                  font-size: 24px;
                  font-weight: bold;
                }
                .key {
                  font-size: 16px;
                  font-weight: bold;
                  color: #555;
                }
              }
            }
          }
        }
      }
      .right {
        box-sizing: border-box;
        float: left;
        padding: 50px 40px;
        p {
          font-size: 20px;
          line-height: 32px;
          color: #555;
          text-align: justify;
        }
      }
    }

    .sap {
      position: absolute;
      top: 105px;
      left: 50%;
      margin-left: 488px;
      background-color: white;
      border: 1px solid #dad8d7;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 4px;
      &:hover {
        background-color: #f8f8f8;
      }
    }
    .sap-info {
      position: absolute;
      top: 105px;
      left: 50%;
      margin-left: 388px;
      background-color: white;
      border: 1px solid #dad8d7;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 4px;
      &:hover {
        background-color: #f8f8f8;
      }
    }

    .sap-edit {
      position: absolute;
      top: 105px;
      left: 50%;
      margin-left: 288px;
      background-color: white;
      border: 1px solid #dad8d7;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 4px;
      &:hover {
        background-color: #f8f8f8;
      }
    }
    .div-info {
      margin-right: 10px;
      background-color: white;
      border: 1px solid #dad8d7;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 4px;
      &:hover {
        background-color: #f8f8f8;
      }
    }
    .guide {
      border: 1px solid #dad8d7;
      width: 1247px;
      margin-top: 15px;
      height: 120px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          img {
            margin: 0 10px;
          }
          h3 {
            margin: 0 0 6px 0;
          }
          p {
            margin: 0;
            font-size: 16px;
          }
        }
      }
    }
  }

  .brief {
    height: 630px;
    background-color: #f6f7f7;
    .avatar {
      height: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > .img {
        margin-bottom: 45px;
      }
      .name {
        font-size: 32px;
        margin-bottom: 14px;
      }
      .job {
        font-size: 24px;
        color: #555;
        margin-bottom: 16px;
      }
      .location {
        display: flex;
        align-itmes: center;
        .location-name {
          font-size: 20px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
    }
    .info {
      height: 128px;
      ul {
        height: 100%;
        display: flex;
        border-top: 1px solid #dad8d7;
        border-bottom: 1px solid #dad8d7;
        li:not(:last-child) {
          border-right: 1px solid #dad8d7;
        }
        li {
          width: 33.3333333%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          .value {
            margin-bottom: 10px;
            font-size: 24px;
            font-weight: bold;
          }
          .key {
            font-size: 16px;
            font-weight: bold;
            color: #555;
          }
        }
      }
    }
  }

</style>
