import {
    bus,
    handleToastByData
} from '../util'

// 职位列表视图
import position_list_template from '../views/position-list.html'

// 保存职位视图
import position_save_template from '../views/position-save.html'

// 更新职位视图
import position_update_template from '../views/position-update.html'

// model
import position_model from '../models/position'

// 列表视图的控制器
const list = async (req, res, next) => {
    req.query = req.query || {} // 防止没有参数的时候, req.query为null

    let _page = { // 页面信息, 当点击了分页器按钮后, 页面url就会变化, 然后list控制器就会重新执行, 重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search || ''
    }

    // 编译模板
    let html = template.render(position_list_template, {
        data: (await position_model.list(_page)).data // 获取到列表数据
    })

    res.render(html)

    // 给添加按钮绑定事件
    bindListEvent(_page)

    // 显示搜索关键字
    $('.position-list #keywords').val(_page.search)
}

// list的事件绑定
const bindListEvent = (_page) => {
    // 添加按钮点击跳转到添加路由
    $('.position-list #addbtn').on('click', () => {

        bus.emit('go', '/position-save')
    })

    // 点击更新按钮跳转更新路由
    $('.position-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go', '/position-update', {
            id
        })
    })

    // 移出按钮, 删除当前行
    $('.pos-remove').on('click',  function () {
        // call之后，如果第一个参数传的是null，this指向会变成window
        // 这里不用bind, 因为call不仅改变this指向, 还会执行该函数
        handleRemovePosition.call(this, _page)

    })

    // 搜索
    $('.position-list #possearch').on('click', function () {
        let _search = $('.position-list #keywords').val()

        let _params = {
            search: _search,
            pageNo: 1
        }

        // $.param(_params) => search=_search&pageNo=1
        bus.emit('go', `/position-list?${$.param(_params)}`)
    })
}

// 删除操作
const handleRemovePosition = async function (_page) {
    // 这里 this 默认执行window
    let id = $(this).parents('tr').data('id')

    let _data = await position_model.remove({
        id: id,
        ..._page
    })

    // 如果此页中只有一条数据, 说明删除之后需要跳转到前一页
    // 删除的时候此页海鸥多少条数据
    // 如果只剩一个, 将PageNo - 1
    handleToastByData(_data, {
        isReach: false,
        success: (data) => {
            // 删除成功后, 依然需要将PageNo带上, 否则, 删除后, 重新渲染时候会默认回到第一页
            let _pageNo = _page.pageNo
            _pageNo -= data.isBack ? 1 : 0
            bus.emit('go', '/position-list?pageNo=' + _pageNo + '&_id=' + data.deleteId + '&search=' + (_page.search))
        }
    })
}

// save视图的控制器
const save = async (req, res, next) => {
    res.render(position_save_template)
    bindSaveEvent()
}

// save的事件绑定
const bindSaveEvent = () => {
    // 返回按钮逻辑
    $('.position-save #back').on('click', () => {
        bus.emit('go', '/position-list')
    })

    // $.submit 当提交表单时，会发生 submit 事件。
    $('.position-save #save-form').submit(handleSaveSubmit)

}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    e.preventDefault()

    if (_isLoading) return false

    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())
    let result = await position_model.save()
    _isLoading = false
    // handleToastByData(result)
    handleToastByData(result, {
        isReact: true,
        success: () => {
            bus.emit('go', '/position-list')
        }
    })

}

// update视图的控制器
const update = async (req, res) => {
    let {
        id
    } = req.body // 要更新的数据的id
    // 获取id对应的数据进行渲染
    let html = template.render(position_update_template, {
        data: (await position_model.listone({
            id
        })).data // 获取到列表数据
    })

    res.render(html)
    bindUpdateEvent()
}

// update的事件绑定
const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.position-update #back').on('click', () => {
        console.log('back')
        bus.emit('go', '/position-list')
    })

    $('.position-update #update-form').submit(handleUpdateSubmit)

}

const handleUpdateSubmit = async function (e) {
    e.preventDefault()

    let _results = await position_model.update()
    handleToastByData(_results, {
        isReact: true,
        success: () => {
            bus.emit('go', '/position-list')
        }
    })
}

export default {
    list,
    save,
    update
}