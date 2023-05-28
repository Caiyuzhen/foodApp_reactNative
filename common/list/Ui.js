//抽象出公共的 UI -- DetailPage 跟 hotList 的 UI 层是一样的
import React, { Component } from 'react';
import { FlatList, ScrollView, Dimensions, View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styles from './style.js'


// 【UI 层】 （木偶组件）
export class List extends Component { // 不是导出这个组件, 而是经过 connect 包装的组件

	constructor(props) {
		super(props)
	}

	// 请求详情页接口数据
	componentDidMount() {
		this.props.getListData()
	}

	render() {
		return (
			<FlatList
				onRefresh={ this.props.handleListRefresh } //👈下拉刷新效果
				refreshing={ this.props.refreshing } //👈当加载数据时（onRefresh) 需要做成 true, 加载完毕则 false, // -> 把 this.state.refreshing 改成 this.props.refreshing
				style={styles.container}
				data={this.props.detailPage} //要循环的数据
				renderItem={({item}) => { //循环出来的每一项
					return (
						<TouchableWithoutFeedback 
							onPress={ ()=>{
								// alert(this.props.navigate);
								this.props.navigate('InfoPage', { id: item.id })  //👈 hotList 页跳转到详情页, { id: item.id } 为携带的参数, 键名为 id, 键值为 item.id
							} }//🔥🔥🔥注意, 需要在 Feed 组件内把 navigate 传递给 hotList （View层）, hotList 再传递给这个 List 组件（UI 层）
						>
							{/* 👇注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id */}
							<View style={styles.item} keyExtractor={(item, index) => index}> 
								<Image 
									style={styles.itemImage}
									source={{uri: item.imgUrl}} 
								></Image>
								<View style={styles.info}>
									<Text style={styles.title}>{item.title}</Text>
									<Text style={styles.desc} 
										numberOfLines={3}  //超过三行则 ...
										ellipsizeMode="tail"
										>{item.desc}
									</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					)
				}}
			/>
		)
	}
}
