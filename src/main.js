// @ts-check
// Part2
const http = require('http')

const server = http.createServer((req, res) => {
  // req.url : GET url 확인
  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode = 200
    res.end('List of posts')
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) {
    // req.url === '/posts/:id'
    res.statusCode = 200
    res.end('content of the post')
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200
    res.end('Createing post')
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`the Serve IS PORT : ${PORT}`)
})
