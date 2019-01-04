import React from 'react'
import {isObject}from 'lodash'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import FormClass from '../../lib/form'
import {
  DriveTypeOptions,
  BaudRateOptions,
  SerialPortOptions,
  CrcOrderOptions,
  DataBitOptions,
  StopBitOptions,
  CheckTypeOptions,
  AddrOffsetOptions,
  initialValue,
  initialValidator,
  defaultDriveType,
  Modbus_RTU,
  Modbus_TCP,
  Dlt645_1997,
  Dlt645_2007,
}from './const'
import FormItem from '../../components/formItem'
import { getInitialValue, getInitialValidator, shouldRender } from './lib';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    this.form = new FormClass( getInitialValue(defaultDriveType), getInitialValidator(defaultDriveType));
    this.state = {
     value:{}
    };
  }
  componentDidMount(){
    setTimeout(this.loadData,2000)
  }
  loadData = () => {
    // this.form.add(
    //   getInitialValue(defaultDriveType),
    //   getInitialValidator(defaultDriveType)
    // );
    this.setState({
      value: this.form.getValue()
    });
  };
  onTypeChange = (type) => {
    const currentType = this.state.value.type;
    // this.form.clear(Object.keys(initialValue[currentType]));
    let newValue = initialValue[type];
    let newValidator = initialValidator[type];
    this.form.add(newValue, newValidator);
  }
  onChange = (name, e) => {
    console.log(e,'eeeeeeeeeeeeeeeeeeee',isObject(e))
    const val = isObject(e)? e.target.value:e
    if (name === 'type') {
      this.onTypeChange(val);
    }
    this.setState({
      value: this.form.change(name, val)
    });
  };


 
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { value } = this.state;
    const TCP = shouldRender(value.type, [Modbus_TCP]);
    const Modbus = shouldRender(value.type, [Modbus_RTU, Modbus_TCP]);
    const Dlt = shouldRender(value.type, [Dlt645_1997, Dlt645_2007]);
    const formItemClassNames = (show) => ["c-form-item", show ? "" : "hide"];
    const formError = this.form.getValue()
    console.log(this.form.getError(),'errrrr')
    console.log(this.form.getValue(),'valueeeeeeeeeeeeeeeeeeeeee')
    console.log(value,'stateeeeeeee')

    return (
      <div style={{width:'500px',margin:'50px'}}>
      <div className={["c-form", !!Object.keys(value).length ? "" : "hide"]}>

      </div>
          <FormItem label="表计名称" {...(this.form.getItemValidte('name'))}> 
            <Input value={value.name} onChange={(val)=>this.onChange('name',val)}/>
          </FormItem>
          <FormItem label="采集终端" {...(this.form.getItemValidte('deviceId'))}>
              <Input value={value.deviceId} onChange={(val)=>this.onChange('deviceId',val)}/>
          </FormItem>
          <FormItem label="表计品牌" {...(this.form.getItemValidte('brand'))}>
              <Input value={value.brand}  onChange={(val)=>this.onChange('brand',val)}/>
          </FormItem>
          <FormItem label={'表计型号'} {...(this.form.getItemValidte('model'))}>
              <Input value={value.model} onChange={(val)=>this.onChange('model',val)}/>
          </FormItem>
          <FormItem label="驱动类型" {...(this.form.getItemValidte('type'))}>
             <Select  onChange={(val)=>this.onChange('type',val)} value={value.type} style={{width:'100%'}}>
               {
                 DriveTypeOptions.map(a=><Option key={a.value} value={a.value}>
                  {a.label} 
                  </Option>)
               }
             </Select>
          </FormItem>
          <div  className={formItemClassNames(!TCP)}>
            <FormItem label="串口地址" {...(this.form.getItemValidte('serialPort'))}>
              <Select  onChange={(val)=>this.onChange('serialPort',val)} value={value.serialPort}  style={{width:'100%'}}>
                {
                  SerialPortOptions.map(a=><Option key={a.value} value={a.value}>
                    {a.label} 
                    </Option>)
                }
              </Select>
            </FormItem>
          </div>
        
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
