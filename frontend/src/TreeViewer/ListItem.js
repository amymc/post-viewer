import React, { useContext, useEffect, useState } from 'react'
import { css } from 'emotion'
import { AppContext } from "../App.context"
import { types } from '../globals'

const itemTitle = css`
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #ee5b21;
  }
`

const icon = css`
  font-size: 20px;
  margin-right: 6px;
`

const nestedItem = css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 200,
  lineHeight: '24px',
  listStyleType: 'disc',
  listStylePosition: 'inside',
  cursor: 'pointer',
  color: 'var(--color)',
  '&:hover': {
    color: '#ee5b21',
  }
})

const ListItem = ({ posts, title, type }) => {
  const [showPosts, setShowPosts] = useState(false)
  const { selectedPostId, setSelectedPostId } = useContext(AppContext)

  useEffect(() => {
    if(type) {
      setShowPosts(false)
    }
  }, [type])
  
  useEffect(() => {
    if(posts.some(post => post.id === selectedPostId)) {
      setShowPosts(true)
    }
  }, [posts, selectedPostId])

  const togglePosts = () => setShowPosts(!showPosts)
  const toggleEditor = (e, id) => {
    e.stopPropagation()
    setSelectedPostId(id)
  }

  return (
    <li onClick={togglePosts}>
      <h4 className={itemTitle}>
        <span className={icon}>{showPosts ? '-' : '+' }</span>
        {type === types.week ? `Week beginnning ${title}` : title}
      </h4>
      {showPosts && (
        <ul>
          {posts.map((post, index) => (
            <li
              className={nestedItem}
              data-testid={`list-item-${index}`}
              style={{ '--color': `${post.id === selectedPostId ? '#ee5b21' : '#000'}` }}
              onClick={e => toggleEditor(e, post.id)}
              key={index}
            >
              {post.text}
            </li>
          ))}
        </ul>
     )}
    </li>
  )
}

export default ListItem
