<template>
  <div class="maincontent"  v-bind:style="{minHeight:mainheight+'px'}">
	<el-breadcrumb separator="/" style='padding: 20px 0'>
	  <el-breadcrumb-item>首页</el-breadcrumb-item>
	  <el-breadcrumb-item>数据上传</el-breadcrumb-item>
	</el-breadcrumb>
  <div class="entrydiv">
  	<span class="entryspan">部位名称：</span>
  	<el-select v-model="positionvalue" filterable placeholder="请先选择部位搜索" style='width: 300px'>
	    <el-option
	      v-for="item in positiondatas"
	      :key="item.code"
	      :label="item.name"
	      :value="item.description">
	    </el-option>
      </el-select>
      <div class="psdiv">请先输入部位名，再选择文件完成上传</div>
      <div class="entryspan" style="margin-bottom: 10px; margin-top: 20px;">文件内容：</div>
      <el-upload
		  class="upload-demo"
		  drag
		  action="http://upload.truthai.cn/fileapi/upload/uploadFile"
		  :http-request="uploadSectionFile"
		  multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
  </div>
  <div class="mark" v-loading="loading" v-if='loading'></div>
  </div>
</template>
<script>
export default {
  name: 'entry',
  data () {
    return {
    	mainheight:'',
    	positiondatas:null,
    	positionvalue:'',
      loading:false
    }
  },
  mounted () {
       console.log(document.documentElement.clientHeight)
       this.mainheight=document.documentElement.clientHeight-64
       this.positionlist()
       if(localStorage.token==''){
       		this.$router.push({ path: '/' });
       	}
   },
   methods: {
   	  positionlist(){
      	var This=this
    	this.$http.get('http://upload.truthai.cn/fileapi/sys/getPositionList',{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          this.positiondatas=res.data
          console.log(res.data)
      })
      },
       uploadSectionFile(param){
       var fileObj = param.file;
       // FormData 对象
       var form = new FormData();
       // 文件对象
       form.append("attach", fileObj);
       form.append("position", this.positionvalue);
       this.loading=true
       this.$http.post('http://upload.truthai.cn/fileapi/upload/uploadFile',form).then(res => {
       	console.log(res)
         this.loading=false
         if(res.data.msg == 'ok'){
           this.$message({
             type:'success',
             message:'上传成功'
           })
         } 
         else if(res.code==-2){
            this.$router.push({ path: '/' });
          }
          else {
           this.$message({
             type:'warning',
             message:res.data.msg
           })
         }
     })
     }
   }
}
</script>
<style scoped>
.mark{width:100%; height:100%; position: fixed; left:0; top:0;  z-index:20; display: block;}
.maincontent{ padding: 0 50px; box-sizing: border-box; background: #f0f2f5; width: 100%; height: 100%;}
html{ background: #f0f2f5; height: 100%; }
.entrydiv{  background: #fff; padding: 40px; border-radius: 4px; text-align: left; }
.entryspan{ font-size: 16px; color: rgba(0, 0, 0, 0.65); }
.psdiv{color: red;font-size: 20px; line-height: 50px;}
</style>