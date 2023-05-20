import { createStore } from 'redux'
import allReducer from './allReducer' //此时引入的是总的 reducer
import { configureStore } from '@reduxjs/toolkit';


// const store = createStore(reducer)
// 【🚀第一步】 定义 store, 结合 Provider, 把 store 传递给每个子组件
const store = configureStore({ 
	reducer: allReducer,
})

export default store