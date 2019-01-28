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

export default {
    isSignIn,
    info
}
