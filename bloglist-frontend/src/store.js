import { createStore, combineReducers, applyMiddleware } from 'redux'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'



const reducer = combineReducers({
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store