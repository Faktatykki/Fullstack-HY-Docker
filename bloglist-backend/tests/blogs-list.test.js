/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { test } = require('@jest/globals')

let authorization = null

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(helper.oneUser.password, saltRounds)

    const userObject = new User({
        username: helper.oneUser.username,
        name: helper.oneUser.name,
        passwordHash
    })

    await userObject.save()

    const blogObjects = helper.initialBlogs.map(blog => new Blog({
        user: userObject.id, ...blog }))
    
    await blogObjects.map(blog => blog.save())

    const newUserForToken = {
        username: helper.oneUser.username,
        password: helper.oneUser.password
    }

    const res = await api
        .post('/api/login')
        .send(newUserForToken)

    authorization = `bearer ${res.body.token}`
})

describe('bloglist GET', () => {
    test('blogs are returned as json', async () => {        
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('get returns right amount', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(3)
    })

    test('id key is right', async () => {
        const res = await api.get('/api/blogs')

        res.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('bloglist POST', () => {
    test('when posted, list grows', async () => {
        const toSend = helper.oneBlog

        await api
            .post('/api/blogs')
            .set('Authorization', `${authorization}`)
            .send(toSend)
            .expect(201) //created
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        
        const latestIndex = blogsAtEnd.length - 1

        expect(blogsAtEnd[latestIndex].title).toContain('FrontEnd Sucks')
        expect(blogsAtEnd[latestIndex].author).toContain('Sampo Kääriäinen')
        expect(blogsAtEnd[latestIndex].url).toContain('https://www.hs.fi')
        expect(blogsAtEnd[latestIndex].likes).toBe(872)
    })
    
    test('default likes is 0', async () => {
        const toSend = helper.noIdBlog

        await api
            .post('/api/blogs')
            .set('Authorization', `${authorization}`)
            .send(toSend)
            .expect(201) //created
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const latestIndex = await blogsAtEnd.length - 1

        expect(blogsAtEnd[latestIndex].likes).toBeDefined()
        expect(blogsAtEnd[latestIndex].likes).toBe(0)
    })

    test('if no title and url, status 400 bad req', async () => {
        const toSend = helper.noTitleAndUrlBlog

        await api
            .post('/api/blogs')
            .set('Authorization', `${authorization}`)
            .send(toSend)
            .expect(400)
    })

    test('no blog added if unauthorized', async () => {
        await api
            .post('/api/blogs')
            .send(helper.oneBlog)
            .expect(401)
   
        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('bloglist DELETE', () => {
    test('deleting a blog works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `${authorization}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
})

describe('bloglist UPDATE', () => {
    test('updating a blog works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        
        const blog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blog)
            .expect(200)

        const updatedBlog = await Blog.findById(blogToUpdate.id)

        expect(blogToUpdate.likes).toBe(updatedBlog.likes - 1)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtStart).toHaveLength(blogsAtEnd.length)
    })
})

afterAll( async () => {
    mongoose.connection.close()
})
