import React, { useContext, useEffect } from 'react'
import { css } from 'emotion'
import { AppContext } from "./App.context"
import Editor from './Editor'
import TreeViewer from './TreeViewer/TreeViewer'
import NotFound from './NotFound'

const app = css`
  display: flex;
  flex-direction: row;
  font-family: Arial, sans-serif;
  height: 100%;
`

const App = () => {
  const { selectedPostId, getPosts, posts, showError } = useContext(AppContext)

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const getPostsById = id => posts.filter(post => id.includes(post.id))[0]

  return (
    <section className={app}>
    {showError ? (
      <NotFound />
    ): (
      <>
        <TreeViewer />
        {selectedPostId && (
          <Editor post={getPostsById([selectedPostId])} />
        )}
      </>
    )}
    </section>
  )
}

export default App

