import axios from 'axios';
const usersModule = {
    namespaced: true,
    state(){
        return {
            allUsers:[],
            token:null,
            userInfo:null,
        }
    },
    getters:{
        getAllUsers(state){
            return state.allUsers
        }
    },
    actions:{
        async fetchAllUsers({commit}){
            try{
                let result = await axios.get('http://localhost:3000/api/users')
                console.log(result)
                if(result.data.type == 'success'){
                    commit('setUsers',result.data.data)
                }
                return result.data
            }catch(err){
                console.log(err.response)
                return err.response
            }
        },

        async createUser({commit},users){

            try{
                let result = await axios.post('http://localhost:3000/api/users',users)
                console.log(result);
                
                if(result.data.type == 'success'){
                    commit('pushUser',result.data.data);
                }
                return result.data
                
            }catch(err){
                console.log(err.response)
                return err.response
            }
        },

        async loginUser({commit},userDetails){
            try{
                let result = await axios.post('http://localhost:3000/api/users/login',userDetails)
                if(result.data.type == 'success'){
                    console.log('test')
                    
                    
                    commit('login', result.data,)
                }
                console.log(result);
                return result.data
                
            }catch(err){
                console.log(err.response);
                return err.response
            }
        },

       

        // async setUserInfo(){
            
        //         let result = await axios.get('http://localhost:3000/api/user',{headers:{token:localStorage.getItem('token')}})
        //         console.log(result);
            
            
            
        // }
    },

    mutations:{
        setUsers(state,usersData){state.allUsers = usersData},
        pushUser(state,usersData){state.allUsers.push(usersData)},
        login(state,authData){ 
            state.token = authData.token
            state.userInfo = JSON.stringify(authData.data)
            localStorage.setItem('token',authData.token) 
            
            axios.defaults.headers.common['Authorization']= `Bearer ${localStorage.getItem('token')}`
        }

        
    }
}

export default usersModule