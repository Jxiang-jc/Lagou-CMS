
import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlInfo = URL.parse(url) // 解析URL字符串并返回URL对象

    let _pathname = _urlInfo.pathname
    // let _pathname = '/position-list'

    // search? 是url中解析出来的 ？a=1&b=2&search
    // 然后url.parse将其转化为对象的形式
    let _search = URL.parse(prevUrl).search

    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [
                {
                    text: '地图',
                    path: '#/map'
                }
            ]
        },
        '/position-list': {
            title: '职位管理',
            description: '职位列表',
            list: [
                {text: '职位列表'}
            ]
        },
        '/position-save': {
            title: '职位管理',
            description: '职位列表',
            list: [
                {
                    text: '职位列表',
                    path: '#/position-list' + _search
                },
                {
                    text: '添加职位'
                }
            ]
        },
        '/position-update': {
            title: '职位管理',
            description: '职位更新',
            list: [
                {
                    text: '职位列表',
                    path: '#/position-list' + _search
                },
                {
                    text: '职位更新'
                }
            ]
        }
    }

    return _infos[_pathname] || {}
}

export default {
    pageHeaderInfo
}