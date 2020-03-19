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
    </div>
  )
}
