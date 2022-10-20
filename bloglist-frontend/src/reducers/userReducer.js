import userService from '../services/users'
import blogService from '../services/blogs'

export const setUser = ( user ) => {
    return async dispatch => {
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )

        blogService.setToken(user.token)

        dispatch({
            type: 'SET',
            data: user
        })
    }
}

export const clearUser = (  ) => {
    return async dispatch => {
        window.localStorage.clear()

        dispatch({
            type: 'CLEAR',
        })
    }
    
}

const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET':
            state = action.data
            return state
        case 'CLEAR':
            state = null
            return state 

        default: return state
    }
}

export default loginReducer