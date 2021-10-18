import { ADD_BLOG,
    ADD_COMMENT,
    DELETE_BLOG,
    DELETE_COMMENT,
    UPDATE_BLOG,
    LOAD_TITLES,
    UPDATE_VOTES
} from "./actionTypes";
import axios from "axios"


const BASE_URL = process.env.DATABASE_URL || 'http://localhost:5000/api'

function loadTitles(payload){
    return{
        type:LOAD_TITLES,
        payload
    }

}
function addBlog(blog,title){
    let payload ={}
    if(title){
        payload={
            title:{
                title:blog.title,
                description:blog.description,
                id:blog.id
            },
            blog
        }

    }
    else{
        payload = {
            blog:{...blog},
            title:false
        }
    }
    return {
        type:ADD_BLOG,
        payload
    }
}
function updateBlog(id,data){
    let title = {...data}
    delete title.body
    delete title.votes
    return{
        type:UPDATE_BLOG,
        payload:{
            blog:{id,...data},
            title
        }
    }
}

function removeBlog(id){
    return{
        type:DELETE_BLOG,
        payload:id
    }
}
function addComment(id,comment){

    return{
        type:ADD_COMMENT,
        payload:{
            comment,
            id
        }
    }
}
function removeComment(blogId,commentId){
    return{
        type:DELETE_COMMENT,
        payload:{
            blogId,
            commentId

        }
    }
}


//thunk dispatchers
export function retreivePosts(){
    return async function req(dispatch){
        let result = await axios.get(`${BASE_URL}/posts`)
        let unformatted = result.data
        let formatted={}
        unformatted.forEach((b=> {
            formatted[b.id]={...b}
            dispatch(retrieveBlog(b.id))
        }))
        dispatch(loadTitles(formatted))
    }
}
export function retrieveBlog(id){
    return async function req(dispatch){
        let response = await axios.get(`${BASE_URL}/posts/${id}`)
        dispatch(addBlog(response.data, false))
    }
}
export function sendBlog(blog){
    return async function send(dispatch){
        try{
            console.log('sending....',blog)
            let {data} = await axios.post(`${BASE_URL}/posts`,{...blog})
            data.comments={};
            dispatch(addBlog(data,true))
        }
        catch(e){
            console.log(e.stack)
        }
    }
}
export function deleteBlog(id){
    return async function del(dispatch){
        try{
            let {data} = await axios.delete(`${BASE_URL}/posts/${id}`)
            if(data.message==='deleted'){
                dispatch(removeBlog(id))
            }
        }
        catch(e){console.log(e)}
    }
}

export function sendComment(id,text){
    return async function send(dispatch){
        try{
            let {data} = await axios.post(`${BASE_URL}/posts/${id}/comments`,{id,text})
            dispatch(addComment(id,data))

        }
        catch(e){console.log(e)}
    }

}
export function deleteComment(post,id){
    return async function del(dispatch){
        try{
            let {data} = await axios.delete(`${BASE_URL}/posts/${post}/comments/${id}`)
            if(data.message=='deleted'){
                dispatch(removeComment(post,id))
            }
        }
        catch(e){console.log(e)}
    }

}
export function putBlog(id,blog){
    return async function put(dispatch){
        try{
            let {data} = await axios.put(`${BASE_URL}/posts/${id}`,blog)
            console.log(data)
            dispatch(updateBlog(id,data))

        }
        catch(e){console.log(e)}
    }
}

export function deltaVotes(id,delta){
    return async function change(dispatch){
        try{
            let {data} = await axios.post(`${BASE_URL}/posts/${id}/vote/${delta}`)
            console.log(data)
            dispatch(updateBlog(id,data))
            

        }
        catch(e){console.log(e)}
    }
}