var express = require('express');
var router = express.Router();
var fileUpload = require('../middlewares/fileUpload')
var position_controller = require('../controllers/position')
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

/* GET home page. */
router.get('/listall', position_controller.listall)

router.get('/list', position_controller.list)

// express 中间件栈， 一个功能模块可以利用一个或者多个中间件来完成，每一个中间件顺序执行，可以传参，也可以阻止下面的中间件运行
router.post('/save', fileUpload, position_controller.save)

router.delete('/remove', position_controller.remove)
router.get('/listone',  position_controller.listone)
router.post('/update', fileUpload, position_controller.update)


module.exports = router; 
