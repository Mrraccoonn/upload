<template>
	<div style="width: 100%;height: 100%;">
	<div class="maincontent" v-bind:style="{minHeight:mainheight+'px'}">
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item>首页</el-breadcrumb-item>
	  <el-breadcrumb-item>数据列表</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="searchdiv">
	  <span style="margin-right: 10px;font-size: 16px; color: rgba(0, 0, 0, 0.65);">部位名称：</span>
	  <el-select v-model="positionvalue" filterable clearable placeholder="请先选择部位搜索" style='margin-right: 80px;'>
	    <el-option
	      v-for="item in positiondatas"
	      :key="item.code"
	      :label="item.name"
	      :value="item.description">
	    </el-option>
      </el-select>
      <el-select v-model="hospitalvalue"  @change="selectChanged" filterable clearable placeholder="请选择数据来源">
      <el-option
        v-for="item in hospitaldata"
        :key="item.key"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <div class="buttondiv">
      <el-button type="primary" plain style='width: 80px;' v-on:click='clearCheckedNodes'>清空</el-button>
      <el-button type="primary" style='margin-left: 20px;width: 80px;' v-on:click='searchlist'>搜索</el-button>
      <el-button type="success" style='margin-left: 120px;width: 80px;' v-on:click='derive'>导出</el-button>
      </div>
	</div> 
	<div class="tablediv">
		<el-table 
		    :data="datalists"
		    stripe
        @selection-change="handleSelectionChange"
		    style="width: 100%;">
        <el-table-column
        type="selection"
        width="65">
        </el-table-column>
		    <el-table-column
		      prop="name"
		      label="文件名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="addTime"
		      :formatter="dateFormatter"
		      label="时间">
		    </el-table-column>
		    <el-table-column
		      prop="source"
		      label="来源">
		    </el-table-column>
		    <el-table-column
		      prop="position"
		      label="部位">
		    </el-table-column>
		    <el-table-column
		      prop="sex"
		      label="性别">
		    </el-table-column>
		    <el-table-column
		      prop="age"
		      label="年龄">
		    </el-table-column>
        <el-table-column
          prop="side"
          label="侧别">
        </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)" v-if='noshow'>查看图片</el-button>
		        <el-button
		          size="mini"
		          type="primary"
		          @click="handleCanvas(scope.$index, scope.row)">标记图片</el-button>
		      </template>
		    </el-table-column>
        </el-table>
        <el-pagination
		  background
		  @current-change='pagenumchange($event)'
		  style='margin-top: 40px; margin-bottom: 26px;'
		  layout="prev, pager, next"
		  :total="total">
		</el-pagination>
	</div>
	</div>
<div class="mark" v-if='markshow'>
	<div class="markcon">
		<p class="ptitle"><span class="baifenbi">{{Math.floor(scale * 100)}}%</span><img src="/static/image/close.png" class="close" v-on:click='imgclose'></p>
		<div class="imgdiv">
			<img v-bind:src="'http://upload.truthai.cn/fileapi/image/viewImage/'+serialNo" class="imgpic" v-if="uuid==''" v-bind:style="transformStyle" @mousewheel.prevent="rollImg($event)">
			<img v-bind:src="picUrl" class="imgpic"  v-if="uuid!=''" @mousewheel.prevent="rollImg($event)" v-bind:style="transformStyle">
		</div>
	</div>
</div>
<div class="mark" v-show='canvasshow'>
	<div class="markcon" style="display: block; max-height: 80%;">
		<p class="ptitle"><span class="baifenbi"><el-button  size="mini" style='margin-right: 10px;' v-on:click='empty'>清空</el-button><el-button type="primary" size="mini" v-on:click='positionfirm'>保存</el-button><span style="margin-left: 20px; font-size: 12px;">点击清空可对标注进行修改，点击保存则标注数据提交</span></span><img src="/static/image/close.png" class="close" v-on:click='canvasclose'></p>
		<div class="imgdiv" style="max-height: 80%;">
			<canvas id="canvasimg"></canvas>
		</div>
	</div>
</div>
</div>
</template>
<script>
	let id = 0;
