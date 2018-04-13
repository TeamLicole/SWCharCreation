import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import NewChar from '@/components/NewChar'
import ViewChars from '@/components/ViewChars'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/NewChar',
      name: 'NewChar',
      component: NewChar
    },
    {
      path: '/ViewChars',
      name: 'ViewChars',
      component: ViewChars
    }
  ]
})
