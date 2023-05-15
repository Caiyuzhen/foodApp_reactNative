import React from 'react';
import Home from './view/home/View.js';
import MyDesign from './view/myDesign/View.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native'


const Stack = createNativeStackNavigator();

// 自定义导航栏标题组件
const CustomHeaderTitle = ({ children }) => {
	return <Text style={{ width: '100%', marginLeft: 16, textAlign: 'left', fontSize: 22, fontWeight: 500 }}>{children}</Text>;
}


export default class App extends React.Component {
	render() {

		return (
			// 最上层需要包裹 NavigationContainer
			<NavigationContainer>
				{/* 🧭 堆栈式导航,  -> 配置默认渲染的路由组件 */}
				<Stack.Navigator 
					initialRouteName="Home"
				>
					<Stack.Screen 
						name="Home" 
						component={Home} 
						options={{
							// header: () => null, // 设置为 null 隐藏导航栏 （整体控制）
							// headerShown: false, //隐藏标题栏 （整体控制）
							title: 'Home',
							headerStyle: {
								backgroundColor: 'rgba(255, 255, 255, 0)',
								// 自定义导航栏高度
							},
							// headerTintColor: '#4736cd', //标题字颜色
							// headerTitleStyle: {
							// 	fontWeight: 'bold',
							// },
							headerTitle: (props) => (
								<CustomHeaderTitle>{props.children}</CustomHeaderTitle>
							),
						}}
					/>
      			</Stack.Navigator>
			</NavigationContainer>
		)	
	}
}
