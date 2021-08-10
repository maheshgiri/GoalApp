import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AddEntry from './components/AddEntry'
import History from './components/History'
import reducer from './reducers'
const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <History />
      </View>
    </Provider>
  )
}
