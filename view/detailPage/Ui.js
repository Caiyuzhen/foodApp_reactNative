import React, { Component } from 'react';
import { FlatList, ScrollView, Dimensions, View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styles from './style.js'


// 【UI 层】 （木偶组件）
export class DetailPage extends Component { //【🎈第 5 步】, 不是导出这个组件, 而是经过 connect 包装的组件

	constructor(props) {
		super(props)
	}

	// 🔥请求详情页接口数据
	componentDidMount() {
		this.props.getListData()
	}

	render() {
		return (
			<FlatList
				onRefresh={ this.props.handleListRefresh } //👈下拉刷新效果
				refreshing={ this.props.refreshing } //👈当加载数据时（onRefresh) 需要做成 true, 加载完毕则 false, //【🎈第 9 步】 -> 把 this.state.refreshing 改成 this.props.refreshing
				style={styles.container}
				keyExtractor={(item, index) => index} //👈注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id
				data={this.props.detailPage} //想要循环的数据 //【🎈第 10 步】-> 把 this.state.detailList 改成 this.props.detailList
				renderItem={({item}) => { //给 FlatList 循环出来的每一项加 key
					return (
						<TouchableWithoutFeedback 
							onPress={ ()=>{this.props.navigate('InfoPage', { id: item.id }) } }//🔥🔥🔥注意, 需要在 detailPage 的 View 内把 navigate 传递进去才能渲染 UI 组件！！
							//⚡️ InfoPage 组件需要在 DetailPage 内传递 ownProps 是因为它没有直接与 Redux store 连接!!
						>
							{/* 👇注意, 加 key 的方式不一样！需要用一个函数！ (item) => item.id */}
							<View style={styles.item}> 
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
