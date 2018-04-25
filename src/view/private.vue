<template>
	<div class="contain">
		<div class="top" :style="'background:'+getThemeColor">
			<div class="left-icon" @click="goBack()"></div>
			<span class="title">聊天室</span>
			<!-- <div class="emotion" @click="text">表情</div> -->
			 <div id="show"></div> 
<div class="comment"> 
    <div class="com_form"> 
        <!-- <textarea class="input" id="saytext" name="saytext"></textarea>  -->
        <!-- <p><span class="emotion">表情</span><input type="button" class="sub_btn" value="提交"></p>  -->
    </div> 
</div>
			<div class="right-icon"></div>
		</div>
		<div class="msg-content">
			<div class="loop-msg" v-for="(msg,index) in MsgList" :key="index">
				<other-msg :msg="msg" :index="index" v-if="msg.userId!=getUserinfo.userId&&msg.status!=='userstate'"></other-msg>
				<my-msg :msg="msg" v-else-if="msg.userId==getUserinfo.userId&&msg.status!=='userstate'"></my-msg>
				<div class="userstate" v-else-if="msg.status==='userstate'">
					<div v-html="msg.text"></div>
				</div>
			</div>
		</div>
		
		<div class="bottom-input">
			<input  v-model="InputMsg" id="saytext" name="saytext">
			<div v-show="!InputMsg" class="btn-default sub_btn">发送</div>
			<div  v-show="InputMsg" class="btn-active sub_btn"  v-on:keyup.enter="submit" @click="submit">发送</div>
		</div>
		<!-- <div id="show"></div> -->
		<div>
				<div class="emotion" style="display:inline-block;" >
				<img src="../assets/img/Smile.png" alt="pic-icon" width="10%"/>					
				</div>
				<div class="extra-fun"  style="display:inline-block;">
					<div class="load-pic">
				<input type="file" @change="upload"/>
				<img src="../assets/img/pic-icon.png" alt="pic-icon" width="70%" height="70%"/>
			</div>
		</div>
		</div>
		
	</div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import io from "socket.io-client";
import { getItem } from "@/plugin/sessionStorage-plugin.js";
import OtherMsg from "@/components/Msg/OtherMsg";
import MyMsg from "@/components/Msg/MyMsg";
// import  aa from '../../util/jquery.qqFace.js'

export default {
  data() {
    return {
      MsgList: [],
      socket: null,
      InputMsg: "",
      roomId: "",
			msgDOM: {},
    };
  },
  created() {
    this.InitData();
  },
  mounted() {
    console.log(this.$route.query,111)
    // console.log(aa,333)
    this.msgDOM = document.querySelector(".msg-content");
    this.socket = io("http://localhost:3000");
    const $ = window.$;

    $(".emotion").qqFace({
      id: "facebox",

      assign: "saytext",

      path: "../../static/arclist/" //表情存放的路径
    });

    // 进入房间
    // const infoObj = {
    //   status: "userstate",
    //   nickname: this.getUserinfo.nickname,
    //   roomId: this.roomId
    // };
    // this.socket.emit("join-room", infoObj);
    // this.socket.on("join-room", joinInfo => {
    //   this.MsgList.push(joinInfo);
    //   this.$nextTick(() => {
    //     this.msgDOM.scrollTop = this.msgDOM.scrollHeight;
    //   });
    // });

    // 聊天

    this.socket.on("chat-secret", msg => {
      this.MsgList.push(msg);
      this.$nextTick(() => {
        this.msgDOM.scrollTop = this.msgDOM.scrollHeight;
      });
    });
    // 离开房间
    this.socket.on("leave-room", leaveInfo => {
      this.MsgList.push(leaveInfo);
      this.$nextTick(() => {
        this.msgDOM.scrollTop = this.msgDOM.scrollHeight;
      });
    });
  },
  computed: {
    ...mapGetters(["getUserinfo", "getThemeColor"])
  },
  methods: {
    async InitData() {
      this.$store.commit("setUserinfo", getItem("userInfo"));
      this.roomId = this.$route.query.room;
      // 获取聊天信息
      const res = await this.$store.dispatch("getHistoryChatMsg", {
        roomId: this.roomId
      });
      this.MsgList = res.data;
      this.$nextTick(() => {
        this.msgDOM.scrollTop = this.msgDOM.scrollHeight;
      });
    },
    goBack() {
      // 离开房间
      const infoObj = {
        status: "userstate",
        nickname: this.getUserinfo.nickname,
        roomId: this.roomId
      };
      this.socket.emit("leave-room", infoObj);
      this.$router.go(-1);
    },
    replace_em(str) {
      str = str.replace(/\</g, "&lt;");

      str = str.replace(/\>/g, "&gt;");

      str = str.replace(/\n/g, "<br/>");

      str = str.replace(
        /\[em_([0-9]*)\]/g,
        '<img src="../../static/arclist/$1.gif" border="0" />'
      );

      return str;
    },
    submit() {
      const $ = window.$;
      // var str = $("#saytext").val();
      // $("#show").html(this.replace_em(str));
      const MsgObj = {
        // roomId: this.roomId,
        timeStamp: Date.parse(new Date()),
        // status: 'usermsg',
        userId: this.$route.query.use.userId,
        headPic:this.$route.query.use.headPic,
        nickname:this.$route.query.use.nickname,
        text: this.replace_em(this.InputMsg)
      };
      this.socket.emit("chat-secret", MsgObj);
      this.InputMsg = "";
    },
    // 上传图片
    async upload() {
      let file = event.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        await this.$store.dispatch("upload", formData);
        const reader = new FileReader();
        reader.onload = event => {
          const MsgObj = {
            roomId: this.roomId,
            timeStamp: Date.parse(new Date()),
            userId: this.getUserinfo.userId,
            headPic: this.getUserinfo.headPic,
            nickname: this.getUserinfo.nickname,
            text: this.InputMsg,
            img: event.target.result
          };
          this.socket.emit("chat-msg", MsgObj);
        };
        reader.readAsDataURL(file);
      }
    }
  },
  components: {
    OtherMsg,
    MyMsg
  }
};
</script>
<style lang="scss" scoped>
$style: #12b7f5;
$bg: #f6f6f6;
$white: #fff;
.contain {
  background: $bg;
  width: 100%;
  height: 100%;
  .top {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $style;
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
      width: 35px;
      height: 35px;
    }
  }
  .msg-content {
    height: calc(100% - 90px);
    overflow-y: scroll;
    .loop-msg {
      .userstate {
        width: 100%;
        margin-bottom: 20px;
        div {
          width: 35%;
          height: 20px;
          border-radius: 10px;
          text-align: center;
          font-size: 14px;
          margin: 0 auto;
          background: #ccc;
          color: #fff;
        }
      }
    }
  }
  .bottom-input {
    position: absolute;
    width: 100%;
    bottom: 30px;
    display: flex;
    align-items: center;
    input {
      width: 80%;
      height: 25px;
      line-height: 25px;
      font-size: 15px;
      border: none;
    }
    .btn {
      width: 18%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
    }
    .btn-default {
      @extend .btn;
      color: #fff;
      background: #ccc;
    }
    .btn-active {
      @extend .btn;
      background: $style;
      color: $white;
    }
  }
	.emotion{
		position: absolute;
		bottom: 0;
    display: flex;
    align-items: center;
	}
  .extra-fun {
    position: absolute;
		left:25px;
    bottom: 0;
    display: flex;
    align-items: center;
    .load-pic {
      position: relative;
      left: 10px;
      width: 30px;
      input {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
