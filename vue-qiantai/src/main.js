// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

//引入axios
import MyAxios from './assets/js/myAxios.js'
Vue.use(MyAxios)
//引入公用样式
import '@/assets/css/index.css'
//引入全局面包屑导航
import MyBreadcrumb from './components/myBreadcrumb.vue'


Vue.component(MyBreadcrumb.name,MyBreadcrumb)





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
