import React, { Component } from 'react'
import { Text, View, Switch } from 'react-native'
import styles from './style.js'
// import { styles } from './style.js'


export default class Settings extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Turn On</Text> 
					<Switch />
				</View>
			</View>
		)
	}
}

