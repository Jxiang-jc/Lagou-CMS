
// 提供列表数据
// 接收页码信息， 需要包含pageNo，pageSize
const list = (page) => {
    return $.ajax({
        url: '/api/v1/position/list',
        data: page,
        success: (results) => {
            return results
        }
    })
}

export default {
    list
}