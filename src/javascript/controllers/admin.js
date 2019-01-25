import admin_form_template from '../views/admin-forms.html'

import admin_model from '../models/admin'

import qs from 'querystring'

import toast from '../util/toast'

// 初始化动作
const init = () => {
    // 渲染视图
    render('signin')

    
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