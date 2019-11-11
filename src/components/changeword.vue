<template>
	<div class="marks">
		<div class="poxdiv">
			<p class="ptitle">文件上传平台</p>
			<el-input placeholder="请输入新密码" v-model="newpassword" show-password class='logininput' clearable></el-input>
			<el-button type="primary" style='margin-top: 25px;width: 100px;' size='medium' v-on:click='submitword'>提交</el-button>
		</div>
	</div>
</template>
<script>
export default {
  name: 'chnageword',
  data () {
    return {
    	newpassword:''
    }
  },
  methods:{
   submitword(){
    	   var This=this
         this.$http.post('http://upload.truthai.cn/fileapi/user/resetPwd',{'password':this.newpassword},{emulateJSON: true}
 ).then(function(response){
      var res=response.body
      console.log(res)
      if(res.code==0){
      	 This.$message({
			message: '修改成功',
			type: 'success',
			duration:1500
	     });
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
  },
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