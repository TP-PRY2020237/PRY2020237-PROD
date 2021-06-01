import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/User/Login.vue'
import Project from '../views/Project/Project.vue'
import Register from '../views/User/Register.vue'
import WireframeGuide from '../views/Guide/WireframeGuide.vue'
import ForgotPassword from '../views/User/ForgotPassword.vue'
import UploadImage from '../views/Page/UploadImage.vue'
import Perfil from '../views/User/Perfil.vue'
import EditProfile from '../views/User/EditProfile.vue'
import PageView from '../views/Page/PageView.vue'
import NewPasswordView from '../views/User/NewPassword.vue'
import EditPageView from '../views/Page/EditPageView.vue'
import PageTheme from '../views/Page/PageTheme.vue'
import PagePreview from '../views/Page/PagePreview.vue'

Vue.use(VueRouter)


export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    },
    {
      path: '/pageView/:PageViewId',
      name: 'pageView',
      component: PageView,
      props: true
    },
    {
      path: '/editPageView/:PageViewId',
      name: 'editPageView',
      component: EditPageView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pageTheme/:PageViewId',
      name: 'pageTheme',
      component: PageTheme
    },
    {
      path: '/pagePreview/:PageViewId/:NamePage',
      name: 'pagePreview',
      component: PagePreview
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/guide',
      name: 'guide',
      component:WireframeGuide
    },
    {
      path: '/upload/:PageViewId',
      name: 'upload',
      component:UploadImage,
      props: true
    },
    {
      path: '/EditProfile',
      name: 'editprofile',
      component:EditProfile
    },
    {
      path: '/Recovery',
      name: 'recovery',
      component:NewPasswordView
    }


   
  ]
});