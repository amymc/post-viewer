import React, { useMemo, useState } from "react"

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [groupedHeadings, setGroupedHeadings] = useState(null)

  const getPosts = useMemo(() => async () => {
    const response = await fetch('http://localhost:7000/posts')
    const data = await response.json();
    return parsePosts(data)
  }, [])

  const parsePosts = posts => {
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
    setGroupedHeadings(headings)
    setPosts(posts)
  }

    return (
      <AppContext.Provider
        value={{
          getPosts,
          posts,
          groupedHeadings,
        }}
      >
      {children}
      </AppContext.Provider>
    )
}
export const AppConsumer = AppContext.Consumer