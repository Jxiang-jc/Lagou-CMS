// 实现路由的关键
import SMERouter from 'sme-router'

var router = null

// 记录上一次路由跳转的url
var prevUrl = ''

// 启动路由的方法
const _init = () => {
    // 实例化路由工具
    router = new SMERouter('router-view')


}

export default {
    init: _init
}