import React from 'react'

import './postList.scss'

function PostList({ list, deletePost }) {

  const removePost = (id) => {
    deletePost(id)
  }

  const postlistItems = list && list.length !== 0 ? list.map((post) => <div className="item list-group-item" key={post.id}>
    <h5 key={post.id}>
      {post.name}</h5>
    <button onClick={() => removePost(post.id)} type="button" className="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>): null

  return (
    <div className="PostListComponent list-group list-group-flush">
      {postlistItems}
    </div>
  )
}

export default PostList;
