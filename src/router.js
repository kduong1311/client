import Vue from 'vue'
import Router from 'vue-router'
import homePage from './views/homePage.vue'
import Product from './views/Product.vue'
import NewProduct from './views/New.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Start from './views/Start.vue'
import EditProduct from './views/EditProduct.vue'
import ViewproductDetail from './views/ViewproductDetail.vue'
import ManageProduct from './views/ManageProduct.vue'
import ManageUser from './views/ManageUser.vue'
import Contact from './views/Contact.vue'
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
            path: '/products',
            component: Product
        },

        {
            path: '/products/new',
            component: NewProduct
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
        },

        {
            path: '/products/edit/:id',
            name:  'EditProduct',
            component: EditProduct
        },

        {
            path: '/products/:id',
            name:  'ViewProductDetail',
            component: ViewproductDetail
        },

        {
            path: '/product/manage',
            name:  'ManageProduct',
            component: ManageProduct
        },

        {
            path: '/user/manage',
            name:  'ManageUser',
            component: ManageUser
        },

        {
            path: '/contact',
            name:  'Contact',
            component: Contact
        },

    ]
})

export default router