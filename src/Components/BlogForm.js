import React, {useState}from 'react';
import {useHistory} from 'react-router-dom'
import {TextField, Typography, Button} from '@material-ui/core'
import capitalize from '../Helpers/capitalize'
import {useDispatch} from 'react-redux'
import {sendBlog, putBlog} from '../actionCreators'

const INITIAL={
    title:'',
    description:'',
    body:'',
    comments:[]
}
export default function BlogForm({blogData=INITIAL, noRedirect, edit}){
    const [form, setForm] = useState(blogData)
    const [errors, setErrors]= useState({title:null, description:null, body:null})
    let history = useHistory()
    const dispatch= useDispatch()

    const handleChange=(e)=>{
        setForm(f=>({...f,[e.target.name]:e.target.value}))
    }
    const addBlog=()=>{
        dispatch(sendBlog({title:form.title, description:form.description, body:form.body}))
    }
    const updateBlog=()=>{
        dispatch(putBlog(blogData.id, form))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        let errors = Object.entries(form).filter(([key,value])=>value==='').map(([key])=> [key, `${capitalize(key)} cannot be empty!`]);
        if(errors.length!==0){
            setErrors(Object.fromEntries(errors))
        }
        else{
            if(edit){
                updateBlog()
                noRedirect()
            }
            else{
                addBlog()
                history.push('/')
            }
        }
        
    }
    const cancel=()=>{
        if(edit){
            noRedirect()
        }
        else{
            history.push('/')
        }
    }
    return(
        <div className='blog-form'>
            <form onSubmit={handleSubmit} className='blog-form-form'>
                <Typography variant='h5'>{edit ? 'Edit Blog Post':'Create a Blog Post!'}</Typography>
                <TextField 
                error={errors.title}
                helperText={errors.title}
                onChange={handleChange}
                value={form.title}
                name='title'
                fullWidth label="Title" 
                variant="standard" 
                />
                <TextField 
                error={errors.description}
                helperText={errors.description}
                onChange={handleChange}
                value={form.description}
                name='description'
                fullWidth 
                label="Description" 
                variant="standard" 
                />
                <TextField 
                error={errors.body}
                helperText={errors.body}
                onChange={handleChange}
                value={form.body}
                name='body'
                fullWidth multiline 
                minRows='5' 
                label="Body" 
                variant="outlined" 
                />
                <div className='blog-form-button-container'>
                    <Button type='submit' className='mt-2 mx-3'variant='contained' color='primary'>{edit ? 'Confirm':'Create'}</Button>
                    <Button className='mt-2 mx-3'variant='outlined'color='secondary' onClick={cancel}>Cancel</Button>
                </div>
            </form>
        </div>
    )

}