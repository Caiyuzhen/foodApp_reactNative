import { nearSwitchChange } from './actionTypes'


export const getSwitchChangeAction = (value) => ({
	type: nearSwitchChange,
	value: value
})