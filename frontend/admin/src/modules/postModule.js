import axios from 'axios';
const postModule = {
    namespaced: true,
    state(){
        return{
            name:'asif',
            posts:[],
            post:{}
        }
    },
    getters:{
        getAllPost(state){
            return state.posts
        }
    },

    actions:{
        async createPost({commit},posts){
            console.log(posts);
           
            try{
                let result = await axios.post('http://localhost:3000/api/posts',posts)
                console.log(result)
                if(result.data.type == "success"){
                    commit("setSinglePost",result.data.data)
                }
                return result.data
            }catch(err){
                console.log(err.response);
                return err.response
            }
        },

        async fetchAllPost({commit}){
            try{
                let result = await axios.get('http://localhost:3000/api/posts');
                console.log(result)
                if(result.data.type == 'success'){
                    commit('setPost',result.data.data);
                }

            }catch(err){
                console.log(err);
                console.log(commit);
            }
        }
        
    },
    mutations:{
        setPost:(state,postData)=>{
            state.posts = postData
        },

        setSinglePost:(state,post)=>{
            state.posts.unshift(post)
        }
    }
}

export default postModule