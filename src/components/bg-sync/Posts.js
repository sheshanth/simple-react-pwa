import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import PostListComponent from './PostList';
import './post.scss';

const internetDisconnected = 'ERR_INTERNET_DISCONNECTED'
const failedToFetch = 'Failed to fetch'

function Posts() {

  const [post, setPost] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [postList, setPostList] = useState();
  const [forceUpdate, setForceUpdate] = useState({})
  const inputRef = useRef();

  const registerOptions = {
    required: true,
    pattern: /^\S*$/
  }

  const formSubmit = async (data) => {
    const { post } = data
    setPost(post)
    if (post && typeof post === 'string') {
      try {
        const response = await fetch(`https://fast-cliffs-09680.herokuapp.com/posts/${post}`, { method: 'POST' })
        if (!(response.status === 201)) {
          throw Error(internetDisconnected)
        }
        setForceUpdate({})
      } catch (error) {
        if (error.message === failedToFetch) {
          window.alert(`${internetDisconnected}: request queued.`)
        }
      }
    }
    inputRef.current.blur();
  }

  const inputRefCallback = useCallback(() => {
    if (inputRef.current) {
      register(inputRef.current, registerOptions)
      inputRef.current.focus();
    }
  }, [register, registerOptions])

  useEffect(() => {
    inputRefCallback()
  }, [inputRefCallback])

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      let response;
      try {
        response = await fetch(`https://fast-cliffs-09680.herokuapp.com/posts`, { signal: controller.signal })
        if (!response.ok) {
          setPostList([])
          throw Error("not found")
        }
        const data = await response.json()
        setPostList(data)
      } catch (error) {
        console.log(error)
        if (error.message === failedToFetch) {
          window.alert(`${internetDisconnected}: can't fetch.`)
        }
      }
    }
    fetchData();
    return () => controller.abort()
  }, [forceUpdate])

  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://fast-cliffs-09680.herokuapp.com/posts/${id}`, { method: 'DELETE' })
      if (!(response.status === 202)) {
        throw Error(internetDisconnected)
      }
      setForceUpdate({})
    } catch (error) {
      if (error.message === failedToFetch) {
        window.alert(`${internetDisconnected}: Can't perform delete.`)
      }
    }
  }

  const deleteAllPosts = async () => {
    try {
      const response = await fetch(`https://fast-cliffs-09680.herokuapp.com/posts`, { method: 'DELETE' })
      if (!(response.status === 202)) {
        throw Error(internetDisconnected)
      }
      setForceUpdate({})
    } catch (error) {
      if (error.message === failedToFetch) {
        window.alert(`${internetDisconnected}: Can't perform deleting all post.`)
      }
    }
  }

  return (
    <div className="bg-sync-component">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group row">
          <div className="col-sm-9">
            <label htmlFor="post">Post:</label>
            <input type="text" className="form-control col-sm-12 col-md-5" defaultValue={post}
              ref={inputRef} id="post" name="post" placeholder="Enter post name" />
            {errors.post && <div className="text-danger">Post required</div>}
          </div>
          <div className="col deleteAll">
            <button type="button" className="btn btn-danger" onClick={() => deleteAllPosts()}>
              Delete All</button>
          </div>
        </div>
      </form>
      <hr />
      {postList && postList.length !== 0 ? <PostListComponent list={postList} deletePost={deletePost} /> :
        <h5>No post</h5>}
    </div>
  )
}

export default Posts;
