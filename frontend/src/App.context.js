import React, { useMemo, useState } from "react"
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
// import enLocale from 'dayjs/locale/en-gb' // weekStart 1
 
// dayjs.locale(enLocale).startOf('week').format()
dayjs.extend(weekOfYear)

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [groupedHeadings, setGroupedHeadings] = useState(null)

  const getPosts = useMemo(() => async () => {
    try {
      const response = await fetch('http://localhost:7000/posts')
      const data = await response.json();
      return parsePosts(data)
    } catch (error) {
      console.error('(FROM ASYNC/AWAIT) Error cause is:', error)
    }
  }, [])
  
  const parsePosts = posts => {
    const headings = {
      author: [],
      location: [],
      week: [],
    }
    
    // const updatedPosts = posts.map(post => ({...post, date: dayjs(post.time * 1000).format('DD/MM/YYYY') }));
    const updatedPosts = posts.map(({time, ...rest}) => ({...rest, time: dayjs(time * 1000).format('dddd, MMMM D, YYYY h:mm A') }));
// 
    // console.log('test', dayjs(posts[1].time * 1000).format('DD/MM/YYYY') )// dayjs(posts[1].time * 1000).week() )
    debugger
    posts.forEach(post => {
      const year = dayjs(post.time * 1000).format('YYYY')
      const weekNumber = dayjs(post.time * 1000).week();
      console.log('dayjs(year)', dayjs(year))
      const readableWeek = dayjs(year).add(weekNumber, 'week').startOf('week').format('MMM D, YYYY');
      debugger

      // const readableDate = dayjs(timeInSeconds).format('DD/MM/YYYY')
      headings.author[post.author] ? headings.author[post.author].push(post.id) : headings.author[post.author] = [post.id]
      headings.location[post.location] ? headings.location[post.location].push(post.id) : headings.location[post.location] = [post.id]
      headings.week[readableWeek] ? headings.week[readableWeek].push(post.id) : headings.week[readableWeek] = [post.id]
    })
    // console.log('updatedPosts', updatedPosts)
    setGroupedHeadings(headings)
    setPosts(updatedPosts)
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