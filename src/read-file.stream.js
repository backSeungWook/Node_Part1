// @ts-check

const { log } = console

const fs = require('fs')

// highWaterMark : 한번에 읽어 올 수 있는 버퍼의 크기
const rs = fs.createReadStream('local/big-file', {
  encoding: 'utf-8',
  highWaterMark: 65536 * 2, // 기본값: 65536
})

/** @type {Object.<string,number>} */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type{string | undefined} */
let prevCharacter

let chunckCount = 0
rs.on('data', (data) => {
  chunckCount += 1
  if (typeof data !== 'string') {
    return
  }

  for (let i = 0; i < data.length; i += 1) {
    if (data[i] !== prevCharacter) {
      const newCharacter = data[i]
      prevCharacter = newCharacter

      numBlocksPerCharacter[newCharacter] += 1
    }
  }
})

// 파일을 다 읽어 온 후 실행
rs.on('end', () => {
  log('Event: end')
  log('blockCount', numBlocksPerCharacter)
  log('chunckCount', chunckCount)
})
