import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

let blog = null
let blogComponent = null
let user = null
let mockHandlerLike = null

beforeEach(() => {
    user = {
        username: 'Minna',
        name: 'Ryyni'
    }

    blog = {
        title: 'Title',
        author: 'Author',
        url: 'URL',
        user: user
    }


    mockHandlerLike = jest.fn()

    blogComponent = render(
        <Blog blog = {blog}
            user = {user}
            handleLikeSubmit = {mockHandlerLike}/>
    )
})

describe('Blog tests', () => {
    test('renders title and author default, but nothing else', () => {
        expect(blogComponent.container).toHaveTextContent(
            'Title Author'
        )
    })

    test('url and likes shown when button pushed', () => {
        const button = blogComponent.getByText('view')
        fireEvent.click(button)

        expect(blogComponent.container).toHaveTextContent(
            'Title Author',
            'URL',
            'likes 0'
        )
    })

    test('two times clicked like button func is called twice', () => {
        const button = blogComponent.getByText('view')
        fireEvent.click(button)

        const likeButton = blogComponent.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandlerLike.mock.calls).toHaveLength(2)
    })
})

describe('BlogForm tests', () => {
    test('BlogForm fields are correct when submitting', () => {
        const createBlog = jest.fn()

        const blogFormComponent = render(
            <BlogForm handleBlogSubmit = {createBlog} />
        )

        const title = blogFormComponent.container.querySelector('#title')
        const author = blogFormComponent.container.querySelector('#author')
        const url = blogFormComponent.container.querySelector('#url')
        const form = blogFormComponent.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: blog.title }
        })
        fireEvent.change(author, {
            target: { value: blog.author }
        })
        fireEvent.change(url, {
            target: { value: blog.url }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)

        expect(createBlog.mock.calls[0][0].title).toBe('Title')
        expect(createBlog.mock.calls[0][0].author).toBe('Author')
        expect(createBlog.mock.calls[0][0].url).toBe('URL')
    })
})


