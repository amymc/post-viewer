import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppContext } from "./App.context"
import App from './App'

describe('App', () => {
  const posts = [
    {
      "id": 1,
      "location": "San Francisco",
      "time": "Thursday, March 14, 2019 1:46 PM",
      "author": "Happy User",
      "text": "The modern workplace is increasingly digital, and workflows are constantly evolving. "
    },
    {
      "id": 2,
      "location": "Dublin",
      "time": "Wednesday, March 20, 2019 4:35 PM",
      "author": "Happy Manager",
      "text": "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
    },
    {
      "id": 3,
      "location": "Berlin",
      "time": "Thursday, April 25, 2019 12:00 AM",
      "author": "Sad Manager",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tristique purus. Aenean ac neque felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc mauris diam, egestas a diam non, dignissim commodo augue. Etiam leo nisi, consequat a ultricies at, rhoncus sed velit"
    },
  ]

  const groupedHeadings = {
    author: {
      "Happy User": [1],
      "Happy Manager": [2],
      "Sad Manager": [3]
    },
    location: {
      "San Francisco": [1],
      "Dublin": [2],
      "Berlin": [3],
    },
    week: {
      "Week beginnning Mar 10, 2019": [1],
      "Week beginnning Mar 17, 2019": [2],
      "Week beginnning Apr 21, 2019": [3],
    },
  }

  const defaultContextValue = { selectedPostId: null, showError: false, getPosts: jest.fn(), updatePost: jest.fn(), groupedHeadings, posts }

  function renderApp(value) {
    return render(
      <AppContext.Provider value={value}>
        <App />
      </AppContext.Provider>
    )
  }

  test('Requests post from backend on mount ', () => {
    renderApp(defaultContextValue)
    expect(defaultContextValue.getPosts).toHaveBeenCalledTimes(1)
  })
  test('Renders the Tree Viewer by default', () => {
    renderApp(defaultContextValue)
    expect(screen.getByText('Group by:')).toBeInTheDocument()
    expect(screen.queryByText('Error! Posts not found!')).toBeNull()
  })
  test('Renders error message if the call to get posts fails', () => {
    const newContextValue = { ...defaultContextValue, showError: true }
    renderApp(newContextValue)
    const errorMessage = screen.getByText('Error! Posts not found!')
    expect(errorMessage).toBeInTheDocument()
  })
  test('When a post is selected it renders it in the Editor ', () => {
    renderApp(defaultContextValue)
    expect(screen.queryByLabelText('Author')).toBeNull()
  
    const newContextValue = { ...defaultContextValue, selectedPostId: 1 }
    renderApp(newContextValue)
    const authorField = screen.getByLabelText('Author', { selector: 'input' })
    expect(authorField).toBeInTheDocument()
    expect(authorField.value).toBe('Happy User')
  })
})