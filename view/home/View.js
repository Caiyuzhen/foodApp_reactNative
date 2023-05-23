import React , { Component } from 'react';
import Home from './Ui.js';
import { connect } from 'react-redux';




// 👇 Redux 架构下生成视图层的方法！！！
export default connect(null, null)(Home) 