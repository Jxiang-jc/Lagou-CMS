const jwt = require('jsonwebtoken')
const fs = require('fs')
const PATH = require('path')
const userSigninAuth = (req, res, next) => {
    try {
        let _public = fs.readFileSync(PATH.resolve(__dirname, '../keys/public.key'))
        // console.log('_public: ', _public)

        let decoded = jwt.verify(req.query.token, _public, {
            algorithms: 'RS256'
        })

        // console.log('decoded: ', decoded)
        // decoded:  { userid: '5c4c77f55a5a601dac7be511',
        //             username: 'zjx',
        //             level: 8,
        //             iat: 1548595407 }

        // var decoded = jwt.verify(req.query.token, 'i love u'); 
        let _time = (Date.now() / 1000) - decoded.iat
        let _expires = 30
        if (_time > _expires) {
            res.render('user', {
                code: 403,
                data: JSON.stringify({
                    msg: '登录过期，请重新登录'
                })
            })
        } else {
            req.token = decoded
            // console.log('中间件验证token成功, 执行next')
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