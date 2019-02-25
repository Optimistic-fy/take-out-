// 包含多个基于state的getter计算属性

export default {
    showLoading(state){ 
        return state.showLoading  
    },
    totalCount(state){   //reduce  用于计算总和
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count , 0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
    },
    positiveSize(state){
        return state.ratings.reduce((preTotal, ratings) => preTotal + (ratings.rateType === 0 ? 1 : 0), 0)
    }
}