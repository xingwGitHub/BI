import * as index from './actionType';

// 初始化数据
export const initData = (value) => {
    return {
        type: index.INITDATA,
        value
    }
}
export const initMenu = (value) => {
    return {
        type: index.INITMENU,
        value
    }
}
