// @ts-check

// JSDoc를 사용 하여 type 정의
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches:string[],body:Object.<string,*> | undefined)=>Promise<APIResponse>} callback
 */

const fs = require('fs')

const DB_FEIL_NAME = 'databases.json'

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile(DB_FEIL_NAME, 'utf-8')
  return JSON.parse(json).posts
}

/**
 * @param {Post[]} posts
 */
// 파일 저장
async function savePosts(posts) {
  const content = {
    posts,
  }

  return fs.promises.writeFile(DB_FEIL_NAME, JSON.stringify(content), 'utf-8')
}

/** @type {Route[]} */
const routs = [
  {
    url: /^\/posts$/,
    method: 'GET',

    callback: async () => ({
      statusCode: 200,
      body: await getPosts(),
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not Found',
        }
      }

      const posts = await getPosts()
      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not Found',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-formed request.',
        }
      }

      /** @type {string} */
      /* eslint-disable-next-line prefer-destructuring */
      const title = body.title
      const newPost = {
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      posts.push(newPost)
      savePosts(posts)

      return {
        statusCode: 200,
        body: newPost,
      }
    },
  },
]

module.exports = {
  routs,
}
