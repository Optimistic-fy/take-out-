<template>
    <section class="msite">
        <header-top :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
                <span class="header_login_text" v-if="!userInfo._id">
                    登录|注册
                </span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-person"></i>
                </span>
            </router-link>
        </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys, index) in categoryArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(item, index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImgUrl + item.image_url">
                            </div>
                            <span>{{item.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else />
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <shop-list></shop-list>
        </div>
    </section>
</template>

<script>
import Swiper from 'swiper'
import { mapState } from 'vuex'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
    components: {
        HeaderTop,
        ShopList
    },
    data() {
        return {
            baseImgUrl: 'https://fuss10.elemecdn.com'
        }
    },
    mounted() {
        this.$store.dispatch('getFoodCategorys')
        this.$store.dispatch('getShops')
    },
    computed: {
        ...mapState(['address', 'categorys' ,'userInfo']),

        //根据一位数组生成二维数组   一个slide最多8个
        categoryArr() {
            const { categorys } = this;
            const arr=[];
            let minArr = [];
            //遍历category
            categorys.forEach(e => {
                if(minArr.length === 8){
                    minArr = []
                }
                if(minArr.length === 0){
                    arr.push(minArr)
                }

                minArr.push(e)
            });

            return arr;
        },
    },
    watch: {
        categorys (value) {  //有数据（数据改变或显示结束）才显示轮播
            //界面更新就立即创建swiper实例对象，来实现轮播
            this.$nextTick(() => {
                new Swiper('.swiper-container', {
                    loop: false,
                    pagination: {
                        el: '.swiper-pagination'
                    }
                })
            })
        }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"

  &.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
    .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
            border-top :1px solid #e4e4e4
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>