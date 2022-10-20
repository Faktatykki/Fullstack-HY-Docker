import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import { handleLikeSubmit, handleRemoveSubmit } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    console.log('yks')
    console.log(blog)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleLike = () => {
        dispatch(setNotification(`Liked blog '${blog.title}'`))
        dispatch(handleLikeSubmit(blog))
    }

    const handleRemove = () => {
        dispatch(setNotification(`Removed '${blog.title}'`))
        dispatch(handleRemoveSubmit(blog.id))
    }

    return (
        visible ?

            <div style={blogStyle}>
                <p>
                    {blog.title} {blog.author} <button id='visibleButton' onClick={handleVisible}>hide</button><br />
                    {blog.url} <br />
                    likes {blog.likes} <button id='likeButton' onClick={handleLike}>like</button> <br />
                    {blog.user.name} <br />


                    {(blog.user.username === blog.user.name || blog.user.name === blog.user.name) ?
                        <button id='removeButton' onClick={handleRemove}>remove</button>
                        :
                        <br></br>
                    }
                </p>
            </div>

            :

            <div style={blogStyle}>
                {blog.title} {blog.author} <button onClick={handleVisible}>view</button>
            </div>
    )
}

export default Blog