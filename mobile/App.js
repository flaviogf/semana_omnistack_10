import React from 'react'
import { StatusBar, YellowBox } from 'react-native'

import Routes from './src/routes'

YellowBox.ignoreWarnings(['Unrecognized WebSocket'])

function App() {
  return (
    <>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Routes />
    </>
  )
}

export default App
