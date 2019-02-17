const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  console.error(error)

  next(error)
}


module.exports = {
  errorHandler
}