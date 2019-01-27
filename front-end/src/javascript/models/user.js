// 判断是否登录
const isSignIn = ({ token }) => {
    return $.ajax({
        url: '/api/v1/user/isSignIn',
        data: { token },
        success: results => results
    })
}

export default {
    isSignIn
}