///admin/product/baseTrademark/{page}/{limit}
import request from '@/utils/brand-request'
//获取品牌列表接口
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

///admin/product/baseTrademark/save 新增品牌 post


///admin/product/baseTrademark/update 修改品牌 put

export const reqAddorUpdateTradeMark = (tradeMark) => {
    //带给服务器的数据携带id
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        //新增品牌
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}

//删除品牌的接口
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })