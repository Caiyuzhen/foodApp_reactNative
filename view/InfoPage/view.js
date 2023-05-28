import React, { Component } from "react";
import { View, Text, ActionSheetIOS, TouchableOpacity, StyleSheet, Platform, Alert, Animated, AppRegistry, AppState, BackHandler, Dimensions } from "react-native";


export default class InfoPage extends Component {


	constructor(props) {
		super(props)

		// 🚗 动画 API 【第一步】🚗
		this.state = {
			OpacityFadeAnim: new Animated.Value(0), //设置初始值
			widthAnim: new Animated.Value(0), // 设置初始值
			heightAnim: new Animated.Value(0), // 设置初始值

			imgUri: []// 初始化存放相册的数据
		}
	}


	componentDidMount() {
		// 打印 detailPage 传递过来的 id
		console.log(this.props.route.params.id) //🚀🚀🚀新版的路由是通过 this.props.route.params.id 来获取 id !! 参数在 detailPage 的 onPress 事件内进行传递 => { id: item.id }


		// 👀 APP State 表示 APP 是在前台还是在后台运行 -> active
		console.log(AppState.currentState) //👈打印出来的是 active 的话就是在前台运行, 否则就是在后台运行

		// BackAndroid 是 Android 的一个 API, 用于监听 Android 的【⚡️返回键】, 但是在新版的 React Native 中已经被废弃了, 所以统一在 BackHandler 中使用

		
		// 👇异步运行动画 写法一: ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
		Animated.sequence([
			// 🚗 动画 API 【第二步】 🚗
			Animated.timing( this.state.OpacityFadeAnim, { //⚡️内置的线性渐变的 API - timing
				toValue: 1, //透明度最终变为1，即完全不透明 
				duration: 300, //动画时长1000毫秒
			}),

			Animated.spring( this.state.widthAnim, { //⚡️内置的线性渐变的 API - timing
			toValue: 300, //宽度变为 300
			duration: 300, //动画时长1000毫秒
			}),

			Animated.spring( this.state.heightAnim, { //⚡️内置的线性渐变的 API - timing
			toValue: 300, //高度变为 300
			duration: 300, //动画时长1000毫秒
			})
		]).start()


		// 👇同时运行动画 写法一: ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
		// Animated.parallel([
		// 	// 🚗 动画 API 【第二步】 🚗
		// 	Animated.timing( this.state.OpacityFadeAnim, { //⚡️内置的线性渐变的 API - timing
		// 		toValue: 1, //透明度最终变为1，即完全不透明 
		// 		duration: 500, //动画时长1000毫秒
		// 	}),

		// 	Animated.timing( this.state.widthAnim, { //⚡️内置的线性渐变的 API - timing
		// 	toValue: 300, //宽度变为 300
		// 	duration: 500, //动画时长1000毫秒
		// 	}),

		// 	Animated.timing( this.state.heightAnim, { //⚡️内置的线性渐变的 API - timing
		// 	toValue: 300, //高度变为 300
		// 	duration: 500, //动画时长1000毫秒
		// 	})
		// ]).start()


		// 👇同时运行动画 写法二: ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
		// 🚗 动画 API 【第二步】 🚗
		// Animated.timing( this.state.OpacityFadeAnim, { //⚡️内置的线性渐变的 API - timing
		// 	toValue: 1, //透明度最终变为1，即完全不透明 
		// 	duration: 500, //动画时长1000毫秒
		// }).start()

		// Animated.timing( this.state.widthAnim, { //⚡️内置的线性渐变的 API - timing
		// 	toValue: 300, //宽度变为 300
		// 	duration: 500, //动画时长1000毫秒
		// }).start()

		// Animated.timing( this.state.heightAnim, { //⚡️内置的线性渐变的 API - timing
		// 	toValue: 300, //高度变为 300
		// 	duration: 500, //动画时长1000毫秒
		// }).start()
	}


	// 🔥IOS 或 Android 的底层接口写好后可以通过 AppRegistry 注册给 ReactNative 来使用


