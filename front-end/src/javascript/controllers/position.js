import { bus, handleToastByData } from '../util'

// 职位列表视图
import position_list_template from '../views/position-list.html'

// model
import position_model from '../models/position'

import qs from 'querystring'

// 列表视图的控制器
const list = async (req, res, next) => {
    req.query = req.query || {} // 防止没有参数的时候， req.query为null 

    let _page = { // 页面信息， 当点击了分页器按钮后， 页面url就会发生变化， 然后list控制器就会重新执行， 重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search
    }
}