import React from 'react'
import BlogCard from './BlogCard'
import { Typography } from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {updateBlog, addBlog as addB} from '../actionCreators'



export default function BlogList(){
    const blogs = useSelector(state=>Object.values(state.titles))


    return(
        <div>
            <div className ='blog-list-header'>
                <Typography variant='h2'>View Blog Posts</Typography>
                <Typography variant='body1'>Welcome to <b>Micro-Blog</b> where you can share your story, and read others' stories!</Typography>
            </div>
            <div name='blog-list' className='blog-list'>
                {blogs.length!==0 ? blogs.map(b=><BlogCard key={b.id} blog={b}/>):<Typography variant='h6'>No content to load</Typography>}
            </div>
        </div>
    )
}