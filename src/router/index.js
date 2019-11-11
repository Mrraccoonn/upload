import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import login from '@/components/login'
import top from '@/components/top'
import infoEntry from '@/components/infoEntry'
import changeword from '@/components/changeword'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/top',
      name: 'top',
      component: top
    },{
      path: '/list',
      name: 'list',
      component: list
    },{
      path: '/infoEntry',
      name: 'infoEntry',
      component: infoEntry
    },{
      path: '/changeword',
      name: 'changeword',
      component: changeword
    },{
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ],
  linkActiveClass: 'active'
})
