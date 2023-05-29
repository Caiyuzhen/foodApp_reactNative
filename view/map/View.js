import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import { styles } from './style.js'


export default class Map extends Component {
	render() {
		return (
			<View
				style={styles.webView}
			>
				<Text>blablabla 👀</Text>
				<WebView 
					originWhitelist={['*']} // 允许加载资源的白名单
					source={{ uri : 'http://192.168.1.3/api/map.html' }}
					style={ styles.webView }
				/>
			</View>
		)
	}
}

