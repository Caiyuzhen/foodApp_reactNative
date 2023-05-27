import { StyleSheet } from 'react-native';



export default StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		paddingTop: 80,
		flex: 1, // 垂直居中
		display: 'flex',
		alignItems: 'center', // 文字水平居中
		backgroundColor: '#f0edff',
	},
	wrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',// 两端对齐
		alignItems: 'center',
		paddingLeft: 24,
		paddingRight: 24,
		height: 52,
		backgroundColor: '#fff',
	},
	mainTitle: {
		marginBottom: 20,
		fontSize: 20,
		fontWeight: '600',
	},
	title: {
		height: 30,
		lineHeight: 30,
		fontSize: 14,
		fontWeight: '600',
	}
})