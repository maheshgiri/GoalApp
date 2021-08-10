import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString,
} from '../utils/helpers'
import Stepper from './Stepper'
import Slider from './Slider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry } from '../utils/api'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { purple, white } from '../utils/colors'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}
class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    sleep: 0,
    swim: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] - step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    //Update Redux
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    )
    //Navigate to Home
    //Save to DB
    submitEntry({ entry, key })
    this.setState(() => ({
      run: 0,
      bike: 0,
      sleep: 0,
      swim: 0,
      eat: 0,
    }))

    //Create Local Notification
  }

  onReset = () => {
    const key = timeToString()

    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    )

    this.setState(() => ({
      run: 0,
      bike: 0,
      sleep: 0,
      swim: 0,
      eat: 0,
    }))
    //Update Redux
    //Route to Home
    //Update DB
  }

  render() {
    const metricInfo = getMetricMetaInfo()
    const { alreadyLogged } = this.props
    if (alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS==="ios"?"ios-happy-outline":"md-happy"} size={100} />
          <Text>You already Logged your information today</Text>
          <TextButton style={{padding:10}} onPress={this.onReset}>Reset</TextButton>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {Object.keys(metricInfo).map((key) => {
          const { getIcon, type, ...rest } = metricInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <Slider
                  {...rest}
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                />
              ) : (
                <Stepper
                  {...rest}
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          )
        })}
        <DateHeader date={new Date().toLocaleDateString()} />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const key = timeToString()
  console.warn(JSON.stringify(state))
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
    entries: state.entries,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems:'center'
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 3,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center:{
 flex:1,
 justifyContent:'center',
 alignItems:'center',
 marginLeft:30,
 marginRight:30
  },
})

export default connect(mapStateToProps)(AddEntry)
