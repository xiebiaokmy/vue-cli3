import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login.vue'
import Register from './pages/reg.vue'
import Home from './views/Home.vue'
import Index from './pages/index.vue'
import parent from './pages/parent.vue'
import Hot from './views/movies/hot.vue'
import ComingSoon from './views/movies/comingSoon.vue'
import History from './views/movies/history.vue'
import MovieDetail from './views/movies/movieDetail.vue'



import MovieAdmin from './views/admin/movieAdmin.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/parent',
      name: 'parent',
      component: parent
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children:[
        {
          path:"/Hot",
          name:"hot",
          component:Hot
        },
        {
          path:"/ComingSoon",
          name:"ComingSoon",
          component:ComingSoon
        },
        {
          path:"/History",
          name:"History",
          component:History
        },
        {
          path:"/MovieDetail/:id",
          name:"MovieDetail",
          component:MovieDetail
        },
        {
          path:"/MovieAdmin",
          name:"MovieAdmin",
          component:MovieAdmin
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: '*',
      component: Index
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  // if(to.fullPath != "/Login"){
  //   if(to.fullPath !="/Register"){
  //     if(!sessionStorage.getItem("isLogin")){
  //       router.push("/Login")
  //     }
  //     next()
  //   }else{
  //     next()
  //   }    
  // }else{
  //   next()
  // }
  if(!sessionStorage.getItem("isLogin")){
    if(to.fullPath == "/Login" || to.fullPath =="/Register"){
      next()
    }else{
      router.push("/Login")
    }
  }else{
    next()
  }
})

export default router