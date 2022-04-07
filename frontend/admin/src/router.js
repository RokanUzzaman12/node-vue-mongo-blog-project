
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from './components/layout/default.vue';
import createPost from './components/post/createPost';
const routes = [
    {
        name:'Default',
        path:'/',
        component:DefaultLayout
    },
    {
        name:'createPost',
        path:'/create-post',
        component:createPost
    }
]

const route=createRouter({
    history:createWebHistory(),
    routes
});

export default route;