(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{160:function(e,r,n){var t=n(119);e.exports=function(e,r){r=r||{};var n=t.decode(e,r);if(!n)return null;var i=n.payload;if("string"===typeof i)try{var o=JSON.parse(i);null!==o&&"object"===typeof o&&(i=o)}catch(a){}return!0===r.complete?{header:n.header,payload:i,signature:n.signature}:i}},212:function(e,r,n){var t=n(94),i=function(e,r){t.call(this,e),this.name="NotBeforeError",this.date=r};(i.prototype=Object.create(t.prototype)).constructor=i,e.exports=i},213:function(e,r,n){var t=n(94),i=function(e,r){t.call(this,e),this.name="TokenExpiredError",this.expiredAt=r};(i.prototype=Object.create(t.prototype)).constructor=i,e.exports=i},214:function(e,r,n){var t=n(410);e.exports=function(e,r){var n=r||Math.floor(Date.now()/1e3);if("string"===typeof e){var i=t(e);if("undefined"===typeof i)return;return Math.floor(n+i/1e3)}return"number"===typeof e?n+e:void 0}},215:function(e,r,n){(function(r){var t=n(411);e.exports=t.satisfies(r.version,"^6.12.0 || >=8.0.0")}).call(this,n(18))},229:function(e,r,n){e.exports={decode:n(160),verify:n(409),sign:n(412),JsonWebTokenError:n(94),NotBeforeError:n(212),TokenExpiredError:n(213)}},409:function(e,r,n){var t=n(94),i=n(212),o=n(213),a=n(160),s=n(214),u=n(215),f=n(119),d=["RS256","RS384","RS512","ES256","ES384","ES512"],c=["RS256","RS384","RS512"],p=["HS256","HS384","HS512"];u&&(d.splice(3,0,"PS256","PS384","PS512"),c.splice(3,0,"PS256","PS384","PS512")),e.exports=function(e,r,n,u){var l;if("function"!==typeof n||u||(u=n,n={}),n||(n={}),n=Object.assign({},n),l=u||function(e,r){if(e)throw e;return r},n.clockTimestamp&&"number"!==typeof n.clockTimestamp)return l(new t("clockTimestamp must be a number"));if(void 0!==n.nonce&&("string"!==typeof n.nonce||""===n.nonce.trim()))return l(new t("nonce must be a non-empty string"));var m=n.clockTimestamp||Math.floor(Date.now()/1e3);if(!e)return l(new t("jwt must be provided"));if("string"!==typeof e)return l(new t("jwt must be a string"));var y,g=e.split(".");if(3!==g.length)return l(new t("jwt malformed"));try{y=a(e,{complete:!0})}catch(w){return l(w)}if(!y)return l(new t("invalid token"));var b,h=y.header;if("function"===typeof r){if(!u)return l(new t("verify must be called asynchronous if secret or public key is provided as a callback"));b=r}else b=function(e,n){return n(null,r)};return b(h,(function(r,a){if(r)return l(new t("error in secret or public key callback: "+r.message));var u,b=""!==g[2].trim();if(!b&&a)return l(new t("jwt signature is required"));if(b&&!a)return l(new t("secret or public key must be provided"));if(b||n.algorithms||(n.algorithms=["none"]),n.algorithms||(n.algorithms=~a.toString().indexOf("BEGIN CERTIFICATE")||~a.toString().indexOf("BEGIN PUBLIC KEY")?d:~a.toString().indexOf("BEGIN RSA PUBLIC KEY")?c:p),!~n.algorithms.indexOf(y.header.alg))return l(new t("invalid algorithm"));try{u=f.verify(e,y.header.alg,a)}catch(E){return l(E)}if(!u)return l(new t("invalid signature"));var w=y.payload;if("undefined"!==typeof w.nbf&&!n.ignoreNotBefore){if("number"!==typeof w.nbf)return l(new t("invalid nbf value"));if(w.nbf>m+(n.clockTolerance||0))return l(new i("jwt not active",new Date(1e3*w.nbf)))}if("undefined"!==typeof w.exp&&!n.ignoreExpiration){if("number"!==typeof w.exp)return l(new t("invalid exp value"));if(m>=w.exp+(n.clockTolerance||0))return l(new o("jwt expired",new Date(1e3*w.exp)))}if(n.audience){var v=Array.isArray(n.audience)?n.audience:[n.audience];if(!(Array.isArray(w.aud)?w.aud:[w.aud]).some((function(e){return v.some((function(r){return r instanceof RegExp?r.test(e):r===e}))})))return l(new t("jwt audience invalid. expected: "+v.join(" or ")))}if(n.issuer&&("string"===typeof n.issuer&&w.iss!==n.issuer||Array.isArray(n.issuer)&&-1===n.issuer.indexOf(w.iss)))return l(new t("jwt issuer invalid. expected: "+n.issuer));if(n.subject&&w.sub!==n.subject)return l(new t("jwt subject invalid. expected: "+n.subject));if(n.jwtid&&w.jti!==n.jwtid)return l(new t("jwt jwtid invalid. expected: "+n.jwtid));if(n.nonce&&w.nonce!==n.nonce)return l(new t("jwt nonce invalid. expected: "+n.nonce));if(n.maxAge){if("number"!==typeof w.iat)return l(new t("iat required when maxAge is specified"));var x=s(n.maxAge,w.iat);if("undefined"===typeof x)return l(new t('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));if(m>=x+(n.clockTolerance||0))return l(new o("maxAge exceeded",new Date(1e3*x)))}if(!0===n.complete){var j=y.signature;return l(null,{header:h,payload:w,signature:j})}return l(null,w)}))}},412:function(e,r,n){(function(r){var t=n(214),i=n(215),o=n(119),a=n(413),s=n(414),u=n(415),f=n(416),d=n(417),c=n(418),p=n(419),l=["RS256","RS384","RS512","ES256","ES384","ES512","HS256","HS384","HS512","none"];i&&l.splice(3,0,"PS256","PS384","PS512");var m={expiresIn:{isValid:function(e){return u(e)||c(e)&&e},message:'"expiresIn" should be a number of seconds or string representing a timespan'},notBefore:{isValid:function(e){return u(e)||c(e)&&e},message:'"notBefore" should be a number of seconds or string representing a timespan'},audience:{isValid:function(e){return c(e)||Array.isArray(e)},message:'"audience" must be a string or array'},algorithm:{isValid:a.bind(null,l),message:'"algorithm" must be a valid string enum value'},header:{isValid:d,message:'"header" must be an object'},encoding:{isValid:c,message:'"encoding" must be a string'},issuer:{isValid:c,message:'"issuer" must be a string'},subject:{isValid:c,message:'"subject" must be a string'},jwtid:{isValid:c,message:'"jwtid" must be a string'},noTimestamp:{isValid:s,message:'"noTimestamp" must be a boolean'},keyid:{isValid:c,message:'"keyid" must be a string'},mutatePayload:{isValid:s,message:'"mutatePayload" must be a boolean'}},y={iat:{isValid:f,message:'"iat" should be a number of seconds'},exp:{isValid:f,message:'"exp" should be a number of seconds'},nbf:{isValid:f,message:'"nbf" should be a number of seconds'}};function g(e,r,n,t){if(!d(n))throw new Error('Expected "'+t+'" to be a plain object.');Object.keys(n).forEach((function(i){var o=e[i];if(o){if(!o.isValid(n[i]))throw new Error(o.message)}else if(!r)throw new Error('"'+i+'" is not allowed in "'+t+'"')}))}var b={audience:"aud",issuer:"iss",subject:"sub",jwtid:"jti"},h=["expiresIn","notBefore","noTimestamp","audience","issuer","subject","jwtid"];e.exports=function(e,n,i,a){"function"===typeof i?(a=i,i={}):i=i||{};var s="object"===typeof e&&!r.isBuffer(e),u=Object.assign({alg:i.algorithm||"HS256",typ:s?"JWT":void 0,kid:i.keyid},i.header);function f(e){if(a)return a(e);throw e}if(!n&&"none"!==i.algorithm)return f(new Error("secretOrPrivateKey must have a value"));if("undefined"===typeof e)return f(new Error("payload is required"));if(s){try{!function(e){g(y,!0,e,"payload")}(e)}catch(w){return f(w)}i.mutatePayload||(e=Object.assign({},e))}else{var d=h.filter((function(e){return"undefined"!==typeof i[e]}));if(d.length>0)return f(new Error("invalid "+d.join(",")+" option for "+typeof e+" payload"))}if("undefined"!==typeof e.exp&&"undefined"!==typeof i.expiresIn)return f(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));if("undefined"!==typeof e.nbf&&"undefined"!==typeof i.notBefore)return f(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));try{!function(e){g(m,!1,e,"options")}(i)}catch(w){return f(w)}var c=e.iat||Math.floor(Date.now()/1e3);if(i.noTimestamp?delete e.iat:s&&(e.iat=c),"undefined"!==typeof i.notBefore){try{e.nbf=t(i.notBefore,c)}catch(v){return f(v)}if("undefined"===typeof e.nbf)return f(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))}if("undefined"!==typeof i.expiresIn&&"object"===typeof e){try{e.exp=t(i.expiresIn,c)}catch(v){return f(v)}if("undefined"===typeof e.exp)return f(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))}Object.keys(b).forEach((function(r){var n=b[r];if("undefined"!==typeof i[r]){if("undefined"!==typeof e[n])return f(new Error('Bad "options.'+r+'" option. The payload already has an "'+n+'" property.'));e[n]=i[r]}}));var l=i.encoding||"utf8";if("function"!==typeof a)return o.sign({header:u,payload:e,secret:n,encoding:l});a=a&&p(a),o.createSign({header:u,privateKey:n,payload:e,encoding:l}).once("error",a).once("done",(function(e){a(null,e)}))}}).call(this,n(12).Buffer)},94:function(e,r){var n=function(e,r){Error.call(this,e),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="JsonWebTokenError",this.message=e,r&&(this.inner=r)};(n.prototype=Object.create(Error.prototype)).constructor=n,e.exports=n}}]);