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

- 在根目录下添加 config-overrides.js

```js
const { override, fixBabelImports } = require('customize-cra')

// override 生成 webpack 配置对象
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
```

- 支持装饰器配置
  `yarn add @babel/plugin-proposal-decorators -d`

```js
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')

// override 生成 webpack 配置对象
module.exports = override(
  fixBabelImports('import', {
    // antd按需加载
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy() // 装饰器
)
```

### 表单组件设计与实现

#### antd 表单试用

```jsx
import React from 'react'
import { Form, Icon, Input, Button } from 'antd'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    // validateFields 全局校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    // getFieldDecorator
    // 装饰器工厂，字段装饰器能够生成一个装饰器
    // 设置字段名称、检验规则、增强input使他可以校验
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25' }} />}
              placeholder='Username'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25' }} />}
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            login in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

// 经过包装以后，表单拥有了额外的能力：全局校验、输入控件包装器
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
)

export default WrappedNormalLoginForm
```
