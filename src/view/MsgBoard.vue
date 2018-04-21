<template>
  <div class="contain">
    <div class="top-bar" :style="'background:'+getThemeColor">
      <div class="left-icon" @click="goBack()"></div>
      <div class="title">留言板</div>
      <div class="right-icon" @click="editMsg()"></div>
    </div>
    <div class="board-contain">
      <div class="item" v-for="(item, index) in msgList" :key="index">
        <div class="top">
          <div class="img">
            <img :src="item.headPic" width="100%" height="100%">
          </div>
          <div class="username" v-text="item.nickname"></div>
          <div class="time">{{item.timeStamp|timeFilter}}</div>
        </div>
        <div class="bottom" v-text="item.text"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        msgList: []
      }
    },
    created() {
      // 初始化isBack
      this.$router.isBack = false
      this.initData()
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
    methods: {
      goBack() {
        this.$router.goBack()
      },
      async initData() {
        // 获取留言数据
       const res = await this.$store.dispatch('getLeaveMsg')
        this.msgList = res.data
      },
      editMsg() {
        this.$router.push({name: 'MsgCreate'})
      }
    }
  }
</script>
<style lang="scss" scoped>
$blue: #12B7F5;
$white: #FFF;
.contain {
  background: #F6F6F6;
  width: 100%;
  height: 100%;
  .top-bar {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $blue;
    padding: 0 5px;
    .left-icon {
      width: 25px;
      height: 25px;
      background: url("../assets/img/back.png") no-repeat center / 100%;
    }
    .title {
      font-size: 15px;
      color: $white;
    }
    .right-icon {
      width: 20px;
      height: 20px;
      background: url("../assets/img/edit-icon.png") no-repeat center / 100%;
    }
  }
  .board-contain {
    height: calc(100vh - 35px);
    overflow-y: scroll;
    background: #F2F2F2;
    .item {
      background: #FFF;
      margin-top: 5px;
      .top {
        position: relative;
        height: 80px;
        .img {
          position: absolute;
          top: 30px;
          left: 10px;
          width: 35px;
          height: 35px;
          img{
            border-radius: 50%;
          }
        }
        .username {
          position: absolute;
          top:30px;
          left:60px;
          font-size: 15px;
          width:25%;
          height:20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .time {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          text-align: left;
          font-size: 13px;
          color: #AAA
        }
      }
      .bottom {
        padding: 10px 20px 30px 20px;
        font-size: 15px;
      }
    }
  }
}
</style>
