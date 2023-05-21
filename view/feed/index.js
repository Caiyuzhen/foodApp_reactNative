// 统一暴露接口给外部(引入 reducer, 然后再做导出)
import reducer from './reducer.js';
import Feed from './View.js';

//【接口层】
// 在每个页面下, 单独暴露 reducer、Feed 等组件, 可读性更好
export { reducer, Feed }