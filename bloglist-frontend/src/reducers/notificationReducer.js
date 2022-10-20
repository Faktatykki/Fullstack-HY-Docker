
export const setNotification = (content) => {
    return async dispatch => {
        await dispatch(show(content))

        setTimeout(
            async () => await dispatch(hide()), 5000
        )
    }
}

export const show = (content) => {
    return {
        type: 'SHOW',
        data: content,
    }
}

export const hide = () => {
    return {
        type: 'HIDE',
    }
}

const notificationReducer = (state = '', action) => {

    switch(action.type) {
    case 'SHOW':
        const notification = action.data
        state = notification

        return state


    case 'HIDE':
        state = ''
        return state

    default: return state
    }
}

export default notificationReducer