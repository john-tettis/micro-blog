import React, {useEffect} from 'react'
import '../Styles/App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar'
import Home from './Home'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useDispatch } from 'react-redux';
import {retreivePosts} from '../actionCreators'
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(retreivePosts())
    
  },[])
  return (
      <BrowserRouter>
      <NavBar/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/new'>
            <BlogForm/>
          </Route>
          <Route exact path='/:id'>
            <Blog/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
