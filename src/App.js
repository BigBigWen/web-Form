import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'antd/dist/antd.css'
import TestForm from './pages/form/index'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <TestForm />
      </div>
    )
  }
}

export default App
