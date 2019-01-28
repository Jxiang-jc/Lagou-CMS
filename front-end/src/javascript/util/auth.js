
// 因为在多个页面都要验证用户的登录状态, 因此把它提取出来做公共部分

import user_model from '../models/user'

// 验证用户登录状态
const userSigninAuth = async () => {
    let _token = localStorage.getItem('token') || ''

    let isSignIn = await user_model.isSignIn({
        token: _token
    })

    // console.log('isSignIn: ' + isSignIn)

    // !! 用来判断isSignIn.status有实际含义的变量才执行的方法, 如果isSignIn.status是undefined, !undefined就是true, !!undefined就是false
    // 也可以理解为一下的简写:
    // if (isSignIn.status) return isSignIn.status === 200 
    return !!(isSignIn.status === 200)
}

export {
    userSigninAuth
}