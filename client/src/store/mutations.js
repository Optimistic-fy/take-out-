// 直接更新state的多个方法的对象

import * as Contants from './mutation-types'
import Vue from 'vue'

export default {
    [Contants.SHOWLOADING](state){
        state.showLoading = true
    },
    [Contants.HIDELOADING](state){
        state.showLoading = false
    },
    [Contants.RECEIVE_ADDRESS](state, {address}) {
        state.address = address
    },
    [Contants.RECEIVE_CATEGORYS](state, {categorys}) {
        state.categorys = categorys
    },
    [Contants.RECEIVE_SHOPS](state, {shops}) {
        state.shops = shops
    },
    [Contants.RECEIVE_USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo
    },
    [Contants.RECEIVE_LOGOUT](state) {
        state.userInfo = {}
    },
    [Contants.RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [Contants.RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [Contants.RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [Contants.INCREASE_FOOD_COUNT](state, {food}) {
        if(food.count === undefined || food.count === 0 ){
            //Vue.set(类名， 属性名， 值)   vue用于添加属性，并进行绑定  如果不用Vue.set() 则不会进行数据绑定  点击按钮不会进行v-if的判断等
            Vue.set(food, 'count', 1)   

            //将food添加到cartFoods中
            state.cartFoods.push(food)
        }else{
            food.count++
        }
    },
    [Contants.DECREASE_FOOD_COUNT](state, {food}) {
        if(food.count){
            food.count--
            if(food.count === 0){
                //将food从cartFoods中删除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [Contants.CLEAR_CART](state) {
        //清楚food中的count
        state.cartFoods.forEach(food => food.count = 0)
        //移除购物车中所有购物项
        state.cartFoods = []
    },
    [Contants.SEARCH_SHOP_LIST](state, {searchShops}) {
        state.searchShops = searchShops
    },
}