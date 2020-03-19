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

  render () {
    // getFieldDecorator
    // 装饰器工厂，字段装饰器能够生成一个装饰器
    // 设置字段名称、检验规则、增强input使他可以校验
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">login in</Button>
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
