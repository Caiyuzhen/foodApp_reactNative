import React from 'react';
import { Image } from 'react-native'
import Wiki from '../wiki/View.js';
import MyDesign from '../myDesign/View.js';
import TabNavigator from 'react-native-tab-navigator'; //🔥使用第三方 Tab 模块能够更好的兼容 IOS 跟 Android
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'wiki' //🔥默认页
		}
	}

	render() {

		const homeIcon = require('../../resources/icon/home.png')
		const myDesignIcon = require('../../resources/icon/myDesign.png')
		const homeIconSelected = require('../../resources/icon/homeSelected.png')
		const myDesignIconSelected = require('../../resources/icon/myDesignSelected.png')

		return (
			<TabNavigator
				tabBarStyle={{
					marginBottom: 40,
					height: 60,
					backgroundColor: '#fff',
				}}
			>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'wiki'}
					title='Wiki'
					renderIcon={ ()=> <Image source={homeIcon} style={{width: 24, height: 24}}/>}
					renderSelectedIcon={() => <Image source={homeIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					onPress={() => this.setState({ selectedTab: 'wiki' })}
					// tab 选中态的颜色
					selectedTitleStyle={{
						color: '#4736cd',
						fontWeight: 'bold'
					}}
					badgeText={1}
					// renderBadge={() => <CustomBadgeView />} //自定义 badge 组件
				>
					<Wiki />
				</TabNavigator.Item>

				<TabNavigator.Item
					selected={this.state.selectedTab === 'myDesign'}
					title='MyDesign'
					renderIcon={ ()=> <Image source={myDesignIcon} style={{width: 24, height: 24}}/>}
					renderSelectedIcon={() => <Image source={myDesignIconSelected} style={{ width: 24, height: 24}} />} // 设置选中态的图标及颜色
					onPress={ ()=>this.setState( {selectedTab: 'myDesign'}) }
					// tab 选中态的颜色
					selectedTitleStyle={{
						color: '#4736cd',
						fontWeight: 'bold'
					}}
				>
					<MyDesign />
				</TabNavigator.Item>

			</TabNavigator>
		)
	}
}
