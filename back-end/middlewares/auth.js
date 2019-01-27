const jwt = require('jsonwebtoken')
const fs = require('fs')
const PATH = require('path')
const userSigninAuth = (req, res, next) => {
    try {
        console.log(6666)
        let _public = fs.readFileSync(PATH.resolve(__dirname, '../keys/public.key'))
        // console.log('_public: ', _public)
        console.log(req.query)

        let decoded = jwt.verify(req.query.token, _public, {
            algorithms: 'RS256'
        })

        console.log('decoded: ', decoded)

        // var decoded = jwt.verify(req.query.token, 'i love u'); 
        let _time = (Date.now() / 1000) - decoded.iat
        let _expires = 30
        console.log('_time: ', _time)
        if (_time > _expires) {
            console.log('过期了??')
            res.render('user', {
                code: 403,
                data: JSON.stringify({
                    msg: '登录过期，请重新登录'
                })
            })
        } else {
            req.token = decoded
            console.log('登录成功, 执行next')
            next()
        }
    } catch (err) {
        res.render('user', {
            code: 403,
            data: JSON.stringify({
                msg: '请登录后操作'
            })
        })
    }
}

module.exports = {
    userSigninAuth
}