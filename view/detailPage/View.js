
import { connect } from 'react-redux' //【🎈第 4 步】
import { freshDetailPageAction, getDetailPageInfoAction } from './actionCreator.js' //抽象出来的的 action
import { DetailPage } from './Ui.js'

// 详情页数据  /*Home -> Feed -> Detail -> MyDesign -> Detail*/



//【容器层 - 负责触发一些逻辑】
// 👇抽象出 fetch 请求 action 后的写法 ————————————————————————————————————————————————————————————————
//【🎈第 6 步】 定义一个方法, 获取 reducer 内的 state
const mapState = (state) => {
	return { //在 👆 上边可以通过 this.props.refreshing 拿到 refreshing 这个参数
		detailPage: state.DetailPageReducer.detailPage, // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
		refreshing: state.DetailPageReducer.refreshing  // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
	}
}


//【🎈第 7 步】 定义修改详情页数据的方法, 下拉刷新数据后, 停止拉取
const mapDispatch = (dispatch, ownProps) => { //ownProps 是父组件传递过来的内容, 因为 mapDispatch 是在 connect 内的, 所以可以拿到父组件传递过来的内容
	return {
		// 定义更改 reducer 的方法 - 获得列表
		getListData() { //首次加载
			const action = getDetailPageInfoAction(ownProps.route.params, true) //true 表示盖掉以前的数据
			dispatch(action) //this.props.route.params
		},


		// 定义更改 reducer 的方法 - 下拉刷新、派发 action, 修改 list 数据
		handleListRefresh() {
			let action = freshDetailPageAction(true)
			dispatch(action) //this.props.route.params, 派发 action 给到 detailPage 的 reducer （下拉刷新数据）

			action = getDetailPageInfoAction(ownProps.route.params, false) // 请求新的数据, false 表示不覆盖以前的内容
			dispatch(action) //this.props.route.params
		}
	}
}


// 👇 Redux 架构下生成视图层的方法！！！
export default connect(mapState, mapDispatch)(DetailPage) //【🎈第 8 步】, 映射并导出组件










// 👇没抽象出 fetch 请求的 action 的写法 ————————————————————————————————————————————————————————————————
// class DetailPage extends Component { //【🎈第 5 步】, 不是导出这个组件, 而是经过 connect 包装的组件

// 	constructor(props) {
// 		super(props)
// 		this.handleListRefresh = this.handleListRefresh.bind(this)
// 	}

// 	// 🔥请求详情页接口数据
// 	componentDidMount() {
// 		this.getListData()
// 	}


// 	// 👋获取数据的方法
// 	getListData() {
// 		let url = 'http://www.abc.com/api/index.json' 
// 		// alert(this.props.route.params.id) //【第四步】🔥🔥🔥 React-Navigation 的方法, 【route.params】可以拿到携带的参数, 然后进一步的去请求更细的数据！
// 		if(this.props.route.params.id) {
// 			let id = this.props.route.params.id // 对应列表的 id
// 			url = "http://www.abc.com/api/detailList.json?id=" + id // 拼接 id, 请求对应的数据
// 		}

// 		// 请求详情页数据
// 		fetch(url)
// 			.then(res => res.json())
// 			.then( this.props.changeDetailPageInfo) // 🔥 changeDetailPageInfo 方法定义在下面！ 调用 mapDispatch 内的 changeDetailPageInfo 方法！🔥
// 	}


// 	// 👇下拉刷新
// 	handleListRefresh() {

// 		this.props.changeDetailPageFreshing() //🔥 changeFreshing 定义在下面！ 🔥

// 		this.getListData() // 获取新的数据
// 	}

// 	render() {
// 		return (
// 			<FlatList
// 				onRefresh={ this.handleListRefresh } //👈下拉刷新效果
// 				refreshing={ this.props.refreshing } //👈当加载数据时（onRefresh) 需要做成 true, 加载完毕则 false, //【🎈第 9 步】 -> 把 this.state.refreshing 改成 this.props.refreshing
// 				style={styles.container}
// 				data={this.props.detailPage} //🔥🔥想要循环的数据 //【🎈第 10 步】-> 把 this.state.detailList 改成 this.props.detailList
// 				renderItem={({item}) => { //🔥🔥循环出来的每一项
// 					return (
// 						// 👇注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id
// 						<View style={styles.item} keyExtractor={(item, index) => index}> 
// 							<Image 
// 								style={styles.itemImage}
// 								source={{uri: item.imgUrl}} 
// 							></Image>
// 							<View style={styles.info}>
// 								<Text style={styles.title}>{item.title}</Text>
// 								<Text style={styles.desc} 
// 									numberOfLines={3}  //超过三行则 ...
// 									ellipsizeMode="tail"
// 									>{item.desc}
// 								</Text>
// 							</View>
// 						</View>
// 					)
// 				}}
// 			/>
// 		)
// 	}
// }


// //【🎈第 6 步】 定义一个方法, 获取 reducer 内的 state
// const mapState = (state) => {
// 	return {
// 		detailPage: state.DetailPageReducer.detailPage, // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
// 		refreshing: state.DetailPageReducer.refreshing  // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
// 	}
// }

// //【🎈第 7 步】 定义修改详情页数据的方法, 下拉刷新数据后, 停止拉取
// const mapDispatch = (dispatch) => {
// 	return {
// 		// 定义更改 reducer 的方法
// 		changeDetailPageInfo(res) {
// 			if(res.ret && res.data) { //👈 派发 action 给 reducer 进行处理
// 				// const action = {
// 				// 	type: 'CHANGE_LIST',
// 				// 	detailPage: res.data.list,
// 				// 	refreshing: false
// 				// }
// 				const action = changeDetailPageInfoAction(res.data.list, false);
// 				dispatch(action)  //派发 action 给到 detailPage 的 reducer
// 			}
// 		},

