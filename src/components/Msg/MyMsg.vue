<template>
  <div class="msg" :key="index">
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
import {mapGetters} from 'vuex'
  export default{
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'getThemeColor'
      ])
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
$blue: #12B7F5;
$white: #FFF;
$black: #000;
.msg {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  .headpic {
    position: absolute;
    right:10px;
    top:30px;
    width: 45px;
    height: 45px;
    img{
      border-radius: 50%;
    }
  }
  .name {
    position: absolute;
    top: 30px;
    width: 80px;
    text-align: right;
    right: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }
  .time {
    position: absolute;
    right: 10px;
    top: 0;
    width: 200px;
    height: 20px;
    text-align: right;
    line-height: 20px;
    top: 0px;
    font-size: 10px;
    color: #AAA
  }
  .msg-text {
    display: inline-block;
    position: relative;
    background: $blue;
    margin:55px 75px 20px 10px;
    padding: 10px;
    border-radius: 10px;
    color: $white;
    text-align: right;
    font-size: 15px;
  }
  .msg-text:after {
    content: '';
    position: absolute;
    right: -22px;
    top: 5px;
    border: solid 8px transparent;
    border-left: solid 20px $blue;
  }
}
</style>
