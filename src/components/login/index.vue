<template>
  <div class="container">
    <transition name="running">
      <Girl v-if="showGirl"></Girl>
    </transition>
    <div class="login-div">
      <mu-text-field
        label="用户名"
        labelFloat
        labelClass="input-label"
        labelFocusClass="input-label-focus"
        underlineFocusClass="underline"
        @input="onUsernameInput"
      />
      <br/>
      <mu-text-field
        label="密码"
        type="password"
        labelFloat
        labelClass="input-label"
        @input="onPassInput"
        labelFocusClass="input-label-focus"
        underlineFocusClass="underline"/>
      <br/>
      <mu-raised-button label="登录" class="demo-raised-button" :disabled="loginDisable" @click="login"/>
      <br>
      <mu-raised-button label="注册" class="demo-raised-button-register" :disabled="loginDisable" primary
                        @click="regist"/>
    </div>
    <mu-dialog :open="dialog" title="注册成功" @close="close">
      是否直接登录
      <mu-flat-button slot="actions" primary @close="close" label="否"/>
      <mu-flat-button slot="actions" primary @click="enter" label="是"/>
    </mu-dialog>
  </div>
</template>
<script>
  import Girl from './girl/girl.vue'

  const REGISTER = this.HOST + '/register'
  const LOGIN = this.HOST + '/login'
  export default {
    name: 'login',
    components: {
      Girl
    },
    data () {
      return {
        showGirl: true,
        loginDisable: true,
        usernameInput: '',
        passwordInput: '',
        dialog: false
      }
    },
    methods: {
      onUsernameInput: function (input) {
        this.usernameInput = input
        this.checkInput()
      },
      onPassInput: function (input) {
        this.passwordInput = input
        this.checkInput()
      },
      isEmptyStr (str) {
        if (str === null || str === '') {
          return true
        } else {
          return false
        }
      },
      checkInput: function () {
        if (!this.isEmptyStr(this.usernameInput) && !this.isEmptyStr(this.passwordInput)) {
          this.loginDisable = false
        } else {
          this.loginDisable = true
        }
      },
      regist: function () {
        let self = this
        let params = {
          username: this.usernameInput,
          password: this.passwordInput
        }
        self.$http.post(REGISTER, params)
          .then(function (response) {
            if (response.data.code === 0) {
              self.open()
            } else {
              self.$vux.toast.show({
                text: response.data.message,
                position: 'middle',
                type: 'cancel',
                width: '16em'
              })
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      login: function () {
        let self = this
        let params = {
          username: this.usernameInput,
          password: this.passwordInput
        }
        self.$http.post(LOGIN, params)
          .then(function (response) {
            console.log(response)
            let toastType = 'text'
            if (response.data.code === 0) {
              toastType = 'success'
              self.enter()
            } else {
              toastType = 'cancel'
            }
            self.$vux.toast.show({
              text: response.data.message,
              position: 'middle',
              type: toastType,
              width: '16em'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      open () {
        this.dialog = true
      },
      close () {
        this.dialog = false
      },
      enter () {
        this.$router.push({
          name: 'resume',
          params: {
            'username': this.usernameInput
          }
        })
      }
    }
  }
</script>
<style lang="less">

  .container {
    flex: 1;
    width: 100%;
    height: 675px;
    justify-content: center;
    padding: 0;
  }

  .login-div {
    text-align: center;
    .input-label {
      color: #cccccc;
    }
    .input-label-focus {
      color: #666666;
      font-size: 20px;
    }
    .underline {
      background-color: #cccccc;
    }
    .demo-raised-button {
      padding: 20px 0 20px 0;
      font-size: 17px;
      width: 260px
    }
    .demo-raised-button-register {
      padding: 20px 0 20px 0;
      font-size: 17px;
      width: 260px;
      margin-top: 15px;
    }
  }

  @keyframes girl-open {
    0% {
      transform: translate3d(120%, 120%, 0)
    }
    100% {
      transform: translate3d(0, 0, 0)
    }
  }

  @keyframes girl-leave {
    0% {
      transform: rotate(0deg) skew(0deg) scale(1);
      -ms-transform: rotate(0deg) skew(0deg) scale(1); /* IE 9 */
      -moz-transform: rotate(0deg) skew(0deg) scale(1); /* Firefox */
      -webkit-transform: rotate(0deg) skew(0deg) scale(1); /* Safari ºÍ Chrome */
      -o-transform: rotate(0deg) skew(0deg) scale(1);
    }
    100% {
      transform: rotate(0deg) skew(0deg) scale(0);
      -ms-transform: rotate(0deg) skew(0deg) scale(0); /* IE 9 */
      -moz-transform: rotate(0deg) skew(0deg) scale(0); /* Firefox */
      -webkit-transform: rotate(0deg) skew(0deg) scale(0); /* Safari ºÍ Chrome */
      -o-transform: rotate(0deg) skew(0deg) scale(0);
    }
  }
</style>
