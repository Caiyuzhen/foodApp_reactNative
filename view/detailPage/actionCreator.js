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
		let url = '' 

		if(navigation) {
			let id = navigation.id // 从路由中拿到对应列表的 id (🔥 在 detailPage -> mapDispatch -> getListData 内进行传递)
			url = "http://192.168.1.3/api/detailList.json?id=" + id // 拼接 id, 请求对应的数据
		}

		// 清空详情页数据
		// dispatch(clearDetailPageAction())

		// 请求详情页数据
		fetch(url)
			.then(res => res.json())
			.then( (res)=>{ 
				if(res.ret && res.data) { //👈 派发 action 给 reducer 进行处理

					// // 根据 id 过滤页面内容
					// let filterData = res.data.list.filter((item) => {
					// 	return item.id === navigation.id
					// })
					// const action = changeDetailPageInfoAction(filterData, false) //过滤显示部分 card

					const action = changeDetailPageInfoAction(res.data.list, false, coverDate) //全部显示 card
					dispatch(action)  //派发 action 给到 detailPage 的 reducer
				}
			}) 
	}
}