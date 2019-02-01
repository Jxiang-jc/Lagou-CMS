
import sidebar_nav_models from '../models/siderbar-nav'

// 引入bus
import bus from '../util/bus'

const sidebar = async () => {
    let data = await sidebar_nav_models.sidebarNav() || {}

    // 通过遍历每一项然后传进去渲染
    recursion(data.data)

    // 给按钮添加事件
    _navLink()
}

/**
 * [递归渲染sidebar]
 * @param {object} data [model返回的数据]
 * @param {node} $fatherUl [ul容器]
 * @return {HTML DOM} [返回html结构]
 */

const recursion = (data, $fatherUl = $('.sidebar-menu')) => {
    
    $.each(data, (idx, fatherLi) => {
        // console.log('fatherLi: ', fatherLi);
        let $Li1 = $(`
                    <li class="${fatherLi.className}" to="${fatherLi.path}">
                        <a href="javascript:void(0)">
                            <i class="${fatherLi.iconName}"></i>
                            <span>${fatherLi.title}</span>
                        </a>
                    </li>
        `) // 没有children的初始li结构

        let $Li2 = $(`
                    <li class="${fatherLi.className}" to="${fatherLi.path}">
                        <a href="javascript:void(0)">
                            <i class="${fatherLi.iconName}"></i>
                            <span>${fatherLi.title}</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                    </li>
        `) // 有children的初始li结构

        if (fatherLi.children && fatherLi.children.length > 0) {
            // 创建一个ul做二级导航容器
            let $ul = $(`<ul class="treeview-menu"></ul>`)

            $Li2.append($ul).appendTo($fatherUl)

            // 二级导航数据
            let childData = fatherLi.children

            return recursion(childData, $ul)
        } else
            return $Li1.appendTo($fatherUl)
    })

}

// 给导航按钮添加点击事件
// 专门是为了to而使用的
const _navLink = (selector) => {

    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    
    $navs.on('click', function () {
        let _path = $(this).attr('to')

        bus.emit('go', _path)
    })
}

export default {
    sidebar,
    _navLink
}