const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accLikes, blog) => accLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favoriteBlog, blog) =>
    blog.likes > favoriteBlog.likes ? blog : favoriteBlog,
    blogs[0]
  )
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}