<template>
  <div>
    <drop-list :config="configData" ref="droplist"></drop-list>
    <div class="theme-set" v-show="themeSet">
      <div class="theme-bg" @click="themeSet=false"></div>
      <div class="blue" @click="changeTheme('#12B7F5')"></div>
      <div class="black" @click="changeTheme('#666')"></div>
      <div class="red" @click="changeTheme('#c00')"></div>
    </div>
    <div class="top" :style="'background:'+getThemeColor">
      <div class="head-pic">
        <img :src="getUserinfo.headPic" alt="headpic" width="100%" height="100%"/>
      </div>
      <div class="title">聊天群</div>
      <div class="right-icon" @click="showDropList"></div>
    </div>
    <div class="room-list">
      <div class="room-item" @click="EnterRoom('room1')" :style="'color:'+getThemeColor">
        <div class="left-icon">
          <img src="@/assets/img/heart-icon.png" alt="" width="100%" height="100%"/>
        </div>
        <span>单身交友群</span>
      </div>
      <div class="room-item" @click="EnterRoom('room2')" :style="'color:'+getThemeColor">
        <div class="left-icon">
          <img src="@/assets/img/game-icon.png" alt="" width="100%" height="100%"/>
        </div>
        <span>游戏交友群</span>
      </div>
      <div class="room-item" @click="EnterRoom('room3')" :style="'color:'+getThemeColor">
        <div class="left-icon">
          <img src="@/assets/img/chat-icon.png" alt="" width="100%" height="100%"/>
        </div>
        <span>闲聊交友群</span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import DropList from '@/components/DropList'
export default{
  data() {
    return {
      themeSet: false,
      configData: {
        position: {
          top: '50px',
          right: '10px'
        },
        width: '30%',
        list: [
          {text: '修改资料', action: this.updateUserInfo},
          {text: '更换主题', action: this.updateTheme},
          {text: '退出账号', action: this.signOut}
        ]
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'getUserinfo',
      'getThemeColor'
    ])
  },
  components: {
    DropList
  },
  methods: {
    EnterRoom(room) {
      this.$router.push({name: 'Chat', query: {room: room}})
    },
    showDropList() {
      this.$refs.droplist.show()
    },
    updateUserInfo() {
      console.log(321)
    },
    changeTheme(color) {
      this.$store.commit('setThemeColor', color)
    },
    updateTheme() {
      this.themeSet = true
    },
    signOut() {
      this.$router.replace({name: 'Login'})
    }
  }
}
</script>
<style lang="scss" scoped>
  $darkblue: #12B7F5;
  $gray: #F0F0F0;
  $white: #FFF;
  .top {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $darkblue;
    .head-pic {
      width: 30px;
      height: 30px;
      margin-left: 10px;
      img {
        border-radius: 50%;
      }
    }
    .title {
      font-size: 15spx;
      color: $white;
    }
    .right-icon {
      width: 25px;
      height: 25px;
      margin-right: 15px;
      background: url('../assets/img/set-icon.png') no-repeat center / 100%;
    }
  }
  .room-list {
    .room-item {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: $darkblue;
      border-bottom: 1px solid $gray;
      padding: 0 20px;
      .left-icon{
        width: 25px;
        height: 25px;
      }
      span{
        font-size: 15px;
        margin-left: 30px;
      }
    }
  }
  .theme-set {
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    .theme-bg{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 999998;
      background: #000;
      opacity: 0;
    }
    .color{
      width: 3.5rem;
      height: 3.5rem;
      z-index: 9999999;
      border-radius: 5px;
      transition: width .2s, height .2s;
    }
    .color:hover{
      width: 5rem;
      height: 5rem;
    }
    .blue{
      @extend .color;
      background: #12B7F5;
    }
    .black{
      @extend .color;
      background: #666;
    }
    .red{
      @extend .color;
      background: #c00;
    }
  }
</style>
