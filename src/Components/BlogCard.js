import React from 'react'
import {Card, CardContent,Typography,Button,CardActions} from '@material-ui/core'
import {Link} from 'react-router-dom'


export default function BlogCard({blog}){


    return(
        <Card className='blog-card' sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {blog.title}
                </Typography>
                <Typography variant="body2">
                {blog.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link to={`/${blog.id}`}>Read More</Link></Button>
            </CardActions>
        </Card>
    )
}