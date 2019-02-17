const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const users = await User.find({})
    const user = users[0]
    blog.user = user._id
    const newBlog = await blog.save()

    user.blogs.push(newBlog._id)
    await user.save()
    return response.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter