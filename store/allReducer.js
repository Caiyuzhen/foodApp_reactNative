// // 【🚀第二步】  定义一个初始化的存储数据
// const defaultState = {
// 	name: "Dall.E"
// }


// export default (state = defaultState, action) => { //默认数据, 行为
// 	return state //🔥记得返回出数据！
// }


// ————————————————————————————————————————————————————————————————————————————————


// 【🚀】改造过后, 相当于一个大的 reducer 集合, 【 👀 这个组件就是用来收集、组合所有子 reducer !!】
import { combineReducers } from 'redux'
import { reducer as FeedReducer } from '../view/feed/index.js'


const allReducer = combineReducers({ //总的 reducer 集合
	FeedReducer //组件内通过🌟 【state.FeedReducer.categories】 来获取数据
})


export default allReducer