import React, { useEffect, useState } from 'react'
import { css } from 'emotion'

const Editor = ({ post }) => {
  console.log('post', post)
  const editableFields = ['author', 'location']
  // console.log('posts', posts)
  // const [showPosts, setShowPosts] = useState(false)
  const [fieldValues, setFieldValues] = useState({})


  
  const onChangeInput = (key, value) => setFieldValues({...fieldValues, [key]: value})


  return (
   <form>
     {Object.entries(post).map(([key, value]) => (
      <label> {key}:
        <input name={key} value={fieldValues[key] || value} onChange={e => onChangeInput(key, e.target.value)} disabled={!editableFields.includes(key)}/>
      </label>
     ))}
   </form>
  );
}

export default Editor;