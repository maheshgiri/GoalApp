import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AddEntry from './components/AddEntry'
import History from './components/History'
import reducer from './reducers'
import Home from './components/Home'
import DashBoard from './components/DashBoard'
import { FontAwesome } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { purple, white } from './utils/colors'
import { StatusBar } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const store = createStore(reducer)

const Tab = createBottomTabNavigator()

const GoalAppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        height: Constants.statusBarHeight,
      }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <GoalAppStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ size, color }) => {
                let icon
                if (route.name === 'Add Entry') {
                  icon = <FontAwesome name="plus-square" size={size} />
                } else if (route.name === 'History') {
                  icon = (
                    <Ionicons name="ios-bookmarks" size={size} color={color} />
                  )
                }
                return icon
              },
            })}
            tabBarOptions={{
              //  activeTintColor: Platform.OS === 'ios' ? purple : white,
              style: {
                backgroundColor: white,
                height: 56,
                shadowColor: 'rgba(0,0,0,0.24)',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
              },
              tabBarActiveTintColor: purple,
              tabBarInactiveTintColor: white,
            }}>
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Add Entry" component={AddEntry} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  )
}
