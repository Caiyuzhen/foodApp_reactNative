import Home from './Ui.js';
import { connect } from 'react-redux';
import { changeSelectedTab } from './actionCreator.js'
import { settingActionCreator } from '../settings/index.js'


// 操作 reducer 的方法
const mapState = (state, ownProps) => ({ //相当于映射数据
	selectedTab: state.HomeReducer.selectedTab,
	// showNear: state.HomeReducer.showNear //【👀 新增一个配置数据 -- 第 2 步】
	showNear: state.SettingsReducer.nearSwitch, //【👀 新增一个配置数据 -- 使用 setting 的数据】
	navigate: ownProps.navigation.navigate //🔥🔥🔥用来传递 navigation 给 hotList ! 因为在 App.js 内定义了 Home 组件有 navigation 能力
})


const mapDispatch = (dispatch) => ({
	changeSelectedTab(type) {
		// alert(type)
		const action = changeSelectedTab(type)
		dispatch(action) //action 转发给 store, store 转发给局部的 reducer
	},

	// 把取出来本地存储的数据同步给 store 的方法
	changeNearStatus(localValue) {
		localValue = localValue === 'true' ? true : false
		const action = settingActionCreator.getSwitchChangeAction(localValue) //借用 setting 的 actionCreator 来派发 action, 实现 reducer 的转发
		dispatch(action)
	}
})


// 👇 Redux 架构下生成视图层的方法！！！
export default connect(mapState, mapDispatch)(Home) 