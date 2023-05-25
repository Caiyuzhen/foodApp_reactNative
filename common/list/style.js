import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
	container: {
		// display: 'flex',
		padding: 20,
		// height: '100%',
		// flex: 1, //占满整个屏幕
	},

	item: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#fff',
		marginBottom: 16, // 添加下边距来实现子组件之间的间距效果
		gap: 16,
	},

	itemImage: {
		width: 120, 
		height: 120,
		borderRadius: 10,
	},

	info: {
		flex: 1, //自动撑开 50%
	},

	title: {
		lineHeight: 32,
		fontSize: 16,
		fontWeight: 'bold'
	},

	desc: {
		lineHeight: 16,
		fontSize: 14,
		color: '#7e7e81',
		overflow: 'hidden',
		height: 64,
	}
})

export default styles