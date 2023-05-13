import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView, TabBarIOS } from 'react-native';

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}

		this.handleGetListSucc = this.handleGetListSucc.bind(this) //🔥绑定 this 始终指向当前组件！
	}

	// 请求数据
	componentDidMount() {
		fetch('http://www.abc.com/api/index.json')
		.then((res) => res.json())
		.then(this.handleGetListSucc)
		.catch(()=>{alert('请求异常')})
	}

	// 请求数据成功后的回调函数
	handleGetListSucc(res) {
		if(res.ret && res.data) {
			this.setState({
				categories: res.data.categories
			})
		}
		// alert(JSON.stringify(res))
	}

	render() {
		// ‘🔥解构赋值’ 获取屏幕宽度, 跟 100% 一样
		const { width } = Dimensions.get('window')
		const itemWidth = (width - 24 ) / 2 //🔥表示左右间隔 24
		const imgWidth = itemWidth - 12 //🔥表示图片左右间隔 8
		// alert(width)

		return (
			<TabBarIOS>
				<View style={styles.container}>
					<View>
						{/* 修改顶部状态栏为白色 */}
						<StatusBar style='light' />
						{/* 输入框 */}
						<View>
							{/* 🔥会自动的加载 2x 还是 3x */}
							<Image source={require('./resources/imgs/ice.webp')} style={{width: width, height: 200}}/> 
							{/* 👇即写引用样式又写内联样式 */}
							<TextInput placeholder='Search.your want food..' underlineColorAndroid="#fff" style={[styles.search, {top: width * .45 }]}/> 
						</View>
					</View>
					{/* 滚动列表 */}
					<ScrollView style={styles.content}>
						<View style={styles.list}>
							{
								this.state.categories.map((item) => {
									return (
										<View key={item.id} style={[{width: itemWidth}, styles.itemCard]} //左右 -20px, 然后再等分 3 份屏幕宽度
										>
											<Image 
												source={{uri: item.imgUrl}} 
												style={[{width: imgWidth, height: imgWidth}, styles.itemImg]} //🔥 图片的 url 要写成 uri ！
											/>
											<View ><Text style={styles.itemTitle}>{item.title}</Text></View>
										</View>
									)
								})
							}
						</View>
					</ScrollView>
				</View>
			</TabBarIOS>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
	},

	search: {
		height: 48,
		lineHeight: 16,
		paddingLeft: 10, //控制 placeholder 的位置
		backgroundColor: '#fff',
		position: 'absolute',
		left: 24,
		right: 24,
		borderRadius: 6,
	},

	content: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		marginTop: 40,
		marginBottom: 64,
		marginLeft: 0,
		marginRight: 0,
		borderRadius: 8,
	},

	list: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap', //🔥 超出区域做换行
		marginTop: 24,
	},

	itemCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#333333',
	},

	itemImg: {
		borderRadius: 12,
	},

	itemTitle: {
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 48,
		height: 48,
		fontWeight: 'bold',
	}
})


