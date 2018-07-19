import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Help from '@/views/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
