import { CLEAN_LIST, REFRESH_LIST, CHANGE_LIST } from './actionTypes.js'


//【数据层】
// 退出页面后清空详情页数据的方法
export const clearDetailPageAction = () => {
	return {
		type: CLEAN_LIST,
		detailPage: null,
		refreshing: false
	}
}



export const freshDetailPageAction = (isRefresh) => {
	return {
		type: REFRESH_LIST,
		refreshing: isRefresh //上游传入是否刷新状态的参数
	}
}



export const changeDetailPageInfoAction = (resData, isFresh, coverDate) => {
	return {
		type: CHANGE_LIST,
		detailPage: resData,
		refreshing: isFresh,
		coverDate: coverDate
	}
}



export const getDetailPageInfoAction = (navigation, coverDate) => { //coverDate 表示是否覆盖数据
	return (dispatch) => { //异步请求的操作放到 actionCreator 内进行管理
		let url = 'http://192.168.1.3/index.json' 

		// 请求详情页数据
		fetch(url)
			.then(res => res.json())
			.then( (res)=>{ 
				if(res.ret && res.data) { //👈 派发 action 给 reducer 进行处理
					alert('请求详情页数据成功-2')
					const action = changeDetailPageInfoAction(res.data.list, false, coverDate) //全部显示 card
					dispatch(action)  //派发 action 给到 detailPage 的 reducer
				}
			}) 
	}
}