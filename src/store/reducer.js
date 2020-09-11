const defaultState = {
    defstyle : true, //默认卡哇伊风格
    drawerstyle : false, //抽屉控制界面横推效果
}  //默认数据
export default (state = defaultState,action)=>{  //就是一个方法函数
    if(action.type === 'changestyle'){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.defstyle = action.value
        return newState
    }
    if(action.type === 'changedrawerstyle'){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.drawerstyle = action.value
        return newState
    }
    return state
}