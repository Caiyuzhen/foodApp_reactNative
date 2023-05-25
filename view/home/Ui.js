import React from 'react';
import { Image } from 'react-native'
import { Feed } from '../feed/index';
import MyDesign from '../myDesign/View.js';
import TabNavigator from 'react-native-tab-navigator'; //🔥使用第三方 Tab 模块能够更好的兼容 IOS 跟 Android
import { View as FoodMap } from '../map/index.js'
import { HotList } from '../hotList/index.js'
import { View as Settings } from '../settings/index.js'


// 核心是作为导航页
/* Home -> Feed -> Detail -> MyDesign -> Detail */	


// ⚡️ 使用 Reducer 数据
export default class Home extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {
		// 	selectedTab: 'Feed' //🔥默认页
		// }
		// alert(this.props.navigation) //🔥🔥🔥 因为 home 页定义了路由（在 App.js 中定义）, 因此可以通过 this.props.navigation 获取路由对象！！
	}

	render() {
		const homeIcon = require('../../resources/icon/home.png')
		const homeIconSelected = require('../../resources/icon/homeSelected.png')
		const hotListIcon = require('../../resources/icon/hotList.png')
		const hotListIconSelected = require('../../resources/icon/hotListSelected.png')
		const myDesignIcon = require('../../resources/icon/myDesign.png')
		const myDesignIconSelected = require('../../resources/icon/myDesignSelected.png')
		const foodMapIcon = require('../../resources/icon/foodMap.png')
		const foodMapIconSelected = require('../../resources/icon/foodMapSelected.png')
		const settingIcon = require('../../resources/icon/setting.png')
		const settingIconSelected = require('../../resources/icon/settingSelected.png')

		const nearItem = null 
		if(this.props.showNear) { //【👀 新增一个配置数据  -  第 3 步】
			nearItem = <TabNavigator.Item
					selected={this.props.selectedTab === 'FoodMap'}
					title='FoodMap'
					renderIcon={ ()=> <Image source={foodMapIcon} style={{width: 24, height: 24}}/>} //icon 的位置
					renderSelectedIcon={() => <Image source={foodMapIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					// onPress={() => this.setState({ selectedTab: 'FoodMap' })}
					onPress={ ()=>this.props.changeSelectedTab('FoodMap') }
					selectedTitleStyle={{ // tab 选中态的颜色
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					titleStyle={{
						marginBottom: 44, // 文字向上偏移
					}}
				>
					<FoodMap />
				</TabNavigator.Item>
		}

		return (
			// 底部导航栏
			<TabNavigator
				tabBarStyle={{
					// marginBottom: 40,
					height: 98,
					backgroundColor: '#fff',
				}}
			>
				<TabNavigator.Item
					selected={this.props.selectedTab === 'Feed'} //左边能用 props 是因为绑定了 reducer!
					title='Feed'
					renderIcon={ ()=> <Image source={homeIcon} style={{width: 24, height: 24}}/>} //icon 的位置
					renderSelectedIcon={() => <Image source={homeIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					// onPress={() => this.setState({ selectedTab: 'Feed' })}
					onPress={ ()=>this.props.changeSelectedTab('Feed') }
					// tab 选中态的颜色
					selectedTitleStyle={{
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					badgeText={1}
					titleStyle={{
						marginBottom: 44, // 文字向上偏移
					}}
					// renderBadge={() => <CustomBadgeView />} //自定义 badge 组件
				>
					<Feed navigate={this.props.navigation.navigate}  //🔥🔥🔥【第二步】把 Home 页拿到的 navigate 方法传递给 Feed 页面, 以便做详情页的跳转！！
					/> 
				</TabNavigator.Item>
				
				<TabNavigator.Item
					selected={this.props.selectedTab === 'HotList'} //左边能用 props 是因为绑定了 reducer!
					title='HotList'
					renderIcon={ ()=> <Image source={hotListIcon} style={{width: 24, height: 24}}/>} //icon 的位置
					renderSelectedIcon={() => <Image source={hotListIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					onPress={ ()=>this.props.changeSelectedTab('HotList') }
					selectedTitleStyle={{
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					titleStyle={{
						marginBottom: 44, // 文字向上偏移
					}}
				>
					<HotList/> 
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.props.selectedTab === 'myDesign'}
					title='MyDesign'
					renderIcon={ ()=> <Image source={myDesignIcon} style={{width: 24, height: 24}}/>} //icon 的位置
					renderSelectedIcon={() => <Image source={myDesignIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					onPress={ ()=>this.props.changeSelectedTab('myDesign') }
					selectedTitleStyle={{ // tab 选中态的颜色
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					titleStyle={{
						marginBottom: 44, // 文字向上偏移
					}}
				>
					<MyDesign />
				</TabNavigator.Item>

				{/* 地图页 */}
				{nearItem}

				<TabNavigator.Item
					selected={this.props.selectedTab === 'Settings'}
					title='Settings'
					renderIcon={ ()=> <Image source={settingIcon} style={{width: 24, height: 24}}/>} //icon 的位置
					renderSelectedIcon={() => <Image source={settingIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					// onPress={() => this.setState({ selectedTab: 'Settings' })}
					onPress={ ()=>this.props.changeSelectedTab('Settings') }
					selectedTitleStyle={{ // tab 选中态的颜色
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					titleStyle={{
						marginBottom: 44, // 文字向上偏移
					}}
				>
					<Settings />
				</TabNavigator.Item>

			</TabNavigator>
		)
	}
}




//👇 组件内部 state
// export default class Home extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			selectedTab: 'Feed' //🔥默认页
// 		}
// 		// alert(this.props.navigation) //🔥🔥🔥 因为 home 页定义了路由（在 App.js 中定义）, 因此可以通过 this.props.navigation 获取路由对象！！
// 	}

// 	render() {

// 		const homeIcon = require('../../resources/icon/home.png')
// 		const myDesignIcon = require('../../resources/icon/myDesign.png')
// 		const homeIconSelected = require('../../resources/icon/homeSelected.png')
// 		const myDesignIconSelected = require('../../resources/icon/myDesignSelected.png')
// 		const foodMapIcon = require('../../resources/icon/foodMap.png')
// 		const foodMapIconSelected = require('../../resources/icon/setting.png')
// 		const settingIcon = require('../../resources/icon/foodMap.png')
// 		const settingIconSelected = require('../../resources/icon/settingSelected.png')

// 		return (
// 			// 底部导航栏
// 			<TabNavigator
// 				tabBarStyle={{
// 					// marginBottom: 40,
// 					height: 98,
// 					backgroundColor: '#fff',
// 				}}
// 			>
// 				<TabNavigator.Item
// 					selected={this.state.selectedTab === 'Feed'}
// 					title='Feed'
// 					renderIcon={ ()=> <Image source={homeIcon} style={{width: 24, height: 24}}/>} //icon 的位置
// 					renderSelectedIcon={() => <Image source={homeIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
// 					onPress={() => this.setState({ selectedTab: 'Feed' })}
// 					// tab 选中态的颜色
// 					selectedTitleStyle={{
// 						color: '#4736cd',
// 						fontWeight: 'bold'
// 					}}
// 					badgeText={1}
// 					titleStyle={{
// 						marginBottom: 44, // 文字向上偏移
// 					}}
// 					// renderBadge={() => <CustomBadgeView />} //自定义 badge 组件
// 				>
// 					<Feed navigate={this.props.navigation.navigate 
// 						//🔥🔥🔥【第二步】把 Home 页拿到的 navigate 方法传递给 Feed 页面, 以便做详情页的跳转！！
// 					}/> 
// 					{/* <Feed /> */}
// 				</TabNavigator.Item>

// 				<TabNavigator.Item
// 					selected={this.state.selectedTab === 'myDesign'}
// 					title='MyDesign'
// 					renderIcon={ ()=> <Image source={myDesignIcon} style={{width: 24, height: 24}}/>} //icon 的位置
// 					renderSelectedIcon={() => <Image source={myDesignIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
// 					onPress={ ()=>this.setState( {selectedTab: 'myDesign'}) }
// 					// tab 选中态的颜色
// 					selectedTitleStyle={{
// 						color: '#4736cd',
// 						fontWeight: 'bold'
// 					}}
// 					titleStyle={{
// 						marginBottom: 44, // 文字向上偏移
// 					}}
// 				>
// 					<MyDesign />
// 				</TabNavigator.Item>

// 				<TabNavigator.Item
// 					selected={this.state.selectedTab === 'FoodMap'}
// 					title='FoodMap'
// 					renderIcon={ ()=> <Image source={foodMapIcon} style={{width: 24, height: 24}}/>} //icon 的位置
// 					renderSelectedIcon={() => <Image source={foodMapIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
// 					onPress={() => this.setState({ selectedTab: 'FoodMap' })}
// 					// tab 选中态的颜色
// 					selectedTitleStyle={{
// 						color: '#4736cd',
// 						fontWeight: 'bold'
// 					}}
// 					titleStyle={{
// 						marginBottom: 44, // 文字向上偏移
// 					}}
// 				>
// 					<FoodMap />
// 				</TabNavigator.Item>

// 				<TabNavigator.Item
// 					selected={this.state.selectedTab === 'Settings'}
// 					title='Settings'
// 					renderIcon={ ()=> <Image source={settingIcon} style={{width: 24, height: 24}}/>} //icon 的位置
// 					renderSelectedIcon={() => <Image source={settingIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
// 					onPress={() => this.setState({ selectedTab: 'Settings' })}
// 					// tab 选中态的颜色
// 					selectedTitleStyle={{
// 						color: '#4736cd',
// 						fontWeight: 'bold'
// 					}}
// 					titleStyle={{
// 						marginBottom: 44, // 文字向上偏移
// 					}}
// 				>
// 					<Settings />
// 				</TabNavigator.Item>

// 			</TabNavigator>
// 		)
// 	}
// }
