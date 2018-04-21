<template>
	<div class="contain">
		<router-view/>
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
import {getItem} from '@/plugin/sessionStorage-plugin.js'

export default{
  data() {
		return {
		}
	},
	created() {
		this.InitInfo()
	},
	methods: {
		InitInfo() {
			this.$store.commit('setUserinfo', getItem('userInfo'))
		},
		goPageReplace(name) {
			this.$router.replace({name: name})
		},
		goPage(name) {
			this.$router.push({name: name})
		}
	}
}
</script>
<style lang="scss" scoped>
	$white: #F5F2C7;
	$darkblue: #F5F2C7;
	$gray: #ccc;
	.contain {
		width: 100%;
		height: 100%;
		.bottom-bar {
			box-shadow: 0px -3px 3px #CCC;
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
			.left-icon, .center-icon, .right-icon{
				width: 20px;
				height: 20px;
				margin: 0 auto;
			}
		}
	}
</style>
