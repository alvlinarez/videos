/*! For license information please see vendors.browserify-sign.91cedbec.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{130:function(r,t,e){var n=e(12),a=n.Buffer;function s(r,t){for(var e in r)t[e]=r[e]}function i(r,t,e){return a(r,t,e)}a.from&&a.alloc&&a.allocUnsafe&&a.allocUnsafeSlow?r.exports=n:(s(n,t),t.Buffer=i),i.prototype=Object.create(a.prototype),s(a,i),i.from=function(r,t,e){if("number"===typeof r)throw new TypeError("Argument must not be a number");return a(r,t,e)},i.alloc=function(r,t,e){if("number"!==typeof r)throw new TypeError("Argument must be a number");var n=a(r);return void 0!==t?"string"===typeof e?n.fill(t,e):n.fill(t):n.fill(0),n},i.allocUnsafe=function(r){if("number"!==typeof r)throw new TypeError("Argument must be a number");return a(r)},i.allocUnsafeSlow=function(r){if("number"!==typeof r)throw new TypeError("Argument must be a number");return n.SlowBuffer(r)}},181:function(r){r.exports=JSON.parse('{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}')},207:function(r){r.exports=JSON.parse('{"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}')},334:function(r,t,e){r.exports=e(181)},358:function(r,t,e){var n=e(130).Buffer,a=e(80),s=e(170),i=e(5),o=e(359),h=e(397),d=e(181);function u(r){s.Writable.call(this);var t=d[r];if(!t)throw new Error("Unknown message digest");this._hashType=t.hash,this._hash=a(t.hash),this._tag=t.id,this._signType=t.sign}function c(r){s.Writable.call(this);var t=d[r];if(!t)throw new Error("Unknown message digest");this._hash=a(t.hash),this._tag=t.id,this._signType=t.sign}function f(r){return new u(r)}function p(r){return new c(r)}Object.keys(d).forEach((function(r){d[r].id=n.from(d[r].id,"hex"),d[r.toLowerCase()]=d[r]})),i(u,s.Writable),u.prototype._write=function(r,t,e){this._hash.update(r),e()},u.prototype.update=function(r,t){return"string"===typeof r&&(r=n.from(r,t)),this._hash.update(r),this},u.prototype.sign=function(r,t){this.end();var e=this._hash.digest(),n=o(e,r,this._hashType,this._signType,this._tag);return t?n.toString(t):n},i(c,s.Writable),c.prototype._write=function(r,t,e){this._hash.update(r),e()},c.prototype.update=function(r,t){return"string"===typeof r&&(r=n.from(r,t)),this._hash.update(r),this},c.prototype.verify=function(r,t,e){"string"===typeof t&&(t=n.from(t,e)),this.end();var a=this._hash.digest();return h(t,a,r,this._signType,this._tag)},r.exports={Sign:f,Verify:p,createSign:f,createVerify:p}},359:function(r,t,e){var n=e(130).Buffer,a=e(179),s=e(131),i=e(132).ec,o=e(202),h=e(93),d=e(207);function u(r,t,e,s){if((r=n.from(r.toArray())).length<t.byteLength()){var i=n.alloc(t.byteLength()-r.length);r=n.concat([i,r])}var o=e.length,h=function(r,t){r=(r=c(r,t)).mod(t);var e=n.from(r.toArray());if(e.length<t.byteLength()){var a=n.alloc(t.byteLength()-e.length);e=n.concat([a,e])}return e}(e,t),d=n.alloc(o);d.fill(1);var u=n.alloc(o);return u=a(s,u).update(d).update(n.from([0])).update(r).update(h).digest(),d=a(s,u).update(d).digest(),{k:u=a(s,u).update(d).update(n.from([1])).update(r).update(h).digest(),v:d=a(s,u).update(d).digest()}}function c(r,t){var e=new o(r),n=(r.length<<3)-t.bitLength();return n>0&&e.ishrn(n),e}function f(r,t,e){var s,i;do{for(s=n.alloc(0);8*s.length<r.bitLength();)t.v=a(e,t.k).update(t.v).digest(),s=n.concat([s,t.v]);i=c(s,r),t.k=a(e,t.k).update(t.v).update(n.from([0])).digest(),t.v=a(e,t.k).update(t.v).digest()}while(-1!==i.cmp(r));return i}function p(r,t,e,n){return r.toRed(o.mont(e)).redPow(t).fromRed().mod(n)}r.exports=function(r,t,e,a,g){var l=h(t);if(l.curve){if("ecdsa"!==a&&"ecdsa/rsa"!==a)throw new Error("wrong private key type");return function(r,t){var e=d[t.curve.join(".")];if(!e)throw new Error("unknown curve "+t.curve.join("."));var a=new i(e).keyFromPrivate(t.privateKey).sign(r);return n.from(a.toDER())}(r,l)}if("dsa"===l.type){if("dsa"!==a)throw new Error("wrong private key type");return function(r,t,e){var a,s=t.params.priv_key,i=t.params.p,h=t.params.q,d=t.params.g,g=new o(0),l=c(r,h).mod(h),m=!1,w=u(s,h,r,e);for(;!1===m;)a=f(h,w,e),g=p(d,a,i,h),0===(m=a.invm(h).imul(l.add(s.mul(g))).mod(h)).cmpn(0)&&(m=!1,g=new o(0));return function(r,t){r=r.toArray(),t=t.toArray(),128&r[0]&&(r=[0].concat(r));128&t[0]&&(t=[0].concat(t));var e=[48,r.length+t.length+4,2,r.length];return e=e.concat(r,[2,t.length],t),n.from(e)}(g,m)}(r,l,e)}if("rsa"!==a&&"ecdsa/rsa"!==a)throw new Error("wrong private key type");r=n.concat([g,r]);for(var m=l.modulus.byteLength(),w=[0,1];r.length+w.length+1<m;)w.push(255);w.push(0);for(var y=-1;++y<r.length;)w.push(r[y]);return s(w,l)},r.exports.getKey=u,r.exports.makeKey=f},397:function(r,t,e){var n=e(130).Buffer,a=e(202),s=e(132).ec,i=e(93),o=e(207);function h(r,t){if(r.cmpn(0)<=0)throw new Error("invalid sig");if(r.cmp(t)>=t)throw new Error("invalid sig")}r.exports=function(r,t,e,d,u){var c=i(e);if("ec"===c.type){if("ecdsa"!==d&&"ecdsa/rsa"!==d)throw new Error("wrong public key type");return function(r,t,e){var n=o[e.data.algorithm.curve.join(".")];if(!n)throw new Error("unknown curve "+e.data.algorithm.curve.join("."));var a=new s(n),i=e.data.subjectPrivateKey.data;return a.verify(t,r,i)}(r,t,c)}if("dsa"===c.type){if("dsa"!==d)throw new Error("wrong public key type");return function(r,t,e){var n=e.data.p,s=e.data.q,o=e.data.g,d=e.data.pub_key,u=i.signature.decode(r,"der"),c=u.s,f=u.r;h(c,s),h(f,s);var p=a.mont(n),g=c.invm(s);return 0===o.toRed(p).redPow(new a(t).mul(g).mod(s)).fromRed().mul(d.toRed(p).redPow(f.mul(g).mod(s)).fromRed()).mod(n).mod(s).cmp(f)}(r,t,c)}if("rsa"!==d&&"ecdsa/rsa"!==d)throw new Error("wrong public key type");t=n.concat([u,t]);for(var f=c.modulus.byteLength(),p=[1],g=0;t.length+p.length+2<f;)p.push(255),g++;p.push(0);for(var l=-1;++l<t.length;)p.push(t[l]);p=n.from(p);var m=a.mont(c.modulus);r=(r=new a(r).toRed(m)).redPow(new a(c.publicExponent)),r=n.from(r.fromRed().toArray());var w=g<8?1:0;for(f=Math.min(r.length,p.length),r.length!==p.length&&(w=1),l=-1;++l<f;)w|=r[l]^p[l];return 0===w}}}]);