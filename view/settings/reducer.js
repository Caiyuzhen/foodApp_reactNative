import { nearSwitchChange } from './actionTypes.js'


const defaultState = {
	nearSwitch: false
}


// 记得在全局 reducer 进行引入！
export default (state=defaultState, action) => {
	if(action.type === nearSwitchChange) { //🔥因为 actionCreator 内的 getSwitchChangeAction 内的 type 为 nearSwitchChange, 🔥🔥在 View 层派发了 getSwitchChangeAction 这个 action 👉 [派发给 store, store 转发给 reducer 也就是这里]
		return Object.assign({}, state, {
			nearSwitch: action.value
		}) //✨ Object.assign 返回一个新的对象, state 为老对象, {...}  内为新对象
	}
	return state
}