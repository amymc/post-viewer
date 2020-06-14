import React, { useMemo, useState } from "react"
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [groupedHeadings, setGroupedHeadings] = useState({})
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [showError, setShowError] = useState(false)

  const getPosts = useMemo(() => async () => {
    try {
      const response = await fetch('http://localhost:7000/posts')
      const data = await response.json()
      return parsePosts(data)
    } catch (error) {
      console.error(error)
      setShowError(true)
    }
  }, [])
  
  const parsePosts = posts => {
    const headings = {
      authors: {},
      locations: {},
      weeks: {},
    }
    posts.forEach(post => {
      const year = dayjs(post.time * 1000).format('YYYY')
      const weekNumber = dayjs(post.time * 1000).week()
      const readableWeek = dayjs(year).add(weekNumber - 1, 'week').startOf('week').format('MMM D, YYYY')

      headings.authors[post.author] ? headings.authors[post.author].push(post.id) : headings.authors[post.author] = [post.id]
      headings.locations[post.location] ? headings.locations[post.location].push(post.id) : headings.locations[post.location] = [post.id]
      headings.weeks[readableWeek] ? headings.weeks[readableWeek].push(post.id) : headings.weeks[readableWeek] = [post.id]
    })

    const dateFormattedPosts = posts.map(({time, ...rest}) => ({...rest, time: dayjs(time * 1000).format('dddd, MMMM D, YYYY h:mm A') }))

    setGroupedHeadings(headings)
    setPosts(dateFormattedPosts)
  }

  return (
    <AppContext.Provider
      value={{
        getPosts,
        posts,
        setPosts,
        selectedPostId,
        setSelectedPostId,
        groupedHeadings,
        showError,
      }}
    >
    {children}
    </AppContext.Provider>
  )
}
export const AppConsumer = AppContext.Consumer