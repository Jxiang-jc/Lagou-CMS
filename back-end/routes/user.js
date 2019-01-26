var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user')
var auth = require('../middlewares/auth')
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)


/* GET home page. */
router.get('/isSignIn', auth.userSigninAuth, user_controller.isSignIn);


router.get('/info', auth.userSigninAuth, user_controller.info);
// router.get('/exit', user_controller.exit);

router.get('/check', auth.userSigninAuth, user_controller.check);

module.exports = router;
