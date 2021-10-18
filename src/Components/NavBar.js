import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';




export default function NavBar(){

    return(
        <AppBar position="fixed">
            <Toolbar variant="dense">
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" color="inherit" component="div">
                    <NavLink className='navbar-link' exact to='/'>Micro-Blog</NavLink>
                </Typography>
                <Typography variant="h6" color="inherit" component="div">
                    <NavLink className='navbar-link' exact to='/new'>Create Post</NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}