<template>
  <div class="maindiv">
  <div class="leftdiv">
    <div class="divbtn">
      <div class="scalediv">{{showscale}}%</div>
    <ul class="ulbtn">
      <li v-on:click='length' v-bind:class="btnactive=='0'?'active':''">长度</li>
      <li v-bind:class="btnactive=='1'?'active':''" v-on:click='angle'>角度</li>
    </ul>
    </div>
    <canvas id="canvasimg" v-bind:style="{transform: 'translate(' + canvasx + 'px,'+ canvasy + 'px)'}"></canvas>
  </div>
  <div class="rightdiv">
    <el-table
        :data="datalists"
        :header-cell-style="{background:'#001529',color:'#606266'}"
        :row-style="rowClass"
        :row-class-name="tableRowClassName"
        @current-change="handleCurrentChange"
        style="width: 100%; background:#001529;border-bottom: 1px solid #ccc ">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="markType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="markValue"
          label="结果">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <img src="/static/image/delete.png" style="width: 26px; height: 26px;" v-if='scope.$index===selectedIndex'  @click="deletemark(scope)">
          </template>
        </el-table-column>
        </el-table>
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
      loading:false,
      datalists:null,
      btnactive:0,
      position:[],
      angledata:'',
      markLensqrt1:'',
      selectedIndex:'',
      currentRow:'',
      imgshow:true,
      mousescale:1,
      showscale:100,
      canvasx:0,
      canvasy:0,
      canvasclickbtn:true,
    }
  },
  mounted () {
       this.getmarklist()
   },
   methods: {
    handleCurrentChange:function(val){
        this.currentRow = val;
        this.selectedIndex=val.index;     
        console.log(this.selectedIndex)
    },
    rowClass:function({row, rowIndex}){
        if((this.selectedIndex) === rowIndex){
            console.log(rowIndex)   
            // return { "background-color": "rgba(185, 221, 249, 0.75)" }
            return { "background-color": "#1b8ffe",'color':'#fff'}
        }
        else{
            return {background:'#001529',color:'#b0b8bd'}
        }       
    },
    tableRowClassName:function({row, rowIndex} ){
      row.index=rowIndex;
    },
    deletemark:function(scope){
      this.loading=true
       var This=this
      this.$http.post('http://upload.truthai.cn/fileapi/mark/deleteMark',{'markId':scope.row.markId},{emulateJSON: true}
        ).then(function(response){
          var res=response.body
          console.log(res)
          this.loading=false
          if(res.code==0){
            this.getmarklist()
            this.$message({
                   type:'success',
                   message:'删除成功'
            })
            this.selectedIndex=''
          }
          else{
            this.$message({
                   type:'warning',
                   message:res.message
            })
          }
      })
    },
      canvas:function(){
         var mycanvas = document.getElementById('canvasimg')
             var ctx = mycanvas.getContext('2d')
           var img = new Image();
           var This=this
           if(this.$route.query.uuid==''){
            img.src='http://upload.truthai.cn/fileapi/image/viewImage/'+this.$route.query.serialno
           }
           else{
            img.src=this.$route.query.picurl
           }
           var scale=1
           img.onload = function(){
            var imgwidth=null
           if(img.width>=1600){
                imgwidth=1600
                scale=1600/img.width
           }
           else{
            imgwidth=img.width
            scale=1
           }
           mycanvas.width = imgwidth*This.mousescale
           mycanvas.height = img.height*scale*This.mousescale
           ctx.drawImage(img,0,0,imgwidth*This.mousescale,img.height*scale*This.mousescale)
           for(var i=0;i<This.datalists.length;i++){
              for(var j=0;j<JSON.parse(This.datalists[i].markResult).length;j++){
                ctx.beginPath();
                // 绘制圆，参数（x坐标，y坐标，圆半径，起始角度，终止角度）
                ctx.arc(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale, 3, 0, 2*Math.PI);  
                // 填充颜色
                if(JSON.parse(This.datalists[i].markResult).length==3){
                  ctx.fillStyle= "rgba(30,249,97,0.8)";
                }
                else{
                  ctx.fillStyle= "rgba(255,0,0,0.8)";
                }
                // 开始填充
                ctx.fill();
                ctx.closePath();
                ctx.lineTo(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale)
              }  
                ctx.beginPath();
                for(var j=0;j<JSON.parse(This.datalists[i].markResult).length;j++){
                ctx.lineTo(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale)
              }   
                  ctx.lineWidth=2;
                  ctx.strokeStyle = "rgba(255,0,0,0.8)";
                  if(JSON.parse(This.datalists[i].markResult).length==3){
                    ctx.strokeStyle = "rgba(30,249,97,0.8)";
                    ctx.fillStyle = 'rgba(30,249,97,0.8)';
                    ctx.font = "14px Arial";
                    ctx.fillText(This.datalists[i].markValue, (JSON.parse(This.datalists[i].markResult)[1].positionX*This.mousescale+10), 
                      (JSON.parse(This.datalists[i].markResult)[1].positionY*This.mousescale+10))
                  }
                  else{
                    ctx.strokeStyle = "rgba(255,0,0,0.8)";
                    ctx.fillStyle = 'rgba(255,0,0,0.8)';
                    ctx.font = "14px Arial";
                    ctx.fillText(This.datalists[i].markValue, ((JSON.parse(This.datalists[i].markResult)[1].positionX+JSON.parse(This.datalists[i].markResult)[0].positionX)/2+10)*This.mousescale, ((JSON.parse(This.datalists[i].markResult)[0].positionY+JSON.parse(This.datalists[i].markResult)[1].positionY)/2+10)*This.mousescale)
                   
                  }
                  ctx.stroke();
                  ctx.closePath();
           }
            mycanvas.onmousewheel = function(ev){
            var e = ev||event;
            ctx.clearRect(0,0,imgwidth,img.height*scale);
            This.position=[]
            if(e.wheelDelta>0){
               This.mousescale=This.mousescale+0.1
            }
            else if(e.wheelDelta<0){
               This.mousescale=This.mousescale-0.1
            }
            This.showscale=parseFloat(This.mousescale*100).toFixed(0)
            mycanvas.width = imgwidth*This.mousescale
            mycanvas.height = img.height*scale*This.mousescale
            ctx.drawImage(img,0,0,imgwidth*This.mousescale,img.height*scale*This.mousescale)
            for(var i=0;i<This.datalists.length;i++){
              console.log(JSON.parse(This.datalists[i].markResult))
              for(var j=0;j<JSON.parse(This.datalists[i].markResult).length;j++){
                ctx.beginPath();
                // 绘制圆，参数（x坐标，y坐标，圆半径，起始角度，终止角度）
                ctx.arc(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale, 3, 0, 2*Math.PI);  
                // 填充颜色
                if(JSON.parse(This.datalists[i].markResult).length==3){
                  ctx.fillStyle= "rgba(30,249,97,0.8)";
                }
                else{
                  ctx.fillStyle= "rgba(255,0,0,0.8)";
                }
                // 开始填充
                ctx.fill();
                ctx.closePath();
                ctx.lineTo(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale)
              }  
                ctx.beginPath();
                for(var j=0;j<JSON.parse(This.datalists[i].markResult).length;j++){
                ctx.lineTo(JSON.parse(This.datalists[i].markResult)[j].positionX*This.mousescale, JSON.parse(This.datalists[i].markResult)[j].positionY*This.mousescale)
              }   
                  ctx.lineWidth=2;
                  ctx.strokeStyle = "rgba(255,0,0,0.8)";
                  if(JSON.parse(This.datalists[i].markResult).length==3){
                    ctx.strokeStyle = "rgba(30,249,97,0.8)";
                    ctx.fillStyle = 'rgba(30,249,97,0.8)';
                    ctx.font = "14px Arial";
                    ctx.fillText(This.datalists[i].markValue, (JSON.parse(This.datalists[i].markResult)[1].positionX*This.mousescale+10), 
                      (JSON.parse(This.datalists[i].markResult)[1].positionY*This.mousescale+10))
                  }
                  else{
                    ctx.strokeStyle = "rgba(255,0,0,0.8)";
                    ctx.fillStyle = 'rgba(255,0,0,0.8)';
                    ctx.font = "14px Arial";
                    ctx.fillText(This.datalists[i].markValue, ((JSON.parse(This.datalists[i].markResult)[1].positionX+JSON.parse(This.datalists[i].markResult)[0].positionX)/2+10)*This.mousescale, ((JSON.parse(This.datalists[i].markResult)[0].positionY+JSON.parse(This.datalists[i].markResult)[1].positionY)/2+10)*This.mousescale)
                   
                  }
                  ctx.stroke();
                  ctx.closePath();
           }
            return false;
        };
           
           mycanvas.onmousedown=function(e){
          This.x = e.offsetX; // 鼠标落下时的X
          This.y = e.offsetY; // 鼠标落下时的Y
           mycanvas.onmousemove=function(e){
             This.canvasx=e.offsetX-This.x+This.canvasx
             This.canvasy=e.offsetY-This.y+This.canvasy
             This.canvasclickbtn=false
             console.log(This.canvasx,This.canvasy)
           }
              
           mycanvas.onmouseup=function(e){
            mycanvas.onmousemove = null;
            mycanvas.onmouseup = null; 
            console.log(This.position)
            if(This.canvasclickbtn){
            if(e.offsetX==This.x&&e.offsetY==This.y){
              This.position.push({positionX:This.x,positionY:This.y})
              ctx.beginPath();
          // 绘制圆，参数（x坐标，y坐标，圆半径，起始角度，终止角度）
          ctx.arc(This.x, This.y, 3, 0, 2*Math.PI);  
          // 填充颜色
          if(This.btnactive=='1'){
                  ctx.fillStyle= "rgba(30,249,97,0.8)";
                }
                else{
                  ctx.fillStyle= "rgba(255,0,0,0.8)";
                }
          // 开始填充
          ctx.fill();
          ctx.closePath();
              if(This.btnactive=='0'){
              console.log(This.position)
              if(This.position.length==2){
                  ctx.beginPath();
                  ctx.moveTo(This.position[0].positionX,This.position[0].positionY)
                  ctx.lineTo(This.position[1].positionX,This.position[1].positionY)
                  ctx.closePath();
                  ctx.lineWidth=2;
                  ctx.strokeStyle = "rgba(255,0,0,0.8)";
                  ctx.stroke();
                  var x1=(This.position[0].positionX-This.position[1].positionX)/This.mousescale
                  var y1=(This.position[0].positionY-This.position[1].positionY)/This.mousescale
                  var markLensqrt1=Math.sqrt(x1*x1+y1*y1).toFixed(2)
                  console.log(markLensqrt1)
                  This.markLensqrt1=markLensqrt1
                  This.savemark()
                  setTimeout(function(){This.position=[]},100)
                }
          }
          else if(This.btnactive=='1'){
             if(This.position.length>=2){
                  ctx.beginPath();
                  ctx.moveTo(This.position[This.position.length-2].positionX,This.position[This.position.length-2].positionY)
                  ctx.lineTo(This.position[This.position.length-1].positionX,This.position[This.position.length-1].positionY)
                  ctx.closePath();
                  ctx.lineWidth=2;
                  ctx.strokeStyle = "rgba(30,249,97,0.8)";
                  ctx.stroke();
                  if(This.position.length==3){
                    var c1=Math.atan2(This.position[0].positionY-This.position[1].positionY,This.position[0].positionX-This.position[1].positionX) * 180 / (Math.PI);
                            var c2=Math.atan2(This.position[2].positionY-This.position[1].positionY,This.position[2].positionX-This.position[1].positionX) * 180 / (Math.PI);
                            c1 = c1 <= -90 ? (360 + c1) : c1;
                            c2 = c2 <= -90 ? (360 + c2) : c2;
                            var angle=''
                             angle = Math.floor(c2 - c1);
                             angle = angle < 0 ? angle + 360 : angle;
                             angle = angle>180?360-angle:angle
                            This.angledata=angle
                            console.log(angle)
                            This.savemark()
                            setTimeout(function(){This.position=[]},100)
                  }
             }
          }     
            }
          }
          else{
            This.canvasclickbtn=true
          }
        };
        }

      }
   },
   getmarklist:function(){
      var This=this
      this.$http.get('http://upload.truthai.cn/fileapi/mark/getMarkList?serialNo='+this.$route.query.serialno,{headers:{Authorization: "Bearer " + localStorage.token}}
        ).then(function(response){
          var res=response.body
          console.log(res)
          if(res.code==0){
            this.datalists=res.data.markList
            console.log(this.datalists)
            this.canvas()
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
   },
   savemark:function(){
      var This=this
      for(var i=0;i<This.position.length;i++){
                     console.log(This.position[i].positionX)
                     This.position[i].positionX=This.position[i].positionX/This.mousescale
                     console.log(This.position[i].positionX)
                     This.position[i].positionY=This.position[i].positionY/This.mousescale
                  }
      this.$http.post('http://upload.truthai.cn/fileapi/mark/saveMark',{'serialNo':this.$route.query.serialno,'markType':this.btnactive=='0'?'长度':'角度','markValue':this.btnactive=='0'?this.markLensqrt1+'px':this.angledata+'°','markResult':JSON.stringify(this.position)},{emulateJSON: true}
        ).then(function(response){
          var res=response.body
          console.log(res)
          if(res.code==0){
             this.$message({
                   type:'success',
                   message:'绘制成功',
                   duration:1000
            })
             this.getmarklist()
          }
          else{
             this.$message({
                   type:'warning',
                   message:res.msg
             })
          }
      })
   },
   length:function(){
         this.btnactive=0
         this.position=[]
   },
   angle:function(){
         this.btnactive=1
         this.position=[]
   },
 }
}
</script>
<style scoped>
.mark{width:100%; height:100%; position: fixed; left:0; top:0;  z-index:20; display: block;}
.maindiv{ width: 100%; display: flex; }
.leftdiv{ width: 1600px; min-height: 1200px;}
.rightdiv{flex: 1;}
#canvasimg{ margin: 0 auto; }
.divbtn{ width: 100%; height: 50px; background:#001529; border-top: 1px solid rgba(0,0,0,0.1); position: relative;  }
.ulbtn{ height: 35px; width: 300px; margin-top: 2px; margin-left: 104px;  }
.ulbtn li{ line-height: 35px; width: 70px; text-align: center; border-radius: 4px; margin-left: 10px; color: #909399; background: #f4f4f5; display: inline-block; vertical-align: top; cursor: pointer; transition: 0.4s;}
.ulbtn li:hover{color: #fff; background:#409EFF;}
.ulbtn .active{color: #fff; background:#409EFF;}
.scalediv{ position: absolute; width: 100px; height: 50px; line-height: 50px; text-align: center; right: 20px;top: 0; font-size: 22px; color:#fff; }
</style>
<style scoped>
/deep/ .el-table__body tr:hover>td {
    background-color: #1b8ffe !important;
    color:#fff;
}
</style>