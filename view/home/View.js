import Home from './Ui.js';
import { connect } from 'react-redux';
import { changeSelectedTab } from './actionCreator.js'


// 操作 reducer 的方法
const mapState = (state) => ({ //相当于映射数据
	selectedTab: state.HomeReducer.selectedTab,
	// showNear: state.HomeReducer.showNear //【👀 新增一个配置数据 -- 第 2 步】
	showNear: state.SettingsReducer.nearSwitch //【👀 新增一个配置数据 -- 使用 setting 的数据】
})


const mapDispatch = (dispatch) => ({
	changeSelectedTab(type) {
		// alert(type)
		const action = changeSelectedTab(type)
		dispatch(action) //action 转发给 store, store 转发给局部的 reducer
	}
})


// 👇 Redux 架构下生成视图层的方法！！！
export default connect(mapState, mapDispatch)(Home) 