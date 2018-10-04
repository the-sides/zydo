(function(e){"use strict"
var t,r="File format is not recognized.",n="CRC failed.",i="File contains encrypted entry.",o="File is using Zip64 (4gb+ file size).",a="Error while reading zip file.",s="Error while writing zip file.",c="Error while writing file data.",f="Error while reading file data.",u="File already exists.",l=524288,p="text/plain"
try{t=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(e){}function w(){this.crc=-1}function h(){}function v(e,t){var r,n
return r=new ArrayBuffer(e),n=new Uint8Array(r),t&&n.set(t,0),{buffer:r,array:n,view:new DataView(r)}}function d(){}function g(e){var t,r=this
r.size=0,r.init=function(n,i){var o=new Blob([e],{type:p});(t=new m(o)).init(function(){r.size=t.size,n()},i)},r.readUint8Array=function(e,r,n,i){t.readUint8Array(e,r,n,i)}}function y(t){var r,n=this
n.size=0,n.init=function(e){for(var i=t.length;"="==t.charAt(i-1);)i--
r=t.indexOf(",")+1,n.size=Math.floor(.75*(i-r)),e()},n.readUint8Array=function(n,i,o){var a,s=v(i),c=4*Math.floor(n/3),f=4*Math.ceil((n+i)/3),u=e.atob(t.substring(c+r,f+r)),l=n-3*Math.floor(c/4)
for(a=l;a<l+i;a++)s.array[a-l]=u.charCodeAt(a)
o(s.array)}}function m(e){var t=this
t.size=0,t.init=function(r){t.size=e.size,r()},t.readUint8Array=function(t,r,n,i){var o=new FileReader
o.onload=function(e){n(new Uint8Array(e.target.result))},o.onerror=i
try{o.readAsArrayBuffer(function(e,t,r){if(t<0||r<0||t+r>e.size)throw new RangeError("offset:"+t+", length:"+r+", size:"+e.size)
return e.slice?e.slice(t,t+r):e.webkitSlice?e.webkitSlice(t,t+r):e.mozSlice?e.mozSlice(t,t+r):e.msSlice?e.msSlice(t,t+r):void 0}(e,t,r))}catch(e){i(e)}}}function U(){}function z(e){var r
this.init=function(e){r=new Blob([],{type:p}),e()},this.writeUint8Array=function(e,n){r=new Blob([r,t?e:e.buffer],{type:p}),n()},this.getData=function(t,n){var i=new FileReader
i.onload=function(e){t(e.target.result)},i.onerror=n,i.readAsText(r,e)}}function b(t){var r="",n=""
this.init=function(e){r+="data:"+(t||"")+";base64,",e()},this.writeUint8Array=function(t,i){var o,a=n.length,s=n
for(n="",o=0;o<3*Math.floor((a+t.length)/3)-a;o++)s+=String.fromCharCode(t[o])
for(;o<t.length;o++)n+=String.fromCharCode(t[o])
s.length>2?r+=e.btoa(s):n=s,i()},this.getData=function(t){t(r+e.btoa(n))}}function k(e){var r
this.init=function(t){r=new Blob([],{type:e}),t()},this.writeUint8Array=function(n,i){r=new Blob([r,t?n:n.buffer],{type:e}),i()},this.getData=function(e){e(r)}}function A(e,t,r,n,i,o,a,s,c,f){var u,p,w,h=0,v=t.sn
function d(){e.removeEventListener("message",g,!1),s(p,w)}function g(t){var r=t.data,i=r.data,s=r.error
if(s)return s.toString=function(){return"Error: "+this.message},void c(s)
if(r.sn===v)switch("number"==typeof r.codecTime&&(e.codecTime+=r.codecTime),"number"==typeof r.crcTime&&(e.crcTime+=r.crcTime),r.type){case"append":i?(p+=i.length,n.writeUint8Array(i,function(){y()},f)):y()
break
case"flush":w=r.crc,i?(p+=i.length,n.writeUint8Array(i,function(){d()},f)):d()
break
case"progress":a&&a(u+r.loaded,o)
break
case"importScripts":case"newTask":case"echo":break
default:console.warn("zip.js:launchWorkerProcess: unknown message: ",r)}}function y(){(u=h*l)<=o?r.readUint8Array(i+u,Math.min(l,o-u),function(r){a&&a(u,o)
var n=0===u?t:{sn:v}
n.type="append",n.data=r
try{e.postMessage(n,[r.buffer])}catch(t){e.postMessage(n)}h++},c):e.postMessage({sn:v,type:"flush"})}p=0,e.addEventListener("message",g,!1),y()}function S(e,t,r,n,i,o,a,s,c,f){var u,p=0,h=0,v="input"===o,d="output"===o,g=new w;(function o(){var w
if((u=p*l)<i)t.readUint8Array(n+u,Math.min(l,i-u),function(t){var n
try{n=e.append(t,function(e){a&&a(u+e,i)})}catch(e){return void c(e)}n?(h+=n.length,r.writeUint8Array(n,function(){p++,setTimeout(o,1)},f),d&&g.append(n)):(p++,setTimeout(o,1)),v&&g.append(t),a&&a(u,i)},c)
else{try{w=e.flush()}catch(e){return void c(e)}w?(d&&g.append(w),h+=w.length,r.writeUint8Array(w,function(){s(h,g.get())},f)):s(h,g.get())}})()}function _(t,r,n,i,o,a,s,c,f,u,l){e.zip.useWebWorkers&&s?A(t,{sn:r,codecClass:"NOOP",crcType:"input"},n,i,o,a,f,c,u,l):S(new h,n,i,o,a,"input",f,c,u,l)}function D(e){var t,r,n="",i=["Ç","ü","é","â","ä","à","å","ç","ê","ë","è","ï","î","ì","Ä","Å","É","æ","Æ","ô","ö","ò","û","ù","ÿ","Ö","Ü","ø","£","Ø","×","ƒ","á","í","ó","ú","ñ","Ñ","ª","º","¿","®","¬","½","¼","¡","«","»","_","_","_","¦","¦","Á","Â","À","©","¦","¦","+","+","¢","¥","+","+","-","-","+","-","+","ã","Ã","+","+","-","-","¦","-","+","¤","ð","Ð","Ê","Ë","È","i","Í","Î","Ï","+","+","_","_","¦","Ì","_","Ó","ß","Ô","Ò","õ","Õ","µ","þ","Þ","Ú","Û","Ù","ý","Ý","¯","´","­","±","_","¾","¶","§","÷","¸","°","¨","·","¹","³","²","_"," "]
for(t=0;t<e.length;t++)n+=(r=255&e.charCodeAt(t))>127?i[r-128]:String.fromCharCode(r)
return n}function L(e){return decodeURIComponent(escape(e))}function M(e){var t,r=""
for(t=0;t<e.length;t++)r+=String.fromCharCode(e[t])
return r}function W(e,t,r,n,a){e.version=t.view.getUint16(r,!0),e.bitFlag=t.view.getUint16(r+2,!0),e.compressionMethod=t.view.getUint16(r+4,!0),e.lastModDateRaw=t.view.getUint32(r+6,!0),e.lastModDate=function(e){var t=(4294901760&e)>>16,r=65535&e
try{return new Date(1980+((65024&t)>>9),((480&t)>>5)-1,31&t,(63488&r)>>11,(2016&r)>>5,2*(31&r),0)}catch(e){}}(e.lastModDateRaw),1!=(1&e.bitFlag)?((n||8!=(8&e.bitFlag))&&(e.crc32=t.view.getUint32(r+10,!0),e.compressedSize=t.view.getUint32(r+14,!0),e.uncompressedSize=t.view.getUint32(r+18,!0)),4294967295!==e.compressedSize&&4294967295!==e.uncompressedSize?(e.filenameLength=t.view.getUint16(r+22,!0),e.extraFieldLength=t.view.getUint16(r+24,!0)):a(o)):a(i)}function C(t,i,o){var s=0
function u(){}u.prototype.getData=function(i,a,u,l){var p=this
function w(e,t){l&&!function(e){var t=v(4)
return t.view.setUint32(0,e),p.crc32==t.view.getUint32(0)}(t)?o(n):i.getData(function(e){a(e)})}function h(e){o(e||f)}function d(e){o(e||c)}t.readUint8Array(p.offset,30,function(n){var a,c=v(n.length,n)
1347093252==c.view.getUint32(0)?(W(p,c,4,!1,o),a=p.offset+30+p.filenameLength+p.extraFieldLength,i.init(function(){0===p.compressionMethod?_(p._worker,s++,t,i,a,p.compressedSize,l,w,u,h,d):function(t,r,n,i,o,a,s,c,f,u,l){var p=s?"output":"none"
e.zip.useWebWorkers?A(t,{sn:r,codecClass:"Inflater",crcType:p},n,i,o,a,f,c,u,l):S(new e.zip.Inflater,n,i,o,a,p,f,c,u,l)}(p._worker,s++,t,i,a,p.compressedSize,l,w,u,h,d)},d)):o(r)},h)}
var l={getEntries:function(e){var n=this._worker;(function(e){var n=22
if(t.size<n)o(r)
else{var i=n+65536
s(n,function(){s(Math.min(i,t.size),function(){o(r)})})}function s(r,i){t.readUint8Array(t.size-r,r,function(t){for(var r=t.length-n;r>=0;r--)if(80===t[r]&&75===t[r+1]&&5===t[r+2]&&6===t[r+3])return void e(new DataView(t.buffer,r,n))
i()},function(){o(a)})}})(function(i){var s,c
s=i.getUint32(16,!0),c=i.getUint16(8,!0),s<0||s>=t.size?o(r):t.readUint8Array(s,t.size-s,function(t){var i,a,s,f,l=0,p=[],w=v(t.length,t)
for(i=0;i<c;i++){if((a=new u)._worker=n,1347092738!=w.view.getUint32(l))return void o(r)
W(a,w,l+6,!0,o),a.commentLength=w.view.getUint16(l+32,!0),a.directory=16==(16&w.view.getUint8(l+38)),a.offset=w.view.getUint32(l+42,!0),s=M(w.array.subarray(l+46,l+46+a.filenameLength)),a.filename=2048==(2048&a.bitFlag)?L(s):D(s),a.directory||"/"!=a.filename.charAt(a.filename.length-1)||(a.directory=!0),f=M(w.array.subarray(l+46+a.filenameLength+a.extraFieldLength,l+46+a.filenameLength+a.extraFieldLength+a.commentLength)),a.comment=2048==(2048&a.bitFlag)?L(f):D(f),p.push(a),l+=46+a.filenameLength+a.extraFieldLength+a.commentLength}e(p)},function(){o(a)})})},close:function(e){this._worker&&(this._worker.terminate(),this._worker=null),e&&e()},_worker:null}
e.zip.useWebWorkers?x("inflater",function(e){l._worker=e,i(l)},function(e){o(e)}):i(l)}function E(e){return unescape(encodeURIComponent(e))}function F(e){var t,r=[]
for(t=0;t<e.length;t++)r.push(e.charCodeAt(t))
return r}function T(t,r,n,i){var o={},a=[],c=0,l=0
function p(e){n(e||s)}function w(e){n(e||f)}var h={add:function(r,s,f,h,d){var g,y,m,U=this._worker
function z(e,r){var n=v(16)
c+=e||0,n.view.setUint32(0,1347094280),void 0!==r&&(g.view.setUint32(10,r,!0),n.view.setUint32(4,r,!0)),s&&(n.view.setUint32(8,e,!0),g.view.setUint32(14,e,!0),n.view.setUint32(12,s.size,!0),g.view.setUint32(18,s.size,!0)),t.writeUint8Array(n.array,function(){c+=16,f()},p)}function b(){var f,b;(d=d||{},r=r.trim(),d.directory&&"/"!=r.charAt(r.length-1)&&(r+="/"),o.hasOwnProperty(r))?n(u):(y=F(E(r)),a.push(r),f=function(){s?i||0===d.level?_(U,l++,s,t,0,s.size,!0,z,h,w,p):function(t,r,n,i,o,a,s,c,f){e.zip.useWebWorkers?A(t,{sn:r,options:{level:o},codecClass:"Deflater",crcType:"input"},n,i,0,n.size,s,a,c,f):S(new e.zip.Deflater,n,i,0,n.size,"input",s,a,c,f)}(U,l++,s,t,d.level,z,h,w,p):z()},m=d.lastModDate||new Date,g=v(26),o[r]={headerArray:g.array,directory:d.directory,filename:y,offset:c,comment:F(E(d.comment||""))},g.view.setUint32(0,335546376),d.version&&g.view.setUint8(0,d.version),i||0===d.level||d.directory||g.view.setUint16(4,2048),g.view.setUint16(6,(m.getHours()<<6|m.getMinutes())<<5|m.getSeconds()/2,!0),g.view.setUint16(8,(m.getFullYear()-1980<<4|m.getMonth()+1)<<5|m.getDate(),!0),g.view.setUint16(22,y.length,!0),(b=v(30+y.length)).view.setUint32(0,1347093252),b.array.set(g.array,4),b.array.set(y,30),c+=b.array.length,t.writeUint8Array(b.array,f,p))}s?s.init(b,w):b()},close:function(e){this._worker&&(this._worker.terminate(),this._worker=null)
var r,n,i,s=0,f=0
for(n=0;n<a.length;n++)s+=46+(i=o[a[n]]).filename.length+i.comment.length
for(r=v(s+22),n=0;n<a.length;n++)i=o[a[n]],r.view.setUint32(f,1347092738),r.view.setUint16(f+4,5120),r.array.set(i.headerArray,f+6),r.view.setUint16(f+32,i.comment.length,!0),i.directory&&r.view.setUint8(f+38,16),r.view.setUint32(f+42,i.offset,!0),r.array.set(i.filename,f+46),r.array.set(i.comment,f+46+i.filename.length),f+=46+i.filename.length+i.comment.length
r.view.setUint32(f,1347093766),r.view.setUint16(f+8,a.length,!0),r.view.setUint16(f+10,a.length,!0),r.view.setUint32(f+12,s,!0),r.view.setUint32(f+16,c,!0),t.writeUint8Array(r.array,function(){t.getData(e)},p)},_worker:null}
e.zip.useWebWorkers?x("deflater",function(e){h._worker=e,r(h)},function(e){n(e)}):r(h)}w.prototype.append=function(e){for(var t=0|this.crc,r=this.table,n=0,i=0|e.length;n<i;n++)t=t>>>8^r[255&(t^e[n])]
this.crc=t},w.prototype.get=function(){return~this.crc},w.prototype.table=function(){var e,t,r,n=[]
for(e=0;e<256;e++){for(r=e,t=0;t<8;t++)1&r?r=r>>>1^3988292384:r>>>=1
n[e]=r}return n}(),h.prototype.append=function(e,t){return e},h.prototype.flush=function(){},g.prototype=new d,g.prototype.constructor=g,y.prototype=new d,y.prototype.constructor=y,m.prototype=new d,m.prototype.constructor=m,U.prototype.getData=function(e){e(this.data)},z.prototype=new U,z.prototype.constructor=z,b.prototype=new U,b.prototype.constructor=b,k.prototype=new U,k.prototype.constructor=k
var R={deflater:["z-worker.js","deflate.js"],inflater:["z-worker.js","inflate.js"]}
function x(t,r,n){if(null===e.zip.workerScripts||null===e.zip.workerScriptsPath){var i,o,a
if(e.zip.workerScripts){if(i=e.zip.workerScripts[t],!Array.isArray(i))return void n(new Error("zip.workerScripts."+t+" is not an array!"))
o=i,a=document.createElement("a"),i=o.map(function(e){return a.href=e,a.href})}else(i=R[t].slice(0))[0]=(e.zip.workerScriptsPath||"")+i[0]
var s=new Worker(i[0])
s.codecTime=s.crcTime=0,s.postMessage({type:"importScripts",scripts:i.slice(1)}),s.addEventListener("message",function e(t){var i=t.data
if(i.error)return s.terminate(),void n(i.error)
"importScripts"===i.type&&(s.removeEventListener("message",e),s.removeEventListener("error",c),r(s))}),s.addEventListener("error",c)}else n(new Error("Either zip.workerScripts or zip.workerScriptsPath may be set, not both."))
function c(e){s.terminate(),n(e)}}function B(e){console.error(e)}e.zip={Reader:d,Writer:U,BlobReader:m,Data64URIReader:y,TextReader:g,BlobWriter:k,Data64URIWriter:b,TextWriter:z,createReader:function(e,t,r){r=r||B,e.init(function(){C(e,t,r)},r)},createWriter:function(e,t,r,n){r=r||B,n=!!n,e.init(function(){T(e,t,r,n)},r)},useWebWorkers:!0,workerScriptsPath:null,workerScripts:null}})(this)
