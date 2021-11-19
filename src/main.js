// @ts-check
// Part2

const http = require('http')
const { routs } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routs.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not Found?')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not Found?')
      return
    }

    /** @type {Object.<string,*> | undefined} */
    const reqbody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-formed JSON'))
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regexResult, reqbody)
    res.statusCode = result.statusCode
    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; encoding=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }
  main()
})

const PORT = 4000
server.listen(PORT, () => {
  // console.log(`the Serve IS PORT : ${PORT}`)
})
