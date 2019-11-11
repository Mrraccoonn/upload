<template>
  <div id="app">
    <top v-if="$route.name!=='login'"></top>
    <router-view></router-view>
  </div>
</template>

<script>
import top from './components/top'

export default {
  name: 'app',
  components:{
      top:top
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.el-table__body tr:hover>td {
    background-color: #fff !important;
    color:#606266;
}
</style>
