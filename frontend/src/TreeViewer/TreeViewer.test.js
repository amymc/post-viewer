import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { AppContext } from "../App.context"
import TreeViewer from './TreeViewer'

describe('TreeViewer', () => {
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

  const contextValue = { groupedHeadings, posts, setSelectedPostId: jest.fn() }

  function renderTreeViewer() {
    return render(
      <AppContext.Provider value={contextValue}>
        <TreeViewer />
      </AppContext.Provider>
    )
  }

  test('Week is selected by default', () => {
    renderTreeViewer()
    expect(screen.getAllByText(/Week beginnning/g).length).toEqual(3)
    expect(screen.queryByText('Happy Manager')).toBeNull()
    expect(screen.queryByText('Dublin')).toBeNull()
  })
  test('The list is changed when a different type is selected ', () => {
    renderTreeViewer()
    const dropdown = screen.getByTestId('select')

    fireEvent.change(dropdown, { target: { value: 'author' } })
    expect(screen.getAllByText('Happy Manager').length).toEqual(1)
    expect(screen.queryByText('Dublin')).toBeNull()
    expect(screen.queryByText(/Week beginnning/g)).toBeNull()
    
    fireEvent.change(dropdown, { target: { value: 'location' } })
    expect(screen.getAllByText('Berlin').length).toEqual(1)
    expect(screen.queryByText('Sad Manager')).toBeNull()
    expect(screen.queryByText(/Week beginnning/g)).toBeNull()
  })
})