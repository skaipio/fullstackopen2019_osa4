const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const emptyBlogsList = []
const listWithOneBlog = [
  {
    _id: '5c62d6dba96a499808a1f148',
    title: 'Mixins are considered harmful',
    author: 'Dan Abramov',
    url: 'https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html',
    likes: 999
  }
]
const listWithMultipleBlogs = listWithOneBlog.concat([
  {
    _id: '5c62d9f9c2ee409c86f956e1',
    title: 'r/2meirl4meirl is sad but funny',
    author: 'Redditors',
    url: 'https://www.reddit.com/r/2meirl4meirl/',
    likes: 12350360
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
])

describe('total likes', () => {
  it('of empty likes is zero', () => {
    const totalLikes = listHelper.totalLikes(emptyBlogsList)
    expect(totalLikes).toBe(0)
  })

  it('equals the likes of the single blog when there is only one', () => {
    const totalLikes = listHelper.totalLikes(listWithOneBlog)
    expect(totalLikes).toBe(999)
  })

  it('equals the sum of likes of all the blogs in the list', () => {
    const totalLikes = listHelper.totalLikes(listWithMultipleBlogs)
    expect(totalLikes).toBe(999 + 12350360 + 5)
  })
})

describe('favorite blog', () => {
  it('in empty blog list is null', () => {
    const favoriteBlog = listHelper.favoriteBlog(emptyBlogsList)
    expect(favoriteBlog).toBe(null)
  })

  it('equals the single blog when there is only one', () => {
    const favoriteBlog = listHelper.favoriteBlog(listWithOneBlog)
    expect(favoriteBlog).toEqual({
      _id: '5c62d6dba96a499808a1f148',
      title: 'Mixins are considered harmful',
      author: 'Dan Abramov',
      url: 'https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html',
      likes: 999
    })
  })

  it('to be the blog with most likes when there are multiple blogs', () => {
    const favoriteBlog = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(favoriteBlog).toEqual({
      _id: '5c62d9f9c2ee409c86f956e1',
      title: 'r/2meirl4meirl is sad but funny',
      author: 'Redditors',
      url: 'https://www.reddit.com/r/2meirl4meirl/',
      likes: 12350360
    })
  })
})