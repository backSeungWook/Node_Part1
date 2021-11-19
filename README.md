
<h1>목차</h1>
<ul>
<li><h3>Part1(개발환경 설정)</h3></il>
<li><h3>Part2(프레임워크 없이 RESTful API)</h3></il>
</ul>

</br>
</br>

# Node.js Part1(개발환경 설정)

`1.` 노드 환경파일 만들기  
`2.` Formatting, Linting 설정  
`3.` typescript

</br>
</br>

## 노드 환경파일 만들기
```
npm init -y
```

## Formatting, Linting 설정
`Formatting` : Prettier / `Linting` : ESLint

### Prettier
```
npm instaill --save-dev prettier
```

Vscode에 Prettier - Code formatter 플러그인 설치

```js
//.prettierrc
//prettier 설정 파일 생성
{
  "semi":false,//세미클론 없음
  "singleQuote":true//싱글따옴표 사용
}
```
.vscode에서 설정
```js
//.vscode/settings.json
{
  "[javascript]":{
    "editor.formatOnSave":true,
    "editor.defaultFormatter":"esbenp.prettier-vscode"
  }
}
```

### ESLint
```
npm i --save-dev eslint
```

규칙 설정 라이브러리
airbnb 설치 eslint 버전 "^7.32.0" 으로 적용.
```
npm i --save-dev eslint-config-airbnb-base  eslint-plugin-import
npm i --save-dev eslint-config-prettier
npm i --save-dev eslint-plugin-node
```

```js
//.eslintrc.js 설정 파일 생성
module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
}
```

### typescript
```
npm i --save-dev typescript @types/node
```
```js
// @ts-check -> typescript 문법 체크

//ex main.js
// // @ts-check 추가 해줘야 적용이 됨
// @ts-check
console.log('the Serve IS PORT')
...

```
```js
//tyscript 설정 파일
//jsconfig.json
{
  "compilerOptions": {
    "strict":true
  },
  "include": [
    "src/**/*"
  ]
}
```

## VScode Node디버깅 설정
```json
//.vscode/launch.json
//구성 추가 버튼 클릭 => Launch via NPM 추가
{
  "configurations": [
    {
      "name": "Launch via NPM",
      "request": "launch",
      "runtimeArgs": [
        "run-script",
        "debug"
      ],
      "runtimeExecutable": "npm",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "pwa-node"
    }

  ]
}


//package.json scripts에 추가
"scripts": {
  ...
  "debug":"node src/main.js"
},

```

## polyfill
기본적으로 지원하지 않는 이전 브라우저에서 최신 기능을 제공하는 데 필요한 코드  
https://node.green/ 에서 노드 버전별 모듈 지원 여부 확인 가능.
### core-js
```
npm i core-js
```
```js
//선언
require('core-js')

//EX
const complicatedArray = [1,[2,3]]
const fiattendArray = complicatedArray.flat()

console.log(fiattendArray)
```

## Transpile
코드를 A언어에서 B언어로 변환하는 작업
즉, 신규 언어 스펙(ES6+) --> 구형 언어 스펙(ES5 등) 으로 트랜스파일 할 때 사용.
대표적인 트랜스파일러 : Babel,tsc,ESbuild

<br />
<br />
<br />
  
# Part2(프레임워크 없이 RESTful API)
프로젝트 개요 : 블로그 포스팅 서비스
 - 로컬 파일을 DB로 사용(JSON)
 - RESTful API 사용


## nodemon
자동으로 서버 재구동 해주는 모듈
```
npm i -D nodemon
```
```js
//package.json
"scripts": {
    "server":"nodemon src/main.js"
  },
```

## HTTPie
설치 방법은 파이썬 설치 후 PIP로 설치  https://httpie.io/ 사이트 참조
```
pip install httpie
```

## JSDoc를 사용 하여 type 정의
Javadoc과 유사한 JavaScript용 API 문서 생성기이다. 문서 주석을 코드와 함께 소스 코드에 직접 추가할 수 있다.  
JSDoc은 소스 코드를 스캔하고 HTML 문서를 생성한다.

JSDoc의 주목적은 JavaScript 앱 또는 라이브러리 API를 문서화하는 것이다. 
모듈, 네임스페이스, 클래스, 메서드, 파라미터 등과 같은 항목을 문서화할 것으로 가정한다.

일반적으로 JSDoc 주석은 코드가 문서화되기 직전에 배치되어야 한다.  
각 주석은 /** 시퀀스로 시작해야 JSDoc 파서가 인식할 수 있다. /*, /*** 으로 시작되는 설명은 무시된다.  

정의한 타입이 아닌 경우 에러 처리가 된다. https://jsdoc.app/ 참조  
사용법은 주석 안에 type정의
```js
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

//정의한 type 사용법.
/** @type {Post[]} */
const posts = [
  {
    id: 'my_first_post',
    title: 'my first post',
    content: 'Hello',
  },
]
```