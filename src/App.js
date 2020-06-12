import React, { useState } from 'react';
import Editor from './Editor';
import ListItem from './ListItem';

import './App.css';

const App = ({posts}) => {
  // const headings = {
  //   authors: [...new Set(posts.map(post => post.author))],
  //   locations: [...new Set(posts.map(post => post.location))],
  //   time: [...new Set( posts.map(post => new Date(+post.time).toDateString()))]
  // }
  // console.log(posts)

  const headings = {
    author: [],
    location: [],
    time: [],
  }
  
  posts.forEach(post => {
     headings.author[post.author] ? headings.author[post.author].push(post.id) : headings.author[post.author] = [post.id]
     headings.location[post.location] ? headings.location[post.location].push(post.id) : headings.location[post.location] = [post.id]
     headings.time[post.time] ? headings.time[post.time].push(post.id) : headings.time[post.time] = [post.id]
  })
  
  // console.log('posts', headings)
  
  const [groupedHeadings, setGroupedHeadings] = useState(headings.author)
  const [editorId, setEditorId] = useState(null)

  
  const getPostsById = (ids) => posts.filter(post => ids.includes(post.id))

  // const groupBy = type => {
  //   setGroupedHeadings(headings.authors);
  //   // const test
  // }
  
  // const [groupedPosts, setGroupedPosts] = useState(groupBy('author'))
  const selectType = e => {
    setGroupedHeadings(headings[e.target.value])
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
      {groupedHeadings && Object.entries(groupedHeadings).map(([title, ids], index) => (
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
