(function(t){"use strict"
var e=15,n=30,i=19,a=256,r=a+1+29,_=2*r+1,o=256,u=16,s=17,l=18,d=16,f=-1,h=1,c=2,p=0,x=0,v=1,b=3,g=4,w=0,m=1,y=2,A=-2,E=-3,U=-5,k=[0,1,2,3,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,0,0,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29]
function M(){var t=this
function n(t,e){var n=0
do{n|=1&t,t>>>=1,n<<=1}while(--e>0)
return n>>>1}t.build_tree=function(i){var a,r,o,u=t.dyn_tree,s=t.stat_desc.static_tree,l=t.stat_desc.elems,d=-1
for(i.heap_len=0,i.heap_max=_,a=0;a<l;a++)0!==u[2*a]?(i.heap[++i.heap_len]=d=a,i.depth[a]=0):u[2*a+1]=0
for(;i.heap_len<2;)u[2*(o=i.heap[++i.heap_len]=d<2?++d:0)]=1,i.depth[o]=0,i.opt_len--,s&&(i.static_len-=s[2*o+1])
for(t.max_code=d,a=Math.floor(i.heap_len/2);a>=1;a--)i.pqdownheap(u,a)
o=l
do{a=i.heap[1],i.heap[1]=i.heap[i.heap_len--],i.pqdownheap(u,1),r=i.heap[1],i.heap[--i.heap_max]=a,i.heap[--i.heap_max]=r,u[2*o]=u[2*a]+u[2*r],i.depth[o]=Math.max(i.depth[a],i.depth[r])+1,u[2*a+1]=u[2*r+1]=o,i.heap[1]=o++,i.pqdownheap(u,1)}while(i.heap_len>=2)
i.heap[--i.heap_max]=i.heap[1],function(n){var i,a,r,o,u,s,l=t.dyn_tree,d=t.stat_desc.static_tree,f=t.stat_desc.extra_bits,h=t.stat_desc.extra_base,c=t.stat_desc.max_length,p=0
for(o=0;o<=e;o++)n.bl_count[o]=0
for(l[2*n.heap[n.heap_max]+1]=0,i=n.heap_max+1;i<_;i++)(o=l[2*l[2*(a=n.heap[i])+1]+1]+1)>c&&(o=c,p++),l[2*a+1]=o,a>t.max_code||(n.bl_count[o]++,u=0,a>=h&&(u=f[a-h]),s=l[2*a],n.opt_len+=s*(o+u),d&&(n.static_len+=s*(d[2*a+1]+u)))
if(0!==p){do{for(o=c-1;0===n.bl_count[o];)o--
n.bl_count[o]--,n.bl_count[o+1]+=2,n.bl_count[c]--,p-=2}while(p>0)
for(o=c;0!==o;o--)for(a=n.bl_count[o];0!==a;)(r=n.heap[--i])>t.max_code||(l[2*r+1]!=o&&(n.opt_len+=(o-l[2*r+1])*l[2*r],l[2*r+1]=o),a--)}}(i),function(t,i,a){var r,_,o,u=[],s=0
for(r=1;r<=e;r++)u[r]=s=s+a[r-1]<<1
for(_=0;_<=i;_++)0!==(o=t[2*_+1])&&(t[2*_]=n(u[o]++,o))}(u,t.max_code,i.bl_count)}}function z(t,e,n,i,a){this.static_tree=t,this.extra_bits=e,this.extra_base=n,this.elems=i,this.max_length=a}M._length_code=[0,1,2,3,4,5,6,7,8,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28],M.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],M.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],M.d_code=function(t){return t<256?k[t]:k[256+(t>>>7)]},M.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],M.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],M.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],M.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z.static_ltree=[12,8,140,8,76,8,204,8,44,8,172,8,108,8,236,8,28,8,156,8,92,8,220,8,60,8,188,8,124,8,252,8,2,8,130,8,66,8,194,8,34,8,162,8,98,8,226,8,18,8,146,8,82,8,210,8,50,8,178,8,114,8,242,8,10,8,138,8,74,8,202,8,42,8,170,8,106,8,234,8,26,8,154,8,90,8,218,8,58,8,186,8,122,8,250,8,6,8,134,8,70,8,198,8,38,8,166,8,102,8,230,8,22,8,150,8,86,8,214,8,54,8,182,8,118,8,246,8,14,8,142,8,78,8,206,8,46,8,174,8,110,8,238,8,30,8,158,8,94,8,222,8,62,8,190,8,126,8,254,8,1,8,129,8,65,8,193,8,33,8,161,8,97,8,225,8,17,8,145,8,81,8,209,8,49,8,177,8,113,8,241,8,9,8,137,8,73,8,201,8,41,8,169,8,105,8,233,8,25,8,153,8,89,8,217,8,57,8,185,8,121,8,249,8,5,8,133,8,69,8,197,8,37,8,165,8,101,8,229,8,21,8,149,8,85,8,213,8,53,8,181,8,117,8,245,8,13,8,141,8,77,8,205,8,45,8,173,8,109,8,237,8,29,8,157,8,93,8,221,8,61,8,189,8,125,8,253,8,19,9,275,9,147,9,403,9,83,9,339,9,211,9,467,9,51,9,307,9,179,9,435,9,115,9,371,9,243,9,499,9,11,9,267,9,139,9,395,9,75,9,331,9,203,9,459,9,43,9,299,9,171,9,427,9,107,9,363,9,235,9,491,9,27,9,283,9,155,9,411,9,91,9,347,9,219,9,475,9,59,9,315,9,187,9,443,9,123,9,379,9,251,9,507,9,7,9,263,9,135,9,391,9,71,9,327,9,199,9,455,9,39,9,295,9,167,9,423,9,103,9,359,9,231,9,487,9,23,9,279,9,151,9,407,9,87,9,343,9,215,9,471,9,55,9,311,9,183,9,439,9,119,9,375,9,247,9,503,9,15,9,271,9,143,9,399,9,79,9,335,9,207,9,463,9,47,9,303,9,175,9,431,9,111,9,367,9,239,9,495,9,31,9,287,9,159,9,415,9,95,9,351,9,223,9,479,9,63,9,319,9,191,9,447,9,127,9,383,9,255,9,511,9,0,7,64,7,32,7,96,7,16,7,80,7,48,7,112,7,8,7,72,7,40,7,104,7,24,7,88,7,56,7,120,7,4,7,68,7,36,7,100,7,20,7,84,7,52,7,116,7,3,8,131,8,67,8,195,8,35,8,163,8,99,8,227,8],z.static_dtree=[0,5,16,5,8,5,24,5,4,5,20,5,12,5,28,5,2,5,18,5,10,5,26,5,6,5,22,5,14,5,30,5,1,5,17,5,9,5,25,5,5,5,21,5,13,5,29,5,3,5,19,5,11,5,27,5,7,5,23,5],z.static_l_desc=new z(z.static_ltree,M.extra_lbits,a+1,r,e),z.static_d_desc=new z(z.static_dtree,M.extra_dbits,0,n,e),z.static_bl_desc=new z(null,M.extra_blbits,0,i,7)
var D=9,q=8
function I(t,e,n,i,a){this.good_length=t,this.max_lazy=e,this.nice_length=n,this.max_chain=i,this.func=a}var P=0,S=1,j=2,B=[new I(0,0,0,0,P),new I(4,4,8,4,S),new I(4,5,16,8,S),new I(4,6,32,32,S),new I(4,4,16,16,j),new I(8,16,32,32,j),new I(8,16,128,128,j),new I(8,32,128,256,j),new I(32,128,258,1024,j),new I(32,258,258,4096,j)],C=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],F=0,G=1,H=2,J=3,K=32,L=42,N=113,O=666,Q=8,R=0,T=1,V=2,W=3,X=258,Y=X+W+1
function Z(t,e,n,i){var a=t[2*e],r=t[2*n]
return a<r||a==r&&i[e]<=i[n]}function $(){var t,e,_,k,I,$,tt,et,nt,it,at,rt,_t,ot,ut,st,lt,dt,ft,ht,ct,pt,xt,vt,bt,gt,wt,mt,yt,At,Et,Ut,kt,Mt,zt,Dt,qt,It,Pt,St,jt,Bt=this,Ct=new M,Ft=new M,Gt=new M
function Ht(){var t
for(t=0;t<r;t++)Et[2*t]=0
for(t=0;t<n;t++)Ut[2*t]=0
for(t=0;t<i;t++)kt[2*t]=0
Et[2*o]=1,Bt.opt_len=Bt.static_len=0,Dt=It=0}function Jt(t,e){var n,i,a=-1,r=t[1],_=0,o=7,d=4
for(0===r&&(o=138,d=3),t[2*(e+1)+1]=65535,n=0;n<=e;n++)i=r,r=t[2*(n+1)+1],++_<o&&i==r||(_<d?kt[2*i]+=_:0!==i?(i!=a&&kt[2*i]++,kt[2*u]++):_<=10?kt[2*s]++:kt[2*l]++,_=0,a=i,0===r?(o=138,d=3):i==r?(o=6,d=3):(o=7,d=4))}function Kt(t){Bt.pending_buf[Bt.pending++]=t}function Lt(t){Kt(255&t),Kt(t>>>8&255)}function Nt(t,e){var n,i=e
jt>d-i?(Lt(St|=(n=t)<<jt&65535),St=n>>>d-jt,jt+=i-d):(St|=t<<jt&65535,jt+=i)}function Ot(t,e){var n=2*t
Nt(65535&e[n],65535&e[n+1])}function Qt(t,e){var n,i,a=-1,r=t[1],_=0,o=7,d=4
for(0===r&&(o=138,d=3),n=0;n<=e;n++)if(i=r,r=t[2*(n+1)+1],!(++_<o&&i==r)){if(_<d)do{Ot(i,kt)}while(0!=--_)
else 0!==i?(i!=a&&(Ot(i,kt),_--),Ot(u,kt),Nt(_-3,2)):_<=10?(Ot(s,kt),Nt(_-3,3)):(Ot(l,kt),Nt(_-11,7))
_=0,a=i,0===r?(o=138,d=3):i==r?(o=6,d=3):(o=7,d=4)}}function Rt(){16==jt?(Lt(St),St=0,jt=0):jt>=8&&(Kt(255&St),St>>>=8,jt-=8)}function Tt(t,e){var i,r,_
if(Bt.pending_buf[qt+2*Dt]=t>>>8&255,Bt.pending_buf[qt+2*Dt+1]=255&t,Bt.pending_buf[Mt+Dt]=255&e,Dt++,0===t?Et[2*e]++:(It++,t--,Et[2*(M._length_code[e]+a+1)]++,Ut[2*M.d_code(t)]++),0==(8191&Dt)&&wt>2){for(i=8*Dt,r=ct-lt,_=0;_<n;_++)i+=Ut[2*_]*(5+M.extra_dbits[_])
if(i>>>=3,It<Math.floor(Dt/2)&&i<Math.floor(r/2))return!0}return Dt==zt-1}function Vt(t,e){var n,i,r,_,u=0
if(0!==Dt)do{n=Bt.pending_buf[qt+2*u]<<8&65280|255&Bt.pending_buf[qt+2*u+1],i=255&Bt.pending_buf[Mt+u],u++,0===n?Ot(i,t):(Ot((r=M._length_code[i])+a+1,t),0!==(_=M.extra_lbits[r])&&Nt(i-=M.base_length[r],_),n--,Ot(r=M.d_code(n),e),0!==(_=M.extra_dbits[r])&&Nt(n-=M.base_dist[r],_))}while(u<Dt)
Ot(o,t),Pt=t[2*o+1]}function Wt(){jt>8?Lt(St):jt>0&&Kt(255&St),St=0,jt=0}function Xt(t,e,n){Nt((R<<1)+(n?1:0),3),function(t,e,n){Wt(),Pt=8,n&&(Lt(e),Lt(~e)),Bt.pending_buf.set(et.subarray(t,t+e),Bt.pending),Bt.pending+=e}(t,e,!0)}function Yt(t,e,n){var a,r,_=0
wt>0?(Ct.build_tree(Bt),Ft.build_tree(Bt),_=function(){var t
for(Jt(Et,Ct.max_code),Jt(Ut,Ft.max_code),Gt.build_tree(Bt),t=i-1;t>=3&&0===kt[2*M.bl_order[t]+1];t--);return Bt.opt_len+=3*(t+1)+5+5+4,t}(),a=Bt.opt_len+3+7>>>3,(r=Bt.static_len+3+7>>>3)<=a&&(a=r)):a=r=e+5,e+4<=a&&-1!=t?Xt(t,e,n):r==a?(Nt((T<<1)+(n?1:0),3),Vt(z.static_ltree,z.static_dtree)):(Nt((V<<1)+(n?1:0),3),function(t,e,n){var i
for(Nt(t-257,5),Nt(e-1,5),Nt(n-4,4),i=0;i<n;i++)Nt(kt[2*M.bl_order[i]+1],3)
Qt(Et,t-1),Qt(Ut,e-1)}(Ct.max_code+1,Ft.max_code+1,_+1),Vt(Et,Ut)),Ht(),n&&Wt()}function Zt(e){Yt(lt>=0?lt:-1,ct-lt,e),lt=ct,t.flush_pending()}function $t(){var e,n,i,a
do{if(0===(a=nt-xt-ct)&&0===ct&&0===xt)a=I
else if(-1==a)a--
else if(ct>=I+I-Y){et.set(et.subarray(I,I+I),0),pt-=I,ct-=I,lt-=I,i=e=_t
do{n=65535&at[--i],at[i]=n>=I?n-I:0}while(0!=--e)
i=e=I
do{n=65535&it[--i],it[i]=n>=I?n-I:0}while(0!=--e)
a+=I}if(0===t.avail_in)return
e=t.read_buf(et,ct+xt,a),(xt+=e)>=W&&(rt=((rt=255&et[ct])<<st^255&et[ct+1])&ut)}while(xt<Y&&0!==t.avail_in)}function te(t){var e,n,i=bt,a=ct,r=vt,_=ct>I-Y?ct-(I-Y):0,o=At,u=tt,s=ct+X,l=et[a+r-1],d=et[a+r]
vt>=yt&&(i>>=2),o>xt&&(o=xt)
do{if(et[(e=t)+r]==d&&et[e+r-1]==l&&et[e]==et[a]&&et[++e]==et[a+1]){a+=2,e++
do{}while(et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&et[++a]==et[++e]&&a<s)
if(n=X-(s-a),a=s-X,n>r){if(pt=t,r=n,n>=o)break
l=et[a+r-1],d=et[a+r]}}}while((t=65535&it[t&u])>_&&0!=--i)
return r<=xt?r:xt}function ee(t){return t.total_in=t.total_out=0,t.msg=null,Bt.pending=0,Bt.pending_out=0,e=N,k=x,Ct.dyn_tree=Et,Ct.stat_desc=z.static_l_desc,Ft.dyn_tree=Ut,Ft.stat_desc=z.static_d_desc,Gt.dyn_tree=kt,Gt.stat_desc=z.static_bl_desc,St=0,jt=0,Pt=8,Ht(),function(){var t
for(nt=2*I,at[_t-1]=0,t=0;t<_t-1;t++)at[t]=0
gt=B[wt].max_lazy,yt=B[wt].good_length,At=B[wt].nice_length,bt=B[wt].max_chain,ct=0,lt=0,xt=0,dt=vt=W-1,ht=0,rt=0}(),w}Bt.depth=[],Bt.bl_count=[],Bt.heap=[],Et=[],Ut=[],kt=[],Bt.pqdownheap=function(t,e){for(var n=Bt.heap,i=n[e],a=e<<1;a<=Bt.heap_len&&(a<Bt.heap_len&&Z(t,n[a+1],n[a],Bt.depth)&&a++,!Z(t,i,n[a],Bt.depth));)n[e]=n[a],e=a,a<<=1
n[e]=i},Bt.deflateInit=function(t,e,n,i,a,r){return i||(i=Q),a||(a=q),r||(r=p),t.msg=null,e==f&&(e=6),a<1||a>D||i!=Q||n<9||n>15||e<0||e>9||r<0||r>c?A:(t.dstate=Bt,tt=(I=1<<($=n))-1,ut=(_t=1<<(ot=a+7))-1,st=Math.floor((ot+W-1)/W),et=new Uint8Array(2*I),it=[],at=[],zt=1<<a+6,Bt.pending_buf=new Uint8Array(4*zt),_=4*zt,qt=Math.floor(zt/2),Mt=3*zt,wt=e,mt=r,255&i,ee(t))},Bt.deflateEnd=function(){return e!=L&&e!=N&&e!=O?A:(Bt.pending_buf=null,at=null,it=null,et=null,Bt.dstate=null,e==N?E:w)},Bt.deflateParams=function(t,e,n){var i=w
return e==f&&(e=6),e<0||e>9||n<0||n>c?A:(B[wt].func!=B[e].func&&0!==t.total_in&&(i=t.deflate(v)),wt!=e&&(gt=B[wt=e].max_lazy,yt=B[wt].good_length,At=B[wt].nice_length,bt=B[wt].max_chain),mt=n,i)},Bt.deflateSetDictionary=function(t,n,i){var a,r=i,_=0
if(!n||e!=L)return A
if(r<W)return w
for(r>I-Y&&(_=i-(r=I-Y)),et.set(n.subarray(_,_+r),0),ct=r,lt=r,rt=((rt=255&et[0])<<st^255&et[1])&ut,a=0;a<=r-W;a++)rt=(rt<<st^255&et[a+(W-1)])&ut,it[a&tt]=at[rt],at[rt]=a
return w},Bt.deflate=function(n,i){var a,r,u,s,l,d
if(i>g||i<0)return A
if(!n.next_out||!n.next_in&&0!==n.avail_in||e==O&&i!=g)return n.msg=C[y-A],A
if(0===n.avail_out)return n.msg=C[y-U],U
if(t=n,s=k,k=i,e==L&&(r=Q+($-8<<4)<<8,(u=(wt-1&255)>>1)>3&&(u=3),r|=u<<6,0!==ct&&(r|=K),e=N,Kt((d=r+=31-r%31)>>8&255),Kt(255&d)),0!==Bt.pending){if(t.flush_pending(),0===t.avail_out)return k=-1,w}else if(0===t.avail_in&&i<=s&&i!=g)return t.msg=C[y-U],U
if(e==O&&0!==t.avail_in)return n.msg=C[y-U],U
if(0!==t.avail_in||0!==xt||i!=x&&e!=O){switch(l=-1,B[wt].func){case P:l=function(e){var n,i=65535
for(i>_-5&&(i=_-5);;){if(xt<=1){if($t(),0===xt&&e==x)return F
if(0===xt)break}if(ct+=xt,xt=0,n=lt+i,(0===ct||ct>=n)&&(xt=ct-n,ct=n,Zt(!1),0===t.avail_out))return F
if(ct-lt>=I-Y&&(Zt(!1),0===t.avail_out))return F}return Zt(e==g),0===t.avail_out?e==g?H:F:e==g?J:G}(i)
break
case S:l=function(e){for(var n,i=0;;){if(xt<Y){if($t(),xt<Y&&e==x)return F
if(0===xt)break}if(xt>=W&&(rt=(rt<<st^255&et[ct+(W-1)])&ut,i=65535&at[rt],it[ct&tt]=at[rt],at[rt]=ct),0!==i&&(ct-i&65535)<=I-Y&&mt!=c&&(dt=te(i)),dt>=W)if(n=Tt(ct-pt,dt-W),xt-=dt,dt<=gt&&xt>=W){dt--
do{rt=(rt<<st^255&et[++ct+(W-1)])&ut,i=65535&at[rt],it[ct&tt]=at[rt],at[rt]=ct}while(0!=--dt)
ct++}else ct+=dt,dt=0,rt=((rt=255&et[ct])<<st^255&et[ct+1])&ut
else n=Tt(0,255&et[ct]),xt--,ct++
if(n&&(Zt(!1),0===t.avail_out))return F}return Zt(e==g),0===t.avail_out?e==g?H:F:e==g?J:G}(i)
break
case j:l=function(e){for(var n,i,a=0;;){if(xt<Y){if($t(),xt<Y&&e==x)return F
if(0===xt)break}if(xt>=W&&(rt=(rt<<st^255&et[ct+(W-1)])&ut,a=65535&at[rt],it[ct&tt]=at[rt],at[rt]=ct),vt=dt,ft=pt,dt=W-1,0!==a&&vt<gt&&(ct-a&65535)<=I-Y&&(mt!=c&&(dt=te(a)),dt<=5&&(mt==h||dt==W&&ct-pt>4096)&&(dt=W-1)),vt>=W&&dt<=vt){i=ct+xt-W,n=Tt(ct-1-ft,vt-W),xt-=vt-1,vt-=2
do{++ct<=i&&(rt=(rt<<st^255&et[ct+(W-1)])&ut,a=65535&at[rt],it[ct&tt]=at[rt],at[rt]=ct)}while(0!=--vt)
if(ht=0,dt=W-1,ct++,n&&(Zt(!1),0===t.avail_out))return F}else if(0!==ht){if((n=Tt(0,255&et[ct-1]))&&Zt(!1),ct++,xt--,0===t.avail_out)return F}else ht=1,ct++,xt--}return 0!==ht&&(n=Tt(0,255&et[ct-1]),ht=0),Zt(e==g),0===t.avail_out?e==g?H:F:e==g?J:G}(i)}if(l!=H&&l!=J||(e=O),l==F||l==H)return 0===t.avail_out&&(k=-1),w
if(l==G){if(i==v)Nt(T<<1,3),Ot(o,z.static_ltree),Rt(),1+Pt+10-jt<9&&(Nt(T<<1,3),Ot(o,z.static_ltree),Rt()),Pt=7
else if(Xt(0,0,!1),i==b)for(a=0;a<_t;a++)at[a]=0
if(t.flush_pending(),0===t.avail_out)return k=-1,w}}return i!=g?w:m}}function tt(){this.next_in_index=0,this.next_out_index=0,this.avail_in=0,this.total_in=0,this.avail_out=0,this.total_out=0}tt.prototype={deflateInit:function(t,n){return this.dstate=new $,n||(n=e),this.dstate.deflateInit(this,t,n)},deflate:function(t){return this.dstate?this.dstate.deflate(this,t):A},deflateEnd:function(){if(!this.dstate)return A
var t=this.dstate.deflateEnd()
return this.dstate=null,t},deflateParams:function(t,e){return this.dstate?this.dstate.deflateParams(this,t,e):A},deflateSetDictionary:function(t,e){return this.dstate?this.dstate.deflateSetDictionary(this,t,e):A},read_buf:function(t,e,n){var i=this.avail_in
return i>n&&(i=n),0===i?0:(this.avail_in-=i,t.set(this.next_in.subarray(this.next_in_index,this.next_in_index+i),e),this.next_in_index+=i,this.total_in+=i,i)},flush_pending:function(){var t=this.dstate.pending
t>this.avail_out&&(t=this.avail_out),0!==t&&(this.next_out.set(this.dstate.pending_buf.subarray(this.dstate.pending_out,this.dstate.pending_out+t),this.next_out_index),this.next_out_index+=t,this.dstate.pending_out+=t,this.total_out+=t,this.avail_out-=t,this.dstate.pending-=t,0===this.dstate.pending&&(this.dstate.pending_out=0))}}
var et=t.zip||t
et.Deflater=et._jzlib_Deflater=function(t){var e=new tt,n=x,i=new Uint8Array(512),a=t?t.level:f
void 0===a&&(a=f),e.deflateInit(a),e.next_out=i,this.append=function(t,a){var r,_=[],o=0,u=0,s=0
if(t.length){e.next_in_index=0,e.next_in=t,e.avail_in=t.length
do{if(e.next_out_index=0,e.avail_out=512,e.deflate(n)!=w)throw new Error("deflating: "+e.msg)
e.next_out_index&&(512==e.next_out_index?_.push(new Uint8Array(i)):_.push(new Uint8Array(i.subarray(0,e.next_out_index)))),s+=e.next_out_index,a&&e.next_in_index>0&&e.next_in_index!=o&&(a(e.next_in_index),o=e.next_in_index)}while(e.avail_in>0||0===e.avail_out)
return r=new Uint8Array(s),_.forEach(function(t){r.set(t,u),u+=t.length}),r}},this.flush=function(){var t,n,a=[],r=0,_=0
do{if(e.next_out_index=0,e.avail_out=512,(t=e.deflate(g))!=m&&t!=w)throw new Error("deflating: "+e.msg)
512-e.avail_out>0&&a.push(new Uint8Array(i.subarray(0,e.next_out_index))),_+=e.next_out_index}while(e.avail_in>0||0===e.avail_out)
return e.deflateEnd(),n=new Uint8Array(_),a.forEach(function(t){n.set(t,r),r+=t.length}),n}}})(this)
