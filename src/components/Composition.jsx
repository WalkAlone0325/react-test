/**
 * 类似vue的插槽slot
 */
import React from 'react'

// Dialog定义组件外观和行为
function Dialog (props) {
  // 这里props.children代表了标签内部的内容
  // children是一个合法的js表达式

  // 备选消息
  const message = {
    foo: { title: 'foo', content: 'foo~' },
    bar: { title: 'bar', content: 'bar~' }
  }
  // 执行函数获得要显示的内容
  const { def, footer } = props.children(message[props.msg])

  return (
    <div style={{ border: "1px solid blue" }}>
      {def}
      <div>{footer}</div>
    </div>
  )
}

function RadioGroup (props) {
  return (
    <div>{React.Children.map(props.children, radio => {
      // 要修改虚拟dom 只能克隆它
      // 参数1：克隆对象  参数2：设置的属性
      return React.cloneElement(radio, { name: props.name })
    })}</div>
  )
}

function Radio ({ children, ...rest }) {
  return (
    <label>
      <input type="radio" {...rest} />
      {children}
    </label>
  )
}

export default function Composition () {
  return (
    <div>
      <Dialog msg="foo">
        {/* 作用域插槽功能的实现 */}
        {({ title, content }) => ({
          def: (
            <>
              <h1>{title}</h1>
              <p>{content}</p>
            </>
          ),
          footer: <button onClick={() => alert('react真好')}>确定</button>
        })}
      </Dialog>

      <RadioGroup name="mvvm">
        <Radio value="vue">Vue</Radio>
        <Radio value="react">React</Radio>
        <Radio value="ng">angular</Radio>
      </RadioGroup>
    </div>
  )
}
