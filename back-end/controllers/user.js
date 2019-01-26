const user_model = require('../models/user')
const jwt = require('jsonwebtoken')

const isSignIn = (req, res, next) => {
   // 判断是否登录 对token解密

    res.render('user', {
        code: 200,
        data: JSON.stringify({ msg: '用户已登录' })
    })
}
// 返回用户信息
const info = async (req, res) => {
    
    let _result = await user_model.getUserInfoById(req.token.userid)

    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname,
        })
    })

}



const check = ( req, res ) => {
    
    let _confine = user_model.auths()[req.query.auth]

    let _can = req.token.level >= _confine

    res.render('user', { code: _can ? 200 : 402, data: JSON.stringify({ msg: _can ? '可以操作' : '不能操作' }) })

}

module.exports = {
    isSignIn,
    info,
    check
}