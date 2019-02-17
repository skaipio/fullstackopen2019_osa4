const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const newBlog = await blog.save()
    return response.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter