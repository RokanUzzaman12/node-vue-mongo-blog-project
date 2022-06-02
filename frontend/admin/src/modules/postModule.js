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

    actions:{
        async createPost({commit},posts){
            console.log(posts);
            console.log(commit)
            try{
                let result = await axios.post('http://localhost:3000/api/posts',posts)
                console.log(result)
            }catch(err){
                console.log(err.response);
            }
        }
    }
}

export default postModule