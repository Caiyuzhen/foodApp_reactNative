import { SET_CATEGORIES } from './actionTypes.js'

// 抽象出来修改数据的 action
export const getSetCategoryAction = (data) => {
	return {
		type: SET_CATEGORIES, 
		// type: 'SET_CATEGORIES',
		data: data
	}
}