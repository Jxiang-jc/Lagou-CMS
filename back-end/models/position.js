const mongoose = require('../util/mongoose')
const Moment = require('moment') // 时间格式化
const fs = require('fs-extra') // 时间格式化
const PATH = require('path') // 时间格式化

// 创建的Model模型 （collection）
var PositionModel = mongoose.model('positions', new mongoose.Schema({
    city: String,
    positionName: String,
    companyName: String,
    salary: String,
    createTime: String,
    formatTime: String,
    companyLogo: String
}));

// 返回列表全部数据
const listall = (_query = {}) => {
    return PositionModel.find(_query).sort({createTime: -1}).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 10, search = ''}) => {
    let reg = new RegExp(search, 'g')
    console.log(reg.test(search),search)
    let _query = { // 匹配各个字段值只要有一个字段含有关键字
        $or: [
            { companyName: reg },   
            { positionName: reg },   
            { city: reg },   
        ]
    }// 查询的约定条件
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)
    return PositionModel.find(_query)
    .sort({createTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少
    .then((results) => {
        return { 
            items: results, 
            pageInfo: { // 页码信息
                pageNo, // 当前页
                pageSize, // 一页数量
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
                search // 搜索关键字
            }
        }
    }).catch((err) => {
        return false
    })
}



let default_logo = '/uploads/logos/default.jpg'

// 保存职位数据
const save = (body) => {
    // 此时的时间
    let _timestamp = Date.now()
    // 根据这个时间创建moment
    let moment = Moment(_timestamp)
    body.companyLogo =  body.companyLogo || default_logo
    return new PositionModel({
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    })
    .save()
    .then((result) => {
        return result
    })
    .catch((err) => {
        return false
    })

}
// 删除职位的model
const remove = async ( { id, pageNo, pageSize } ) => {
    // 删除数据库中的某一条数据
    let _row = await listone({ id })

    return PositionModel.deleteOne({ _id: id }).then(async (results) => {
        //  获取最新的数量
        let _all_items = await listall()
        
        results.deleteId = id
        results.isBack = (pageNo-1) * pageSize >= _all_items.length 
        // 有图片就删图片
        if ( _row.companyLogo && _row.companyLogo !== default_logo ) {
            fs.removeSync(PATH.resolve(__dirname, '../public'+_row.companyLogo))
        }  
        return results
    }).catch((err) => {
        // fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' +JSON.stringify(err))
        return false
    })
}
// 根据id返回某一条数据
const listone = ({ id }) => {
    return PositionModel.findById(id).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}

// 更新职位信息， 确认是否重新发布，如果重新发布，更改创建时间
const update = (body) => {
    if ( !body.companyLogo ) delete body.companyLogo

    if ( body.republish ) {
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm")
    }
    return PositionModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}

module.exports = {
    listall,
    list,
    save,
    remove,
    listone,
    update
}