import { createStore } from 'redux'
import reducer from './reducer'
import { configureStore } from '@reduxjs/toolkit';


// const store = createStore(reducer)
// 【🚀第一步】 定义 store, 结合 Provider, 把 store 传递给每个子组件
const store = configureStore({ 
	reducer: reducer,
})

export default store