import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import ListItem from './ListItem';

import './App.css';

const App = ({ getPosts, groupedHeadings, posts }) => {
  const [currentHeadings, setCurrentHeadings] = useState(null)
  const [editorId, setEditorId] = useState(null)

  useEffect(() => {
    getPosts()
  }, [getPosts])
  
  useEffect(() => {
    if(groupedHeadings) {
      setCurrentHeadings(groupedHeadings.author)
    }
  }, [groupedHeadings])
  
  const getPostsById = (ids) => posts.filter(post => ids.includes(post.id))

  const selectType = e => {
    setCurrentHeadings(groupedHeadings[e.target.value])
    setEditorId(null)
  }

  return (
    <>
      Group by: 
      <select name="type" id="type-select" onChange={selectType}>
        <option value="author">Author</option>
        <option value="location">Location</option>
        <option value="time">Time</option>
      </select>
      <ul>
      {currentHeadings && Object.entries(currentHeadings).map(([title, ids], index) => (
        <ListItem key={index} title={title} posts={getPostsById(ids)} setEditorId={setEditorId} />
      ))}
      </ul>
      {editorId && (
        <Editor post={getPostsById([editorId])[0]} />
      )}
    </>
  );
}

export default App;
