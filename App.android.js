import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';


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
		fetch('http://192.168.1.15/api/index.json') //首页 feed 的接口数据
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
		const Tab = createBottomTabNavigator();
		// alert(width)
		return (
			<NavigationContainer>
				{/* 👇导航的配置 */}
				<Tab.Navigator  
					initialRouteName="Home" //默认是哪一页
					tabBarOptions={{
						activeTintColor: '#5d37ce', // 选中态颜色
						inactiveTintColor: '#999', // 未选中态颜色
						// 选中态文字加粗
						labelStyle: {
							fontWeight: 'bold'
						}
					}}
				>
					<Tab.Screen 
						name="Home"
						options={{ //自定义 icon
							tabBarIcon: ({ color, size }) => (
								<TabIcon_Home color={color} size={24} />
							),
						  }}
						>
						{/* 👇把数据传递给组件 */}
  						{() => <HomeScreen categories={this.state.categories} />}
					</Tab.Screen>
					<Tab.Screen 
						name="MyDesign" 
						component={MyDesignScreen} 
						options={{tabBarIcon: () => (
								<TabIcon_My size={24}/>
							)
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		)
	}
}


// 🏠画个 svg 
const HomeIconSvg = `
 	<svg t="1684054147392" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="61215" width="200" height="200"><path d="M119.808 421.504a128 128 0 0 1 0-181.034667l120.661333-120.661333a128 128 0 0 1 181.034667 0L904.192 602.453333a128 128 0 0 1 0 181.034667l-120.661333 120.661333a128 128 0 0 1-181.034667 0L119.808 421.546667z" fill="#9F9F9F" p-id="61216"></path><path d="M657.92 126.506667a128 128 0 0 1 181.034667 0l60.330666 60.330666a128 128 0 0 1 0 180.992l-501.333333 501.333334a85.333333 85.333333 0 0 1-43.562667 23.338666l-213.632 42.709334a42.666667 42.666667 0 0 1-50.176-50.218667l42.666667-213.589333a85.333333 85.333333 0 0 1 23.381333-43.605334l501.333334-501.333333z" fill="#000000" p-id="61217"></path></svg>
`

const MyDesignIconSvg = `
	<svg t="1684054245591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="65060" width="200" height="200"><path d="M938.133333 490.666667c0.362667 7.061333 0.533333 14.186667 0.533334 21.333333 0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512C85.333333 283.52 264.938667 96.981333 490.666667 85.866667V85.333333h384v0.853334c12.629333 1.984 24.810667 7.338667 36.586666 16.021333C929.536 115.712 938.666667 133.653333 938.666667 156.010667V490.666667h-0.533334zM298.666667 405.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v42.666667a42.666667 42.666667 0 1 0 85.333333 0v-42.666667a42.666667 42.666667 0 0 0-42.666666-42.666667z m234.666666 0a42.666667 42.666667 0 0 0-42.666666 42.666667v42.666667a42.666667 42.666667 0 1 0 85.333333 0v-42.666667a42.666667 42.666667 0 0 0-42.666667-42.666667z" fill="#333333" p-id="65061"></path></svg>
`



// ⚡️自定义图标样式
const TabIcon_Home = ({ color, size }) => {
	return (
		<SvgXml xml={HomeIconSvg} width={size} height={size} fill={color} />
	)
}

const TabIcon_My = ({ color, size }) => {
	return (
		<SvgXml xml={MyDesignIconSvg} width={size} height={size} fill={color} />
	)
}





// 🔥首页的渲染组件
function HomeScreen(props) {

	const { categories } = props; // 解构赋值从 props 中获取 categories 数据

	const { width } = Dimensions.get('window') // ‘🔥解构赋值’ 获取屏幕宽度, 跟 100% 一样
	const itemWidth = (width - 24 ) / 2 //🔥表示左右间隔 24
	const imgWidth = itemWidth - 12 //🔥表示图片左右间隔 8

	return (
		<View style={styles.container}>
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
								categories.map((item) => {
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
		</View>
	)
}


// 🔥设置页的渲染组件
function MyDesignScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>MyDesignScreen!</Text>
		</View>
	)
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
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0,
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
	},
})


