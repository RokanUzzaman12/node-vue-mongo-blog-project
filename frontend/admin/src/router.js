
import { createRouter, createWebHistory } from 'vue-router';
import mainLayout from './components/mainLayout.vue';
import AllPost from './components/post/allPost';
import createPost from './components/post/createPost';
import LoginComponent from './components/user/login';
import manageUsers from './components/user/manageUsers';
import signupComponent from './components/user/signup';
import testComponent from './components/user/test';
import store from './store';

let userToken = localStorage.getItem('token');
let loginUser = false
if(userToken){
    loginUser = true
}
const routes = [
    {
        name:'mainLayout',
        path:'/',
        component:mainLayout,
        meta:{
            auth:true
        }
    },
    {
        name:'createPost',
        path:'/create-post',
        component:createPost,
        meta:{
            auth:true
        }
    },
    {
        name:'AllPost',
        path:'/all-post',
        component:AllPost,
        meta:{
            auth:true
        }
    },
    {
        name:'Signup',
        path:'/signup',
        component:signupComponent
    },
    {
        name:'Login',
        path:'/login',
        component:LoginComponent,
        meta:{
            loginAuth: true
        }
    },
    {
        name:'manageUsers',
        path:'/manage-users',
        component:manageUsers,
        meta:{
            auth:true
        }
    },
    {
        name:'Test',
        mode: 'history',
        path:'/test',
        component:testComponent
    }
]

const route=createRouter({
    history:createWebHistory(),
    routes
});

route.beforeEach((to,form,next)=>{

    if(to.meta.auth){
        if(loginUser){
            
            store.dispatch("test").then((response)=>{

                if(response.data){
                    if(response.data.name == 'TokenExpiredError'){

                        localStorage.clear();
                        location.reload()
                        
                    }
                }
            })
            next()
        }else{
            next('/login');
        }

    
    }else{
        next();
    }
})

export default route;