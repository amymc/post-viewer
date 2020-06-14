import React, { useContext, useEffect, useState } from 'react'
import { css } from 'emotion'
import { AppContext } from "../App.context"
import { types } from '../globals'
import ListItem from './ListItem'

const treeViewer = css`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
`

const list = css`
  list-style-type: none;
`

const selectWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const select = css`
  margin-left: 16px;
  background-color: #fff;
  border: 2px solid #ee5b21;
  height: 34px;
  font-size: 16px;
  width: 150px;
`

const TreeViewer = () => {
  const [selectedType, setSelectedType] = useState(types.week)
  const { setSelectedPostId, groupedHeadings, posts } = useContext(AppContext)
  
  const getPostsByIds = ids => posts.filter(post => ids.includes(post.id))

  const selectType = e => {
    setSelectedType(e.target.value)
    setSelectedPostId(null)
  }

  return (
    <section className={treeViewer}>
      <div className={selectWrapper}>
        Group by: 
        <select name="type" id="type-select" data-testid="select" defaultValue={types.week} className={select} onChange={selectType}>
          <option value={types.author}>Author</option>
          <option value={types.location}>Location</option>
          <option value={types.week}>Week</option>
        </select>
      </div>
      <ul className={list}>
      {groupedHeadings[selectedType] && Object.entries(groupedHeadings[selectedType]).map(([title, ids]) => (
        <ListItem type={selectedType} key={title} title={title} posts={getPostsByIds(ids)} />
      ))}
      </ul>
    </section>
  )
}

export default TreeViewer