export default {
  name: 'list',
  data () {
    return {
    	mainheight:'',

        pageSize:10,
        pageNum:1,
        source:'',
        datalists:null,
        positiondatas:null,
        positionvalue:'',
        hospitalvalue:'',
        hospitaldata:null,
        total:null,
        serialNo:'',
        uuid:'',
        picUrl:null,
        markshow:false,
        canvasshow:false,
        noshow:false,                                                                                                                                                                                                                     
        pospitaluser:'',
        viewimage:'',
        x:null,
        y:null,
        position:[],
        transformStyle:null,
        scale:1,
        arrDPI:null,
        host:'',
        angle:'',
        filds:[]

    }
  },
  mounted () {
		var arrDPI = new Array;
		if (window.screen.deviceXDPI) {
		arrDPI = window.screen.deviceXDPI;
		}
		else {
		var tmpNode = document.createElement("DIV");
		tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
		document.body.appendChild(tmpNode);
		arrDPI = parseInt(tmpNode.offsetWidth);
		tmpNode.parentNode.removeChild(tmpNode);
		}
		this.arrDPI=arrDPI
       this.mainheight=document.documentElement.clientHeight-64
       this.listdata()
       this.positionlist()
       this.hospitalinfor()
       this.host=window.location.host
       //this.canvas()
   },
    methods: {
        derive:function(){
          console.log(this.filds)
           if(this.filds==''){
              this.$message({
                   type:'warning',
                   message:'请选中要导出的文件',
                   duration:1500
              })
           }
           else{
            var fildid=this.filds.join(",")
            var This=this
            window.location.href="http://upload.truthai.cn/fileapi/export?fileIds="+fildid+'&Authorization=Bearer '+localStorage.token
            
            }
          },
        handleSelectionChange:function(e){
                this.filds=[]
             for(var i=0;i<e.length;i++){
                this.filds.push(e[i].fileId)
             }
        },
    	  rollImg:function(e){
           var This=this
           if(e.wheelDelta>0){
	       	this.scale=this.scale+0.1
	       	This.transformStyle='transform:scale('+this.scale+')'
	       	}
	       	else{
	       	this.scale=this.scale-0.1
	       	This.transformStyle='transform:scale('+this.scale+')'
	       	}
    	  },
    	  empty:function(){
           this.position=[]
           this.canvas()
    	  },
    	  canvas:function(){
             var mycanvas = document.getElementById('canvasimg')
             var ctx = mycanvas.getContext('2d')
	      	 var img = new Image();
	      	 var This=this
	         if(this.uuid==''){
	         	img.src='http://upload.truthai.cn/fileapi/image/viewImage/'+this.serialNo
	         }
	         else{
	         	img.src=this.picUrl
	         }
	         img.onload = function(){
	         	var imgwidth=null
	         	var scale=1
	         if(img.width>=800){
                imgwidth=800
                scale=800/img.width
	         }
	         else{
	         	imgwidth=img.width
	         	scale=1
	         }
	            mycanvas.width = imgwidth
      	        mycanvas.height = img.height*scale 
			    ctx.drawImage(img,0,0,imgwidth,img.height*scale)
			    if(This.position.length>=2){
			    ctx.beginPath();
					// 绘制圆，参数（x坐标，y坐标，圆半径，起始角度，终止角度）
					ctx.arc(This.position[0].positionX, This.position[0].positionY, 3, 0, 2*Math.PI);
				    ctx.fillStyle= "rgba(255,0,0,0.5)";
					// 开始填充
					ctx.fill();
			    ctx.closePath();

			    ctx.beginPath();
					ctx.arc(This.position[1].positionX, This.position[1].positionY, 3, 0, 2*Math.PI);
				    ctx.fillStyle= "rgba(255,0,0,0.5)";
					// 开始填充
					ctx.fill();
			    ctx.closePath();

			    ctx.beginPath();
					ctx.arc(This.position[2].positionX, This.position[2].positionY, 3, 0, 2*Math.PI);
					// 填充颜色
					ctx.fillStyle= "rgba(255,0,0,0.5)";
					// 开始填充
					ctx.fill();
			    ctx.closePath();

			    ctx.beginPath();
                ctx.moveTo(This.position[0].positionX,This.position[0].positionY)
                ctx.lineTo(This.position[1].positionX,This.position[1].positionY)
                ctx.lineTo(This.position[2].positionX,This.position[2].positionY)
                ctx.lineWidth=2;
		        ctx.strokeStyle="rgba(255,0,0,0.6)";
				ctx.stroke()
                ctx.closePath();
			    }
	         }	        
	           mycanvas.onmousedown=function(e){
			    This.x = e.offsetX; // 鼠标落下时的X
			    This.y = e.offsetY; // 鼠标落下时的Y
              }
              mycanvas.onmouseup=function(e){	
		        console.log(This.position)
		        if(e.offsetX==This.x&&e.offsetY==This.y){
		        	if(This.position.length>=3){
                       
		        	}
		        	else{
		        	This.position.push({positionX:This.x,positionY:This.y})
		        	ctx.beginPath();
					// 绘制圆，参数（x坐标，y坐标，圆半径，起始角度，终止角度）
					ctx.arc(This.x, This.y, 3, 0, 2*Math.PI);  
					// 填充颜色
					ctx.fillStyle= "rgba(255,0,0,0.6)";
					// 开始填充
					ctx.fill();
					ctx.closePath();           
					if(This.position.length>=2){
                            console.log(This.position,This.position.length)
                            ctx.beginPath();
                            ctx.moveTo(This.position[This.position.length-2].positionX,This.position[This.position.length-2].positionY)
                            ctx.lineTo(This.position[This.position.length-1].positionX,This.position[This.position.length-1].positionY)
                            if(This.position.length==3){
                            var c1=Math.atan2(This.position[0].positionY-This.position[1].positionY,This.position[0].positionX-This.position[1].positionX) * 180 / (Math.PI);
                            var c2=Math.atan2(This.position[2].positionY-This.position[1].positionY,This.position[2].positionX-This.position[1].positionX) * 180 / (Math.PI);
                            c1 = c1 <= -90 ? (360 + c1) : c1;
                            c2 = c2 <= -90 ? (360 + c2) : c2;
                            var angle=''
                             angle = Math.floor(c2 - c1);
                             angle = angle < 0 ? angle + 360 : angle;
                             angle = angle>180?360-angle:angle
                            This.angle=angle
                            }
                            ctx.lineWidth=2;
		                    ctx.strokeStyle="rgba(255,0,0,0.6)";
							ctx.stroke()
							ctx.closePath();

					}
					}
		        }
			  };

    	  },
    	  positionfirm:function(){
                 var markLen1=''
                 var markLen2=''
                 if(this.position.length==3){
                 var position=this.position
                 var x1=position[0].positionX-position[1].positionX
                 var y1=position[0].positionY-position[1].positionY
                 var markLensqrt1=Math.sqrt(x1*x1+y1*y1)
                 markLen1=(markLensqrt1/this.arrDPI*25.4/10).toFixed(2);
                 var x2=position[2].positionX-position[1].positionX
                 var y2=position[2].positionY-position[1].positionY
                 var markLensqrt2=Math.sqrt(x2*x2+y2*y2)                                                                                                                                                                                                             
                 markLen2=(markLensqrt2/this.arrDPI*25.4/10).toFixed(2);
                 var markLen=markLen1+','+markLen2
                 console.log(markLen)
                 this.$http.post('http://upload.truthai.cn/fileapi/file/updateMark',{'serialNo':this.serialNo,'markLen':markLen,'markResult':JSON.stringify(this.position),'markDegree':this.angle},{emulateJSON: true}).then(function(response){
                 	 var res=response.body            
                     console.log(res)
                     if(res.msg == 'ok'){
			           this.$message({
			             type:'success',
			             message:'保存成功'
			           })
			           this.listdata()
			         } 
			         else if(res.code==-2){
			            this.$router.push({ path: '/' });
			          }
			          else {
			           this.$message({
			             type:'warning',
			             message:res.msg
			           })
			         }
                 })
                 }
                 else{
                  this.$message({
			             type:'warning',
			             message:'请选中三点'
			           })
                 }
    	  },
        /*
    	  getdata:function(){
    	  var This=this
		  this.props={
          lazy: true,
          lazyLoad (node, resolve) {
            This.$http.get('http://upload.truthai.cn/fileapi/hospital/getUserList?hospitalCode='+node.data.key,{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          if(res.code==-2){
            This.$router.push({ path: '/' });
          }
          if(res.data!=''){
                 const nodes = res.data
                .map(item => ({
                  value: res.data[0].key,
                  label: res.data[0].value,
                  leaf: 1
                }));
              // 通过调用resolve将子节点 数据返回，通知组件数据加载完成
              resolve(nodes)
              }
              else{
              	console.log(res.data)
               const nodes = res.data
                .map(item => ({
                  value: '',
                  label: '',
                  leaf: 1
                }));
                resolve(nodes)
          }
          })
          }
        }
		  },
      */
	   pagenumchange:function(e){
          this.pageNum=e
          this.listdata()
	   },
	   searchlist:function(){
          this.listdata()
	   },
       listdata(){
        
       	var This=this
    	this.$http.get("http://upload.truthai.cn/fileapi/file/list?position="+this.positionvalue+"&pageSize="+this.pageSize+"&pageNum="+this.pageNum+"&source="+this.source,{headers:{
            Authorization: "Bearer " + localStorage.token
          }}
        ).then(function(response){
          var res=response.body
          console.log(res)
          if(res.code==0){
          	This.datalists=res.data.list
          	This.total=res.data.total
          }
          else if(res.code==-2){
            this.$router.push({ path: '/' });
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
    dateFormatter (row, column) {
        let datetime = row[column.property];
        if(datetime){
          datetime = new Date(datetime);
          let y = datetime.getFullYear() + '-';
          let mon = datetime.getMonth()+1 + '-';
          let d = datetime.getDate();
          return y + mon + d;
        }
        return ''
      },
      handleEdit(index, row){
         this.serialNo=row.serialNo
         this.uuid=row.uuid
         this.picUrl=row.picUrl
         this.markshow=true
      },
      imgclose:function(){
         this.markshow=false
      },
      handleCanvas(index, row){
      	 this.$router.push({ path: '/detail',query: {
            serialno: row.serialNo,
            uuid:row.uuid,
            picurl:row.picUrl
          } });
      	 this.serialNo=row.serialNo
         this.uuid=row.uuid
         this.picUrl=row.picUrl
         this.angle=row.markDegree
         if(row.markResult){
           this.position=JSON.parse(row.markResult)
         }
         else{
           this.position=[]
         }                          
         this.canvasshow=true
         this.canvas()
      },
      canvasclose:function(){
         this.canvasshow=false
      },
      positionlist(){
      	var This=this
    	this.$http.get('http://upload.truthai.cn/fileapi/sys/getPositionList',{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          this.positiondatas=res.data
      })
    },
    hospitalinfor:function(){
        var This=this
    	this.$http.get('http://upload.truthai.cn/fileapi/hospital/getHospitalList',{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          this.hospitaldata=res.data
          console.log(this.hospitaldata)
      })
    },
    handleItemChange:function(e){
      this.$http.get('http://upload.truthai.cn/fileapi/hospital/getUserList?hospitalCode='+e,{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          this.hospitaldata[0].children=res.data
          this.hospitaldata[0].children.label=res.data[0].value
    })
    },
    clearCheckedNodes:function(){
    	this.hospitalvalue=''
      this.source=''
    	this.positionvalue=''
    },
    selectChanged:function(value){
       if(value==''){
         this.source=''
       }
       else{
            let obj = {};
            obj = this.hospitaldata.find((item)=>{
              if(item.value === value){
                this.source=item.key
              }
            });
          }
    }

}
}
</script>
<style scoped>
.maincontent{ padding: 0 50px; box-sizing: border-box; background: #f0f2f5; width: 100%; height: 100%;}
.el-breadcrumb{ padding: 20px 0; }
.searchdiv{ text-align: left; padding: 20px; background:#fff;height: 160px; padding-top: 40px; padding-left: 120px; box-sizing: border-box; border-radius: 12px;  }
.buttondiv{ float: right; margin-right: 40px; }
.tablediv{ border-radius: 12px; margin-top: 30px; overflow: hidden; box-sizing: border-box; padding-top: 20px; background: #fff; }
.el-table .title{ background: #fafafa }

.mark{width:100%; height:100%; position: fixed; left:0; top:0; background-color:rgba(0,0,0,0.2); z-index:20; display: block;}
.markcon{ width: 80%;  top: 0; right: 0; left: 0; bottom:0;  margin: auto; position: absolute; display: inline-table; background-color: rgba(17, 24, 29, 0.8);}
.ptitle{ width: 100%; height: 40px; background-color: rgba(17, 24, 29, 0.8); line-height: 40px;}
.close{ width: 16px; height: 16px; display: inline-block; float: right;margin-right: 12px; margin-top: 12px; cursor: pointer; }
.baifenbi{ float: left;margin-left: 100px; color: #fff; }
.imgdiv{ width: 100%; padding:30px 0; overflow-y: scroll;max-height: 700px; }
.imgpic{width: 800px; margin: 0 auto; display: block;}
::-webkit-scrollbar { 
            width: 8px;   /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
            background-color: rgba(0,0,0,0);
        } 
        /*定义滚动条轨道（凹槽）样式*/ 
        ::-webkit-scrollbar-track { 
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    /* 较少使用 */
            border-radius: 3px; 
        } 
        /*定义滑块 样式*/ 
        ::-webkit-scrollbar-thumb { 
            border-radius: 3px; 
            height: 100px;    /* 滚动条滑块长度 */
            background-color: #ccc; 
        }
</style>
