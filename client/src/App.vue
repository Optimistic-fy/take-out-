<template>
  <div id="app">
    <Loading></Loading>
    <router-view></router-view>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from './components/Loading/Loading'
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: {
    FooterGuide,
    Loading
  },
  methods: {
    ...mapActions(['getAddress' ,'getUserInfo'])
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
