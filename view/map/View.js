import React, { Component } from 'react'
// import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import { styles } from './style.js'


export default class Map extends Component {
	render() {
		return (
			<View
				style={styles.webView}
			>
				<Text
				>blablabla 👀</Text>
			</View>
			// <WebView 
			// // 	originWhitelist={['*']}
			// 	source={{ uri : 'http://www.abc.com/map.html' }}
			// 	style={ styles.webView }
			// />
		)
	}
}

