
const mongoose = require('../util/mongoose')
const bcrypt = require('bcryptjs')
const { hash } = require('../util')

var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    signupTime: String
}));

// 注册，存入数据到数据库password
const signup = async ({ username, password, nickname }) => {
    let _password = await hash(password)
    // 应该对密码进行加密之后再存储，可以利用node内置模块crypto，
    return new UserModel({
        username,
        nickname,
        password: _password,
        signupTime: Date.now()
    })
    .save()
    .then((results) => {
        let { _id, username, nickname } = results
        return { _id, username, nickname }
    })
    .catch(() => {
        return false
    })
}

// 登录
// @param pwd 是用户传入的密码
// @param password 是此用户的加密密码
// :result 是否匹配
const signin = async (pwd, { password }) => {
    // console.log('pwd: ', pwd)
    // console.log('password: ', {password})
    // npm解释到bcryptjs2.4.0版本后， 不写回掉（即第三个形参）， 会默认返回一个promise对象，因为我们这里用async/await 所以需要返回要给promise对象
    return bcrypt.compare(pwd, password)

    // 正常如下
    // bcrypt.compare("B4c0/\/", hash, function(err, res) {
    //     // res === true
    // });
}


// 通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return UserModel
    .find({ username })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })
            
}

module.exports = {
    signup,
    signin,
    judgeUserByUsername
}