import React, { Component } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import SliderD from '@react-native-community/slider'
import {grey} from '../utils/colors'
export default class Slider extends Component {
  render() {
    const { max, step, value, onChange, unit } = this.props
    return (
      <View style={styles.container}>
        <SliderD
          minimumValue={1}
          style={{flex:1}}
          step={step}
          onValueChange={onChange}
          maximumValue={max}
          value={value}></SliderD>
          <View style={styles.metricCounter}>
        <Text style={{fontSize:25,textAlign:'center'}}>{value}</Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: 'grey' }}>{unit}</Text>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'  
  },
  metricCounter:{
    width:85,
    alignItems:'center',
    justifyContent:'center'
  }
})
