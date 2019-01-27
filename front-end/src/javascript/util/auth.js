
import user_model from '../models/user'

// 验证用户登录状态
const userSigninAuth = async () => {
    let _token = localStorage.getItem('token') || ''

    let isSignIn = await user_model.isSignIn({
        toke: _token
    })

    return !!(isSignIn.status === 200)
}

export {
    userSigninAuth
}