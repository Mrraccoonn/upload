<template>
	<div class="topdiv">
       <ul class="tabul">
       	 <li><router-link :to="{path:'/list'}"><img src="/static/image/list.png"><img src="/static/image/listactive.png" class="show"><span>数据列表</span></router-link></li>
       	 <li><router-link :to="{path:'/infoEntry'}"><img src="/static/image/onfor.png"><img src="/static/image/onforactive.png" class="show"><span>数据上传</span></router-link></li>
       </ul>
       <div class="off" v-on:click='backlogin'>退出登录</div> <div class="off" style="margin-right: 140px;" v-on:click='changepass'>修改密码</div>
	</div>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
    }
  },
  methods:{
    handleClick:function(){
        
    },
    backlogin:function(){
    	localStorage.token=''
    	this.$router.push({ path: '/' });
    },
    changepass:function(){
      this.$router.push({ path: '/changeword' });
    }
  }
}
</script>
<style scoped>
.topdiv{ height: 64px; width: 100%; padding-left: 100px; box-sizing: border-box;background: #001529; padding: 9px 0; }
.tabul{ margin-left: 160px; text-align: left; }
.tabul li{   height: 46px; display: inline-block; cursor: pointer;  }
.tabul li a{ width: 86px; height:100%; display: block;  padding: 0 20px; }
.tabul li img{ width: 20px; height: 20px; display: inline-block;vertical-align: middle; margin-right: 5px;  }
.tabul li span{color: rgba(255, 255, 255, 0.65); font-size: 14px; line-height: 46px;display: inline-block;vertical-align: middle;  }
.off{ float: right; margin-right: 20px;margin-top: -38px;background: transparent !important;border:1px solid #fff; color: #fff;padding: 0 15px;
font-size: 14px;border-radius: 4px;height: 30px; line-height: 30px; text-align: center; cursor: pointer; }
.tabul .active{ background: #1890ff;}
.tabul .active span{ color: #fff;}
.tabul .show{ display: none; }
.tabul .active .show{ display: inline-block; }
.tabul .active img{display: none}
</style>