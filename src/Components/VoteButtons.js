import React from 'react';
import {deltaVotes} from '../actionCreators'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Typography, IconButton} from '@material-ui/core';
import {useDispatch} from 'react-redux'




export default function VoteButtons({blog}){
    const dispatch = useDispatch()
    let id=blog.id;
    const downVote = ()=>dispatch(deltaVotes(id,'down'))
    const upVote = ()=>dispatch(deltaVotes(id,'up'))

    return(
        <>
            <div>
                <IconButton onClick={upVote}>                    
                    <ThumbUpIcon color='success'/>
                </IconButton>
                <IconButton onClick={downVote}>                    
                    <ThumbDownIcon className='danger'/>
                </IconButton>
            </div>
            <div>
            <Typography variant='body1'>{blog.votes} votes</Typography>
            </div>
        </>
    )
}