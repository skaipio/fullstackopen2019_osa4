const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  const newBlog = await blog.save()
  return response.status(201).json(newBlog)
})

module.exports = blogRouter