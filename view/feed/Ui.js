import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import styles from './style.js'


//【UI 层】
export class Feed extends React.Component {
	constructor(props) {
		super(props)
		//【🚀】 categories 是首页的数据, 因此需要用 reducer 来存一下, 用 reducer 后就把这个去除了
		// this.state = {
		// 	categories: [] 
		// }

		// this.handleGetListSucc = this.handleGetListSucc.bind(this) //🔥绑定 this 始终指向当前组件！
		// this.handleFoodItemClick = this.handleFoodItemClick.bind(this) //可以在 onPress 中传递参数
	}

	// 请求数据
	componentDidMount() {
		this.props.getFeedInfo() //调用 reducer 中间件发起异步请求
	}



	render() {
		// alert(this.props.name) //🔥【🚀第六步】使用 store 内的公共数据！
		const { width } = Dimensions.get('window') // ‘🔥解构赋值’ 获取屏幕宽度, 跟 100% 一样
		const screenHeight = Dimensions.get('window').height //获取屏幕高度
		const itemWidth = (width - 24 ) / 2 //🔥表示左右间隔 24
		const imgWidth = itemWidth - 12 //🔥表示图片左右间隔 8
		const bannerImg = require('../../resources/imgs/ice.webp')
		// const categories = this.state.categories
		const categories = this.props.categories
	
		// alert(width)
		return (
			<View style={styles.container}>
				<View>
					{/* ⚡️修改顶部状态栏为白色, 在引入【路由库】后就可以去掉了！ */}
					{/* <StatusBar style='light' />  */}
					{/* 输入框 */}
					<View>
						{/* 🔥会自动的加载 2x 还是 3x */}
						<Image source={bannerImg} style={{width: width, height: 200}}/> 
						{/* 👇即写引用样式又写内联样式 */}
						<TextInput placeholder='Search.your want food..' underlineColorAndroid="#fff" style={[styles.search, {top: width * .45 }]}/> 
					</View>
				</View>
				{/* 滚动列表 */}
				<ScrollView style={styles.content}>
					<View style={[{height: screenHeight * 1.62}, styles.list]}>
						{
							categories.map((item) => {
								return ( // 每个食物的 card
									<TouchableWithoutFeedback 
										key={item.id} // key 要绑定在最外层的元素上！
										// onPress={ this.handleFoodItemClick.bind(this, item.id) } // 【跳转到详情页】 View 没法绑定点击事件, 所以要使用 TouchableWithoutFeedback
										onPress={ () => {this.props.navigate('Detail', { id: item.id })} }
									>
										<View style={[{width: itemWidth}, styles.itemCard]} //左右 -20px, 然后再等分 3 份屏幕宽度
										>
											<Image 
												source={{uri: item.imgUrl}} 
												style={[{width: imgWidth, height: imgWidth}, styles.itemImg]} //🔥 图片的 url 要写成 uri ！
											/>
											<View ><Text style={styles.itemTitle}>{item.title}</Text></View>
										</View>
									</TouchableWithoutFeedback>
								)
							})
						}
					</View>
				</ScrollView>
			</View>
		)
	}
}