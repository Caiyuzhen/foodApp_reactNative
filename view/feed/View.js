import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'
import styles from './style.js'
import { getFeedInfoAction } from './actionCreator.js' //🔥引入 action
import { Feed } from './Ui.js' //引入 UI 层


// 渲染卡片列表页 (这个组件尽量改写成为 UI 组件, 不要做太多业务逻辑的事, 所以最好可以把逻辑都写在 render 内)
/* Home -> Feed -> Detail -> MyDesign -> Detail*/	




// 👇未抽离 UI 前
// class Feed extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		//【🚀】 categories 是首页的数据, 因此需要用 reducer 来存一下, 用 reducer 后就把这个去除了
// 		// this.state = {
// 		// 	categories: [] 
// 		// }

// 		// this.handleGetListSucc = this.handleGetListSucc.bind(this) //🔥绑定 this 始终指向当前组件！
// 		// this.handleFoodItemClick = this.handleFoodItemClick.bind(this) //可以在 onPress 中传递参数
// 	}

// 	// 请求数据
// 	componentDidMount() {
// 		this.props.getFeedInfo() //调用 reducer 中间件发起异步请求
// 		// fetch('http://www.abc.com/api/index.json') //首页 feed 的接口数据
// 		// .then((res) => res.json())
// 		// // .then(this.handleGetListSucc) //【🚀使用 reducer 前, 就是把数据存入 state】
// 		// .then(this.props.setCategories) //🚀因为下方通过 connect 绑定了 mapState 跟 mapStateToProps 两个方法, 所以这里可以直接调用 setCategories 方法
// 		// .catch(()=>{
// 		// 	alert('请求异常')
// 		// })
// 	}

// 	// 请求数据成功后的回调函数 (使用 reducer 后, 这块都可以不要了)
// 	// handleGetListSucc(res) {
// 	// 	if(res.ret && res.data) {
// 	// 		this.setState({
// 	// 			categories: res.data.categories //一开始是存在组件上的, 后面改成用 reducer 来管理
// 	// 		})
// 	// 	}
// 	// 	// alert(JSON.stringify(res))
// 	// }


// 	// ⚡️ 页面跳转, 进入详情页
// 	// handleFoodItemClick (id) {
// 	// 	// const { navigate } = this.props.navigation 
// 	// 	// alert(id) //拿到每个点击页面的 id
		
// 	// 	this.props.navigate('Detail', {id: id}) //【第三步】 🔥🔥 通过 Home 页传递过来的 navigate, 跳转到详情页! 并且把 id 传递给详情页
// 	// }



// 	render() {
// 		// alert(this.props.name) //🔥【🚀第六步】使用 store 内的公共数据！
// 		const { width } = Dimensions.get('window') // ‘🔥解构赋值’ 获取屏幕宽度, 跟 100% 一样
// 		const screenHeight = Dimensions.get('window').height //获取屏幕高度
// 		const itemWidth = (width - 24 ) / 2 //🔥表示左右间隔 24
// 		const imgWidth = itemWidth - 12 //🔥表示图片左右间隔 8
// 		const bannerImg = require('../../resources/imgs/ice.webp')
// 		// const categories = this.state.categories
// 		const categories = this.props.categories
	
// 		// alert(width)
// 		return (
// 			<View style={styles.container}>
// 				<View>
// 					{/* ⚡️修改顶部状态栏为白色, 在引入【路由库】后就可以去掉了！ */}
// 					{/* <StatusBar style='light' />  */}
// 					{/* 输入框 */}
// 					<View>
// 						{/* 🔥会自动的加载 2x 还是 3x */}
// 						<Image source={bannerImg} style={{width: width, height: 200}}/> 
// 						{/* 👇即写引用样式又写内联样式 */}
// 						<TextInput placeholder='Search.your want food..' underlineColorAndroid="#fff" style={[styles.search, {top: width * .45 }]}/> 
// 					</View>
// 				</View>
// 				{/* 滚动列表 */}
// 				<ScrollView style={styles.content}>
// 					<View style={[{height: screenHeight * 1.62}, styles.list]}>
// 						{
// 							categories.map((item) => {
// 								return ( // 每个食物的 card
// 									<TouchableWithoutFeedback 
// 										key={item.id} // key 要绑定在最外层的元素上！
// 										// onPress={ this.handleFoodItemClick.bind(this, item.id) } // 【跳转到详情页】 View 没法绑定点击事件, 所以要使用 TouchableWithoutFeedback
// 										onPress={ () => {this.props.navigate('Detail', { id: item.id })} }
// 									>
// 										<View style={[{width: itemWidth}, styles.itemCard]} //左右 -20px, 然后再等分 3 份屏幕宽度
// 										>
// 											<Image 
// 												source={{uri: item.imgUrl}} 
// 												style={[{width: imgWidth, height: imgWidth}, styles.itemImg]} //🔥 图片的 url 要写成 uri ！
// 											/>
// 											<View ><Text style={styles.itemTitle}>{item.title}</Text></View>
// 										</View>
// 									</TouchableWithoutFeedback>
// 								)
// 							})
// 						}
// 					</View>
// 				</ScrollView>
// 			</View>
// 		)
// 	}
// }


//【容器层】
// 🚀 定义从 store 取出数据的方法 (数据层)
const mapState = (state) => {
	return {
		categories: state.FeedReducer.categories //组件内通过🌟 【state.FeedReducer.categories】 来获取数据, 因为在 store 内的 allReducer 定义的名称是 FeedReducer
	}
}


// 定义变更 store 数据的方法
const mapDispatch = (dispatch) => {
	return {
		// 【🌟】使用 reducer 中间件来管理异步 fetch 请求(同样的也放到 actionCreator 内进行管理)
		getFeedInfo() {
			dispatch(getFeedInfoAction()) //🌟 把返回值作为 dispatch 的参数, 传递给 reducer
		}
	}
}



// // 🔥【🚀第五步】 利用 connect 方法从 store 内取出数据, connect 表示和 store 建立联系
export default connect(mapState, mapDispatch)(Feed) //👈👈 将 Redux store 中的状态映射到组件的 props 对象中, 同时，也将 mapDispatch 函数中定义的操作方法映射到props对象





