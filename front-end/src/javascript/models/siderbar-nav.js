const sidebarNav = () => {
    let navs = {
        data: [
            {
                title: '首页',
                path: '/home',
                iconName: 'fa fa-link',
                className: 'nav-link'
            },
            {
                title: '职位信息',
                path: '/position-list', // 路径
                iconName: 'fa fa-dashboard', // 字体图标
                clssName: 'treeview', // li的class
                ulClass: 'treeview-menu', // 子代的父母class
                children: [
                    {
                        title: '职位列表',
                        path: '/position-list',
                        iconName: 'fa fa-circle-o',
                        className: 'nav-link',
                    },
                    {
                        title: '添加职位',
                        path: '/position-save',
                        iconName: 'fa fa-circle-o',
                        className: 'nav-link'
                    }
                ]
            },
            {
                title: '地图',
                path: '/map',
                iconName: 'fa fa-link',
                className: 'nav-link'
            }
        ]
    }
        

    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(navs)
        }, 300)
    })
}

export default {
    sidebarNav
}