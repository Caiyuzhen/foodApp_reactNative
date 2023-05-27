import React, { Component } from 'react'
import { Text, View, Switch } from 'react-native'
import styles from './style.js'
// import { styles } from './style.js'


export default class Settings extends Component {

	render() {
		// 因为 connect 了，所以可以直接使用 this.props.nearSwitch
		const { nearSwitch, handleSwitchChange } = this.props // nearSwitch 由 reducer 提供； handleSwitchChange 由 View 层提供

		return (
			<View style={styles.container}>
				<Text style={styles.mainTitle}>Setting</Text> 
				<View style={styles.wrapper}>
					<Text style={styles.title}>Turn On myDeesign Page</Text> 
					<Switch 
						value={ nearSwitch }
						onValueChange={ (value) => { handleSwitchChange(value) } }
					/>
				</View>
			</View>
		)
	}
}

