webpackJsonp([1],{0:function(t,i){},"1m3C":function(t,i){},"4dKq":function(t,i){},AxnP:function(t,i){},D3Y9:function(t,i){},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("7+uW"),a={name:"top",data:function(){return{}},methods:{handleClick:function(){},backlogin:function(){localStorage.token="",this.$router.push({path:"/"})},changepass:function(){this.$router.push({path:"/changeword"})}}},o={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"topdiv"},[e("ul",{staticClass:"tabul"},[e("li",[e("router-link",{attrs:{to:{path:"/list"}}},[e("img",{attrs:{src:"/static/image/list.png"}}),e("img",{staticClass:"show",attrs:{src:"/static/image/listactive.png"}}),e("span",[t._v("数据列表")])])],1),t._v(" "),e("li",[e("router-link",{attrs:{to:{path:"/infoEntry"}}},[e("img",{attrs:{src:"/static/image/onfor.png"}}),e("img",{staticClass:"show",attrs:{src:"/static/image/onforactive.png"}}),e("span",[t._v("数据上传")])])],1)]),t._v(" "),e("div",{staticClass:"off",on:{click:t.backlogin}},[t._v("退出登录")]),t._v(" "),e("div",{staticClass:"off",staticStyle:{"margin-right":"140px"},on:{click:t.changepass}},[t._v("修改密码")])])},staticRenderFns:[]};var n=e("VU/8")(a,o,!1,function(t){e("D3Y9")},"data-v-06fe7fe8",null).exports,l={name:"app",components:{top:n}},r={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},["login"!==this.$route.name?i("top"):this._e(),this._v(" "),i("router-view")],1)},staticRenderFns:[]};var c=e("VU/8")(l,r,!1,function(t){e("O6o6")},null,null).exports,p=e("/ocq"),u=e("mvHQ"),h=e.n(u),d={name:"list",data:function(){return{mainheight:"",pageSize:10,pageNum:1,source:"",datalists:null,positiondatas:null,positionvalue:"",hospitalvalue:"",hospitaldata:null,total:null,serialNo:"",uuid:"",picUrl:null,markshow:!1,canvasshow:!1,noshow:!1,pospitaluser:"",viewimage:"",x:null,y:null,position:[],transformStyle:null,scale:1,arrDPI:null,host:"",angle:"",filds:[]}},mounted:function(){var t=new Array;if(window.screen.deviceXDPI)t=window.screen.deviceXDPI;else{var i=document.createElement("DIV");i.style.cssText="width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden",document.body.appendChild(i),t=parseInt(i.offsetWidth),i.parentNode.removeChild(i)}this.arrDPI=t,this.mainheight=document.documentElement.clientHeight-64,this.listdata(),this.positionlist(),this.hospitalinfor(),this.host=window.location.host},methods:{derive:function(){if(console.log(this.filds),""==this.filds)this.$message({type:"warning",message:"请选中要导出的文件",duration:1500});else{var t=this.filds.join(",");window.location.href="http://upload.truthai.cn/fileapi/export?fileIds="+t+"&Authorization=Bearer "+localStorage.token}},handleSelectionChange:function(t){this.filds=[];for(var i=0;i<t.length;i++)this.filds.push(t[i].fileId)},rollImg:function(t){t.wheelDelta>0?(this.scale=this.scale+.1,this.transformStyle="transform:scale("+this.scale+")"):(this.scale=this.scale-.1,this.transformStyle="transform:scale("+this.scale+")")},empty:function(){this.position=[],this.canvas()},canvas:function(){var t=document.getElementById("canvasimg"),i=t.getContext("2d"),e=new Image,s=this;""==this.uuid?e.src="http://upload.truthai.cn/fileapi/image/viewImage/"+this.serialNo:e.src=this.picUrl,e.onload=function(){var a=null,o=1;e.width>=800?(a=800,o=800/e.width):(a=e.width,o=1),t.width=a,t.height=e.height*o,i.drawImage(e,0,0,a,e.height*o),s.position.length>=2&&(i.beginPath(),i.arc(s.position[0].positionX,s.position[0].positionY,3,0,2*Math.PI),i.fillStyle="rgba(255,0,0,0.5)",i.fill(),i.closePath(),i.beginPath(),i.arc(s.position[1].positionX,s.position[1].positionY,3,0,2*Math.PI),i.fillStyle="rgba(255,0,0,0.5)",i.fill(),i.closePath(),i.beginPath(),i.arc(s.position[2].positionX,s.position[2].positionY,3,0,2*Math.PI),i.fillStyle="rgba(255,0,0,0.5)",i.fill(),i.closePath(),i.beginPath(),i.moveTo(s.position[0].positionX,s.position[0].positionY),i.lineTo(s.position[1].positionX,s.position[1].positionY),i.lineTo(s.position[2].positionX,s.position[2].positionY),i.lineWidth=2,i.strokeStyle="rgba(255,0,0,0.6)",i.stroke(),i.closePath())},t.onmousedown=function(t){s.x=t.offsetX,s.y=t.offsetY},t.onmouseup=function(t){if(console.log(s.position),t.offsetX==s.x&&t.offsetY==s.y)if(s.position.length>=3);else if(s.position.push({positionX:s.x,positionY:s.y}),i.beginPath(),i.arc(s.x,s.y,3,0,2*Math.PI),i.fillStyle="rgba(255,0,0,0.6)",i.fill(),i.closePath(),s.position.length>=2){if(console.log(s.position,s.position.length),i.beginPath(),i.moveTo(s.position[s.position.length-2].positionX,s.position[s.position.length-2].positionY),i.lineTo(s.position[s.position.length-1].positionX,s.position[s.position.length-1].positionY),3==s.position.length){var e=180*Math.atan2(s.position[0].positionY-s.position[1].positionY,s.position[0].positionX-s.position[1].positionX)/Math.PI,a=180*Math.atan2(s.position[2].positionY-s.position[1].positionY,s.position[2].positionX-s.position[1].positionX)/Math.PI;e=e<=-90?360+e:e,a=a<=-90?360+a:a;var o="";o=(o=(o=Math.floor(a-e))<0?o+360:o)>180?360-o:o,s.angle=o}i.lineWidth=2,i.strokeStyle="rgba(255,0,0,0.6)",i.stroke(),i.closePath()}}},positionfirm:function(){var t="";if(3==this.position.length){var i=this.position,e=i[0].positionX-i[1].positionX,s=i[0].positionY-i[1].positionY;t=(Math.sqrt(e*e+s*s)/this.arrDPI*25.4/10).toFixed(2);var a=i[2].positionX-i[1].positionX,o=i[2].positionY-i[1].positionY,n=t+","+(Math.sqrt(a*a+o*o)/this.arrDPI*25.4/10).toFixed(2);console.log(n),this.$http.post("http://upload.truthai.cn/fileapi/file/updateMark",{serialNo:this.serialNo,markLen:n,markResult:h()(this.position),markDegree:this.angle},{emulateJSON:!0}).then(function(t){var i=t.body;console.log(i),"ok"==i.msg?(this.$message({type:"success",message:"保存成功"}),this.listdata()):-2==i.code?this.$router.push({path:"/"}):this.$message({type:"warning",message:i.msg})})}else this.$message({type:"warning",message:"请选中三点"})},pagenumchange:function(t){this.pageNum=t,this.listdata()},searchlist:function(){this.listdata()},listdata:function(){var t=this;this.$http.get("http://upload.truthai.cn/fileapi/file/list?position="+this.positionvalue+"&pageSize="+this.pageSize+"&pageNum="+this.pageNum+"&source="+this.source,{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(i){var e=i.body;console.log(e),0==e.code?(t.datalists=e.data.list,t.total=e.data.total):-2==e.code?this.$router.push({path:"/"}):t.$message({message:e.msg,type:"error",duration:1500})})},dateFormatter:function(t,i){var e=t[i.property];return e?(e=new Date(e)).getFullYear()+"-"+(e.getMonth()+1+"-")+e.getDate():""},handleEdit:function(t,i){this.serialNo=i.serialNo,this.uuid=i.uuid,this.picUrl=i.picUrl,this.markshow=!0},imgclose:function(){this.markshow=!1},handleCanvas:function(t,i){this.$router.push({path:"/detail",query:{serialno:i.serialNo,uuid:i.uuid,picurl:i.picUrl}}),this.serialNo=i.serialNo,this.uuid=i.uuid,this.picUrl=i.picUrl,this.angle=i.markDegree,i.markResult?this.position=JSON.parse(i.markResult):this.position=[],this.canvasshow=!0,this.canvas()},canvasclose:function(){this.canvasshow=!1},positionlist:function(){this.$http.get("http://upload.truthai.cn/fileapi/sys/getPositionList",{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(t){var i=t.body;this.positiondatas=i.data})},hospitalinfor:function(){this.$http.get("http://upload.truthai.cn/fileapi/hospital/getHospitalList",{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(t){var i=t.body;this.hospitaldata=i.data,console.log(this.hospitaldata)})},handleItemChange:function(t){this.$http.get("http://upload.truthai.cn/fileapi/hospital/getUserList?hospitalCode="+t,{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(t){var i=t.body;this.hospitaldata[0].children=i.data,this.hospitaldata[0].children.label=i.data[0].value})},clearCheckedNodes:function(){this.hospitalvalue="",this.source="",this.positionvalue=""},selectChanged:function(t){var i=this;if(""==t)this.source="";else{this.hospitaldata.find(function(e){e.value===t&&(i.source=e.key)})}}}},m={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{width:"100%",height:"100%"}},[e("div",{staticClass:"maincontent",style:{minHeight:t.mainheight+"px"}},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[t._v("首页")]),t._v(" "),e("el-breadcrumb-item",[t._v("数据列表")])],1),t._v(" "),e("div",{staticClass:"searchdiv"},[e("span",{staticStyle:{"margin-right":"10px","font-size":"16px",color:"rgba(0, 0, 0, 0.65)"}},[t._v("部位名称：")]),t._v(" "),e("el-select",{staticStyle:{"margin-right":"80px"},attrs:{filterable:"",clearable:"",placeholder:"请先选择部位搜索"},model:{value:t.positionvalue,callback:function(i){t.positionvalue=i},expression:"positionvalue"}},t._l(t.positiondatas,function(t){return e("el-option",{key:t.code,attrs:{label:t.name,value:t.description}})}),1),t._v(" "),e("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择数据来源"},on:{change:t.selectChanged},model:{value:t.hospitalvalue,callback:function(i){t.hospitalvalue=i},expression:"hospitalvalue"}},t._l(t.hospitaldata,function(t){return e("el-option",{key:t.key,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),e("div",{staticClass:"buttondiv"},[e("el-button",{staticStyle:{width:"80px"},attrs:{type:"primary",plain:""},on:{click:t.clearCheckedNodes}},[t._v("清空")]),t._v(" "),e("el-button",{staticStyle:{"margin-left":"20px",width:"80px"},attrs:{type:"primary"},on:{click:t.searchlist}},[t._v("搜索")]),t._v(" "),e("el-button",{staticStyle:{"margin-left":"120px",width:"80px"},attrs:{type:"success"},on:{click:t.derive}},[t._v("导出")])],1)],1),t._v(" "),e("div",{staticClass:"tablediv"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.datalists,stripe:""},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"65"}}),t._v(" "),e("el-table-column",{attrs:{prop:"name",label:"文件名",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"addTime",formatter:t.dateFormatter,label:"时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"source",label:"来源"}}),t._v(" "),e("el-table-column",{attrs:{prop:"position",label:"部位"}}),t._v(" "),e("el-table-column",{attrs:{prop:"sex",label:"性别"}}),t._v(" "),e("el-table-column",{attrs:{prop:"age",label:"年龄"}}),t._v(" "),e("el-table-column",{attrs:{prop:"side",label:"侧别"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){return[t.noshow?e("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.handleEdit(i.$index,i.row)}}},[t._v("查看图片")]):t._e(),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.handleCanvas(i.$index,i.row)}}},[t._v("标记图片")])]}}])})],1),t._v(" "),e("el-pagination",{staticStyle:{"margin-top":"40px","margin-bottom":"26px"},attrs:{background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":function(i){return t.pagenumchange(i)}}})],1)],1),t._v(" "),t.markshow?e("div",{staticClass:"mark"},[e("div",{staticClass:"markcon"},[e("p",{staticClass:"ptitle"},[e("span",{staticClass:"baifenbi"},[t._v(t._s(Math.floor(100*t.scale))+"%")]),e("img",{staticClass:"close",attrs:{src:"/static/image/close.png"},on:{click:t.imgclose}})]),t._v(" "),e("div",{staticClass:"imgdiv"},[""==t.uuid?e("img",{staticClass:"imgpic",style:t.transformStyle,attrs:{src:"http://upload.truthai.cn/fileapi/image/viewImage/"+t.serialNo},on:{mousewheel:function(i){return i.preventDefault(),t.rollImg(i)}}}):t._e(),t._v(" "),""!=t.uuid?e("img",{staticClass:"imgpic",style:t.transformStyle,attrs:{src:t.picUrl},on:{mousewheel:function(i){return i.preventDefault(),t.rollImg(i)}}}):t._e()])])]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.canvasshow,expression:"canvasshow"}],staticClass:"mark"},[e("div",{staticClass:"markcon",staticStyle:{display:"block","max-height":"80%"}},[e("p",{staticClass:"ptitle"},[e("span",{staticClass:"baifenbi"},[e("el-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"mini"},on:{click:t.empty}},[t._v("清空")]),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.positionfirm}},[t._v("保存")]),e("span",{staticStyle:{"margin-left":"20px","font-size":"12px"}},[t._v("点击清空可对标注进行修改，点击保存则标注数据提交")])],1),e("img",{staticClass:"close",attrs:{src:"/static/image/close.png"},on:{click:t.canvasclose}})]),t._v(" "),t._m(0)])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"imgdiv",staticStyle:{"max-height":"80%"}},[i("canvas",{attrs:{id:"canvasimg"}})])}]};var g=e("VU/8")(d,m,!1,function(t){e("aJlz")},"data-v-0a7085a2",null).exports,v={name:"login",data:function(){return{input:"",password:"",newpassword:""}},methods:{login:function(){var t=this;this.$http.post("http://upload.truthai.cn/fileapi/auth/login",{userName:this.input,pswd:this.password},{emulateJSON:!0}).then(function(i){var e=i.body;console.log(e),0==e.code?(localStorage.token=e.data.token,t.$router.push({path:"/list"})):t.$message({message:e.msg,type:"error",duration:1500})})}}},f={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"marks"},[e("div",{staticClass:"poxdiv"},[e("p",{staticClass:"ptitle"},[t._v("文件上传平台")]),t._v(" "),e("el-input",{staticClass:"logininput",staticStyle:{"margin-bottom":"30px"},attrs:{placeholder:"用户名",clearable:""},model:{value:t.input,callback:function(i){t.input=i},expression:"input"}}),t._v(" "),e("el-input",{staticClass:"logininput",attrs:{placeholder:"请输入密码","show-password":"",clearable:""},model:{value:t.password,callback:function(i){t.password=i},expression:"password"}}),t._v(" "),e("el-button",{staticStyle:{"margin-top":"25px",width:"100px"},attrs:{type:"primary",size:"medium"},on:{click:t.login}},[t._v("登录")])],1)])},staticRenderFns:[]};var b=e("VU/8")(v,f,!1,function(t){e("4dKq")},"data-v-8fb856f8",null).exports,k={name:"entry",data:function(){return{mainheight:"",positiondatas:null,positionvalue:"",loading:!1}},mounted:function(){console.log(document.documentElement.clientHeight),this.mainheight=document.documentElement.clientHeight-64,this.positionlist(),""==localStorage.token&&this.$router.push({path:"/"})},methods:{positionlist:function(){this.$http.get("http://upload.truthai.cn/fileapi/sys/getPositionList",{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(t){var i=t.body;this.positiondatas=i.data,console.log(i.data)})},uploadSectionFile:function(t){var i=this,e=t.file,s=new FormData;s.append("attach",e),s.append("position",this.positionvalue),this.loading=!0,this.$http.post("http://upload.truthai.cn/fileapi/upload/uploadFile",s).then(function(t){console.log(t),i.loading=!1,"ok"==t.data.msg?i.$message({type:"success",message:"上传成功"}):-2==t.code?i.$router.push({path:"/"}):i.$message({type:"warning",message:t.data.msg})})}}},y={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"maincontent",style:{minHeight:t.mainheight+"px"}},[e("el-breadcrumb",{staticStyle:{padding:"20px 0"},attrs:{separator:"/"}},[e("el-breadcrumb-item",[t._v("首页")]),t._v(" "),e("el-breadcrumb-item",[t._v("数据上传")])],1),t._v(" "),e("div",{staticClass:"entrydiv"},[e("span",{staticClass:"entryspan"},[t._v("部位名称：")]),t._v(" "),e("el-select",{staticStyle:{width:"300px"},attrs:{filterable:"",placeholder:"请先选择部位搜索"},model:{value:t.positionvalue,callback:function(i){t.positionvalue=i},expression:"positionvalue"}},t._l(t.positiondatas,function(t){return e("el-option",{key:t.code,attrs:{label:t.name,value:t.description}})}),1),t._v(" "),e("div",{staticClass:"psdiv"},[t._v("请先输入部位名，再选择文件完成上传")]),t._v(" "),e("div",{staticClass:"entryspan",staticStyle:{"margin-bottom":"10px","margin-top":"20px"}},[t._v("文件内容：")]),t._v(" "),e("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"http://upload.truthai.cn/fileapi/upload/uploadFile","http-request":t.uploadSectionFile,multiple:""}},[e("i",{staticClass:"el-icon-upload"}),t._v(" "),e("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),e("em",[t._v("点击上传")])])])],1),t._v(" "),t.loading?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"mark"}):t._e()],1)},staticRenderFns:[]};var w=e("VU/8")(k,y,!1,function(t){e("dss4")},"data-v-354e9c6c",null).exports,_={name:"chnageword",data:function(){return{newpassword:""}},methods:{submitword:function(){var t=this;this.$http.post("http://upload.truthai.cn/fileapi/user/resetPwd",{password:this.newpassword},{emulateJSON:!0}).then(function(i){var e=i.body;console.log(e),0==e.code?(t.$message({message:"修改成功",type:"success",duration:1500}),t.$router.push({path:"/list"})):t.$message({message:e.msg,type:"error",duration:1500})})}}},S={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"marks"},[e("div",{staticClass:"poxdiv"},[e("p",{staticClass:"ptitle"},[t._v("文件上传平台")]),t._v(" "),e("el-input",{staticClass:"logininput",attrs:{placeholder:"请输入新密码","show-password":"",clearable:""},model:{value:t.newpassword,callback:function(i){t.newpassword=i},expression:"newpassword"}}),t._v(" "),e("el-button",{staticStyle:{"margin-top":"25px",width:"100px"},attrs:{type:"primary",size:"medium"},on:{click:t.submitword}},[t._v("提交")])],1)])},staticRenderFns:[]};var x=e("VU/8")(_,S,!1,function(t){e("AxnP")},"data-v-7e0f884d",null).exports,C={name:"entry",data:function(){return{mainheight:"",positiondatas:null,positionvalue:"",loading:!1,datalists:null,btnactive:0,position:[],angledata:"",markLensqrt1:"",selectedIndex:"",currentRow:"",imgshow:!0,mousescale:1,showscale:100,canvasx:0,canvasy:0,canvasclickbtn:!0}},mounted:function(){this.getmarklist()},methods:{handleCurrentChange:function(t){this.currentRow=t,this.selectedIndex=t.index,console.log(this.selectedIndex)},rowClass:function(t){t.row;var i=t.rowIndex;return this.selectedIndex===i?(console.log(i),{"background-color":"#1b8ffe",color:"#fff"}):{background:"#001529",color:"#b0b8bd"}},tableRowClassName:function(t){var i=t.row,e=t.rowIndex;i.index=e},deletemark:function(t){this.loading=!0;this.$http.post("http://upload.truthai.cn/fileapi/mark/deleteMark",{markId:t.row.markId},{emulateJSON:!0}).then(function(t){var i=t.body;console.log(i),this.loading=!1,0==i.code?(this.getmarklist(),this.$message({type:"success",message:"删除成功"}),this.selectedIndex=""):this.$message({type:"warning",message:i.message})})},canvas:function(){var t=document.getElementById("canvasimg"),i=t.getContext("2d"),e=new Image,s=this;""==this.$route.query.uuid?e.src="http://upload.truthai.cn/fileapi/image/viewImage/"+this.$route.query.serialno:e.src=this.$route.query.picurl;var a=1;e.onload=function(){var o=null;e.width>=1600?(o=1600,a=1600/e.width):(o=e.width,a=1),t.width=o*s.mousescale,t.height=e.height*a*s.mousescale,i.drawImage(e,0,0,o*s.mousescale,e.height*a*s.mousescale);for(var n=0;n<s.datalists.length;n++){for(var l=0;l<JSON.parse(s.datalists[n].markResult).length;l++)i.beginPath(),i.arc(JSON.parse(s.datalists[n].markResult)[l].positionX*s.mousescale,JSON.parse(s.datalists[n].markResult)[l].positionY*s.mousescale,3,0,2*Math.PI),3==JSON.parse(s.datalists[n].markResult).length?i.fillStyle="rgba(30,249,97,0.8)":i.fillStyle="rgba(255,0,0,0.8)",i.fill(),i.closePath(),i.lineTo(JSON.parse(s.datalists[n].markResult)[l].positionX*s.mousescale,JSON.parse(s.datalists[n].markResult)[l].positionY*s.mousescale);i.beginPath();for(l=0;l<JSON.parse(s.datalists[n].markResult).length;l++)i.lineTo(JSON.parse(s.datalists[n].markResult)[l].positionX*s.mousescale,JSON.parse(s.datalists[n].markResult)[l].positionY*s.mousescale);i.lineWidth=2,i.strokeStyle="rgba(255,0,0,0.8)",3==JSON.parse(s.datalists[n].markResult).length?(i.strokeStyle="rgba(30,249,97,0.8)",i.fillStyle="rgba(30,249,97,0.8)",i.font="14px Arial",i.fillText(s.datalists[n].markValue,JSON.parse(s.datalists[n].markResult)[1].positionX*s.mousescale+10,JSON.parse(s.datalists[n].markResult)[1].positionY*s.mousescale+10)):(i.strokeStyle="rgba(255,0,0,0.8)",i.fillStyle="rgba(255,0,0,0.8)",i.font="14px Arial",i.fillText(s.datalists[n].markValue,((JSON.parse(s.datalists[n].markResult)[1].positionX+JSON.parse(s.datalists[n].markResult)[0].positionX)/2+10)*s.mousescale,((JSON.parse(s.datalists[n].markResult)[0].positionY+JSON.parse(s.datalists[n].markResult)[1].positionY)/2+10)*s.mousescale)),i.stroke(),i.closePath()}t.onmousewheel=function(n){var l=n||event;i.clearRect(0,0,o,e.height*a),s.position=[],l.wheelDelta>0?s.mousescale=s.mousescale+.1:l.wheelDelta<0&&(s.mousescale=s.mousescale-.1),s.showscale=parseFloat(100*s.mousescale).toFixed(0),t.width=o*s.mousescale,t.height=e.height*a*s.mousescale,i.drawImage(e,0,0,o*s.mousescale,e.height*a*s.mousescale);for(var r=0;r<s.datalists.length;r++){console.log(JSON.parse(s.datalists[r].markResult));for(var c=0;c<JSON.parse(s.datalists[r].markResult).length;c++)i.beginPath(),i.arc(JSON.parse(s.datalists[r].markResult)[c].positionX*s.mousescale,JSON.parse(s.datalists[r].markResult)[c].positionY*s.mousescale,3,0,2*Math.PI),3==JSON.parse(s.datalists[r].markResult).length?i.fillStyle="rgba(30,249,97,0.8)":i.fillStyle="rgba(255,0,0,0.8)",i.fill(),i.closePath(),i.lineTo(JSON.parse(s.datalists[r].markResult)[c].positionX*s.mousescale,JSON.parse(s.datalists[r].markResult)[c].positionY*s.mousescale);i.beginPath();for(c=0;c<JSON.parse(s.datalists[r].markResult).length;c++)i.lineTo(JSON.parse(s.datalists[r].markResult)[c].positionX*s.mousescale,JSON.parse(s.datalists[r].markResult)[c].positionY*s.mousescale);i.lineWidth=2,i.strokeStyle="rgba(255,0,0,0.8)",3==JSON.parse(s.datalists[r].markResult).length?(i.strokeStyle="rgba(30,249,97,0.8)",i.fillStyle="rgba(30,249,97,0.8)",i.font="14px Arial",i.fillText(s.datalists[r].markValue,JSON.parse(s.datalists[r].markResult)[1].positionX*s.mousescale+10,JSON.parse(s.datalists[r].markResult)[1].positionY*s.mousescale+10)):(i.strokeStyle="rgba(255,0,0,0.8)",i.fillStyle="rgba(255,0,0,0.8)",i.font="14px Arial",i.fillText(s.datalists[r].markValue,((JSON.parse(s.datalists[r].markResult)[1].positionX+JSON.parse(s.datalists[r].markResult)[0].positionX)/2+10)*s.mousescale,((JSON.parse(s.datalists[r].markResult)[0].positionY+JSON.parse(s.datalists[r].markResult)[1].positionY)/2+10)*s.mousescale)),i.stroke(),i.closePath()}return!1},t.onmousedown=function(e){s.x=e.offsetX,s.y=e.offsetY,t.onmousemove=function(t){s.canvasx=t.offsetX-s.x+s.canvasx,s.canvasy=t.offsetY-s.y+s.canvasy,s.canvasclickbtn=!1,console.log(s.canvasx,s.canvasy)},t.onmouseup=function(e){if(t.onmousemove=null,t.onmouseup=null,console.log(s.position),s.canvasclickbtn){if(e.offsetX==s.x&&e.offsetY==s.y)if(s.position.push({positionX:s.x,positionY:s.y}),i.beginPath(),i.arc(s.x,s.y,3,0,2*Math.PI),"1"==s.btnactive?i.fillStyle="rgba(30,249,97,0.8)":i.fillStyle="rgba(255,0,0,0.8)",i.fill(),i.closePath(),"0"==s.btnactive){if(console.log(s.position),2==s.position.length){i.beginPath(),i.moveTo(s.position[0].positionX,s.position[0].positionY),i.lineTo(s.position[1].positionX,s.position[1].positionY),i.closePath(),i.lineWidth=2,i.strokeStyle="rgba(255,0,0,0.8)",i.stroke();var a=(s.position[0].positionX-s.position[1].positionX)/s.mousescale,o=(s.position[0].positionY-s.position[1].positionY)/s.mousescale,n=Math.sqrt(a*a+o*o).toFixed(2);console.log(n),s.markLensqrt1=n,s.savemark(),setTimeout(function(){s.position=[]},100)}}else if("1"==s.btnactive&&s.position.length>=2&&(i.beginPath(),i.moveTo(s.position[s.position.length-2].positionX,s.position[s.position.length-2].positionY),i.lineTo(s.position[s.position.length-1].positionX,s.position[s.position.length-1].positionY),i.closePath(),i.lineWidth=2,i.strokeStyle="rgba(30,249,97,0.8)",i.stroke(),3==s.position.length)){var l=180*Math.atan2(s.position[0].positionY-s.position[1].positionY,s.position[0].positionX-s.position[1].positionX)/Math.PI,r=180*Math.atan2(s.position[2].positionY-s.position[1].positionY,s.position[2].positionX-s.position[1].positionX)/Math.PI;l=l<=-90?360+l:l,r=r<=-90?360+r:r;var c="";c=(c=(c=Math.floor(r-l))<0?c+360:c)>180?360-c:c,s.angledata=c,console.log(c),s.savemark(),setTimeout(function(){s.position=[]},100)}}else s.canvasclickbtn=!0}}}},getmarklist:function(){this.$http.get("http://upload.truthai.cn/fileapi/mark/getMarkList?serialNo="+this.$route.query.serialno,{headers:{Authorization:"Bearer "+localStorage.token}}).then(function(t){var i=t.body;console.log(i),0==i.code?(this.datalists=i.data.markList,console.log(this.datalists),this.canvas()):-2==i.code?this.$router.push({path:"/"}):this.$message({type:"warning",message:i.msg})})},savemark:function(){for(var t=0;t<this.position.length;t++)console.log(this.position[t].positionX),this.position[t].positionX=this.position[t].positionX/this.mousescale,console.log(this.position[t].positionX),this.position[t].positionY=this.position[t].positionY/this.mousescale;this.$http.post("http://upload.truthai.cn/fileapi/mark/saveMark",{serialNo:this.$route.query.serialno,markType:"0"==this.btnactive?"长度":"角度",markValue:"0"==this.btnactive?this.markLensqrt1+"px":this.angledata+"°",markResult:h()(this.position)},{emulateJSON:!0}).then(function(t){var i=t.body;console.log(i),0==i.code?(this.$message({type:"success",message:"绘制成功",duration:1e3}),this.getmarklist()):this.$message({type:"warning",message:i.msg})})},length:function(){this.btnactive=0,this.position=[]},angle:function(){this.btnactive=1,this.position=[]}}},N={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"maindiv"},[e("div",{staticClass:"leftdiv"},[e("div",{staticClass:"divbtn"},[e("div",{staticClass:"scalediv"},[t._v(t._s(t.showscale)+"%")]),t._v(" "),e("ul",{staticClass:"ulbtn"},[e("li",{class:"0"==t.btnactive?"active":"",on:{click:t.length}},[t._v("长度")]),t._v(" "),e("li",{class:"1"==t.btnactive?"active":"",on:{click:t.angle}},[t._v("角度")])])]),t._v(" "),e("canvas",{style:{transform:"translate("+t.canvasx+"px,"+t.canvasy+"px)"},attrs:{id:"canvasimg"}})]),t._v(" "),e("div",{staticClass:"rightdiv"},[e("el-table",{staticStyle:{width:"100%",background:"#001529","border-bottom":"1px solid #ccc"},attrs:{data:t.datalists,"header-cell-style":{background:"#001529",color:"#606266"},"row-style":t.rowClass,"row-class-name":t.tableRowClassName},on:{"current-change":t.handleCurrentChange}},[e("el-table-column",{attrs:{type:"index",label:"序号"}}),t._v(" "),e("el-table-column",{attrs:{prop:"markType",label:"类型"}}),t._v(" "),e("el-table-column",{attrs:{prop:"markValue",label:"结果"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){return[i.$index===t.selectedIndex?e("img",{staticStyle:{width:"26px",height:"26px"},attrs:{src:"/static/image/delete.png"},on:{click:function(e){return t.deletemark(i)}}}):t._e()]}}])})],1)],1),t._v(" "),t.loading?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"mark"}):t._e()])},staticRenderFns:[]};var $=e("VU/8")(C,N,!1,function(t){e("1m3C"),e("z6sN")},"data-v-980f94de",null).exports;s.default.use(p.a);var R=new p.a({routes:[{path:"/",name:"login",component:b},{path:"/top",name:"top",component:n},{path:"/list",name:"list",component:g},{path:"/infoEntry",name:"infoEntry",component:w},{path:"/changeword",name:"changeword",component:x},{path:"/detail",name:"detail",component:$}],linkActiveClass:"active"}),X=e("8+8L"),P=e("zL8q"),Y=e.n(P);e("tvR6");s.default.use(Y.a),s.default.use(X.a),s.default.http.options.emulateHTTP=!0,s.default.config.productionTip=!1,s.default.http.interceptors.push(function(t,i){var e=localStorage.token;s.default.http.options.headers={Authorization:"Bearer "+e},i(function(t){return t})}),new s.default({el:"#app",router:R,components:{App:c},template:"<App/>"})},O6o6:function(t,i){},aJlz:function(t,i){},dss4:function(t,i){},tvR6:function(t,i){},z6sN:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.cdc8beb70bdf8de0cd07.js.map