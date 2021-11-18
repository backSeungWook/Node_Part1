
<h1>목차</h1>
<ul>
<li><h3>Part1(개발환경 설정)</h3></il>
<li><h3>Part2(...)</h3></il>
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