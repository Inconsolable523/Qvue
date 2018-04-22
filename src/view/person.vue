<template>
	<div class="contain">
    <div class="content">
      <div class="head-pic">
        <div>{{getUserinfo.nickname}}</div>
        <img :src="getUserinfo.headPic" alt="headpic"/>        
      </div>
      <div class="showUp">
        <h3>在线用户：</h3>
        <ul class="showUpDetail">
          <li v-for="(msg,index) in MsgLists" :key="index">
            <img :src="msg.picUrl" alt="headpic">
            <span>{{ msg.nickname }}</span>
          </li>
        </ul>
      </div>
    </div>
		<div class="bottom-bar">
			<div class="left" @click="goPage('Group')">
				<div class="left-icon">
					<img src="@/assets/img/group-icon.png" alt="" width="100%" height="100%">
				</div>
				<div>聊天群</div>
			</div>
			<div class="center" @click="goPageReplace('Robot')">
				<div class="center-icon">
					<img src="@/assets/img/robot-icon.png" alt="" width="100%" height="100%">
				</div>
				<div>机器人</div>
			</div>
			<div class="right" @click="goPage('MsgBoard')">
				<div class="right-icon">
					<img src="@/assets/img/msg-icon.png" alt="" width="100%" height="100%">
				</div>
				<div>留言板</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import { getItem } from "@/plugin/sessionStorage-plugin.js";
import io from "socket.io-client";

export default {
  data() {
    return {
      MsgLists: [],
      msgDOM: {}
    };
  },
  created() {
    this.InitInfo();
  },
  mounted() {
this.msgDOM = document.querySelector('.showUp')
    this.socket = io("http://localhost:3000");
    this.socket.on("user_list", msg => {
      msg.forEach((e, index) => {
        this.$set(this.MsgLists, index, e);
      });
      this.$nextTick(()=>{
        this.msgDOM.scrollTop = this.msgDOM.scrollHeight
      })
    });
  },
  computed: {
    ...mapGetters(["getUserinfo"])
  },
  methods: {
    InitInfo() {
      this.$store.commit("setUserinfo", getItem("userInfo"));
    },
    goPageReplace(name) {
      this.$router.replace({ name: name });
    },
    goPage(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>
<style lang="scss" scoped>
$white: #f5f2c7;
$darkblue: #f5f2c7;
$gray: #ccc;

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.contain {
  width: 100%;
  height: 100%;
  .content {
    .head-pic {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      text-align: center;
      img {
        border-radius: 50%;
      }
    }
    .showUpDetail{
      height: 200px;
      overflow-y: scroll;
      text-align: center;
      li{
        margin-top:10px;
      }
      img{
        width: 120px;
      }
    }
  }
  .bottom-bar {
    box-shadow: 0px -3px 3px #ccc;
    font-size: 10px;
    position: absolute;
    bottom: 0px;
    left: 0;
    padding: 10px;
    width: calc(100vw - 20px);
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left-icon,
    .center-icon,
    .right-icon {
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
  }
}
</style>
