<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper">
                <ul>
                    <!-- current   点击获得当前class -->
                    <li class="menu-item" v-for="(good,index) in goods" 
                        :class="{current: index === currentIndex}"  
                        :key="index"
                        @click="clickMenuItem(index)"
                        >
                        <span class="text bottom-border-1px">
                            <img class="icon" :src="good.icon" v-if="good.icon" />
                               {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper">
                <ul ref="foodsUI">
                    <li class="food-list-hook" v-for="(good,index) in  goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" 
                                v-for="(food,index) in good.foods" 
                                :key="index"
                                @click="showFood(food)"
                                >
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售 {{food.sellCount}} 份</span>
                                        <span>好评率 {{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food = food />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li> 
                </ul>
            </div>
        </div>
        <Food :food="food" ref="food" />
        <ShopCart />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BScroll from 'better-scroll'  //用于滚动
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'

export default {
    data(){
        return {
            scrollY: 0,    //右侧滚动的Y轴坐标
            tops:[],         //右侧所有li的top值组成的数组
            food: {}     //需要显示的food
        }
    },
    components:{
        CartControl,
        Food,
        ShopCart
    },
    computed:{
        ...mapState(['goods']),
        //计算当前分类的下标
        currentIndex() {   //初始执行一次以及相关数据发生变化时执行
            //得到条件数据
            const { scrollY, tops } = this
            //根据条件计算一个结果
            const index = tops.findIndex((top, index) => {
                //当scrollY >= 当前的top && < 下一个top  (处于两个li之间)
                return scrollY >= top && scrollY < tops[index + 1]
            })
            //返回结果
            return index
        }
    },
    mounted() {
        // 使用 axios 请求 mockjs 提供的接口
        this.$store.dispatch('getShopGoods', () => {
            this.$nextTick(() => {   //列表数据跟新显示后执行
                this._initScroll()
                this._initTop()
            })
        })
    },
    methods:{
        _initScroll(){  //初始化滚动条
            new BScroll('.menu-wrapper', {
                click: true
            })
            this.foodsSroll = new BScroll('.foods-wrapper' , {
                probeType: 3,           //用于实时监听滚动的距离  手指松开，惯性滑动依旧会记录  
                // probeType: 2,       //用于实时监听滚动的距离  手指松开，惯性滑动不会记录  
                click: true
            })
            //给右侧列表绑定一个滚动监听
            this.foodsSroll.on('scroll', ({x, y}) => {
                // console.log(x,y)
                this.scrollY = Math.abs(y)   //获取的y是负值  使其为正值
            })
            //给右侧列表绑定一个滚动结束的监听      probeType: 2,时用
            // this.foodsSroll.on('scrollEnd', ({x, y}) => {
            //     // console.log(x,y)
            //     this.scrollY = Math.abs(y)   //获取的y是负值  使其为正值
            // })
        },
        _initTop(){
            const tops = []
            let top = 0   //第一个高度
            tops.push(top)
            //找到所有分类的li   通过ref找到右侧的li
            const list = this.$refs.foodsUI.getElementsByClassName('food-list-hook')
            Array.prototype.slice.call(list).forEach(li => {
                top += li.clientHeight       //获得每个人li的高度
                tops.push(top)
            })
            this.tops = tops
        },
        clickMenuItem(index){
            console.log(index)
            //右侧列表滑到相应位置
            const y = this.tops[index]
            this.scrollY = y   //左侧滚动到指定高度

            this.foodsSroll.scrollTo(0, -y, 300)     //scrollTo(x, y, time)
        },
        showFood(food){
            //设置food
            this.food = food
            //显示food组件   父组件调用子组件的对象方法
            this.$refs.food.toggleShow()
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"

    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>