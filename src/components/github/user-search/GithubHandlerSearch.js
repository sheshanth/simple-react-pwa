import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import './GithubHandlerSearch.scss';
import RepoList from '../repo-list/RepoList'

function GithubHandlerSearch() {

  const [ githubHandler, setGithubHandler ] = useState('')
  const { register, handleSubmit, errors} = useForm()

  const formSubmit = (data) => {
    const { githubHandler } = data
    setGithubHandler(githubHandler)
  }

  const registerOptions = {
    required: true,
    pattern: /^\S*$/
  }

  return (
    <div className="GithubHandlerSearch">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
        <label htmlFor="githubHandler">Github Handler:</label>
        <input type="text" className="form-control col-sm-12 col-md-5" defaultValue={githubHandler} 
          ref={register(registerOptions)} id="githubHandler" name="githubHandler" placeholder="Enter Github Handler" />
          { errors.githubHandler && 'Github handler required' }
        </div>
      </form>
      <hr/>
      { githubHandler.length !==0? <RepoList githubHandler={githubHandler}/> : ''}
    </div>
  )
}

export default GithubHandlerSearch
