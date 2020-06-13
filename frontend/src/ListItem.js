import React, { useEffect, useState } from 'react'
import { css } from 'emotion'

const listItem = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

const ListItem = ({ posts, setEditorId, title }) => {
  const [showPosts, setShowPosts] = useState(false)
  // const [showEditor, setShowEditor] = useState(false)

  // remove this??
  useEffect(() => {
    if (posts) {
      setShowPosts(false);
    }
  }, [posts])
  
  const togglePosts = () => setShowPosts(!showPosts)
  const toggleEditor = (e, id) => {
    e.stopPropagation()
    e.preventDefault()
    setEditorId(id)
  }


  return (
    <li onClick={togglePosts}>
     {title}
     {showPosts && (
       <ul>
        {posts.map((post, index) => (
          <li className={listItem} onClick={e => toggleEditor(e, post.id)} key={index}>{post.text}</li>
        ))}
      </ul>
     )}
    </li>
  );
}

export default ListItem;