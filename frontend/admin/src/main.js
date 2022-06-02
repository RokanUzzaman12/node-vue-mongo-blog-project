import axios from 'axios';
import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import route from './router';
import store from './store';


axios.defaults.headers.common['Authorization']= `Bearer ${localStorage.getItem('token')}`

//  axios.get('http://localhost:3000/api/verifyuser');



const app = createApp(App)
app.use(VueToast,{
    position: 'top-right'
})
app.use(route)
app.use(store)

app.mount('#app')
