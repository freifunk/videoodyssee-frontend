"use strict";(self.webpackChunkvideoodyssee_frontend=self.webpackChunkvideoodyssee_frontend||[]).push([[593],{593:function(e,n,l){l.r(n),l.d(n,{default:function(){return b}});var s=l(8214),i=l(5861),a=l(4942),t=l(1413),r=l(885),c=l(1889),o=l(5646),u=l(4070),d=l(703),h=l(8096),p=l(7391),x=l(4578),Z=l(4925),j=l(8406),f=l(5022),g=l(6151),m=l(2791),v=l(184),C={title:"",subtitle:"",persons:[],tags:[],conference:"",language:"eng",date:(new Date).toISOString().split("T")[0],url:"",name:"",email:"",link:"",description:""},b=function(){var e=(0,m.useState)(C),n=(0,r.Z)(e,2),l=n[0],b=n[1],S=(0,m.useState)({err:!1,message:""}),_=(0,r.Z)(S,2),T=_[0],E=_[1],W=(0,m.useState)({success:!1,message:""}),O=(0,r.Z)(W,2),k=O[0],y=O[1],P=(0,m.useState)([]),z=(0,r.Z)(P,2),D=z[0],R=z[1],A=function(e){var n=e.target,s=n.name,i=n.value;b((0,t.Z)((0,t.Z)({},l),{},(0,a.Z)({},s,i)))},L=function(e,n){b((0,t.Z)((0,t.Z)({},l),{},(0,a.Z)({},e,n)))},w=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var i,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,fetch("".concat({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_API_URL,"/video/"),{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(l)});case 4:return i=e.sent,e.next=7,i.json();case 7:a=e.sent,console.log(a),200===i.status?y({success:!0,message:a.data}):E({err:!0,message:a.message}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(n){return e.apply(this,arguments)}}();return(0,m.useEffect)((function(){var e=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VOCTOWEB_API_URL,"/public/conferences"),{headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return n=e.sent,e.next=6,n.json();case 6:i=e.sent,R(i.conferences),b((0,t.Z)((0,t.Z)({},l),{},{conference:i.conferences[0].acronym})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,v.jsxs)(c.ZP,{children:[(0,v.jsx)(o.Z,{open:k.success,anchorOrigin:{vertical:"top",horizontal:"right"},autoHideDuration:6e3,onClose:function(){return y({success:!1})},children:(0,v.jsx)(u.Z,{onClose:function(){return y({success:!1})},severity:"success",sx:{width:"100%"},children:k.message})}),(0,v.jsx)(o.Z,{open:T.err,anchorOrigin:{vertical:"top",horizontal:"right"},autoHideDuration:6e3,onClose:function(){return E({err:!1})},children:(0,v.jsx)(u.Z,{onClose:function(){return E({err:!1})},severity:"error",sx:{width:"100%"},children:T.message})}),(0,v.jsxs)(d.Z,{elevation:10,className:"paper",children:[(0,v.jsx)("img",{src:"/static/images/logo/logo-small.png",alt:"Friefunk logo"}),(0,v.jsx)("h2",{align:"center",children:"Video Upload "}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.title,name:"title",onChange:A,id:"outlined-basic",label:"Title",variant:"outlined",size:"small",autoFocus:!0})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.subtitle,name:"subtitle",onChange:A,id:"outlined-basic",label:"Subtitle",variant:"outlined",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(x.Z,{multiple:!0,id:"persons",onChange:function(e,n){return L("persons",n)},options:[],freeSolo:!0,size:"small",renderInput:function(e){return(0,v.jsx)(p.Z,(0,t.Z)((0,t.Z)({},e),{},{label:"Persons"}))}})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(x.Z,{multiple:!0,id:"tags",onChange:function(e,n){return L("tags",n)},options:[],freeSolo:!0,size:"small",renderInput:function(e){return(0,v.jsx)(p.Z,(0,t.Z)((0,t.Z)({},e),{},{label:"Tags"}))}})})}),(0,v.jsx)("p",{children:(0,v.jsxs)(h.Z,{fullWidth:!0,children:[(0,v.jsx)(Z.Z,{id:"event-select-label",children:"Conference"}),(0,v.jsx)(j.Z,{labelId:"event-select-label",id:"conference",name:"conference",value:l.conference,onChange:A,label:"Conference",size:"small",children:D.map((function(e,n){var l=e.acronym,s=e.title;return(0,v.jsx)(f.Z,{value:l,children:s})}))})]})}),(0,v.jsx)("p",{children:(0,v.jsxs)(h.Z,{fullWidth:!0,children:[(0,v.jsx)(Z.Z,{id:"lang-select-label",children:"Language"}),(0,v.jsxs)(j.Z,{labelId:"lang-select-label",id:"language",name:"language",value:l.language,onChange:A,label:"Language",size:"small",children:[(0,v.jsx)(f.Z,{value:"eng",children:"English"}),(0,v.jsx)(f.Z,{value:"deu",children:"German"}),(0,v.jsx)(f.Z,{value:"rus",children:"Russian"}),(0,v.jsx)(f.Z,{value:"fra",children:"French"}),(0,v.jsx)(f.Z,{value:"spa",children:"Spanish"}),(0,v.jsx)(f.Z,{value:"jpn",children:"Japaneese"}),(0,v.jsx)(f.Z,{value:"hin",children:"Hindi"})]})]})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.date,name:"date",onChange:A,id:"date",label:"Date",type:"date",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.url,onChange:A,name:"url",id:"url",label:"Video URL",type:"url",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.name,onChange:A,name:"name",id:"name",label:"Name",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.email,onChange:A,name:"email",id:"email",label:"Email",type:"email",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.link,onChange:A,name:"link",id:"link",label:"Link",size:"small"})})}),(0,v.jsx)("p",{children:(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(p.Z,{value:l.description,onChange:A,name:"description",id:"description",label:"Description",size:"small",multiline:!0})})}),(0,v.jsx)(h.Z,{fullWidth:!0,children:(0,v.jsx)(g.Z,{variant:"contained",onClick:w,children:"Submit"})})]})]})}}}]);
//# sourceMappingURL=593.5d3f0b14.chunk.js.map