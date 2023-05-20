//【🎈第 1 步】
const defaultState = {
	detailPage: [],
	refreshing: false,
}


export default (state = defaultState, action) => {
	//【🎈第 8 步】处理接收过来的 action
	if(action.type === 'CHANGE_LIST') {
		const newState = {
			detailPage: [...state.detailPage, ...action.detailPage], //🚀🚀 请求一组数据, 并入原来的数组
			refreshing: false
		}
		return newState //返回组合后的新列表（老列表 + 新列表）- 停止刷新

	} else if (action.type === 'REFRESH_LIST') {
		const newState = {
			detailPage: [...state.detailPage], //🚀🚀 把【刷新】的一组列表数据加到老的一组数据内
			refreshing: action.refreshing
		}

		return newState //返回组合后的新列表（老列表 + 新列表） - 刷新
	}
	return state 
}