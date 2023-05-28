import { connect } from 'react-redux' 
import { freshDetailPageAction, getDetailPageInfoAction } from './actionCreator.js' //抽象出来的的 action
// import { HotList } from '../../common/list/Ui.js'
// import { HotList } from './Ui.js'
import { List } from '../../common/list/Ui.js'



//【容器层 - 负责触发一些逻辑】, 🔥🔥 因为 hotList 的 UI 层抽象到 common 里边了, 所以这块的数据实际上是传递给 common 的 UI 组件的 !!！
const mapState = (state, ownProps) => {
	return { //在 👆 上边可以通过 this.props.refreshing 拿到 refreshing 这个参数
		detailPage: state.HotListReducer.detailPage, // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
		refreshing: state.HotListReducer.refreshing,  // -> 因为在 store 内的 allReducer 定义的名称是 DetailPageReducer
		// navigate: ownProps.navigation.navigate
	}
}


const mapDispatch = (dispatch, ownProps) => { //ownProps 是父组件传递过来的内容, 因为 mapDispatch 是在 connect 内的, 所以可以拿到父组件传递过来的内容
	return {
		// 定义更改 reducer 的方法 - 获得列表
		getListData() { //首次加载
			// alert('请求详情页数据成功-')
			const action = getDetailPageInfoAction(true) //true 表示盖掉以前的数据
			dispatch(action) //this.props.route.params
		},


		// 定义更改 reducer 的方法 - 下拉刷新、派发 action, 修改 list 数据
		handleListRefresh() {
			let action = freshDetailPageAction(true)
			dispatch(action) //this.props.route.params, 派发 action 给到 detailPage 的 reducer （下拉刷新数据）

			action = getDetailPageInfoAction(false) // 请求新的数据, false 表示不覆盖以前的内容
			dispatch(action) //this.props.route.params
		}
	}
}



export default connect(mapState, mapDispatch)(List) //映射并导出组件

