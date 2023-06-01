import React, { Component } from "react";
import { 
	ScrollView, 
	View, 
	Text, 
	TextInput,
	Keyboard, 
	ActionSheetIOS, 
	TouchableOpacity, 
	StyleSheet, 
	Platform, 
	Alert, 
	Animated, 
	AppRegistry, 
	AppState, 
	BackHandler, 
	Dimensions, 
	Image, 
	NetInfo,
	PixelRatio,
	Appearance,
	Share,
	Button,
	Vibration,
	ActivityIndicator, //loading
	Modal,
	SnapshotViewIOS, //包裹组件后, 可以知道里边的组件被加载完了没有
} from "react-native";
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Network from 'expo-network';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView } from "react-native-web"



export default class InfoPage extends Component {
	constructor(props) {
		super(props)

		// 🚗 动画 API 【第一步】🚗
		this.state = {
			OpacityFadeAnim: new Animated.Value(0), //设置初始值
			widthAnim: new Animated.Value(0), // 设置初始值
			heightAnim: new Animated.Value(0), // 设置初始值

			imgUri: null,// 初始化存放相册的数据

			takePhotoUri: null, // 初始化存放拍照的数据

			date: new Date(),
			showPicker: false,

			showModal: false,
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



	// // 获取相册中的权限
	// getUserPhotos = async () => {
	// 	// 👇 EXPO 的读取相册的 API
	// 	try {
	// 		const { status } = await MediaLibrary.requestPermissionsAsync()
	// 		if (status === "granted") {
	// 			const { assets } = await MediaLibrary.getAssetsAsync({ first: 10 })
	// 			this.setState({
	// 				imgUri: assets[0].uri,
	// 			})
	// 		} else {
	// 			console.log("相册权限被拒绝")
	// 		}
	// 		} catch (error) {
	// 		console.log(error)
	// 	}

	// 	// 👇原生的读取相册方法
	// 	// const cameraRoll = useCameraRoll();

	// 	// // 读取相册
	// 	// CameraRoll.getPhotos({
	// 	// 	first: 10,
	// 	// 	assetType: 'Photos'
	// 	// }).then(res => {
	// 	// 	this.setState({
	// 	// 		photos: res.edges
	// 	// 	})
	// 	// }).catch(err => {
	// 	// 	alert(err)
	// 	// })
	// }



	// // 选择图片
	// pickImage = async () => {
	// 	try {
	// 		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
	// 		if (status === "granted") {
	// 			const result = await ImagePicker.launchImageLibraryAsync()
	// 			if (!result.canceled) {
	// 				// console.log(result.uri)
	// 				console.log(result.assets[0].uri);

	// 				this.setState({
	// 					imgUri: result.assets[0].uri,
	// 				})
	// 			}
	// 		} else {
	// 			console.log("相册权限被拒绝")
	// 		}
	// 		} catch (error) {
	// 			console.log(error)
	// 	}
	// }



	// 检查相册权限并选择图片
	pickImage = async () => {
		try {
			// 检查相册权限
			const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			const { status: assetsStatus } = await MediaLibrary.requestPermissionsAsync();
			
			// 判断权限是否被授予
			if (libraryStatus === 'granted' && assetsStatus === 'granted') {
				// 选择图片
				const result = await ImagePicker.launchImageLibraryAsync()
				if (!result.canceled) {
					console.log(result.assets[0].uri)
					this.setState({
						imgUri: result.assets[0].uri, //取出第 0 张图片
					})
				}
			} else {
				alert('相册权限被拒绝');
				console.log('相册权限被拒绝')
			}
		} catch (error) {
			console.log(error)
		}
	}

	

	// 获取地理位置
	getLocation = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				console.log('Permission to access location was denied')
				return
			}
		
				let location = await Location.getCurrentPositionAsync({}) //⚡️获取当前位置
					console.log(location)
					alert(JSON.stringify(location))
					
				//⚡️监听设备的位移距离
				let walkPos = await Location.watchPositionAsync({}, (pos) => {
					console.log(pos)
					alert(JSON.stringify(pos))
				})
				// 移除监听位移距离
				// walkPos.remove()
			} 

