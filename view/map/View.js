import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
import { styles } from './style.js'


export default class Map extends Component {
	render() {
		return (
			<WebView 
				originWhitelist={['*']}
				source={{ uri : 'http://www.abc.com/map.html' }}
				style={ styles.webView }
			/>
		)
	}
}

