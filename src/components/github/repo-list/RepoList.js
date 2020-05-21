import React, { useState, useEffect } from 'react'

function RepoList({ githubHandler }) {

  const [repos, setRepos] = useState([]);

  const validateResponse = response => {
    if (!(response.ok)) {
      throw Error(response.message)
    }
    return response;
  }

  const responseAsJson = response => {
    return response.json();
  }

  const repoList = repos && repos.length ? repos.map((repo, index) => {
    return (
      <h5 className="list-group-item" key={index}>{repo.name}</h5>
    )
  }) : <h6>No repos found or check the user handler</h6>

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${githubHandler}/repos`, { signal: controller.signal })
      .then(validateResponse)
      .then(responseAsJson)
      .then(setRepos)
      .catch(console.error)
    return () => controller.abort()
  }, [githubHandler])


  return (
    <div className="RepoList list-group list-group-flush">
      { repoList }
    </div>
  )
}

export default RepoList
