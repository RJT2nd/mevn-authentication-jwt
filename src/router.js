import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BookList from './components/BookList'
import Login from './components/Login'
import Register from './components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, 
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
