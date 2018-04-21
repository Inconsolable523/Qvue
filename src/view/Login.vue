<template>
  <div>
    <div class="bg"></div>
    <!--<div class="bg-shade"></div>-->
    <div class="content">
      <div class="title">VueChat</div>
      <input class="username" type="text" v-model="username" placeholder="请输入用户名"/>
      <input class="password" type="password" v-model="password" placeholder="请输入密码"/>
      <div class="login" @click="login()">登录</div>
      <div class="bottom">
        <span class="clear" @click="clear()">清空</span>
        <span class="register" @click="jumpRegister()">注册用户</span>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import {setItem} from '@/plugin/sessionStorage-plugin'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    clear() {
      this.username = ''
      this.password = ''
    },
    async login() {
      let data = {
        username: this.username,
        password: this.password
      }
      // 判断用户名和密码是否正确
      const res = await this.$store.dispatch('login', data)
      if (res.status === 'success') {
        const userInfo = {
          userId: res.data.userId,
          nickname: res.data.nickname,
          headPic: res.data.headPic
        }
        // 保存用户名到Vuex
        this.$store.commit('setUserinfo', userInfo)
        setItem('userInfo', userInfo)
        Alert({content: res.data.stateText}).then((data) => {
          this.$router.push({name: 'Group'})
        })
      } else {
        Alert({content: res.data.stateText})
      }
    },
    jumpRegister() {
      // 跳转到注册页面
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$style: #000;
.bg{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/img/bg.jpg') no-repeat fixed center center / 100% 100% content-box content-box;
  z-index: 999997;
}
/*.bg-shade{
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 999998;
  opacity: .25;
}*/
.content {
  z-index: 999999;
  background-size: 100% 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
    top: 100px;
    font-size: 35px;
    font-weight: bold;
    color: $style;
  }
  .inputstyle {
    width: 90%;
    height: 45px;
    border: none;
    border-bottom: 1px solid $style;
    font-size: 20px;
    color: $style;
    background: none;
  }
  .username {
    @extend .inputstyle;
    position: absolute;
    top: 180px;
  }
  .password {
    @extend .inputstyle;
    position: absolute;
    top: 240px;
  }
  input::-webkit-input-placeholder {
    color: $style;
    font-size: 20px;
  }
  input::-moz-placeholder {   /* Mozilla Firefox 19+ */
    color: $style;
    font-size: 20px;
  }
  input:-moz-placeholder {    /* Mozilla Firefox 4 to 18 */
    color: $style;
    font-size: 20px;
  }
  input:-ms-input-placeholder {  /* Internet Explorer 10-11 */
    color: $style;
    font-size: 20px;
  }
  .login {
    position: absolute;
    top: 330px;
    background: none;
    border: 1px solid $style;
    width: 80%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $style;
    font-size: 20px;
    border-radius: 10px;
  }
  .bottom {
    position: absolute;
    top: 380px;
    width: 80%;
    height: 20px;
    font-size: 16px;
    color: $style;
    .register {
      float: right;
    }
  }
}
</style>
