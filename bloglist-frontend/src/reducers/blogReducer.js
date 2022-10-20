import blogService from '../services/blogs'

export const createBlog = ( blog ) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog)
            
            dispatch({
                type: 'CREATE',
                data: newBlog,
            })
            //setnotif
        } catch (exception) {
            console.log(exception.message)
        }
    }
}
export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log(blogs)
        dispatch({
            type: 'INIT',
            data: blogs,
        })
    }
}

export const handleRemoveSubmit = ( blogId ) => {
    return async dispatch => {
        await blogService.remove(blogId)
        
        dispatch({
            type: 'REMOVE',
            data: blogId,
        })
    }
}


export const handleLikeSubmit = ( blog ) => {
    return async dispatch => {
        const updated = {
            ...blog,
            likes: blog.likes + 1
        }
        
        const updatedBlog = await blogService.update( blog.id, updated )

        dispatch({
            type: 'LIKE',
            data: updatedBlog,
        })
    } 
}
    

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT':
            return action.data.sort((a, b) => a.likes > b.likes ? -1 : 1)
        case 'REMOVE':
            return state.filter(b => b.id !== action.data)
        case 'CREATE':
            state = state.concat(action.data)
            return state
        case 'LIKE':
            const updatedBlogId = action.data.id
            return state.map(b => b.id !== updatedBlogId ? b : action.data).sort((a, b) => a.likes > b.likes ? -1 : 1)
        default: return state
    }
}

export default blogReducer