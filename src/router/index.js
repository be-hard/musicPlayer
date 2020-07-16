import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/recommendPage/Home.vue"
import MV from "../components/mvPage/MvPlayer.vue"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/player',
    name: 'Player',
    meta:{
      keepAlive:true
    },
    component:()=>import ("../components/musicPage/Player.vue")
  },
  {
    path: '',
    name: 'Home',
    component:Home,
    meta:{
      keepAlive:true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:"/mv",
    name:"MV",
    component:MV,
    meta:{
      keepAlive:false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
