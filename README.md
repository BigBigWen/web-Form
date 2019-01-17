## Form 表单
基于antd表单UI组件(例如输入框,下拉选择框,复选框,单选框等)的一套包含数据处理,校验,提交的表单类

这里是一个demo,如何使用此Form

`clone`到本地后 执行`npm install` `npm start`就可以在[http://localhost:3000](http://localhost:3000)看到demo
## 基本使用

### 第一步
从customForm文件引入Form,并在实例化时传入表单的初始值和校验规则(如果不需要,则可不传)
```
import Form from 'components/customForm/index.js'
this.form = new Form( getInitialValue(defaultDriveType), getInitialValidator(defaultDriveType));
```
这样表单的数据就维护在实例化后的form中,与UI组件脱离
###第二步
从customForm文件引入FormItem,此处的FormItem对antd的表单域进行封装,editable来标记当前表单域处于编辑状态还是展示状态,使用[render prop](https://react.docschina.org/docs/render-props.html)来渲染子组件
```
 <FormItem label="表计名称" formKey='name' form={this.form} onChange={this.onChange} {...formLayout}> 
  {
    ({value,onChange})=>(
      <Input value={value} onChange={onChange} />
    )
  }
</FormItem>
```
恭喜,你已经可以好用的表单了

