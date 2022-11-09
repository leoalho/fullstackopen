import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Callbackfunction gets called with right variables when creating a blog post', async () => {
  const title = 'Testing react frontend with jest'
  const author = 'Lele'
  const url = 'react.com'
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(<BlogForm addBlog={mockHandler} />)
  const submit = screen.getByText('create')

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], title)
  await user.type(inputs[1], author)
  await user.type(inputs[2], url)
  await user.click(submit)

  expect(mockHandler.mock.calls[0][0].author).toBe('Lele')
  expect(mockHandler.mock.calls[0][0].title).toBe('Testing react frontend with jest')
  expect(mockHandler.mock.calls[0][0].url).toBe('react.com')
})