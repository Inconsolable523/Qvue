<template>
<div class="content">
  <div class="title">注册</div>
  <input class="nickname" type="text" v-model="nickname" placeholder="请输入昵称"/>
  <input class="username" type="text" v-model="username" placeholder="请输入用户名"/>
  <input class="password" type="password" v-model="password" placeholder="请输入密码"/>
  <div class="sex">
    <input type="radio" id="man" value="man" checked="true" v-model="sex"/>
    <label for="man">男</label>
    &nbsp;&nbsp;&nbsp;
    <input type="radio" id="woman" value="woman" v-model="sex"/>
    <label for="woman">女</label>
  </div>
  <div class="register" @click="register()">注册</div>
  <div class="back" @click="goBack()">我已有账号</div>
</div>
</template>

<script>
import Alert from '@/components/Alert'
export default {
  data() {
    return {
      nickname: '',
      username: '',
      password: '',
      sex: 'man'
    }
  },
  methods: {
    goBack() {
        this.$router.go(-1)
    },
    async register() {
      if (!this.username || !this.password) {
        Alert({content: '账号或者密码不能为空！'})
        return
      }
      let data = {
        nickname: this.nickname,
        username: this.username,
        password: this.password,
        sex: this.sex,
        picUrl: this.sex === 'man' ? '/static/img/default-pic-man.jpg' : '/static/img/default-pic-woman.jpg'
      }
      const res = await this.$store.dispatch('register', data)
      Alert({content: res.data.stateText})
      if (res.status === 'success') {
        this.goBack()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$style: #000;
.content {
  background: url('../assets/img/bg.jpg') no-repeat fixed center center / 100% 100% content-box content-box;
  background-size: 100% 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
    top: 50px;
    left: 5%;
    font-size: 32px;
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
  .nickname {
    @extend .inputstyle;
    position: absolute;
    top: 150px;
  }
  .username {
    @extend .inputstyle;
    position: absolute;
    top: 210px;
  }
  .password {
    @extend .inputstyle;
    position: absolute;
    top: 270px;
  }
  input::-webkit-input-placeholder {
    color: $style;
    font-size: 20px;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
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
  .sex {
    position: absolute;
    top: 340px;
    width: 90%;
    display: flex;
    align-items: center;
    color: $style;
    font-size: 20px;
    input[type="radio"] {
      display: none;
    }
    input[type="radio"] + label::before {
      content: "\a0"; /*不换行空格*/
      display: inline-block;
      vertical-align: middle;
      width: .8rem;
      height: .8rem;
      margin-right: .5rem;
      border-radius: 50%;
      border: 2px solid $style;
      padding: .2rem;
    }
    input[type="radio"]:checked + label::before {
      background-color: $style;
      background-clip: content-box;
    }
  }
  .register {
    position: absolute;
    top: 390px;
    background: none;
    border: 1px solid $style;
    width: 80%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $style;
    font-size: 20px;
    opacity: .85;
    border-radius: 5px;
  }
  .back {
    position: absolute;
    top: 450px;
    width: 80%;
    height: 20px;
    font-size: 16px;
    color: $style;
    text-align: center;
  }
}
</style>
