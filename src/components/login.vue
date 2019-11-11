<template>
	<div class="marks">
		<div class="poxdiv">
			<p class="ptitle">文件上传平台</p>
			<el-input v-model="input" placeholder="用户名" class='logininput' clearable style='margin-bottom: 30px;'></el-input>
			<el-input placeholder="请输入密码" v-model="password" show-password class='logininput' clearable></el-input>
			<el-button type="primary" style='margin-top: 25px;width: 100px;' size='medium' v-on:click='login'>登录</el-button>
		</div>
	</div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
    	input:'',
    	password:'',
    	newpassword:''
    }
  },
  methods:{
    login(){
    	var This=this
    	this.$http.post('http://upload.truthai.cn/fileapi/auth/login',{'userName':this.input,'pswd':this.password},{emulateJSON: true}
 ).then(function(response){
      var res=response.body
      console.log(res)
      if(res.code==0){
         localStorage.token=res.data.token
         This.$router.push({ path: '/list' });
      }
      else{
         This.$message({
    			message: res.msg,
    			type: 'error',
    			duration:1500
	     });
      }
    })
  }
}
}
</script>
<style scoped>
.marks{ width: 100%; height: 100%; background: #fff; position: absolute;left: 0;top: 0; z-index: 20; }
.poxdiv{ width: 400px; height: 300px; position: absolute;left: 0;top:0; bottom: 0; right: 0; margin: auto; background: #fff; box-shadow: rgb(93, 123, 149) 0px 12px 36px 0px; padding: 40px;  }
.ptitle{ font-size: 28px; text-align: center; margin-bottom: 30px; }
.logininput{}
.changepossword{color: #409EFF; font-size: 14px;line-height: 40px; cursor: pointer; margin: 10px 0; display: block; text-align: left; width: 200px;}
</style>