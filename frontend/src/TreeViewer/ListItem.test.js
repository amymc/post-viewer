import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { AppContext } from "../App.context"
import ListItem from './ListItem'

describe('ListItem', () => {
  const posts = [
    {
      "id": 1,
      "location": "Dublin",
      "time": "Thursday, April 25, 2019 12:00 AM",
      "author": "Happy Manager",
      "text": "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
    },
    {
      "id": 2,
      "location": "Dublin",
      "time": "Wednesday, March 20, 2019 4:35 PM",
      "author": "Happy Manager",
      "text": "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
    },
  ]
  
  const contextValue = { selectedPostId: null, setSelectedPostId: jest.fn() }

  function renderListItem() {
    return render(
      <AppContext.Provider value={contextValue}>
        <ListItem posts={posts} type='author' title='Happy Manager'/>
      </AppContext.Provider>
    )
  }

  test('Clicking on heading expands the list', () => {
    renderListItem()
    const heading = screen.getByText('Happy Manager')
    expect(screen.queryByText(/integrated productivity solution/g)).toBeNull()
    expect(screen.queryByText(/modern PDF annotator that/g)).toBeNull()

    fireEvent.click(heading)
    expect(screen.getByText(/integrated productivity solution/g)).toBeInTheDocument()
    expect(screen.getByText(/modern PDF annotator that/g)).toBeInTheDocument()
  })
})