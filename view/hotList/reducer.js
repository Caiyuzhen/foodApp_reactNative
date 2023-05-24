import { REFRESH_LIST, CHANGE_LIST, CLEAN_LIST } from './actionTypes.js'

//【逻辑层 - 数据处理的逻辑】
const defaultState = {
	detailPage: [],
	refreshing: false,
}


// reducer 的数据层, 相当于原先的 statue
export default (state = defaultState, action) => { //接收的都是各处派发过来的 action ！
	if(action.type === CLEAN_LIST) { //【清空数据】 先清空详情页, 再添加新的详情页数据
		const newState = {
			detailPage: [],
			refreshing: false
		}
		return newState //返回组合后的新列表（老列表 + 新列表）- 停止刷新
	}

	else if(action.type === CHANGE_LIST) {//【存入新的数据 - 请求后】
		let newState = {}

		if(action.coverDate) { //⚡️ coverDate 用来判断 => 是【覆盖】数据还是 【追加】数据
			newState = {
				detailPage: [...action.detailPage], //【覆盖】请求一组数据, 并入原来的老数组
				refreshing: false
			}
		} else {
			newState = {
				detailPage: [...state.detailPage, ...action.detailPage], //【追加】请求一组数据, 并入原来的老数组, 当【下拉刷新】时, 才追加！
				refreshing: false
			}
		}
		return newState //返回组合后的新列表（老列表 + 新列表）- 停止刷新
	} 

	else if (action.type === REFRESH_LIST) {//【存入新的数据 - 刷新后】
		const newState = {
			detailPage: [...state.detailPage], // 把数据替换成【刷新】的那组
			refreshing: action.refreshing
		}
		return newState //返回组合后的新列表（老列表 + 新列表） - 刷新
	}

	return state 
}

