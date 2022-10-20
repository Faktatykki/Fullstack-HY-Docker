import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import userService from './services/login'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'


const App = () => {
    const dispatch = useDispatch()

    let user = useSelector(state => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            user = await userService.login({
                username,
                password,
            })

            dispatch(setUser(user))
            setUsername('')
            setPassword('')

            dispatch(setNotification('Logged in successfully!'))
        } catch (expection) {
            dispatch(setNotification('Wrong credentials'))
        }
    }

    const handleLogout = () => {
        dispatch(clearUser())
        dispatch(setNotification(`${user.username} logged out! See you around!`))
    }

    const handleBlogSubmit = async ( newBlog ) => {
        dispatch(createBlog(newBlog))
    }


    const handleUsernameChange = async (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = async (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification />

            {user === null ?
                <div>
                    <LoginForm
                        handleLogin = {handleLogin}
                        username = {username}
                        handleUsernameChange = {handleUsernameChange}
                        password = {password}
                        handlePasswordChange = {handlePasswordChange}
                    />
                </div>
                :
                <div>
                    <p>{user.name} logged in<Logout handleLogout = {handleLogout}/></p>

                    <Togglable id = 'togglable' showButtonLabel = "create new blog" hideButtonLabel = "cancel" ref = {blogFormRef}>
                        <BlogForm handleBlogSubmit = {handleBlogSubmit}/>
                    </Togglable>
                    <BlogList />
                </div>
            }
        </div>
    )
}

export default App