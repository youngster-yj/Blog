import { createStore } from 'redux'  // 引入createStore方法
import reducer from './reducer'      //reducer.js
const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//redux-devtools-extension 如果有插件则调用
    ) // 创建数据存储仓库
export default store                 //暴露出去