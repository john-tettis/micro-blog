import React, {useState} from 'react';
import Comment from './Comment'
import {TextField, Button, Typography} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {sendComment} from '../actionCreators'


export default function CommentSection({blog}){
    let [comment, setComment] = useState('')
    const comments = useSelector(state=> Object.values(state.blogs[blog.id].comments))
    const id = blog.id;
    
    let dispatch = useDispatch();
    const handleChange=(e)=>{
        setComment(e.target.value)
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(sendComment(id,comment))
        setComment('')

    }



    return(
        <div className='comment-section'>
            <Typography variant='h5'>
                Comments:

            </Typography>

            {comments.map(c=><Comment postId={id} key={c.id} comment={c}/>)}
            <form onSubmit={handleSubmit} className='comment comment-section-form'>
                <TextField
                placeholder='Whats on your mind?'
                fullWidth
                value={comment}
                onChange={handleChange}
                ></TextField>
                <Button disabled={comment===''} variant='contained' color='primary' type='submit'>Add</Button>
            </form>
        </div>
)
}