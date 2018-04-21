<template>
  <div class="other-msg">
    <div class="headpic">
      <img :src="msg.headPic" alt="headpic" width="100%" height="100%"/>
    </div>
    <span class="name" v-text="msg.nickname"></span>
    <span class="time">{{msg.timeStamp|timeFilter}}</span>
    <div class="msg-text" v-if="msg.img">
      <img :src="msg.img" alt="" width="100%" height="100%">
    </div>
    <div class="msg-text" v-if="msg.text" v-text="msg.text"></div>
  </div>
</template>

<script type="text/javascript">
  export default{
    data() {
      return {}
    },
    filters: {
      timeFilter(timeStamp) {
        const DateTarget = new Date()
        DateTarget.setTime(timeStamp)
        return DateTarget.toLocaleString()
      }
    },
    props: ['msg', 'index']
  }
</script>
<style lang="scss" scoped>
$white: #FFF;
$black: #000;
.other-msg {
  position: relative;
  .headpic {
    position: absolute;
    left: 10px;
    top: 30px;
    width: 45px;
    height: 45px;
    img {
      border-radius: 50%;
    }
  }
  .name {
    position: absolute;
    width: 70px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    left: 65px;
    top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }
  .time {
    position: absolute;
    left: 10px;
    top: 0px;
    text-align: left;
    width: 200px;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #AAA
  }
  .msg-text {
    display: inline-block;
    position: relative;
    margin:55px 10px 20px 75px;
    background: $white;
    padding: 10px;
    border-radius: 10px;
    color: $black;
    font-size: 15px;
  }
  .msg-text:after {
    content: '';
    position: absolute;
    left: -22px;
    top: 5px;
    border: solid 8px transparent;
    border-right: solid 20px $white;
  }
}
</style>
