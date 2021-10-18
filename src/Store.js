import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const BLOG={
    2:{
      title:'Welcome to the microblog',
      description:'Click below to read the whole blog!',
      body:'Occaecat voluptate nulla magna ipsum est non. Adipisicing occaecat sint laborum culpa eu exercitation proident duis aliquip dolore amet. Est veniam ut non exercitation eu. Officia fugiat occaecat magna aliqua duis dolore officia in. Do in commodo deserunt sit fugiat eiusmod et culpa est dolor proident dolor.',
      id:'2',
      comments:{
            a:{ id:'a',text:'this is a comment'},
            b:{id:'b',text:'this is a comment'},
            c:{id:'c',text:'this is a comment'}}
    }
}
const INITIAL={
    blogs:{},
    titles:{
    }
}
const blogReducer=(state=INITIAL.blogs,{type,payload}) =>{
    switch(type){
        case 'LOAD_BLOGS':
            return {...payload}
        case 'ADD_BLOG':
            return {...state, [payload.blog.id]:payload.blog}
        case 'UPDATE_BLOG':
            return {...state, [payload.blog.id]:{...state[payload.blog.id], ...payload.blog}}
        case 'DELETE_BLOG':
            let temp = {...state}
            delete temp[payload]
            return temp
        case 'ADD_COMMENT':
            let blog = {...state[payload.id]}
            return {...state, [payload.id]:{...blog, comments: {...blog.comments, [payload.comment.id]:payload.comment}}}
        case 'DELETE_COMMENT':
            let blog2 = {...state[payload.blogId]};
            delete blog2.comments[payload.commentId]
            return {...state, [payload.blogId]:blog2 }
        case 'UPDATE_VOTES':
            return {...state, [payload.id]:{...state[payload.id],votes:payload.votes}}
        default:
            return state
    }

}

 const titleReducer=(state = INITIAL.titles, {type, payload})=>{
    switch(type){
        case 'LOAD_TITLES':
            return {...payload}
        case 'ADD_BLOG':
            if(payload.title===false) return state
            return {...state, [payload.blog.id]:payload.title}
        case 'UPDATE_BLOG':
            return {...state, [payload.blog.id]:{...state[payload.blog.id], ...payload.title}}
        case 'DELETE_BLOG':
            let temp = {...state}
            delete temp[payload]
            return temp

        default:
            return state
    }

 }


const rootReducer= combineReducers({blogs:blogReducer, titles:titleReducer})
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export default store