import {  StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
	},

	search: {
		height: 48,
		lineHeight: 16,
		paddingLeft: 10, //控制 placeholder 的位置
		backgroundColor: '#fff',
		position: 'absolute',
		left: 24,
		right: 24,
		borderRadius: 6,
	},

	content: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		marginTop: 40,
		marginBottom: 0,
		marginLeft: 0,
		marginRight: 0,
	},

	list: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap', //🔥 超出区域做换行
		marginTop: 24,
	},

	itemCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#333333',
	},

	itemImg: {
		borderRadius: 12,
	},

	itemTitle: {
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 48,
		height: 48,
		fontWeight: 'bold',
	},
})


export default styles
