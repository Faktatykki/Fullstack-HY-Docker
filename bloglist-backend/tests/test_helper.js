const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    }
]

const oneBlog = {
    _id: '5a422a851b54a676234d17f9',
    title: 'FrontEnd Sucks',
    author: 'Sampo Kääriäinen',
    url: 'https://www.hs.fi',
    likes: 872,
    __v: 0   
}

const noIdBlog = { 
    _id: '5a422a851b54a676234d17f9',
    title: 'BackEnd Rocks',
    author: 'Sampo Kääriäinen',
    url: 'https://www.hs.fi',
    __v: 0
  
}

const noTitleAndUrlBlog =  {
    _id: '591ndsk3135b51899b5n4f6',
    author: 'JavaScript meh',
    __v: 0
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
    {
        username: 'Miihku',
        name: 'Miihkali',
        password: 'salasana1234'
    },
    {
        username: 'Keni',
        name: 'Kenneth',
        password: '1234salasana'
    }
]

const existingUser = {    
    username: 'Miihku',
    name: 'Minna-Kaisa',
    password: 'askfkasfjasjfasf'   
}

const oneUser = {
    username: 'ryyni',
    name: 'Minnaryyni',
    password: 'salsasana1234'
}

const lessThanThreeCharsUsername = {
    username: 'AA',
    name: 'Pentti',
    password: 'ölkasjfajsfajsff'
}

const lessThanThreeCharsPassword = {
    username: 'AAAA',
    name: 'Bosse',
    password: 'AA'
}

const emptyUsername = {
    name: 'Alpo-Setä',
    password: 'ektqektqketkqekt'
}

const emptyPassword = {
    username: 'Tarmis',
    name: 'Tarmo'
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, 
    oneBlog, 
    noIdBlog, 
    blogsInDb,
    usersInDb,
    noTitleAndUrlBlog,
    initialUsers,
    existingUser,
    oneUser,
    lessThanThreeCharsUsername,
    lessThanThreeCharsPassword,
    emptyUsername,
    emptyPassword
}