import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Entype } from '@expo/vector-icons'
const Stepper = ({ value, unit, onChange, step, onIncrement, onDecrement }) => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}

export default Stepper