		catch (error) {
			console.log('Error while retrieving location', error)
		}
	}


	// 开启摄像头的方法 EXPO 的 ImagePicker
	openCameraFn = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== 'granted') {
			// 权限被拒绝
			return;
		}

		const result = await ImagePicker.launchCameraAsync();
		if (!result.canceled) {
			// 处理获取到的图像
			// result.uri 包含了图像的本地路径
			// 可以将其用作<Image>组件的source或上传到服务器等
			this.setState({
				takePhotoUri: result.uri,
			})
			console.log('照片地址', result.uri)

			// 看下内存中有没有同样的照片 hasImage
			const hasImage = await ImagePicker.hasImageAsync(result.uri)


			// 把照片从内存中干掉
			ImagePicker.deleteImageAsync(result.uri)
		}
	}


	// 获取当前网络的状态
	getNetworkStatus = async () => {
		try {
			const networkState = await Network.getNetworkStateAsync()
				console.log(networkState.isConnected) // true or false
				console.log(networkState.isInternetReachable) // true or false
				console.log(networkState.type) // 'unknown', 'none', 'cellular', 'wifi', or 'ethernet'
			} catch (error) {
				console.log(error)
		}
	}


	// 获取屏幕像素比值
	getPixelRatio = () => {
		const pixelRatio = PixelRatio.get() 
		console.log(pixelRatio) // 2 、3 、 3.5 倍屏...
	}


	// 发送 IOS 推送，push NotificationIOS
	sendPushNotification = async () => {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus;
		
		// 如果权限尚未被授予，则请求权限
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status;
		}
		
		// 如果权限被授予，获取设备的推送令牌
		if (finalStatus === 'granted') {
			const token = (await Notifications.getExpoPushTokenAsync()).data
			console.log(token); // 将此令牌发送到服务器，以便将消息推送到设备
			await scheduleLocalNotification(); // 调用scheduleLocalNotification 方法
		}


		async function scheduleLocalNotification() {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'My Notification',
					body: 'This is a local notification!',
				},
					trigger: {
					seconds: 5, // 5秒后触发通知
				},
			})
		}
	}


	// 获取手机是深色还是浅色
	getColorScheme = () => {
		const colorScheme = Appearance.getColorScheme()
		console.log(colorScheme) // light or dark
		alert(colorScheme)
	}


	// 分享到第三方渠道
	shareToApp = async () => {
		try {
			const result = await Share.share({
				message: '你好，我是分享的内容',
				title: '分享的标题',
				url: 'https://www.baidu.com', //分享的链接
				// subject：邮件主题（仅适用于邮件分享）
				// dialogTitle：分享对话框的标题（仅适用于 Android）
				// excludedActivityTypes：指定不显示的分享应用程序类型列表
				// tintColor：分享按钮的颜色
				// failOnCancel：指定在用户取消分享时是否抛出错误，默认为 false
			})
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message)
		}
	}


	// 打开时间选择器
	handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || this.state.date;
		this.setState({ showPicker: Platform.OS === 'ios', date: currentDate });
	}
	
	showDatePicker = () => {
		this.setState({ showPicker: true });
	}
	

	// 线性马达震动
	handleVibrate = () => {
		if (Platform.OS === 'android') {
				// 在 Android 设备上，需要使用震动模式数组来实现持续时间的震动
				const PATTERN = [0, 9000]; // 震动 9000 毫秒
				Vibration.vibrate(PATTERN, false);
			} else {
				// 在 iOS 设备上，直接传递持续时间参数即可
				Vibration.vibrate();
		}
	}


	// 设置 Modal 为可见
	setModalVisible = (isShowModal) => {
		this.setState({ showModal: isShowModal })

	}


	render() {
		const { date, showPicker } = this.state
		const pixelRatio = PixelRatio.get() 

		return (
			<ScrollView>
				{/* 👇可以根据后端的唯一 id 来发送请求, 渲染更详细的页面 */}
				<View style={styles.container}>
					<Text onPress={ ()=>{this.getClipboardContent()} }>InfoPage - 测试 RN 的各种原生  API </Text>
					<TouchableOpacity
						style={styles.button}
						onPress={ ()=>{this.showActionSheets()} }>
						<Text>Show Action Sheet</Text>
					</TouchableOpacity>

					{/* keyboard 输入框 */}
					<TextInput
						style={styles.input}
						onChangeText={text => this.setState({ text })}
						value={this.state.text}
						onSubmitEditing={ Keyboard.dismiss }
					/>

					<Animated.View  // 🚗 动画 API 【第三步】 👈 Animated 后面可以跟 View, Text, Image, ScrollView 等组件 🚗
						style={[
							styles.square, 
							{opacity: this.state.OpacityFadeAnim,  width: this.state.widthAnim,  height: this.state.heightAnim}
						]} 
					>
						<Text style={{color: 'white'}}>渐变方块</Text>
					</Animated.View>

					{/* <TouchableOpacity
						style={styles.button}
						onPress={ ()=>{this.getUserPhotos()} }>
						<Text>读取相册</Text>
					</TouchableOpacity> */}

					<TouchableOpacity style={styles.button} onPress={this.pickImage}>
						<Text>选择照片</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.button} onPress={this.getLocation}>
						<Text>获取地理位置</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.button} onPress={this.openCameraFn}>
						<Text>开启摄像头</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.button} onPress={this.getNetworkStatus}>
						<Text>获取当前网络的状态</Text>
					</TouchableOpacity>


					<TouchableOpacity style={[styles.button, { borderBottomWidth: 3 / pixelRatio}]} onPress={this.getPixelRatio}>
						<Text>获取屏幕像素比值</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.button} onPress={this.sendPushNotification}>
						<Text>发送 IOS 推送消息</Text>
					</TouchableOpacity>

					
					<TouchableOpacity style={styles.button} onPress={this.getColorScheme}>
						<Text>获取手机是深色还是浅色</Text>
					</TouchableOpacity>

					
					<TouchableOpacity style={styles.button} onPress={this.shareToApp}>
						<Text>分享到第三方渠道</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.button} onPress={this.showDatePicker}>
						<Text>打开时间选择器</Text>
					</TouchableOpacity>
					
					{showPicker && (
						<DateTimePicker
							value={date}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={this.handleDateChange}
						/>
					)}

					<ActivityIndicator 
						size="large" 
						color="#0000ff" 
						animating={true} //是否显示
						// hidesWhenStopped={false} //停止时是否隐藏
					/>



					<Button title="震动" onPress={this.handleVibrate} />


					<Button title="显示模态弹窗" onPress={ () => {this.setModalVisible(true)} } />
					<Modal
						animationType="fade" //模态弹窗的动画类型 slide 从底部滑入  fade 淡入淡出  none 无动画
						transparent={true}
						visible={this.state.showModal}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.'); () => {this.setModalVisible(false)}}
						}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>Hello World!</Text>
								<TouchableOpacity
									style={[styles.button]}
									onPress={ () => this.setModalVisible(false) }>
								<Text style={styles.textStyle}>Hide Modal</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>

					


					{/* 👇有图就渲染图片 , 记得设置图片的宽高, 🔥 不然显示不出来！！！*/}
					{this.state.imgUri && <Image style={styles.image} source={{ uri: this.state.imgUri }} />}
					{!this.state.imgUri && <View><Text>无图片</Text></View>}

					{this.state.takePhotoUri && <Image style={styles.image} source={{ uri: this.state.takePhotoUri }} />}
					{!this.state.takePhotoUri && <View><Text>无拍摄图片</Text></View>}
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		width: '100%',
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	image: {
		width: 200,
		height: 200,
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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: 280,
		height: 400,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
		modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
})