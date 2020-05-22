import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import PostListComponent from './PostList';
import './post.scss';

function Posts() {

  const [post, setPost] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [postList, setPostList] = useState();
  const isLoading = useRef(false)

  const registerOptions = {
    required: true,
    pattern: /^\S*$/
  }

  const formSubmit = (data) => {
    const { post } = data
    setPost(post)
  }

  useEffect(() => {
    isLoading.current = true
    const controller = new AbortController()
    const fetchData = async () => {
      let response;
      try {
        if (post && typeof post === 'string') {
          await fetch(`https://fast-cliffs-09680.herokuapp.com/posts/${post}`, { method: 'POST', signal: controller.signal })
        }
        response = await fetch(`https://fast-cliffs-09680.herokuapp.com/posts`, { signal: controller.signal })
        if (!response.ok) {
          setPostList([])
          throw Error("not found")
        }
        const data = await response.json()
        setPostList(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
    isLoading.current = false
    return () => controller.abort()
  }, [post])

  const deletePost = (id) => {
    fetch(`https://fast-cliffs-09680.herokuapp.com/posts/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.status === 202) {
          setPost({})
        }
      })
      .catch(console.error)
  }

  const deleteAllPosts = () => {
    fetch(`https://fast-cliffs-09680.herokuapp.com/posts`, { method: 'DELETE' })
      .then(response => {
        if (response.status === 202) {
          setPost({})
        }
      })
      .catch(console.error)
  }

  return (
    <div className="bg-sync-component">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group row">
          <div className="col-sm-9">
            <label htmlFor="post">Post:</label>
            <input type="text" className="form-control col-sm-12 col-md-5" defaultValue={post}
              ref={register(registerOptions)} id="post" name="post" placeholder="Enter post name" />
            {errors.post && <div className="text-danger">Post required</div>}
          </div>
          <div className="col deleteAll">
            <button type="button" className="btn btn-danger" onClick={() => deleteAllPosts()}>
              Delete All</button>
          </div>
        </div>
      </form>
      <hr />
      {isLoading.current ? <div className="spinner-border pos" role="status">
        <span className="sr-only">Loading...</span>
        </div>: postList && postList.length !== 0 ? <PostListComponent list={postList} deletePost={deletePost} />:
        <h5>No post</h5>}
    </div>
  )
}

export default Posts;
