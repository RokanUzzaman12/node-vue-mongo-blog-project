

import axios from 'axios';
import { createStore } from 'vuex';
import postModule from './modules/postModule';
import usersModule from './modules/usersModule';

const store = createStore({
    state:{
        userInfo:{}
    },

    modules:{
        postModule:postModule,
        usersModule:usersModule
    },
    actions:{
        async test({commit}){
            try{
                let result = await axios.get('http://localhost:3000/api/user-verify')
                
                console.log(result);
                if(result.data.type == 'success'){
                    commit('setUserDetails',result.data.data)
                }
                return result.data
            }catch(err){
                console.log(err.response)
                return err.response
            }

            
        }
    },
    mutations:{
        setUserDetails:(state,userData)=>{
            state.userInfo = userData
        }
    }
})


export default store