import React, { useMemo, useState } from "react"
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { types } from './globals'
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
      const { headings, dateFormattedPosts } = parsePosts(data)
      setGroupedHeadings(headings)
      setPosts(dateFormattedPosts)
      return
    } catch (error) {
      console.error(error)
      setShowError(true)
    }
  }, [])
  
  const parsePosts = posts => {
    const headings = {
      author: {},
      location: {},
      week: {},
    }
    posts.forEach(post => {
      const year = dayjs(post.time * 1000).format('YYYY')
      const weekNumber = dayjs(post.time * 1000).week()
      const readableWeek = dayjs(year).add(weekNumber - 1, 'week').startOf('week').format('MMM D, YYYY')

      headings.author[post.author] ? headings.author[post.author].push(post.id) : headings.author[post.author] = [post.id]
      headings.location[post.location] ? headings.location[post.location].push(post.id) : headings.location[post.location] = [post.id]
      headings.week[readableWeek] ? headings.week[readableWeek].push(post.id) : headings.week[readableWeek] = [post.id]
    })

    const dateFormattedPosts = posts.map(({time, ...rest}) => ({...rest, time: dayjs(time * 1000).format('dddd, MMMM D, YYYY h:mm A') }))

    return { headings, dateFormattedPosts }
  }
  
  const getUpdatedHeadings = (updatedPost, type) => {
    let clonedObj = {...groupedHeadings[type]}
    if (!Object.keys(groupedHeadings[type]).includes(updatedPost[type]) ){
      //removing item from previous key
      const filteredItems = Object.assign({}, ...Object.entries(clonedObj).map(([key, arr]) => ({[key]: arr.filter(id => id !== updatedPost.id)})))
      //removing empty arrays
      clonedObj = Object.fromEntries(Object.entries(filteredItems).filter(([key, arr]) => arr.length > 0))
      clonedObj = {...clonedObj, [updatedPost[type]]: [updatedPost.id]}
    }
    return clonedObj
  }
  
  const updatePost = updatedPost => {
    const filteredPosts = posts.filter(_post => _post.id !== updatedPost.id)
    const locationHeadings = getUpdatedHeadings(updatedPost, types.location)
    const authorHeadings = getUpdatedHeadings(updatedPost, types.author)

    setGroupedHeadings({
      ...groupedHeadings,
      [types.location]: locationHeadings,
      [types.author]:authorHeadings
    })
    setPosts([...filteredPosts, updatedPost])
  }

  return (
    <AppContext.Provider
      value={{
        getPosts,
        posts,
        selectedPostId,
        setSelectedPostId,
        groupedHeadings,
        showError,
        updatePost,
      }}
    >
    {children}
    </AppContext.Provider>
  )
}
export const AppConsumer = AppContext.Consumer