import React, { Component } from 'react';
import { View, Text } from 'react-native'

export default class DetailPage extends Component {

	constructor(props) {
		super(props)
		this.handleGetDetailPage = this.handleGetDetailPage.bind(this)
	}


	componentDidMount() {
		let url = 'http://192.16/api/index.json' 
		// alert(this.props.route.params.id) //【第四步】🔥🔥🔥 React-Navigation 的方法, 【route.params】可以拿到携带的参数, 然后进一步的去请求更细的数据！
		if(this.props.route.params.id) {
			let id = this.props.route.params.id // 对应列表的 id
			url = "http://192.16/api/detailList.json?id=" + id // 拼接 id, 请求对应的数据
		}

		// 请求详情页数据
		fetch(url)
			.then(res => res.json())
			.then( this.handleGetDetailPage )
	}


	// 处理详情页数据
	handleGetDetailPage(res) {
		alert(JSON.stringify(res))
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>DetailPage!</Text>
				<Text>DetailPage!</Text>
				<Text>DetailPage!</Text>
			</View>
		)
	}
}