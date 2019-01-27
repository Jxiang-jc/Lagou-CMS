// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'

// 主体结构图
import body_template from './views/body.html'

// 引入登录权限验证
import { userSignAuth } from './util/auth'
import user_controller from './controllers/user'
import user from './models/user';

$('#wrapper').html(body_template)

let init = async () => {
    let isSignIn = await userSignAuth()

    if (isSignIn) {
        $('#wrapper').removeClass('hidden')

        router.init()

        user_controller.renderUserInfo()
    } else {
        window.location.href = '/index.html'
    }
}

init()