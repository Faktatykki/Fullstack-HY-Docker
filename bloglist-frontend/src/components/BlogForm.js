import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlogSubmit, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = async (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = async (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = async (event) => {
        setUrl(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const blog = {
                title: title,
                author: author,
                url: url,
            }

            handleBlogSubmit(blog)

            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (expection) {
            console.log(expection.message)
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <form id = 'blogform' onSubmit = {handleSubmit}>
                <div>
                    <div>
          title
                        <input
                            id = 'title'
                            type = "text"
                            value = {title}
                            name = "Title"
                            onChange = {handleTitleChange}
                        />
                    </div>
                    <div>
          author
                        <input
                            id = 'author'
                            type = "text"
                            value = {author}
                            name = "Author"
                            onChange = {handleAuthorChange}
                        />
                    </div>
                    <div>
          url
                        <input
                            id = 'url'
                            type = "text"
                            value = {url}
                            name = "Url"
                            onChange = {handleUrlChange}
                        />
                    </div>
                </div>
                <button id = 'createButton' type = "submit">
        create
                </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleBlogSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default BlogForm

