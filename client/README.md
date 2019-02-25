vue-router的理解和使用
$router:路由器对象，包含一些操作路由的函数，来实现编程式导航（跳转路由）
$route: 当前路由对象，一些当前路由信息数据的容器，path/meta/guery/params


////////////////////////////////////////////////////////////
$npm install --save mint-ui
$npm install --save-dev babel-plugin-component

修改babelrc
"plugins": ["transform-vue-jsx", "transform-runtime", ["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]

$npm install mockjs --save
npm install babel-preset-es2015


npm install --save better-scroll   选择城市等或者其他滚动效果

遮罩层和前面数据显示层都使用transition可以使他们出现时间相同

过滤器
$npm install --save moment