import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = async (id, newObject) => {
    const res = await axios.put(`${baseUrl}/${id}`, newObject)

    return res.data
}

const remove = async (id) => {
    const auth = {
        headers: { Authorization: token }
    }

    const res = await axios.delete(`${baseUrl}/${id}`, auth)
    return res.data
}

export default {
    setToken,
    getAll,
    create,
    update,
    remove
}