import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import styles from './style.js'

// 渲染卡片列表页
/**
 * Home -> Feed -> Detail
 *      -> MyDesign -> Detail
 */		
class Feed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}

		this.handleGetListSucc = this.handleGetListSucc.bind(this) //🔥绑定 this 始终指向当前组件！
		// this.handleFoodItemClick = this.handleFoodItemClick.bind(this) //可以在 onPress 中传递参数
	}

	// 请求数据
	componentDidMount() {
		fetch('http://192.1/api/index.json')
		.then((res) => res.json())
		.then(this.handleGetListSucc)
		.catch(()=>{
			alert('请求异常')
		})
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


	// ⚡️ 页面跳转, 进入详情页
	handleFoodItemClick (id) {
		// const { navigate } = this.props.navigation 
		// alert(id) //拿到每个点击页面的 id
		this.props.navigate('Detail', {id: id}) //【第三步】 🔥🔥🔥 通过 Home 页传递过来的 navigate, 跳转到详情页! 并且把 id 传递给详情页
	}

	render() {
		// alert(this.props.name) //🔥【🚀第六步】使用 store 内的公共数据！
		const { width } = Dimensions.get('window') // ‘🔥解构赋值’ 获取屏幕宽度, 跟 100% 一样
		const screenHeight = Dimensions.get('window').height //获取屏幕高度
		const itemWidth = (width - 24 ) / 2 //🔥表示左右间隔 24
		const imgWidth = itemWidth - 12 //🔥表示图片左右间隔 8
		const bannerImg = require('../../resources/imgs/ice.webp')
		const categories = this.state.categories
	
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
										onPress={ this.handleFoodItemClick.bind(this, item.id) } // View 没法绑定点击事件, 所以要使用 TouchableWithoutFeedback
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



// 🔥【🚀第四步】 定义从 store 取出数据的方法
const mapStateToProps = (state) => {
	return {
		name: state.name
	}
  }

// 🔥【🚀第五步】 利用 connect 方法从 store 内取出数据, connect 表示和 store 建立联系
export default connect(mapStateToProps, null)(Feed)





