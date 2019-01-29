// 判断是否登录
const isSignIn = ({ token }) => {
    return $.ajax({
        url: '/api/v1/user/isSignIn',
        data: { token },
        success: results => {
            return results
        }
    })
}

// 获取登录信息
const info = (_data) => {
    return $.ajax({
        url: '/api/v1/user/info',
        data: {
            ..._data,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

/**
 * [是否有权限查看模块(eg.地图)]
 * @param {string} auth [需要认证的模块]
 */
const allow = (auth) => {
    return $.ajax({
        url: '/api/v1/user/check',
        data: {
            auth,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

export default {
    isSignIn,
    info,
    allow
}
