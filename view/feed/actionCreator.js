import { SET_CATEGORIES } from './actionTypes.js'


//【数据层】
// ⚡️抽象出来修改数据的 action (比如异步数据层的操作也封装到这里边, 有利于后续比如做自动化测试)
export const getSetCategoryAction = (data) => {
	return {
		type: SET_CATEGORIES, 
		// type: 'SET_CATEGORIES',
		data: data
	}
}

export const getFeedInfoAction = () => { //🚀🚀 改造 fetch 获取异步数据的方法, 使其可以通过 redux 来管理
	return (dispatch) => {
		fetch('http://192.168.1.14/api/index.json') //首页 feed 的接口数据
			.then( (res) => res.json())
			.then( (res)=> {
				if(res.ret && res.data) {
					const action = getSetCategoryAction(res.data.categories)
					dispatch(action)  // 👉 派发 action, 转给 feed 的 reducer 处理
				}
			}) 
			.catch(()=>{ alert('请求异常') })
	}
}
