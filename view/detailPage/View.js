import React, { Component } from 'react';
import { FlatList, ScrollView, Dimensions, View, Text, Image, StyleSheet } from 'react-native'


// 详情页数据
/**
 * Home -> Feed -> Detail
 *      -> MyDesign -> Detail
 */		
export default class DetailPage extends Component {

	constructor(props) {
		super(props)
		this.state= {// 详情页数据
			detailList: [],
			refreshing: false
		}
		this.handleGetDetailPage = this.handleGetDetailPage.bind(this)
		this.handleListRefresh = this.handleListRefresh.bind(this)
	}

	// 🔥请求详情页接口数据
	componentDidMount() {
		this.getListData()
	}


	// ⚡️ 过滤出处理详情页数据
	handleGetDetailPage(res) {
		// alert(JSON.stringify(res.data.list))
		// let list = res.data.list //👈不过滤的写法, 全部展示
		// let list = res.data.list.filter(item => item.id === this.props.route.params.id) // 🔥根据 id 过滤对应的数据

		this.setState((preStateData) =>{
			return { 
				detailList: [...preStateData.detailList, ...res.data.list],   //🌟 把获取的数据再【⚡️累加】给原来的数据, 而不是覆盖！
				refreshing: false // 👈加载完毕, 则关闭下拉刷新效果
			}
		})


		// this.setState({
		// 	detailList: list // ❌ 覆盖原来数据的写法
		// })


		// alert(JSON.stringify(list)) 
	}


	// 👋获取数据的方法
	getListData() {
		let url = 'http://192.1/api/index.json' 
		// alert(this.props.route.params.id) //【第四步】🔥🔥🔥 React-Navigation 的方法, 【route.params】可以拿到携带的参数, 然后进一步的去请求更细的数据！
		if(this.props.route.params.id) {
			let id = this.props.route.params.id // 对应列表的 id
			url = "http://192.1/api/detailList.json?id=" + id // 拼接 id, 请求对应的数据
		}

		// 请求详情页数据
		fetch(url)
			.then(res => res.json())
			.then( this.handleGetDetailPage )
	}


	// 👇下拉刷新
	handleListRefresh() {
		this.setState({
			refreshing: true
		})
		// alert(123)
		this.getListData() // 获取新的数据
	}


	render() {
		// 计算 ScrollView 需要滚动的高度
		// const screenHeight = Dimensions.get('window').height
		// const scrollViewHeight = screenHeight * 2.3 // 👈让底部能够滚动更多空间

		return (
			// <ScrollView style={styles.container}>
			// 	{/*  👇让底部能够滚动更多空间 */}
			// 	<View style={{height: scrollViewHeight}}>
			// 		{ this.state.detailList.map((item, index) => { //value 是索引
			// 			return (
			// 				<View style={styles.item} key={item.id}>
			// 					<Image 
			// 						style={styles.itemImage}
			// 						source={{uri: item.imgUrl}} 
			// 					></Image>
			// 					<View style={styles.info}>
			// 						<Text style={styles.title}>{item.title}</Text>
			// 						<Text style={styles.desc} 
			// 							numberOfLines={3}  //超过三行则 ...
			// 							ellipsizeMode="tail"
			// 							>{item.desc}
			// 						</Text>
			// 					</View>
			// 				</View>
			// 			)
			// 		}) }
			// 	</View>
			// </ScrollView>

			// 👇性能更好
			<FlatList
				onRefresh={ this.handleListRefresh } //👈下拉刷新效果
				refreshing={ this.state.refreshing } //👈当加载数据时（onRefresh) 需要做成 true, 加载完毕则 false
				style={styles.container}
				data={this.state.detailList} //🔥🔥想要循环的数据
				renderItem={({item}) => { //🔥🔥循环出来的每一项
					return (
						// 👇注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id
						<View style={styles.item} keyExtractor={(item, index) => index}> 
							<Image 
								style={styles.itemImage}
								source={{uri: item.imgUrl}} 
							></Image>
							<View style={styles.info}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.desc} 
									numberOfLines={3}  //超过三行则 ...
									ellipsizeMode="tail"
									>{item.desc}
								</Text>
							</View>
						</View>
					)
				}}
			/>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		// display: 'flex',
		padding: 20,
		// height: '100%',
		// flex: 1, //占满整个屏幕
	},

	item: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#fff',
		marginBottom: 16, // 添加下边距来实现子组件之间的间距效果
		gap: 16,
	},

	itemImage: {
		width: 120, 
		height: 120,
		borderRadius: 10,
	},

	info: {
		flex: 1, //自动撑开 50%
	},

	title: {
		lineHeight: 32,
		fontSize: 16,
		fontWeight: 'bold'
	},

	desc: {
		lineHeight: 16,
		fontSize: 14,
		color: '#7e7e81',
		overflow: 'hidden',
		height: 64,
	}
})