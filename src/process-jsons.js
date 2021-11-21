// @ts-check
const { log } = console

const fs = require('fs')

const rs = fs.createReadStream('local/jsons', {
  encoding: 'utf-8',
})

let totalSum = 0
// let accumulatedJsonStr = ''

rs.on('data', (chunk) => {
  // accumulatedJsonStr += chunk

  if (typeof chunk !== 'string') {
    return
  }

  /* const lastNewLineIdx = accumulatedJsonStr.lastIndexOf('\n')

  const jsonLineStr = accumulatedJsonStr.substring(0, lastNewLineIdx)
  accumulatedJsonStr = accumulatedJsonStr.substring(lastNewLineIdx) */

  totalSum += chunk
    .split('\n')
    .map((jsonLine) => {
      try {
        return JSON.parse(jsonLine)
      } catch {
        return undefined
      }
    })
    .filter((json) => json)
    .map((json) => json.data)
    .reduce((sum, curr) => sum + curr, 0)
})

rs.on('end', () => {
  log('totalSum', totalSum)
})
