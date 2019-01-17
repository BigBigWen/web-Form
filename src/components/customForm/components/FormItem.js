import React from 'react';
import { Form } from 'antd';
import { isObject } from '../lib/util';

const Fragment = React.Fragment;

class FormItem extends React.Component {
  static defaultProps = {
    valuePropName: 'value'
  };

  onChange = result => {
    const { formKey, valuePropName } = this.props;
    if (
      isObject(result) &&
      result.target &&
      result['target'].hasOwnProperty(valuePropName)
    ) {
      this.props.onChange(formKey, result['target'][valuePropName]);
    } else {
      this.props.onChange(formKey, result);
    }
  };

  render() {
    const {
      children,
      editable = true,
      form,
      formKey,
      valuePropName,
      displayValue, // TODO 可以加个默认值
      displayRender,
      label,
      appendix, // TODO 需要更通用
      ...rest
    } = this.props;
    const formValue = form.getValue()[formKey];
    const validateInfo = form.getValidateInfo(formKey);
    const required = (form.validator[formKey] || []).some(
      i => i.type === 'required'
    );
    return (
      <Form.Item required={required} label={label} {...validateInfo} {...rest}>
        {editable ? (
          children({ value: formValue, onChange: this.onChange })
        ) : (
          <StaticItem render={displayRender} value={displayValue} />
        )}
        {!!appendix && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              transform: 'translate(100%, -12px)'
            }}
          >
            {appendix}
          </div>
        )}
      </Form.Item>
    );
  }
}

class StaticItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { render, value } = this.props;
    return render ? render({ value }) : <span>{value}</span>;
  }
}

export default FormItem;
