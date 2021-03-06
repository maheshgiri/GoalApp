import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalender from 'udacifitness-calendar'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { white } from '../utils/colors'
//import { AppLoading } from 'expo'
class History extends Component {
  state = { ready: false }

  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue(),
            })
          )
        }
      })
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.nodataText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log('Pressed')}>
          <MetricCard metrics={metrics} date={formattedDate} />
        </TouchableOpacity>
      )}
    </View>
  )

  renderEmptyDate = (formattedDate) => {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.nodataText}>
          You did't logged any data for this day!
        </Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <ActivityIndicator />
    }
    return (
      <UdaciFitnessCalender
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

function mapStateToProps(entries) {
  return {
    entries,
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  nodataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
})

export default connect(mapStateToProps)(History)
