import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import { FontAwesome, Entype } from '@expo/vector-icons'
import { grey, purple, white } from '../utils/colors'
const Stepper = ({ value, unit, onChange, step, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}>
            <Entype
              name="minus"
              size={40}
              color={Platform.OS === 'ios' ? purple : white}
              style={styles.button}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[
              styles.iosBtn,
              { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
            ]}>
            <Entype
              name="plus"
              size={40}
              color={Platform.OS === 'ios' ? purple : white}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onDecrement}
            style={[
              styles.androidBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}>
            <FontAwesome
              name="minus"
              size={40}
              color={ white}
              style={styles.button}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={[
              styles.androidBtn,
              { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
            ]}>
            <FontAwesome
              name="plus"
              size={40}
              color={white}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 14, textAlign: 'center', color: 'grey' }}>
          {unit}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 15,
    margin: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 2,
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Stepper
