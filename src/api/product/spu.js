import request from '@/utils/brand-request'

//获取spu列表数据的接口
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
})

//获取spu信息
export const reqSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
})

//获取品牌信息
export const reqTradeMarkList = () => request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
})

//获取spu图片的接口
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
})

//获取平台全部销售属性
export const reqBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
})

//修改或者添加spu 
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数有id--修改spu
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
    } else {
        //携带的参数不带id--添加spu
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
    }
}

//删除SPU
///admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
});

//获取销售属性的数据
export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
})
//获取平台属性的数据

//获取平台属性接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})

//添加sku
export const reqAddSku = (skuInfo) => request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
})

//获取SKU列表数据的接口
//GET /admin/product/findBySpuId/{spuId}  
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' });