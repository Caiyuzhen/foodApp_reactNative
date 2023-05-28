import View from "./View.js";
import reducer from "./reducer.js";
import * as settingActionCreator from "./actionCreator.js"; //🔥🔥 * as settingActionCreator 表示把 actionCreator 内所有方法统一导入然后噢重新命名 ！！！

export { 
	View, 
	reducer, 
	settingActionCreator 
}