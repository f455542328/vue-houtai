import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Users from '../views/users/Users.vue'
import Rights from '../views/rights/Rights.vue'
import Roles from '../views/rights/Roles.vue'
import Categories from '../views/goods/Categories.vue'
import Goods from '../views/goods/Goods.vue'
import GoodsAdd from '../views/goods/GoodsAdd.vue'
import Params from '../views/goods/Params.vue'
import Orders from '../views/orders/Orders.vue'
import Reports from '../views/reports/Reports.vue'

Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/',
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
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/goods/add',
          name: 'goodsAdd',
          component: GoodsAdd
        },
        {
          path: '/params',
          name: 'params',
          component: Params
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        },
      ]
    }
  ]
});

// 添加一个导航守卫
router.beforeEach((to,from,next)=> {
  if( to.path !== '/login'){
    //验证是否存在token
    let token = window.localStorage.getItem('token');
    if(token) {
      next();
    }else{
      router.app.$message({
        message: '您还没有登录,请登陆后在继续操作',
        type: 'error'
      });
      //跳转回登录页面
      router.push({name: 'login'})
    }
  }else{
    next();
  };

});


export default router;