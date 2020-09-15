import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DropdownExample from './views/DropdownExample.vue'
import ModalExample from './views/ModalExample.vue'
import Login from './views/Login.vue'
import Docs from './views/Docs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/docs',
      name: 'docs',
      component: Docs,
    },
  ]
})
