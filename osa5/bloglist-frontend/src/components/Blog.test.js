import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'lele',
  title: 'testiblogi1',
  url: 'http://testi.fi',
  likes: 5,
  user: {
    username: 'lele',
    name: 'Leo Alho'
  }
}

test('Renders title and author but not url and likes', () => {

  render(<Blog blog={blog} />)

  const element = screen.getByText('testiblogi1 lele')

  expect(element).toBeDefined()
  const element2 = screen.queryByText('testiblogi1 lele http://testi.fi likes 5 Leo Alho')
  expect(element2).toBeNull()

})

test('clicking the show button shwos url and likes', async () => {

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const element2 = screen.queryByText('testiblogi1 lele http://testi.fi likes 5 Leo Alho')
  expect(element2).toBeDefined()

})

test('like button fires right callback function', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler}/>)
  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})