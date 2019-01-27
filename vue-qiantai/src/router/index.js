import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Users from '../views/users/Users.vue'
import Rights from '../views/rights/Rights.vue'
import Roles from '../views/rights/Roles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
      ]
    }
  ]
})
