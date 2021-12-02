/** provide 项目中使用vuex
 * 使用方式参考 https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html#%E4%BF%AE%E6%94%B9%E5%93%8D%E5%BA%94%E5%BC%8F-property 
 * 以下为简单示例
 * 该方式模块化失去响应性，有待探索
*/
import { provide, reactive } from 'vue';
import login from './login/index'

const state = reactive({
    login:{...login.state}
});

/** action */
const actions = {
    login:{...login.actions}
}

const setupProvideState = () => {
    return provide('pstate',state)
}
const setupProvideActions = () => {
    return provide('pactions',actions)
}

export  {
    setupProvideState,
    setupProvideActions
}