import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlInfo = URL.parse(url) // 解析URL字符串并返回URL对象
    /* 
    url = 'http://example.com:8080/one?a=index&t=article&m=default'
    _urlinfo {
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'example.com:8080',
        port: '8080',
        hostname: 'example.com',
        hash: null,
        search: '?a=index&t=article&m=default',
        query: 'a=index&t=article&m=default',
        pathname: '/one',
        path: '/one?a=index&t=article&m=default',
        href: 'http://example.com:8080/one?a=index&t=article&m=default' 
        } */

    let _pathname = _urlInfo.pathname
    // let _pathname = '/position-list'

    // search? 是url中解析出来的 ？a=1&b=2&search
    // 然后url.parse将其转化为对象的形式
    let _search = URL.parse(prevUrl).search || ''
    // console.log('_search: ', _search);
    
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [{
                text: '地图',
                path: '#/map'
            }]
        },
        '/position-list': {
            title: '职位管理',
            description: '职位列表',
            list: [{
                text: '职位列表'
            }]
        },
        '/position-save': {
            title: '职位管理',
            description: '添加职位',
            list: [{
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
            list: [{
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