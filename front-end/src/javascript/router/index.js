// 实现路由的关键
import SMERouter from 'sme-router'

// 首页视图
import home_template from '../views/home.html'

// 404视图
import not_found_template from '../views/404.html'

// 页面头部逻辑
import page_header_controller from '../controllers/page-header'

// 页面头部数据
import page_header_model from '../models/page-header'

var router = null

// 记录上一次路由跳转的url
var prevUrl = ''

// 启动路由的方法
const _init = () => {
    // 实例化路由工具
    router = new SMERouter('router-view')

    // 保证都都匹配到， 中间都能执行
    router.route('/', renderPageHeader)

    // 开始匹配各个路由
    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        debugger
        console.log('进入/home')
        res.render(home_template) // res.render 官方解释只会渲染字符串, 因此真正渲染还是要用到art-template
    })

    // 404路由
    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
    })

    // 上面的没有匹配到就会跳转404路由或者首页
    router.route('*', (req, res, next) => {
        console.log(req.url)
        if (req.url === '') { // 刚进入项目, 没有hash值, 重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到的话, 导向404
            res.redirect('/not-found')
        }
    })

}

const renderPageHeader = (req, res, next) => { // 这里的prevUrl就是上一次的URL
    page_header_controller.render(page_header_model.pageHeaderInfo(req.url, prevUrl))

    // 已经进入到当前路由了， 将上一次的路由改成当前的路由
    prevUrl = req.url
    
}


export default {
    init: _init
}