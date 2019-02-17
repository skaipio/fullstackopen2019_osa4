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

test('returned blogs have id field', async () => {
  const response = await api
    .get('/api/blogs')

  const blog = response.body[0]

  expect(blog.id).toBeDefined()
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

test('POST /api/blogs returns 400 Bad Request if title or url is not set', async () => {
  const blogWithoutTitle = {...blogMocks.singleBlog}
  delete blogWithoutTitle.title

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  const blogWithoutUrl = {...blogMocks.singleBlog}
  delete blogWithoutUrl.url

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

test('blog likes field is by default set to 0', async () => {
  const blogWithoutLikes = {...blogMocks.singleBlog}
  delete blogWithoutLikes.likes

  const newBlogResponse = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)

  const { body } = await api
    .get('/api/blogs')

  for (const blog of body) {
    expect(blog.likes).toBeDefined()
    if (blog.id === newBlogResponse.id) {
      expect(blog.likes).toBe(0)
    }
  }
})

afterAll(async () => {
  mongoose.connection.close()
})