export const isNil = x => x === undefined || x === null

const is = type => i => Object.prototype.toString.call(i).slice(8, -1) === type
export const isObject = o => is('Object')(o)
export const pick = (obj, keys) => {
  return keys.reduce((prev, key) => {
    prev[key] = obj[key]
    return prev
  }, {})
};
// 只适用于基于antd web的FormItem
const ERROR_CLASSNAME = '.ant-form-item-control.has-error'
export const scrollToError = () => {
  let target = document.querySelector(ERROR_CLASSNAME)
  if (target && target.getBoundingClientRect().top < 0) {
    document.getElementById(
      'root'
    ).scrollTop += target.getBoundingClientRect().top
  }
}
