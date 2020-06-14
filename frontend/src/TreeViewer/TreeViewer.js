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
  const [selectedType, setSelectedType] = useState(null)
  const { setSelectedPostId, groupedHeadings, posts } = useContext(AppContext)

  useEffect(() => {
    if(groupedHeadings) {
      setSelectedType(types.weeks)
    }
  }, [groupedHeadings])
  
  const getPostsByIds = ids => posts.filter(post => ids.includes(post.id))

  const selectType = e => {
    setSelectedType(e.target.value)
    setSelectedPostId(null)
  }

  return (
    <section className={treeViewer}>
      <div className={selectWrapper}>
        Group by: 
        <select name="type" id="type-select" className={select} onChange={selectType}>
          <option value={types.authors}>Authors</option>
          <option value={types.locations}>Locations</option>
          <option value={types.weeks}>Weeks</option>
        </select>
      </div>
      <ul className={list}>
      {groupedHeadings[selectedType] && Object.entries(groupedHeadings[selectedType]).map(([title, ids], index) => (
        <ListItem type={selectedType} key={index} title={title} posts={getPostsByIds(ids)} />
      ))}
      </ul>
    </section>
  )
}

export default TreeViewer;
