<template>
    <div id="loading" v-show="showLoading">
      <Spin fix>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading...</div>
      </Spin>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['showLoading'])
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .demo-spin-icon-load
        animation: ani-demo-spin 1s linear infinite;
</style>