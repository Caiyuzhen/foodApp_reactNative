import { ChangeSelectedTab } from './actionType.js';


const defaultState = {
	selectedTab: 'Feed'
}

export default (state=defaultState, action) => {
	if(action.type === ChangeSelectedTab) {
		return Object.assign({}, state, { //Object.assign 的作用是创建一个新的对象，并将state中的属性复制到该新对象中，然后更新selectedTab的值为action.value。通过使用Object.assign，你可以确保返回一个新的对象，而不是直接修改原始的state对象
			selectedTab: action.value
		})
		// return {
			// selectedTab: action.value
		// }
	}

	return state
}