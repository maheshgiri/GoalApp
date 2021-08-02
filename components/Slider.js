import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SliderD from '@react-native-community/slider'

export default class Slider extends Component {
  render() {
    const { max, step, value, onChange, unit } = this.props
    return (
      <View>
        <SliderD
          minimumValue={1}
          step={step}
          onValueChange={onChange}
          maximumValue={max}
          value={value}></SliderD>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    )
  }
}
