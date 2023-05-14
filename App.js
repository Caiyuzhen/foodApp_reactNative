import React from 'react';
import Home from './view/home/View.js';
import MyDesign from './view/myDesign/View.js';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('HomeScreen', () => Home);
Navigation.registerComponent('MyDesignScreen', () => MyDesign);


// 初始化导航库
Navigation.events().registerAppLaunchedListener(() => {
	// 设置栈导航
	const stack = {
		children: [
		{
			component: {
			name: 'HomeScreen',
			options: {
				topBar: {
				title: {
					text: 'Home',
				},
				},
			},
			},
		},
		{
			component: {
			name: 'MyDesignScreen',
			options: {
				topBar: {
				title: {
					text: 'My Design',
				},
				},
			},
			},
		},
		],
	}
	

	// 启动导航栏
	Navigation.setRoot({
		root: {
			stack,
		},
	})

})
  

  export default class App extends React.Component {
	render() {
		return (
			<Home />
		)	
	}
  }


// export default class App extends React.Component {

// 	render() {
// 		return (
// 			// <Home />
// 		)	
// 	}

// }


// export default App
