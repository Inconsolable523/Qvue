import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Chat from '@/view/Chat'
import Home from '@/view/Home'
import Group from '@/view/Group'
import Robot from '@/view/Robot'
import MsgBoardIndex from '@/view/MsgBoardIndex'
import MsgBoard from '@/view/MsgBoard'
import MsgCreate from '@/view/MsgCreate'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      component: Home,
      children: [{
        path: '',
        name: 'Group',
        component: Group
      },
      {
        path: 'Robot',
        name: 'Robot',
        component: Robot
      }]
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/MsgBoardIndex',
      component: MsgBoardIndex,
      children: [{
        path: '',
        name: 'MsgBoard',
        component: MsgBoard
      },
      {
        path: 'MsgCreate',
        name: 'MsgCreate',
        component: MsgCreate
      }]
    }
  ]
})
