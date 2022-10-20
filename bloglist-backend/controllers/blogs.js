/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body
  
    if (!req.token || !req.user.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(req.user.id)

    if (body.title || body.url) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user.id
        })

        const savedBlog = await blog.save()
        
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog.toJSON())
    } else {
        res.status(400).end()
    }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const blogToDelete = await Blog.findById(req.params.id)

    if (req.user.id.toString() === blogToDelete.user.toString()) {
        await Blog.findByIdAndRemove(blogToDelete.id)
        res.status(204).end()
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(body.id, blog, { new: true })

    res.json(updatedBlog)
})

module.exports = blogsRouter