!function(t){var o={};function c(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=o,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(n,e){if(1&e&&(n=c(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)c.d(t,o,function(e){return n[e]}.bind(null,o));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="",c(c.s=4)}([function(e,n,t){"use strict";function o(e,n){var t=ymaps.templateLayoutFactory.createClass('<div class="pin $[properties.balloonContent]">{{ properties.iconCaption }}</div>'),o=n?"active":"",c=!0,r=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(c=(i=u.next()).done);c=!0){var s=i.value,l=new ymaps.Placemark([s.lat,s.len],{balloonContent:o,iconCaption:s.name},{iconLayout:t});myMap.geoObjects.add(l)}}catch(e){r=!0,a=e}finally{try{c||null==u.return||u.return()}finally{if(r)throw a}}}t.d(n,"a",function(){return o})},function(e,n,t){"use strict";t.d(n,"a",function(){return o});var o=[{ceh:"Боровичи",name:"Анциферово",lat:58.966335,len:34.024697,ch1mux:26,ch2mux:46},{ceh:"Великий Новгород",name:"Батецкий",lat:58.64474,len:30.301729,ch1mux:43,ch2mux:44},{ceh:"Боровичи",name:"Ближнее Заполье",lat:59.104938,len:33.30397,ch1mux:26,ch2mux:46},{ceh:"Боровичи",name:"Боровичи",lat:58.388219,len:33.914025,ch1mux:26,ch2mux:46},{ceh:"Пролетарий",name:"Валдай",lat:57.980199,len:33.246667,ch1mux:51,ch2mux:57},{ceh:"Великий Новгород",name:"Великий Новгород",lat:58.52281,len:31.269915,ch1mux:30,ch2mux:58},{ceh:"Боровичи",name:"Висленев Остров",lat:58.701964,len:33.08559,ch1mux:26,ch2mux:46},{ceh:"Великий Новгород",name:"Волот",lat:57.927807,len:30.70677,ch1mux:40,ch2mux:29},{ceh:"Великий Новгород",name:"Воронино",lat:58.565688,len:30.597032,ch1mux:43,ch2mux:44},{ceh:"Боровичи",name:"Глухачи",lat:58.614241,len:35.422108,ch1mux:51,ch2mux:57},{ceh:"Залучье",name:"Залучье",lat:57.667865,len:31.765021,ch1mux:51,ch2mux:57},{ceh:"Залучье",name:"Ильина Гора",lat:57.581332,len:32.652665,ch1mux:51,ch2mux:57},{ceh:"Боровичи",name:"Кабожа",lat:58.803774,len:35.028403,ch1mux:51,ch2mux:57},{ceh:"Боровичи",name:"Калитино",lat:58.93598,len:33.411031,ch1mux:26,ch2mux:46},{ceh:"Боровичи",name:"Лубенское",lat:58.629409,len:35.108937,ch1mux:51,ch2mux:57},{ceh:"Залучье",name:"Лычково",lat:57.921493374063736,len:32.423002282538064,ch1mux:51,ch2mux:57},{ceh:"Боровичи",name:"Любытино",lat:58.815748,len:33.393892,ch1mux:26,ch2mux:46},{ceh:"Пролетарий",name:"Малая Вишера",lat:58.845758,len:32.217664,ch1mux:30,ch2mux:58},{ceh:"Пролетарий",name:"Мелехово",lat:59.098917,len:31.935737,ch1mux:30,ch2mux:58},{ceh:"Пролетарий",name:"Мокрый Остров",lat:58.187197,len:32.487518,ch1mux:51,ch2mux:57},{ceh:"Боровичи",name:"Мошенское",lat:58.511464,len:34.593187,ch1mux:26,ch2mux:46},{ceh:"Пролетарий",name:"Новинка",lat:57.801658,len:33.082419,ch1mux:51,ch2mux:57},{ceh:"Великий Новгород",name:"Новое Овсино",lat:58.491838,len:30.28935,ch1mux:43,ch2mux:44},{ceh:"Залучье",name:"Переходы",lat:57.665208,len:30.867281,ch1mux:40,ch2mux:29},{ceh:"Боровичи",name:"Пестово",lat:58.595347,len:35.800685,ch1mux:51,ch2mux:57},{ceh:"Залучье",name:"Полново",lat:57.534352,len:32.948273,ch1mux:51,ch2mux:57},{ceh:"Пролетарий",name:"Пролетарий",lat:58.437358,len:31.708167,ch1mux:30,ch2mux:58},{ceh:"Великий Новгород",name:"Старая Каменка",lat:58.208834,len:30.093733,ch1mux:40,ch2mux:29},{ceh:"Залучье",name:"Старая Русса",lat:58.00852713133914,len:31.359131990765995,ch1mux:51,ch2mux:57},{ceh:"Великий Новгород",name:"Тёсовский",lat:58.791396,len:30.875761,ch1mux:30,ch2mux:58},{ceh:"Залучье",name:"Тугино",lat:57.409961,len:31.048947,ch1mux:23,ch2mux:24},{ceh:"Боровичи",name:"Угловка",lat:58.214007,len:33.517688,ch1mux:26,ch2mux:46},{ceh:"Боровичи",name:"Хвойная",lat:58.896645,len:34.491507,ch1mux:26,ch2mux:46},{ceh:"Залучье",name:"Холм",lat:57.145202,len:31.178781,ch1mux:23,ch2mux:24},{ceh:"Пролетарий",name:"Яжелбицы",lat:58.036126,len:32.959888,ch1mux:51,ch2mux:57}]},function(e,n,t){"use strict";function o(){ymaps.borders.load("RU",{quality:2}).then(function(e){var n=e.features[32];n.id=n.properties.iso3166,n.options={strokeWidth:4,strokeColor:"#ff4500",strokeOpacity:.6,fillColor:"#ffd530",fillOpacity:.4,openHintOnHover:!1};var t=new ymaps.ObjectManager;t.add(n),myMap.geoObjects.add(t);var o=n.geometry.coordinates[0],c=ymaps.util.bounds.fromPoints(o);ymaps.util.requireCenterAndZoom(myMap.getType(),c,myMap.container.getSize(),{margin:30,preciseZoom:!0}).then(function(e){myMap.setCenter(e.center,e.zoom)})},function(e){console.log(e)})}t.d(n,"a",function(){return o})},function(e,n,t){"use strict";t.d(n,"a",function(){return o});var o={converterCoords:function(e){var n=myMap.options.get("projection");return myMap.converter.globalToPage(n.toGlobalPixels(e,myMap.getZoom()))},convertPixels:function(e){return myMap.options.get("projection").fromGlobalPixels(myMap.converter.pageToGlobal(e),myMap.getZoom()).join(", ")},delay:function(t,o){return function(){var e=this,n=arguments;setTimeout(function(){t.apply(e,n)},o)}}}},function(e,n,r){"use strict";r.r(n),function(e){r(6);var n=r(1),t=r(2),o=r(0),c=r(10);ymaps.ready(function(){e.myMap=new ymaps.Map("map",{center:[58.19421684348514,32.92976749999997],controls:[],zoom:8.23},{avoidFractionalZoom:!1}),myMap.behaviors.disable(["drag","scrollZoom","dblClickZoom"]),Object(t.a)(),Object(o.a)(n.a),Object(c.a)(n.a)})}.call(this,r(5))},function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n,t){},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});var u=o(8),s=o(9),l=o(0),m=o(3);function e(e){var t=new u.a({iconLayout:ymaps.templateLayoutFactory.createClass('<div class="ded ded-$[properties.direction]"></div>')});myMap.geoObjects.add(t);var o={};e.forEach(function(e){o.hasOwnProperty(e.ceh)?o[e.ceh].pins.push(e):o[e.ceh]={pins:[e]},e.ceh===e.name&&(o[e.ceh].coords=[e.lat,e.len])}),n.points=[[[58.5228,31.2699],o["Великий Новгород"].coords],[o["Великий Новгород"].coords,o["Залучье"].coords],[o["Залучье"].coords,o["Пролетарий"].coords],[o["Пролетарий"].coords,o["Боровичи"].coords]];var c=["Великий Новгород","Залучье","Пролетарий","Боровичи"],r=0,a=m.a.delay(function(e,n){e.properties.set("direction",""),Object(s.a)(o,c[n]),m.a.delay(function(e){Object(l.a)(o[c[e]].pins,!0),myMap.geoObjects.add(t)},200)(n),n+1===c.length&&alert("Карта запущена")},1e3);function i(n){if(0==n.length)return null;ymaps.route(n.shift()).then(function(e){t.moveTo(e.getPaths().get(0).getSegments(),{speed:3e3,directions:2},function(e,n,t){e.geometry.setCoordinates(n),e.properties.set("direction",t.t)},function(e){e.properties.set("direction","jump"),a(e,r++),m.a.delay(i,1500)(n)})})}return function(){i(points)}}}).call(this,o(5))},function(e,n,t){"use strict";t.d(n,"a",function(){return o});t(3);var x,o=(x={arrows:{w:"←",sw:"↙",s:"↓",se:"↘",e:"→",ne:"↗",n:"↑",nw:"↖"},classes:{16:["w","sww","sw","ssw","s","sse","se","see","e","nee","ne","nne","n","nnw","nw","nww"],8:["w","sw","s","se","e","ne","n","nw"],4:["w","s","e","n"],2:["w","e"]},n:function(e,n,t){var o=t>>1,c=(Math.floor(Math.atan2(e,n)/Math.PI*o+1/t)+o)%t;return{n:c,t:x.classes[t][c]}},16:function(e,n){return x.n(e,n,16)},8:function(e,n){return x.n(e,n,8)},4:function(e,n){return x.n(e,n,4)},2:function(e,n){return x.n(e,n,2)}},function(e){var n=new ymaps.GeoObject({geometry:{type:"Point"}},e);return n.coordSystem=e.coordSystem,n.waypoints=[],n.stop=function(){this.waypoints.length=0},n.moveTo=function(e,n,t,o){var c=this;if(e){(n=n||{}).coordSystem=n.coordSystem||this.coordSystem||this.getMap().options.get("projection").getCoordSystem(),n.speed=n.speed||Math.round(1e3/this.getMap().getZoom());var r=function(e,n){var t,o;(n=n||{}).directions=0<=[2,4,8,16].indexOf(n.directions)?n.directions:8,n.speed=n.speed||6;var c,r,a,i,u,s,l,m=[],h=x[n.directions],d=n.coordSystem;for(t=[],c=0,i=e.length;c<i;c++)for(r=0,a=(o=e[c].getCoordinates()).length;r<a;r++)s=o[r],u&&u[0].toPrecision(10)===s[0].toPrecision(10)&&u[1].toPrecision(10)===s[1].toPrecision(10)||(t.push(s),u=s);for(c=0,i=t.length-1;i;--i,++c){var p=t[c],f=t[c+1],y=[f[0]-p[0],f[1]-p[1]];for(l=h(y[0],y[1]),r=0,a=Math.round(d.distance(p,f));r<a;r+=n.speed)m.push({coords:[p[0]+y[0]*r/a,p[1]+y[1]*r/a],direction:l,vector:y})}return m}(e,n),a=[];this.waypoints=r.map(function(e,n){return a.push(e),2<=a.length&&e.direction.t!==a[a.length-2].direction.t&&(20<a.length?a=[e]:(e.direction.t=a[a.length-2].direction.t,a.splice(a.length-1,1,e))),a[a.length-1]});var i=setInterval(function(){if(0===c.waypoints.length)return o(c),clearTimeout(i);var e=c.waypoints.shift();t(c,e.coords,e.direction)},42)}},n})},function(e,n,t){"use strict";function o(t,o){t[o].pins.forEach(function(e,n){ymaps.route([t[o].coords,[e.lat,e.len]]).then(function(e){var n=e.getPaths();n.options.set({strokeWidth:6,strokeColor:"#87cefa"}),myMap.geoObjects.add(n)})})}t.d(n,"a",function(){return o})},function(e,n,t){"use strict";t.d(n,"a",function(){return o});var s=t(7),l=t(3);function o(e){var n=new TimelineLite({paused:!0}),t=".ded-big",o=document.getElementById("canvas").querySelector("#ded-launch-btn"),c=Object(s.a)(e),r={start:l.a.converterCoords(points[0][0]),end:l.a.converterCoords(points[points.length-1][1])};console.log(r.start,r.end);var a={x:r.start[0],y:r.start[1]};r.end[0],r.end[1];TweenLite.set(t,{x:300,y:0}),n.to(t,1.2,{bezier:{values:[{x:a.x-150,y:a.y-250},a]},scale:1,ease:SlowMo.ease.config(.2,.1,!1)}),n.eventCallback("onComplete",i);var i=l.a.delay(c,900);function i(){TweenLite.to(t,1.1,{display:"none"}),i()}var u=!1;o.addEventListener("click",function(){u||(u=!0,n.restart())}),window.addEventListener("keydown",function(e){"Enter"!==e.key||u||(u=!0,n.restart())})}}]);
//# sourceMappingURL=bundle.js.map