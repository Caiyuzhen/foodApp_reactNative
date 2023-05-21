import { createStore, applyMiddleware } from 'redux' //applyMiddleware 为异步请求的中间件
import allReducer from './allReducer' //此时引入的是总的 reducer
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';


// const store = createStore(reducer)
// 【🚀第一步】 定义 store, 结合 Provider, 把 store 传递给每个子组件
const store = configureStore({ 
	reducer: allReducer,
	applyMiddleware: [thunk] //applyMiddleware 为异步请求的中间件模式, thunk 为异步请求的中间件
})

export default store