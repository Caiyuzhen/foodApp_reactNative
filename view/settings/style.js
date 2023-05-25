import { StyleSheet } from 'react-native';



export default StyleSheet.create({
	container: {
		display: 'flex',
		paddingTop: 80,
		paddingLeft: 24,
		paddingRight: 24,
		// justifyContent: 'flex-start',
		flex: 1, // 垂直居中
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',// 两端对齐
	},
	title: {
		height: 30,
		lineHeight: 30,
		fontSize: 16,
		fontWeight: 'bold',
	}
})