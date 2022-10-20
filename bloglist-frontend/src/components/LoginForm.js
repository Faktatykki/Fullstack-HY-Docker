import React from 'react'


const LoginForm = (props) => (
    <form id = 'loginform' onSubmit = {props.handleLogin}>
        <div>
      username
            <input
                id = 'username'
                type = "text"
                value = {props.username}
                name = "Username"
                onChange = {props.handleUsernameChange}
            />
        </div>
        <div>
      password
            <input
                id = 'password'
                type = "password"
                value = {props.password}
                name = "Password"
                onChange = {props.handlePasswordChange}
            />
        </div>
        <button id = "loginbutton" type = "submit">login</button>
    </form>
)

export default LoginForm