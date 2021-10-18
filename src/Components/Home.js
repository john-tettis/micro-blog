import React from 'react';
import {Typography,Button} from '@material-ui/core'
import BlogList from './BlogList'
import {Link} from 'react-scroll'



export default function Home({blogs}){


    return(
        <>
            <div className='home'>
                <Typography variant='h3'>
                    Micro-Blog!
                </Typography>
                <Typography variant='body1'>
                    Find your blogging groove!
                </Typography>
                <Button color='primary' variant='text'>
                    <Link smooth to='blog-list'>View Blog Posts</Link>
                </Button>
            </div>
            <BlogList blogs={blogs}/>
        </>
    )



    return
}