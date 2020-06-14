import React, { useContext, useEffect, useState } from 'react'
import { css } from 'emotion'
import { AppContext } from "./App.context"

const editor = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 60px;
`

const textField = css`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`

const input = css`
  min-height: 50px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: none;
  border-bottom: 2px solid #000;
  line-height: 24px;
  outline: none;
  font-size: 16px;
  &:focus {
    border-bottom: 2px solid #ee5b21;
  }
  &:disabled {
    opacity: 0.38;
    border-bottom: 2px solid gray;
  }
`

const button = css`
  border: none;
  font-size: 16px;
  background-color: #ee5b21;
  color: white;
  height: 50px;
  border-radius: 4px;
  margin-top: 40px;
  &:hover {
    color: #ee5b21;
    background-color: #fff;
    border: 2px solid #ee5b21;
  }
`

const confirmation = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 40px;
  color: #ee5b21;
  height: 50px;
`

const editableFields = ['author', 'location']

const capitalise = string => string === 'id' ? string.toUpperCase() : `${string[0].toUpperCase()}${string.slice(1)}`

const Editor = ({ post }) => {
  const [fieldValues, setFieldValues] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { updatePost } = useContext(AppContext)
  
  useEffect(() => {
    if(post) {
      setFieldValues(post)
    }
  }, [post])
  
  useEffect(() => {
    if (showConfirmation){
      setTimeout(() => {
        setShowConfirmation(false)
      }, 1500)
    }
   },[showConfirmation])

  const onChangeInput = (key, value) => setFieldValues({...fieldValues, [key]: value})

  const save = e => {
    e.preventDefault()
    updatePost({...post, ...fieldValues})
    setShowConfirmation(true)
  }

  return (
   <form className={editor} onSubmit={save}>
     {Object.keys(post).map(key => {
       const InputField = key === 'text' ? 'textarea' : 'input'
       return (
        <div className={textField} key={key}>
          <label id={key}>{capitalise(key)}</label>
          <InputField
            className={input}
            name={key}
            aria-labelledby={key}
            rows='3'
            value={fieldValues[key] || ''}
            onChange={e => onChangeInput(key, e.target.value)}
            disabled={!editableFields.includes(key)}
          />
        </div>
      )}
    )}
    {showConfirmation ? (
      <span className={confirmation}>Saved!</span>
    ):(
      <input type='submit' value='Save' className={button} />
    )}
   </form>
  )
}

export default Editor
