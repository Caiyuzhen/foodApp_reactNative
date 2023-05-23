import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
import { Text } from 'react-native';
import { styles } from './style.js'


export default class Map extends Component {
	render() {
		return (
			// <Text>111</Text>
			<WebView 
			// 	originWhitelist={['*']}
				source={{ uri : 'http://www.abc.com/map.html' }}
				style={ styles.webView }
			/>
		)
	}
}

