import React, { useRef, useState } from 'react'
import MyButton from "./UI/button/MyButton"
import MyInput from "./UI/input/MyInput"

function PostForm({create}) {
   const [post, setPost] = useState({title:'',body:''})

   const addNewPost = (ev) => {
      ev.preventDefault()
      const newPost ={
         ...post,id:Date.now()
      }
      create(newPost)
      setPost({title:'',body:''})
     
    }
  return (
   
        <form>
        <MyInput
          value={post.title}
          onChange={ev => setPost({...post,title:ev.target.value})} type='text' 
          placeholder='name post'
        />
     

        <MyInput
          value={post.body}
          onChange={ev => setPost({...post,body:ev.target.value})}
          type='text' 
          placeholder='description post'
        />

        <MyButton onClick={addNewPost} >Create Post</MyButton>
      </form>
      

   
  )
}

export default PostForm
