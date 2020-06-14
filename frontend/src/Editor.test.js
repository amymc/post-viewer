import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { AppContext } from "./App.context"
import Editor from './Editor'

describe('Editor', () => {
  const post = {
    "id": 1,
    "location": "San Francisco",
    "time": "Thursday, March 14, 2019 1:46 PM",
    "author": "Happy User",
    "text": "The modern workplace is increasingly digital, and workflows are constantly evolving. "
  }

  const contextValue = { updatePost: jest.fn() }

  function renderEditor() {
    return render(
      <AppContext.Provider value={contextValue}>
        <Editor post={post}/>
      </AppContext.Provider>
    )
  }
  
  test('Only location and author fields are editable', () => {
    renderEditor()
    const authorField = screen.getByLabelText('Author', { selector: 'input' })
    const locationField = screen.getByLabelText('Location', { selector: 'input' })
    const timeField = screen.getByLabelText('Time', { selector: 'input' })
    const idField = screen.getByLabelText('ID', { selector: 'input' })
    const textField = screen.getByLabelText('Text', { selector: 'textarea' })

    expect(authorField).not.toHaveAttribute('disabled')
    expect(locationField).not.toHaveAttribute('disabled')
    expect(timeField).toHaveAttribute('disabled')
    expect(idField).toHaveAttribute('disabled')
    expect(textField).toHaveAttribute('disabled')
  })
  test('Clicking Save saves the changes', () => {
    renderEditor()
    const saveButton = screen.getByText('Save')
    const locationField = screen.getByLabelText('Location', { selector: 'input' })
    const updatedPost = { ...post, location: 'New York' }
    fireEvent.change(locationField, { target: { value: 'New York' } })
    fireEvent.click(saveButton)

    expect(contextValue.updatePost).toHaveBeenCalledTimes(1)
    expect(contextValue.updatePost).toHaveBeenCalledWith(updatedPost)
  })
})