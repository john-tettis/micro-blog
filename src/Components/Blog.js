import React, {useState} from 'react';
import {useParams, Redirect} from 'react-router-dom'
import { Typography, IconButton} from '@material-ui/core';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import BlogForm from './BlogForm'
import CommentSection from './CommentSection'
import {deleteBlog} from '../actionCreators'
import {useSelector, useDispatch} from 'react-redux'
import VoteButtons from './VoteButtons';


export default function Blog(){
    const [form, setForm] = useState(false)
    const dispatch = useDispatch();
    let {id} = useParams();
    id = Number(id);
    const blogs = useSelector(state=>state.blogs)
    const blog = blogs[id]
    console.log(blog)
    
    if(!blog){
        return <Redirect to='/'/>
    }
    if(form){
        return <BlogForm 
        blogData={blog} 
        edit
        noRedirect={()=>setForm(false)}/>
    }
    const handleDelete=()=>{
        console.log('deleting')
        dispatch(deleteBlog(id))
        return <Redirect to='/'/>
    }
   
    return(
        <div className='blog'>
            <div className='blog-container'>
                <div className='blog-container-title'>
                <Typography variant='h2'>
                    {blog.title}
                </Typography>
                <div>
                    <div>
                        <IconButton onClick={()=>setForm(true)}>                    
                            <ModeEditOutlinedIcon color='secondary'/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>                    
                            <HighlightOffOutlinedIcon className='danger'/>
                        </IconButton>
                    </div>
                    <VoteButtons blog={blog}/>
                    
                </div>

                </div>
                
                <Typography variant='subtitle2'>
                    {blog.description}
                </Typography>
                <Typography variant='body1'>
                    {blog.body}
                </Typography>
                <br/>
                <CommentSection blog={blog}/>
            </div>
        </div>
    )


}