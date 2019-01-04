import {
  initialValue,
  initialValidator
} from './const'

export const getInitialValue = (type) => {
  return Object.assign(
    initialValue.Basic_Info,
    initialValue[type],
    initialValue.Sample_Info
  )
}
export const getInitialValidator = (type) => {
  return Object.assign(
    initialValidator.Basic_Info,
    initialValidator[type],
    initialValidator.Sample_Info
  )
}
export const shouldRender = (type, optionTypes) => optionTypes.includes(type)
