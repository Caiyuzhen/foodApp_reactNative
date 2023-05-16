import React from 'react';
import Home from './view/home/View.js';
import MyDesign from './view/myDesign/View.js';
import Detail from './view/detailPage/View.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native'


const Stack = createNativeStackNavigator();

// 自定义导航栏标题组件
const CustomHeaderTitle = ({ children }) => {
	return <Text style={{ width: '100%', marginLeft: 16, textAlign: 'left', fontSize: 22, fontWeight: 500 }}>{children}</Text>;
}


// 🚗 定义路由
/**
 * Home -> Feed -> Detail
 *      -> MyDesign -> Detail
 */		
export default class App extends React.Component {
	render() {

		return (
			// 最上层需要包裹 NavigationContainer
			<NavigationContainer>
				{/* 🧭🔥🔥🔥 【第一步】定义堆栈式路由 , 方便后续的路由传参 App (定义路由） -> Home -> Feed -> Detail*/}
				<Stack.Navigator
					initialRouteName="Home"  // 配置默认渲染的路由组件
				>
					<Stack.Screen 
						name="Home" 
						component={Home} 
						options={{
							// header: () => null, // 设置为 null 隐藏导航栏
							headerShown: false, //隐藏标题栏
							headerTitle: (props) => (
								<CustomHeaderTitle>{props.children}</CustomHeaderTitle>
							),
						}}
					/>

					<Stack.Screen 
						name="Detail" 
						component={Detail} 
						options={{
							title: 'Detail',
							headerStyle: {
								// backgroundColor: 'rgba(255, 255, 255, 0)',
							},
							headerTintColor: '#4736cd', //标题字颜色
							headerTitleStyle: {
								fontWeight: 'bold',
							},	
						}}
					/>
					
					<Stack.Screen 
						name="MyDesign" 
						component={MyDesign} 
					/>
					
      			</Stack.Navigator>
			</NavigationContainer>
		)	
	}
}
