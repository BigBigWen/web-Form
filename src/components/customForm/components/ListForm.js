import React from 'react';
import { Button, Icon } from 'antd';

const Fragment = React.Fragment;

class ListForm extends React.Component {
  static defaultProps = {
    title: null,
    FormTitle: props => <div>{props.formKey}</div>
  };

  render() {
    const {
      editable,
      title,
      FormComponent,
      FormTitle,
      formProps,
      form,
      onFormChange,
      onAdd,
      onDelete
    } = this.props;
    const showDelete = editable && form.length > 1;
    return (
      <Fragment>
        {title}
        {form.map((i, index) => {
          const { form, formIndex, ...rest } = i;
          return (
            <Fragment key={formIndex}>
              <FormTitle
                showDelete={showDelete}
                index={index}
                onDelete={() => onDelete(formIndex)}
              />
              <FormComponent
                editable={editable}
                form={form}
                onFormChange={(key, value) =>
                  onFormChange(key, value, formIndex)
                }
                {...formProps}
                {...rest}
              />
            </Fragment>
          );
        })}
        {editable && (
          <Button
            style={{ width: '66.6667%', marginLeft: '25%' }}
            onClick={onAdd}
            type="dashed"
          >
            <Icon type="plus" />添加第{form.length + 1}个表计
          </Button>
        )}
      </Fragment>
    );
  }
}

export default ListForm;
