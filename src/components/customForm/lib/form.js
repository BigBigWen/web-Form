import { isNil } from './util';

const VALIDATOR = {
  required: value => value !== undefined && value !== null && value !== '',
  maxLength: (val, { max }) => `${val || ''}`.split('').length <= max,
  minLength: (val, { min }) => `${val || ''}`.split('').length >= min,
  pattern: (val, { reg }) =>
    Array.isArray(reg) ? reg.every(i => i.test(val)) : reg.test(val),
  validator: (val, { validator }) => validator(val)
};

export default class Form {
  constructor(value = {}, validator = {}) {
    this.init({ ...value }, { ...validator });
  }

  init = (value, validator) => {
    this.initialValue = Object.assign({}, { ...value });
    this.initialValidator = validator;
    this.value = {};
    this.errors = {};
    this.validator = {};
    this.add(value, validator);
  };

  formatKeys = keys => {
    return isNil(keys) || keys === ''
      ? Object.keys(this.value)
      : Array.isArray(keys) ? keys : [`${keys}`];
  };

  reset = () => {
    this.init(this.initialValue, this.initialValidator);
    let value = this.getValue();
    let errors = this.getError();
    return {
      value,
      errors
    };
  };

  change = (key, value) => {
    if (
      Array.isArray(key) &&
      Array.isArray(value) &&
      key.length === value.length
    ) {
      key.forEach((i, index) => {
        this.value[i] = value[index];
      });
    } else if (!Array.isArray(key) && !isNil(key) && !isNil(value)) {
      this.value[key] = value;
    }
    return this.getValue();
  };

  validate = keys => {
    let formKeys = this.formatKeys(keys);
    formKeys.forEach(formKey => {
      const tagetValue = this.value[formKey];
      const validations = this.validator[formKey];
      this.errors[formKey] = (validations || []).reduce((prev, cur) => {
        let validator = VALIDATOR[cur.type];
        let options = cur.options || {};
        if (!validator(tagetValue, options)) {
          prev.push(cur);
        }
        return prev;
      }, []);
    });
    return this.errors;
  };

  hasError = keys => {
    let errors = this.getError(keys);
    return Object.values(errors).some(val => !Array.isArray(val) || val.length);
  };

  getError = keys => {
    let formKeys = this.formatKeys(keys);
    let errors = (formKeys || []).reduce((prev, key) => {
      prev[key] = this.errors[key];
      return prev;
    }, {});
    return errors;
  };

  createAutoValidate = value => {
    return new Proxy(value, {
      set: (target, key, value, receiver) => {
        target[key] = isNil(value) ? '' : value; // TODO 值得商榷，这样做就没法传进来null和undefiend
        this.validate(key, this.getValue());
        return true;
      }
    });
  };

  clear = keys => {
    let formKeys = this.formatKeys(keys);
    formKeys.forEach(formKey => {
      delete this.value[formKey];
      delete this.errors[formKey];
      delete this.validator[formKey];
    });
  };

  add = (value, validator) => {
    let formattedValue = Object.keys(value || {}).reduce((prev, key) => {
      prev[key] = isNil(value[key]) ? '' : value[key];
      return prev;
    }, {});
    this.value = this.createAutoValidate(
      Object.assign(this.getValue(), formattedValue)
    );
    this.validator = Object.assign(this.validator, validator);
    this.errors = Object.assign(
      this.errors,
      this.getInitialErrors(value, validator)
    );
  };

  getInitialErrors = (value, validator) => {
    return (Object.keys(value) || []).reduce((prev, key) => {
      // null means this form item should validate but has not been validated
      prev[key] =
        Array.isArray(validator[key]) &&
        validator[key].length &&
        validator[key].some(i => i.type === 'required')
          ? null
          : [];
      return prev;
    }, {});
  };

  getValue = keys => {
    let formKeys = this.formatKeys(keys);
    let value = (formKeys || []).reduce((prev, key) => {
      prev[key] = this.value[key];
      return prev;
    }, {});
    return value;
  };

  /*
    @param key { string } the formKey
  */
  getValidateInfo = key => {
    let errors = this.getError()[key];
    if (Array.isArray(errors) && errors.length) {
      return {
        validateStatus: 'error',
        help: errors[0].message
      };
    }
    return {
      validateStatus: null,
      help: null
    };
  };
}