	showActionSheets = () => {
		//⚡️ 根据不同的平台来定义 action sheets, 因为 Android 没有 ActionSheetIOS 组件
		if(Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions({
				options: ["取消", "收藏", "分享", "点赞"], //0, 1, 2, 3
				cancelButtonIndex: 0,
				destructiveButtonIndex: 3,
				title: "请选择",
				message: "是否收藏该文章" //小标题
			}, (index) => {
				// alert(index) //根据点击的第几个 item 来执行不同的操作 (根据点击的索引执行相应的操作)
				switch (index) {
					case 1:
						// 🌟 执行收藏操作
						Alert.alert(
							'确认收藏',
							'收藏该文章后可以 blablabla',
							[
								// 👇配置 alert 的选项
								{ text: '确定', onPress: () => console.log('OK Pressed') },
								{ text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
								{ text: 'OK', onPress: () => console.log('OK') }
							],
						)
						break;
					case 2:
						// 执行分享操作
						break;
					case 3:
						// 执行点赞操作
						break;
					default:
						// 取消操作或其他情况
						break;
				}
			})
		} else {
			// Android ActionSheet 的实现...
		}
	}


	// 获取剪切板的内容 - Clipboard API, 需要安装 react-native-clipboard 
	// getClipboardContent = async () => {
	// 	// Clipboard.setString('Hello World') //设置剪切板的内容
	// 	Clipboard.getString() //获取剪切板的内容
	// 	const content = await Clipboard.getString()
	// 	alert(content)
	// }


	// Dimensions API - 获取屏幕的宽高 API
	getScreenSize = () => {
		Dimensions.get('window') //获取屏幕的宽高
		const {width, height} = Dimensions.get('window')
		alert(width + ' ' + height)
	}


	// Easing API - 运动效果
	setEasing = () => {
		// Easing.linear //匀速
		// Easing.quad //二次方
		// Easing.cubic //三次方
		// Easing.poly(4) //4次方
		// Easing.sin //正弦
		// Easing.circle //圆形
		// Easing.exp //指数
		// Easing.back(4) //回退
		// Easing.elastic(4) //弹性
		// Easing.bounce //反弹
		// Easing.bezier(0.06, 1, 0.86, 0.23) //贝塞尔曲线
	}


	// 定时器
	setTimer = () => {
		// setTimeout(() => {
		// 	// alert('Hello World')
		// }, 1000)

		// setInterval(() => {
		// 	// alert('Hello World')
		// }, 1000)

		// clearTimeout() //清除定时器
		// clearInterval() //清除定时器

		// setImmediate(() => { //setImmediate 会在当前帧结束后立即执行
		// 	// alert('Hello World')
		// })

		// requestAnimationFrame(() => { //帧动画
		// 	// alert('Hello World')
		// })
	}


	getUserPhotos = () => {
		// const cameraRoll = useCameraRoll();

		// // 读取相册
		// CameraRoll.getPhotos({
		// 	first: 10,
		// 	assetType: 'Photos'
		// }).then(res => {
		// 	this.setState({
		// 		photos: res.edges
		// 	})
		// }).catch(err => {
		// 	alert(err)
		// })
	}



	render() {
		return (
			// 👇可以根据后端的唯一 id 来发送请求, 渲染更详细的页面
			<View style={styles.container}>
				<Text onPress={ ()=>{this.getClipboardContent()} }>InfoPage - 测试 RN 的各种原生  API </Text>
				<TouchableOpacity
					style={styles.button}
					onPress={ ()=>{this.showActionSheets()} }>
					<Text>Show Action Sheet</Text>
				</TouchableOpacity>

				<Animated.View  // 🚗 动画 API 【第三步】 👈 Animated 后面可以跟 View, Text, Image, ScrollView 等组件 🚗
					style={[
						styles.square, 
						{opacity: this.state.OpacityFadeAnim,  width: this.state.widthAnim,  height: this.state.heightAnim}
					]} 
				>
					<Text style={{color: 'white'}}>渐变方块</Text>
				</Animated.View>

				<TouchableOpacity
					style={styles.button}
					onPress={ ()=>{this.getUserPhotos()} }>
					<Text>读取相册</Text>
				</TouchableOpacity>

				{ //👇有图就返回图片
					this.state.imgUri ? <View></View> : <View><Text>无图片</Text></View>
					
				}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	square: {
		width: 300,
		height: 300,
		backgroundColor: "#203fbe",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		backgroundColor: "#dc3da2",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		marginVertical: 10,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#ffffff",
		textAlign: "center",
	},
})