import { nearSwitchChange } from './actionTypes.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultState = {
	nearSwitch: false
}


// 记得在全局 reducer 进行引入！
export default (state=defaultState, action) => {
	if(action.type === nearSwitchChange) { //🔥因为 actionCreator 内的 getSwitchChangeAction 内的 type 为 nearSwitchChange, 🔥🔥在 View 层派发了 getSwitchChangeAction 这个 action 👉 [派发给 store, store 转发给 reducer 也就是这里]

		// 做本地存储, 把 action.value 存入本地 storage
		AsyncStorage.setItem('NearSwitch', action.value.toString()) // 需要把 true 转为字符串, 否则报错 -> .toString()

		return Object.assign({}, state, {
			nearSwitch: action.value
		}) //✨ Object.assign 返回一个新的对象, state 为老对象, {...}  内为新对象
	}
	return state
}