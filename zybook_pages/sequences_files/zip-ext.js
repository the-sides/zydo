(function(){"use strict"
var t,e,n="HTTP Range not supported.",r=zip.Reader,i=zip.Writer
try{e=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(t){}function o(t){var e=this
function n(n,r){var i
e.data?n():((i=new XMLHttpRequest).addEventListener("load",function(){e.size||(e.size=Number(i.getResponseHeader("Content-Length"))||Number(i.response.byteLength)),e.data=new Uint8Array(i.response),n()},!1),i.addEventListener("error",r,!1),i.open("GET",t),i.responseType="arraybuffer",i.send())}e.size=0,e.init=function(r,i){var o=new XMLHttpRequest
o.addEventListener("load",function(){e.size=Number(o.getResponseHeader("Content-Length")),e.size?r():n(r,i)},!1),o.addEventListener("error",i,!1),o.open("HEAD",t),o.send()},e.readUint8Array=function(t,r,i,o){n(function(){i(new Uint8Array(e.data.subarray(t,t+r)))},o)}}function s(t){var e=this
e.size=0,e.init=function(r,i){var o=new XMLHttpRequest
o.addEventListener("load",function(){e.size=Number(o.getResponseHeader("Content-Length")),"bytes"==o.getResponseHeader("Accept-Ranges")?r():i(n)},!1),o.addEventListener("error",i,!1),o.open("HEAD",t),o.send()},e.readUint8Array=function(e,n,r,i){(function(e,n,r,i){var o=new XMLHttpRequest
o.open("GET",t),o.responseType="arraybuffer",o.setRequestHeader("Range","bytes="+e+"-"+(e+n-1)),o.addEventListener("load",function(){r(o.response)},!1),o.addEventListener("error",i,!1),o.send()})(e,n,function(t){r(new Uint8Array(t))},i)}}function a(t){var e=this
e.size=0,e.init=function(n,r){e.size=t.byteLength,n()},e.readUint8Array=function(e,n,r,i){r(new Uint8Array(t.slice(e,e+n)))}}function p(){var t
this.init=function(e,n){t=new Uint8Array,e()},this.writeUint8Array=function(e,n,r){var i=new Uint8Array(t.length+e.length)
i.set(t),i.set(e,t.length),t=i,n()},this.getData=function(e){e(t.buffer)}}function u(t,n){var r
this.init=function(e,n){t.createWriter(function(t){r=t,e()},n)},this.writeUint8Array=function(t,i,o){var s=new Blob([e?t:t.buffer],{type:n})
r.onwrite=function(){r.onwrite=null,i()},r.onerror=o,r.write(s)},this.getData=function(e){t.file(e)}}o.prototype=new r,o.prototype.constructor=o,s.prototype=new r,s.prototype.constructor=s,a.prototype=new r,a.prototype.constructor=a,p.prototype=new i,p.prototype.constructor=p,u.prototype=new i,u.prototype.constructor=u,zip.FileWriter=u,zip.HttpReader=o,zip.HttpRangeReader=s,zip.ArrayBufferReader=a,zip.ArrayBufferWriter=p,zip.fs&&((t=zip.fs.ZipDirectoryEntry).prototype.addHttpContent=function(e,n,r){return function(e,n,r,i){if(e.directory)return i?new t(e.fs,n,r,e):new zip.fs.ZipFileEntry(e.fs,n,r,e)
throw"Parent entry is not a directory."}(this,e,{data:n,Reader:r?s:o})},t.prototype.importHttpContent=function(t,e,n,r){this.importZip(e?new s(t):new o(t),n,r)},zip.fs.FS.prototype.importHttpContent=function(e,n,r,i){this.entries=[],this.root=new t(this),this.root.importHttpContent(e,n,r,i)})})()
