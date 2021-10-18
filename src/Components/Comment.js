import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {useDispatch} from 'react-redux'
import {deleteComment} from '../actionCreators'




export default function Comment({postId,comment}){
    const dispatch = useDispatch()

    const remove=()=>{
        dispatch(deleteComment(postId, comment.id))


    }

    
    return(
        <div className='comment'>
            <IconButton onClick={remove}>
                <HighlightOffOutlinedIcon className='danger'/>
            </IconButton>
            <Typography variant='body1'>
                {comment.text}
            </Typography>

        </div>
    )

}