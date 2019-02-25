// 通过木塔同时间接更新state的多个对象
import {
    reqAddress, 
    reqFoodCategorys, 
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchShop
} from '../api'
import * as Contants from './mutation-types'


export default {
    showloader:({ commit }) => {  
        commit( Contants.SHOWLOADING )  
    },  
    hideloader:({ commit }) => {  
        commit( Contants.HIDELOADING )  
    },
    
    //异步获取地址
    async getAddress ({commit, state}){
        //发送ajax请求
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash);
        
        //提交一个mutation
        if(result.code === 0){
            const address = result.data;
            commit(Contants.RECEIVE_ADDRESS, {address})
        }else{
            console.log('服务器错误！')
        }
    },

    //异步获取食品分类列表
    async getFoodCategorys ({commit}){
        //发送ajax请求
        const result = await reqFoodCategorys();
        
        //提交一个mutation
        if(result.code === 0){
            const categorys = result.data;
            commit(Contants.RECEIVE_CATEGORYS, {categorys})
        }else{
            console.log('服务器错误！')
        }
    },

    //异步获取商家列表
    async getShops ({commit, state}){
        //发送ajax请求
        const {longitude, latitude} = state;
        const result = await reqShops(longitude, latitude);
        
        //提交一个mutation
        if(result.code === 0){
            const shops = result.data;
            commit(Contants.RECEIVE_SHOPS, {shops})
        }else{
            console.log('服务器错误！')
        }
    },

    //同步记录用户信息
    recordUser ({commit ,userInfo}) {
        commit(Contants.RECEIVE_USER_INFO ,{userInfo})
    },

    //异步获取用户信息   解决用户已经登录时刷新页面导致的退出登录现象   session
    async getUserInfo ({commit}) {
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(Contants.RECEIVE_USER_INFO ,{userInfo})
        }
    },

    //异步退出登录
    async logout ({commit}) {
        const result = await reqLogout()
        if(result.code === 0){
            commit(Contants.RECEIVE_LOGOUT)
        }
    },

    // 异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if(result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(Contants.RECEIVE_INFO, {info})
        }
    },

    // 异步获取商家评价列表
    async getShopRatings({commit}, callback) {
        const result = await reqShopRatings()
        if(result.code === 0) {
            const ratings = result.data
            commit(Contants.RECEIVE_RATINGS, {ratings})
            //数据更新了，通知组件形成滚动ul
            callback && callback()
        }
    },

    // 异步获取商家商品列表
    async getShopGoods({commit}, callback) {
        const result = await reqShopGoods()
        if(result.code === 0) {
            const goods = result.data
            commit(Contants.RECEIVE_GOODS, {goods})

            //数据更新了，通知组件形成滚动ul
            callback && callback()
        }
    },

    updateFoodCount({commit}, {food, isAdd}){
        if(isAdd){
            commit(Contants.INCREASE_FOOD_COUNT, {food})
        }else{
            commit(Contants.DECREASE_FOOD_COUNT, {food})
        }
    },

    //同步清空购物车
    clearCart({commit}){
        commit(Contants.CLEAR_CART)
    },

    //搜索
    async searchShop({commit, state}, keyword) {
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqSearchShop(geohash, keyword)

        if(result.code === 0) {
            const searchShops = result.data
            commit(Contants.SEARCH_SHOP_LIST, {searchShops})
        }
    },
}