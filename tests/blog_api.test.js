const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogMocks = require('./blog_mocks')

jest.setTimeout(30000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogMocks.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('GET /api/blogs returns all blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogMocks.blogs.length)
})

test('POST /api/blogs saves a new note', async () => {
  await api
    .post('/api/blogs')
    .send(blogMocks.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const blogsWithoutIds = response.body.map(blog => {
    const blogWithoutId = {...blog}
    delete blogWithoutId.id
    return blogWithoutId
  })

  expect(response.body.length).toBe(blogMocks.blogs.length + 1)
  expect(blogsWithoutIds).toContainEqual(blogMocks.singleBlog)
})

test('returned blogs have id field', async () => {
  const response = await api
    .get('/api/blogs')

  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

afterAll(async () => {
  mongoose.connection.close()
})