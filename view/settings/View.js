import { connect } from 'react-redux';
import Settings from './Ui';
import { getSwitchChangeAction } from './actionCreator.js';


const mapState = (state) => ({
	nearSwitch: state.SettingsReducer.nearSwitch //全局 reducer
})

const mapDispatch = (dispatch) => ({
	handleSwitchChange(value) { 
		const action = getSwitchChangeAction(value)
		dispatch(action) // 发给总的 store, 由总的 store 分发给所有的 reducer
	}
})


export default connect(mapState, mapDispatch)(Settings)