// 		// 定义更改 reducer 的方法
// 		changeDetailPageFreshing() {
// 			// const action = { // 👈 定义修改 list 数据的 reducer action
// 			// 	type: 'REFRESH_LIST',
// 			// 	refreshing: true
// 			// }
// 			const action = changeDetailPageFreshingAction(true) //抽象出了 action
// 			dispatch(action) //派发 action 给到 detailPage 的 reducer
// 		}
// 	}
// }


// export default connect(mapState, mapDispatch)(DetailPage) //【🎈第 8 步】, 映射并导出组件






// 👇保留的没引入 reducer 的写法 ————————————————————————————————————————————————————————————————
// export default class DetailPage extends Component {

// 	constructor(props) {
// 		super(props)
// 		this.state= {// 详情页数据
// 			detailList: [],
// 			refreshing: false
// 		}
// 		this.handleGetDetailPage = this.handleGetDetailPage.bind(this)
// 		this.handleListRefresh = this.handleListRefresh.bind(this)
// 	}

// 	// 🔥请求详情页接口数据
// 	componentDidMount() {
// 		this.getListData()
// 	}


// 	// ⚡️ 过滤出处理详情页数据
// 	handleGetDetailPage(res) {
// 		// alert(JSON.stringify(res.data.list))
// 		// let list = res.data.list //👈不过滤的写法, 全部展示
// 		// let list = res.data.list.filter(item => item.id === this.props.route.params.id) // 🔥根据 id 过滤对应的数据

// 		this.setState((preStateData) =>{
// 			return { 
// 				detailList: [...preStateData.detailList, ...res.data.list],   //🌟 把获取的数据再【⚡️累加】给原来的数据, 而不是覆盖！
// 				refreshing: false // 👈加载完毕, 则关闭下拉刷新效果
// 			}
// 		})


// 		// this.setState({
// 		// 	detailList: list // ❌ 覆盖原来数据的写法
// 		// })


// 		// alert(JSON.stringify(list)) 
// 	}


// 	// 👋获取数据的方法
// 	getListData() {
// 		let url = 'http://www.abc.com/api/index.json' 
// 		// alert(this.props.route.params.id) //【第四步】🔥🔥🔥 React-Navigation 的方法, 【route.params】可以拿到携带的参数, 然后进一步的去请求更细的数据！
// 		if(this.props.route.params.id) {
// 			let id = this.props.route.params.id // 对应列表的 id
// 			url = "http://www.abc.com/api/detailList.json?id=" + id // 拼接 id, 请求对应的数据
// 		}

// 		// 请求详情页数据
// 		fetch(url)
// 			.then(res => res.json())
// 			.then( this.handleGetDetailPage )
// 	}


// 	// 👇下拉刷新
// 	handleListRefresh() {
// 		this.setState({
// 			refreshing: true
// 		})
// 		// alert(123)
// 		this.getListData() // 获取新的数据
// 	}


// 	render() {
// 		// 计算 ScrollView 需要滚动的高度
// 		// const screenHeight = Dimensions.get('window').height
// 		// const scrollViewHeight = screenHeight * 2.3 // 👈让底部能够滚动更多空间

// 		return (
// 			// <ScrollView style={styles.container}>
// 			// 	{/*  👇让底部能够滚动更多空间 */}
// 			// 	<View style={{height: scrollViewHeight}}>
// 			// 		{ this.state.detailList.map((item, index) => { //value 是索引
// 			// 			return (
// 			// 				<View style={styles.item} key={item.id}>
// 			// 					<Image 
// 			// 						style={styles.itemImage}
// 			// 						source={{uri: item.imgUrl}} 
// 			// 					></Image>
// 			// 					<View style={styles.info}>
// 			// 						<Text style={styles.title}>{item.title}</Text>
// 			// 						<Text style={styles.desc} 
// 			// 							numberOfLines={3}  //超过三行则 ...
// 			// 							ellipsizeMode="tail"
// 			// 							>{item.desc}
// 			// 						</Text>
// 			// 					</View>
// 			// 				</View>
// 			// 			)
// 			// 		}) }
// 			// 	</View>
// 			// </ScrollView>

// 			// 👇性能更好
// 			<FlatList
// 				onRefresh={ this.handleListRefresh } //👈下拉刷新效果
// 				refreshing={ this.state.refreshing } //👈当加载数据时（onRefresh) 需要做成 true, 加载完毕则 false
// 				style={styles.container}
// 				data={this.state.detailList} //🔥🔥想要循环的数据
// 				renderItem={({item}) => { //🔥🔥循环出来的每一项
// 					return (
// 						// 👇注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id
// 						<View style={styles.item} keyExtractor={(item, index) => index}> 
// 							<Image 
// 								style={styles.itemImage}
// 								source={{uri: item.imgUrl}} 
// 							></Image>
// 							<View style={styles.info}>
// 								<Text style={styles.title}>{item.title}</Text>
// 								<Text style={styles.desc} 
// 									numberOfLines={3}  //超过三行则 ...
// 									ellipsizeMode="tail"
// 									>{item.desc}
// 								</Text>
// 							</View>
// 						</View>
// 					)
// 				}}
// 			/>
// 		)
// 	}
// }

