import { SET_CATEGORIES } from './actionTypes.js'


// 【🚀】单独定义存储(此页涉及到的要存储的数据)
const defaultState = {
	categories: [] //在这里统一管理 feed 的 state
}


export default (state=defaultState, action) => { //组件内通过🌟 【state.FeedReducer.categories】 来获取数据, 然后派发 action 到这里进行数据肚饿修改
	if(action.type === SET_CATEGORIES) {

		const newState = {
			categories: [...action.data]
		}

		return newState
	}

	return state
}