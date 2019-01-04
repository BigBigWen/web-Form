import React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const Fragment = React.Fragment
class FormItem extends React.Component {
  render () {
    const { children, editable = true, render, label, ...rest } = this.props
    return (
      <Fragment >
        {editable ? (
          <Form.Item label={label} {...rest} {...formItemLayout} >
            {children}
          </Form.Item>
        ) : (
          <StaticItem render={render} />
        )}
      </Fragment>
    )
  }
}
class StaticItem extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { render, displayValue } = this.props
    return render ? render(displayValue) : <span>{displayValue}</span>
  }
}
export default FormItem
