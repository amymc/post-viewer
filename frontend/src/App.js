import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import ListItem from './ListItem';

import './App.css';

const App = ({ getPosts, groupedHeadings, posts }) => {
  // const [currentHeadings, setCurrentHeadings] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const [editorId, setEditorId] = useState(null)

  useEffect(() => {
    getPosts()
  }, [getPosts])
  
  useEffect(() => {
    if(groupedHeadings) {
      setSelectedType('author')
    }
  }, [groupedHeadings])
  
  const getPostsById = (ids) => posts.filter(post => ids.includes(post.id))

  const selectType = e => {
    setSelectedType(e.target.value)
    setEditorId(null)
  }

  return (
    <>
      Group by: 
      <select name="type" id="type-select" onChange={selectType}>
        <option value="author">Author</option>
        <option value="location">Location</option>
        <option value="week">Week</option>
      </select>
      <ul>
      {groupedHeadings && groupedHeadings[selectedType] && Object.entries(groupedHeadings[selectedType]).map(([title, ids], index) => (
        <ListItem type={selectedType} key={index} title={title} posts={getPostsById(ids)} setEditorId={setEditorId} />
      ))}
      </ul>
      {editorId && (
        <Editor post={getPostsById([editorId])[0]} />
      )}
    </>
  );
}

export default App;
