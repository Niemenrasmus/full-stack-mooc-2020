import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import jest from 'jest-mock';


describe('Blog', () => {
  let component
  const blog = {
    title: 'Testi123',
    author: 'Tony Halme',
    url: 'abc.fd',
    likes: 3,
  }

  const addBlog = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} likeBlog={addBlog} />)
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent('Testi123')
  })  


  test('renders author', () => {
    expect(component.container).toHaveTextContent('Tony Halme')
  })


  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(addBlog.mock.calls).toHaveLength(2)
  })

  test("Test for new blog", () => {

    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog = {createBlog}/>
    )

    const url = component.container.querySelector("#url")
    const author = component.container.querySelector("#author")
    const title = component.container.querySelector("#title")
    const submit = component.container.querySelector('form')

    fireEvent.change(title,{
        target: {value: 'Viikinki'}
    })

    fireEvent.change(url,{
        target: {value: 'abc.sd'}
    })

    fireEvent.change(author,{
        target: {value: 'Tony Halme'}
    })

    fireEvent.submit(submit)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Viikinki')
  expect(createBlog.mock.calls[0][0].url).toBe('abc.sd')
  expect(createBlog.mock.calls[0][0].author).toBe('Tony Halme')

  })
})
