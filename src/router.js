import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/homePage.vue'
import Word from './views/Word.vue'
import New from './views/New.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Start from './views/Start.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Start',
            component: Start
        },

        {
            path: '/homepage',
            component: homePage
        },

        {
            path: '/words',
            component: Word
        },

        {
            path: '/words/new',
            component: New
        },
        {
            path: '/register',
            component: Register
        },

        {
            path: '/login',
            component: Login
        },
        
        {
            path: '/editprofile',
            component: EditProfile
        },

        {
            path: '/profile',
            component: Profile
        },

        {
            path: '/start',
            component: Start
        }
    ]
})

export default router