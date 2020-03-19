## antd 的使用

### 安装

`yarn add antd` 或者 `npm i antd -S`

### 高级配置（配置按需加载）

- 安装 react-app-rewired 取代 react-script，可以扩展 webpack 配置，类似 vue.config.js
  `yarn add react-app-rewired customize-cra babel-plugin-import -D`

- 修改 package.json 文件：

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
  },
```
