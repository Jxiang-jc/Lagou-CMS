// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'

// 主体结构图
import body_template from './views/body.html'

// 引入登录权限验证
import { userSigninAuth } from './util/auth'

// 渲染用户登录的信息
import user_controller from './controllers/user'

// 侧边栏sidebar视图
import sidebar_nav_template from './views/sidebar-nav.html'
// 侧边栏控制器
import isdebar_nav_controller from './controllers/siderbar-nav'

$('#wrapper').html(body_template)

// 渲染html结构
// const renderBody = () => {

//     $('#wrapper').html(body_template)

//     renderSidebar()

// }

// 渲染侧边栏
const renderSidebar = () => {
    // 需要等body模板渲染完成才能渲染侧边栏
    if ($('#wrapper #sidebar-nav')) {

        // 渲染侧边栏
        isdebar_nav_controller.sidebar()

        $('#wrapper #sidebar-nav').html(sidebar_nav_template)

    } else
        renderBody()
}

// 初始化
let init = async () => { 
    // 判断是否有token, 有的话, 直接登录
    let isSignIn = await userSigninAuth()

    console.log('isSignIn: ', isSignIn)

    if (isSignIn) {
        // adminLTE自带
        $('#wrapper').removeClass('hidden')

        router.init()
        debugger
        // 获取用户信息
        user_controller.renderUserInfo()
    } else {
        
        window.location.href = '/admin.html'
    }
}
// 渲染html结构
// 如果放在await后渲染, 会有bug 
// renderBody()

init()

    
