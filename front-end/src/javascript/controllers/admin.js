import admin_form_template from '../views/admin-forms.html'

import admin_model from '../models/admin'

import qs from 'querystring'

import toast from '../util/toast'

// 初始化动作
const init = () => {
    // 渲染视图
    render('signin')

    // 绑定事件
    bindEvent()
} 

const bindEvent = () => {
    // 注意, 使用了事件委托为切换按钮绑定事件(因为这两个按钮总是会被重新渲染)
    $('#admin-content').on('click', '.switch-btn', function () {
        let _type = $(this).data('type')
        render(_type)
    })

    // 注册表单
    $('#admin-content').on('submit', '#signup-form', async function (e) {
        e.preventDefault()
        let _params = $(this).serialize()
        let _result = await admin_model.signup(qs.parse(_params))

        switch (_result.status) {
            case 500:
                toast('失败，服务器出了问题');
                break;
            case 201:
                toast('用户已存在');
                break;
            default:
                toast('注册成功');
                render('signin')
                break;
        }
    })


    // 登录表单
    $('#admin-content').on('submit', '#signin-form', async function (e) {
        e.preventDefault()
        let _params = $(this).serialize()
        $.cookie('connect.sid', {
            expires: -1
        })
        // qs.parse 把_params解析成对象的形式
        let _result = await admin_model.signin(qs.parse(_params))
        switch (_result.status) {
            case 203:
                toast('密码错误');
                break;
            case 202:
                toast('用户不存在');
                break;
            default:
                localStorage.token = _result.data.token
                window.location.href = "/";
                break;
        }
    })
}

const render = (type) => {
    var _html = template.render(admin_form_template, {
        // type: type
        type
    })
    $('#admin-content').html(_html)
}

export default {
    render,
    init
}