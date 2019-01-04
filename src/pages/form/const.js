export const DriveTypeOptions = [
  { label: 'Modbus_RTU', value: 0 },
  { label: 'Modbus_TCP', value: 1 },
  { label: 'DL/T645-1997', value: 16 },
  { label: 'DL/T645-2007', value: 17 }
]

export const BaudRateOptions = [
  { label: '110', value: 110 },
  { label: '300', value: 300 },
  { label: '600', value: 600 },
  { label: '1200', value: 1200 },
  { label: '2400', value: 2400 },
  { label: '4800', value: 4800 },
  { label: '9600', value: 9600 },
  { label: '14400', value: 14400 },
  { label: '19200', value: 19200 },
  { label: '38400', value: 38400 },
  { label: '56000', value: 56000 },
  { label: '57600', value: 57600 },
  { label: '115200', value: 115200 },
  { label: '128000', value: 128000 },
  { label: '256000', value: 256000 }
]

export const SerialPortOptions = [
  { label: 'COM1', value: 1 },
  { label: 'COM2', value: 2 },
  { label: 'COM3', value: 3 },
  { label: 'COM4', value: 4 }
]

export const CrcOrderOptions = [
  { label: '大端', value: 0 },
  { label: '小端', value: 1 }
]

export const DataBitOptions = [
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 }
]

export const StopBitOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '1.5', value: 3 }
]

export const CheckTypeOptions = [
  { label: '无校验', value: 0 },
  { label: '奇校验', value: 1 },
  { label: '偶校验', value: 2 },
  { label: 'Mark', value: 3 },
  { label: 'Space', value: 4 }
]

export const AddrOffsetOptions = [
  { label: '0', value: 0 },
  { label: '1', value: 1 }
]

export const [Modbus_RTU, Modbus_TCP, Dlt645_1997, Dlt645_2007] = [0, 1, 16, 17]
export const defaultDriveType = Modbus_RTU
export const initialValue = {
  Basic_Info: {
    name: '',
    deviceId: '',
    brand: '',
    model: '',
    type: Modbus_RTU
  },
  [Modbus_RTU]: {
    serialPort: 1,
    stationNum: '',
    baudRate: 9600,
    dataBit: 8,
    stopBit: 1,
    checkType: 0,
    crcOrder: 1
  },
  [Modbus_TCP]: {
    ip: '',
    port: '',
    crcOrder: 1
  },
  [Dlt645_1997]: {
    address: '',
    leadByte: '',
    baudRate: 9600,
    dataBit: 8,
    stopBit: 1,
    checkType: 0
  },
  [Dlt645_2007]: {
    address: '',
    leadByte: '',
    baudRate: 9600,
    dataBit: 8,
    stopBit: 1,
    checkType: 0
  },
  Sample_Info: {
    samplingInterval: 25,
    samplingTimeout: 1000,
    samplingRetry: 3,
    addrOffset: 0
  }
}

export const initialValidator = {
  Basic_Info: {
    name: [{
      type: 'required',
      msg: '请输入'
    }],
    deviceId: [{
      type: 'required',
      msg: '请输入'
    }],
    brand: [{
      type: 'required',
      msg: '请输入'
    }],
    model: [{
      type: 'required',
      msg: '请输入'
    }],
    type: [{
      type: 'required',
      msg: '请输入'
    }]
  },
  [Modbus_RTU]: {
    serialPort: [{
      type: 'required',
      msg: '请输入'
    }],
    stationNum: [{
      type: 'required',
      msg: '请输入'
    }],
    baudRate: [{
      type: 'required',
      msg: '请输入'
    }],
    dataBit: [{
      type: 'required',
      msg: '请输入'
    }],
    stopBit: [{
      type: 'required',
      msg: '请输入'
    }],
    checkType: [{
      type: 'required',
      msg: '请输入'
    }],
    crcOrder: [{
      type: 'required',
      msg: '请输入'
    }]
  },
  [Modbus_TCP]: {
    ip: [{
      type: 'required',
      msg: '请输入'
    }],
    port: [{
      type: 'required',
      msg: '请输入'
    }],
    crcOrder: [{
      type: 'required',
      msg: '请输入'
    }]
  },
  [Dlt645_1997]: {
    address: [{
      type: 'required',
      msg: '请输入'
    }],
    leadByte: [{
      type: 'required',
      msg: '请输入'
    }],
    baudRate: [{
      type: 'required',
      msg: '请输入'
    }],
    dataBit: [{
      type: 'required',
      msg: '请输入'
    }],
    stopBit: [{
      type: 'required',
      msg: '请输入'
    }],
    checkType: [{
      type: 'required',
      msg: '请输入'
    }]
  },
  [Dlt645_2007]: {
    address: [{
      type: 'required',
      msg: '请输入'
    }],
    leadByte: [{
      type: 'required',
      msg: '请输入'
    }],
    baudRate: [{
      type: 'required',
      msg: '请输入'
    }],
    dataBit: [{
      type: 'required',
      msg: '请输入'
    }],
    stopBit: [{
      type: 'required',
      msg: '请输入'
    }],
    checkType: [{
      type: 'required',
      msg: '请输入'
    }]
  },
  Sample_Info: {
    samplingInterval: [{
      type: 'required',
      msg: '请输入'
    }],
    samplingTimeout: [{
      type: 'required',
      msg: '请输入'
    }],
    samplingRetry: [{
      type: 'required',
      msg: '请输入'
    }],
    addrOffset: [{
      type: 'required',
      msg: '请输入'
    }]
  }
}
