import Vue from 'vue'
import Router from 'vue-router'
import Resume from '../components/resume/index.vue'
import Login from '../components/login/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'resume',
      component: Resume
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
