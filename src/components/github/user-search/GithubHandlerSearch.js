import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import './GithubHandlerSearch.scss';
import RepoList from '../repo-list/RepoList'

function GithubHandlerSearch() {

  const [ githubHandle, setGithubHandler ] = useState('')
  const { register, handleSubmit, errors} = useForm()
  const inputRef = useRef()

  const formSubmit = (data) => {
    inputRef.current.blur();
    const { githubHandle } = data
    setGithubHandler(githubHandle)
  }

  const registerOptions = {
    required: true,
    pattern: /^\S*$/
  }

  useEffect(() => {
    if(inputRef.current) {
      register(inputRef.current, registerOptions)
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="GithubHandlerSearch">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
        <label htmlFor="githubHandle">Github Handle:</label>
        <input type="text" className="form-control col-sm-12 col-md-5" defaultValue={githubHandle} 
          ref={inputRef} id="githubHandle" name="githubHandle" placeholder="Enter Github Handler" />
          { errors.githubHandle && <div className="text-danger">Github handle required</div> }
        </div>
      </form>
      <hr/>
      { githubHandle.length !==0? <RepoList githubHandle={githubHandle}/> : ''}
    </div>
  )
}

export default GithubHandlerSearch
