(window.webpackJsonpatp_frontend=window.webpackJsonpatp_frontend||[]).push([[0],{215:function(e,t,a){e.exports=a(392)},220:function(e,t,a){},221:function(e,t,a){},222:function(e,t,a){},325:function(e,t,a){},345:function(e,t,a){},368:function(e,t,a){},369:function(e,t,a){},370:function(e,t,a){},385:function(e,t,a){},386:function(e,t,a){},387:function(e,t,a){},392:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(40),o=a.n(i),s=(a(220),a(221),a(427));a(222);var l=function(){return r.a.createElement("div",{id:"the_header"},r.a.createElement(s.a,{id:"the_menu_item"},r.a.createElement(s.a.Item,{header:!0},"ATP Visualizer"),r.a.createElement(s.a.Item,{name:"XXX"}),r.a.createElement(s.a.Item,{name:"YYY"}),r.a.createElement(s.a.Item,{name:"ZZZ"})))},c=a(26),u=a(20),d=a(27),h=a(28),_=a(29),m=a(47),p=a(426),f=(a(325),a(417)),g="https://young-meadow-84276.herokuapp.com",v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={players:[]},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"addPlayer",value:function(e,t,a,n){this.state.players.map(function(e){return e.id}).includes(e)||this.setState({players:[].concat(Object(m.a)(this.state.players),[{id:e,name:t,color:a,image:n}])})}},{key:"handle_button_click",value:function(e){this.setState({players:this.state.players.filter(function(t){return t.id!==e.id})}),this.props.removed_player_handler(e.id)}},{key:"render",value:function(){var e=this,t=this.state.players.map(function(t){return r.a.createElement("div",{id:"the_current_player",key:t.id},r.a.createElement(p.a,{className:"player_button",style:{backgroundColor:t.color,borderRadius:0},id:t.id,onClick:function(t,a){return e.handle_button_click(a)}},t.name),r.a.createElement(f.a,{id:"the_player_circle",src:g+"/"+t.image}),r.a.createElement("br",null),r.a.createElement("br",null))});return r.a.createElement("div",{id:"the_current_players"},t)}}]),t}(r.a.Component),y=a(22),b=a.n(y),x=a(35),k=a(63),w=a(187),E=a(421),O=a(418),j=(a(345),a(19)),S=a(103),C=(a(368),a(429)),R=a(420),D=a(419),L=48,M={F:"Final",SF:"Semi-final",QF:"Quarter-final",R16:"Round of 16",R32:"Round of 32",R64:"Round of 64",R128:"Round of 128",RR:"Round Robin"},N=a(18),T=a.n(N),I=function(e){return r.a.createElement("a",{href:e.url,target:"_blank"},r.a.createElement("div",{className:"video_container"},r.a.createElement("img",{className:"video_image",src:e.thumbnail}),r.a.createElement("div",{className:"video_duration"},"\u25ba ",function(e){if(null==e)return e;var t=function(e,t){var a=e.indexOf(t);if(-1==a)return null;for(var n=a-1;e[n]>="0"&&e[n]<="9";)n-=1;return n+=1,e.substring(n,a)},a=t(e,"H"),n=t(e,"M"),r=t(e,"S"),i="";return null!=a&&(i+=a+":"),null!=n&&(i+=n+":"),null!=r&&(1==r.length&&(i+="0"),i+=r),i}(e.duration))))},A=function(e){return r.a.createElement(O.a,{container:!0},r.a.createElement(O.a,{item:!0,xs:8},r.a.createElement("p",{className:e.nameClassName},e.name)),r.a.createElement(O.a,{item:!0},r.a.createElement(O.a,{container:!0,spacing:1},e.parsedScores.map(function(t){return r.a.createElement(O.a,{item:!0},r.a.createElement("p",{className:e.scoreClassName},t))}))))},B=function(e){var t=function(e){var t=e.split(" "),a=[],n=[],r=!0,i=!1,o=void 0;try{for(var s,l=t[Symbol.iterator]();!(r=(s=l.next()).done);r=!0){var c=s.value,u=(c=c.replace(/\(.*\)/,"")).split("-");a.push(u[0]),n.push(u[1])}}catch(d){i=!0,o=d}finally{try{r||null==l.return||l.return()}finally{if(i)throw o}}return[a,n]}(e.match.score),a=null;return null!==e.match.video_url&&(a=r.a.createElement(I,{url:"http://"+e.match.video_url,thumbnail:e.match.video_thumbnail,duration:e.match.video_duration})),r.a.createElement(D.a,{key:e.match.id,className:"the_match_row"},r.a.createElement(O.a,{container:!0},r.a.createElement(O.a,{item:!0},M[e.match.round])),r.a.createElement(O.a,{container:!0},r.a.createElement(O.a,{item:!0,xs:9},r.a.createElement(A,{nameClassName:"winner_name",scoreClassName:"winner_score",name:e.match.winner.first_name[0]+". "+e.match.winner.last_name,parsedScores:t[0]}),r.a.createElement(A,{nameClassName:"loser_name",scoreClassName:"loser_score",name:e.match.loser.first_name[0]+". "+e.match.loser.last_name,parsedScores:t[1]})),r.a.createElement(O.a,{item:!0},a)))},P=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={tourney_name:null,tourney_date:null,tourney_matches:[],loading:!0,color:"red",displaying:!1},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"prepare_box",value:function(e,t,a){T()("#the_matches_paper").css("left",t-170),T()("#the_matches_paper").css("top",a-100),T()("#the_matches_paper").css("display","block"),T()("#the_matches_paper").css("border","5px solid ".concat(e)),T()("#the_matches_paper").addClass("scale_transform"),this.setState({color:e,displaying:!0})}},{key:"setData",value:function(e,t,a){this.setState({tourney_name:e,tourney_date:t,tourney_matches:a,loading:!1})}},{key:"componentDidUpdate",value:function(){T()("#the_matches_paper").css("height","auto")}},{key:"mouseLeave",value:function(){T()("#the_matches_paper").css("display","none"),this.setState({displaying:!1})}},{key:"render",value:function(){var e,t=this;if(this.state.loading)e=r.a.createElement(S.RingLoader,{css:"\n\t\t\tdisplay: block;\n\t\t\tmargin: 0 auto;\n\t\t\ttop: 65px;\n\t\t",color:this.state.color});else{var a=this.state.tourney_matches.map(function(e){return r.a.createElement(B,{match:e})});e=r.a.createElement(C.a,null,r.a.createElement(R.a,null,r.a.createElement(D.a,{className:"tourny_header"},this.state.tourney_name),a))}return r.a.createElement(E.a,{id:"the_matches_paper",onMouseLeave:function(){return t.mouseLeave()}},e)}}]),t}(r.a.Component),X=a(61);function F(e){return e.yr+(e.mo<10?"0"+e.mo.toString():e.mo.toString())+(e.day<10?"0"+e.day.toString():e.day.toString())}function H(e,t){return fetch(function(e,t){return g+e+"?"+t}(e,function(e){return Object.keys(e).map(function(t){return t+"="+e[t]}).join("&")}(t))).then(function(e){return e.json().then(function(e){return e})})}var W={get_dates:function(e,t){return H("/get_ranking_dates_between",{starting_date:e,ending_date:t})},get_events:function(e,t,a){t=F(t),a=F(a);return H("/events",Object(X.a)({player_id:e,starting_date:t,ending_date:a},"ending_date",a))},get_matches:function(e,t,a){return H("/matches",{player_id:e,event_id:t,tournament_name:a})},get_rankings_by_age:function(e,t,a){return H("/get_ranking_history",{player_id:e,starting_age:t,ending_age:a})},get_rankings_by_date:function(e,t,a){return H("/get_ranking_history_date",{player_id:e,starting_date:t,ending_date:a})},get_top_ten:function(){return H("/topTenPlayers",{})},get_ten_filtered:function(e){return H("/topTenFiltered",{prefix:e})}};function Y(){var e=Object(w.a)(["\n\t\t\tdisplay: block;\n\t\t\tmargin: 0 auto;\n\t\t\ttop: 65px;\n\t\t"]);return Y=function(){return e},e}var J=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).match_info=r.a.createRef(),a.state={loading:!1,event_data:[],player_id:null,color:"red",hover_x:0,hover_y:0,data_is_set:!1,canvas_height:0,canvas_width:0,displaying:!1},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"set_event_data",value:function(e,t){this.setState({event_data:e,player_id:t,data_is_set:!0,loading:!1})}},{key:"prepare_box",value:function(e,t,a,n,r,i,o){T()("#the_tourney_paper").css("display","block"),T()("#the_tourney_paper").css("left",t),T()("#the_tourney_paper").css("top",a),T()("#the_tourney_paper").css("border","5px solid ".concat(e)),T()("#the_tourney_paper").addClass("scale_transform"),this.setState({loading:!0,color:e,hover_x:n,hover_y:r,data_is_set:!1,canvas_height:i,canvas_width:o})}},{key:"initiate_match_display",value:function(e,t,a){var n=this;this.match_info.current.prepare_box(this.state.color,t+T()("#the_tourney_paper").position().left,a+T()("#the_tourney_paper").position().top),function(){var t=Object(x.a)(b.a.mark(function t(){var a,r,i,o;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.state.event_data[e].event_id,r=n.state.event_data[e].name,i=n.state.event_data[e].date,t.next=5,W.get_matches(n.state.player_id,a,r);case 5:o=t.sent,n.match_info.current.setData(r,i,o);case 7:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}()()}},{key:"mouseEnter",value:function(e,t){if(!this.match_info.current.state.displaying){var a=t.nativeEvent.layerX,n=t.nativeEvent.layerY,r="#the_circle_".concat(this.state.event_data[e].event_id);T()(r).addClass("blink_animate");var i=this;T()(r).one("animationend",function(t){i.initiate_match_display(e,a,n)})}}},{key:"mouseLeave",value:function(e,t){var a="#the_circle_".concat(this.state.event_data[e].event_id);T()(a).removeClass("blink_animate")}},{key:"split_events",value:function(e,t,a){for(var n=[],r=0;r<e.length;r++)r%2==t?n.push(e[r]):n.push(a);return n}},{key:"set_box_positions",value:function(e,t){var a=this.state.hover_x-t/2,n=this.state.hover_y-e/2;return a<0?a=0:a+t>this.state.canvas_width&&(a=this.state.canvas_width-t),n<0?n=0:n+e>this.state.canvas_height&&(n=this.state.canvas_height-e),[a,n]}},{key:"componentDidUpdate",value:function(){if(this.state.data_is_set){T()("#the_tourney_paper").css("width","auto"),T()("#the_tourney_paper").css("height","auto");var e=this.set_box_positions(T()("#the_tourney_paper").height(),T()("#the_tourney_paper").width());T()("#the_tourney_paper").css("left",e[0]),T()("#the_tourney_paper").css("top",e[1]),this.setState({data_is_set:!1})}}},{key:"render",value:function(){var e,t=this,a=r.a.createElement(O.a,{item:!0,className:"empty_item"}),n=this.state.event_data.map(function(e,a){return r.a.createElement(O.a,{item:!0},r.a.createElement(f.a,{className:"the_circle",src:g+"/"+e.image,onMouseEnter:function(e){return t.mouseEnter(a,e)},onMouseLeave:function(e){return t.mouseLeave(a,e)},key:e.event_id,id:"the_circle_"+e.event_id}))}),i=this.split_events(n,0,a),o=this.split_events(n,1,a),s=Object(j.css)(Y());return e=1==this.state.loading?r.a.createElement(S.RingLoader,{css:s,color:this.state.color}):r.a.createElement("div",null,r.a.createElement(O.a,{container:!0,wrap:"nowrap"},i),r.a.createElement(O.a,{container:!0,wrap:"nowrap"},o)),r.a.createElement("div",null,r.a.createElement(E.a,{id:"the_tourney_paper"},e),r.a.createElement(P,{ref:this.match_info}))}}]),t}(r.a.Component),V=(a(369),["rgb(76, 128, 24, 1)","rgb(24, 76, 128, 1)","rgb(128, 24, 128, 1)","rgb(216, 12, 12, 1)","rgb(225, 122, 19, 1)","rgb(19, 225, 225, 1)","rgb(68, 97, 39, 1)","rgb(97, 39, 39, 1)"]);var Q=function(e,t,a,n,r){return{data:{label:a,spanGaps:!0,fill:!1,lineTension:.1,backgroundColor:r,borderColor:r,borderWidth:3,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:r,pointBackgroundColor:"#fff",pointBorderWidth:4,pointHoverRadius:7,pointHoverBackgroundColor:r,pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:1,pointRadius:1,pointHitRadius:1,data:e},dates:t,player_id:n}};function Z(e,t,a){e.event_box.current.set_event_data(t,a)}function z(e,t,a,n,r,i){var o,s=e.state.y_data[t].data.borderColor,l=e.refs.graph.chartInstance.canvas,c=l.clientHeight,u=l.clientWidth,d=function(e,t,a,n,r){var i=t-100,o=a-100;return i<0?i=0:i+200>r&&(i=r-200),o<0?o=0:o+200>n&&(o=n-200),[i,o]}(0,r,i,c,u);e.event_box.current.prepare_box((o=(o=s).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===o.length?"#"+("0"+parseInt(o[1],10).toString(16)).slice(-2)+("0"+parseInt(o[2],10).toString(16)).slice(-2)+("0"+parseInt(o[3],10).toString(16)).slice(-2):"",d[0],d[1],r,i,c,u);var h=e.state.y_data[t].player_id,_=e.state.y_data[t].dates[a],m=e.state.y_data[t].dates[n];(function(){var t=Object(x.a)(b.a.mark(function t(){var a;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,W.get_events(h,_,m);case 2:a=t.sent,Z(e,a,h);case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}})()()}var U=function(e,t,a){var n=e.refs.graph.chartInstance,r=t.layerX,i=t.layerY,o=function(e,t,a,n){for(var r,i,o,s,l,c,u=0;u<e.state.y_data.length;u++){var d=t.getDatasetMeta(u).data;d=d.filter(function(e){return 0==e._model.skip});for(var h=0;h<d.length-1;h++){var _=d[h]._model.x,m=d[h]._model.y,p=d[h+1]._model.x,f=d[h+1]._model.y;if(!(a<_-1||a>p+1))if((r=a,i=n,o=_,s=m,l=p,c=f,Math.abs((i-s)*(r-l)-(i-c)*(r-o)))<300)return{data_idx:d[h]._datasetIndex,i1:d[h]._index,i2:d[h+1]._index}}}return null}(e,n,r,i);if(null!==o){if(-1!==e.state.highlight_data_idx){if(o.i1==e.state.highlight_idx1&&o.i2==e.state.highlight_idx2)return;document.getElementById("the_tourney_paper").setAttribute("style","display:none"),document.getElementById("the_matches_paper").setAttribute("style","display:none")}!function(e,t,a,n){e.setState({highlight_data_idx:t,highlight_idx1:a,highlight_idx2:n})}(e,o.data_idx,o.i1,o.i2),z(e,o.data_idx,o.i1,o.i2,r,i)}else-1!==e.state.highlight_data_idx&&(e.setState({highlight_data_idx:-1,highlight_idx1:0,highlight_idx2:0}),document.getElementById("the_tourney_paper").setAttribute("style","display:none"),document.getElementById("the_matches_paper").setAttribute("style","display:none"))};function $(e,t,a,n){return"age"==t?function(e,t,a){if(a-t>5)return Math.floor(e).toString();var n,r=(n=e,n-=Math.floor(n),Math.ceil(12*n));return 0==r?Math.floor(e).toString():Math.floor(e).toString()+"."+r.toString()}(e,a,n):function(e){return{1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}[e.mo]+" "+e.yr}(e)}function G(e,t){var a=t-e;return a>5?Math.floor(a):10}function q(e){if("rank"==e.state.y_axis)return"Ranking"}function K(e){return"date"==e.state.x_axis?"Date":"age"==e.state.x_axis?"Age":void 0}var ee=function(e){return console.log(e),{scales:{yAxes:[{scaleLabel:{labelString:q(e),display:!0}}],xAxes:[{scaleLabel:{labelString:K(e),display:!0},ticks:{maxTicksLimit:G(e.state.window_left_age,e.state.window_right_age),autoSkip:!0,callback:function(t,a,n){return $(t,e.state.x_axis,e.state.window_left_age,e.state.window_right_age)}}}]},tooltips:{enabled:!1},legend:{onClick:function(e){return e.stopPropagation()},display:!1},onHover:function(t,a){return U(e,t,a)}}};function te(e,t,a,n,r,i){for(var o=Array(i).fill(null),s=Array(i).fill(null),l=0;l<a.length;l++)if(!(a[l]<n||a[l]>r)){var c=Math.floor((a[l]-n)/(1/(2*L)));o[c]=e[l],s[c]=t[l]}return[o,s]}var ae=function(e,t,a,n,r,i){var o=r.player_ids,s=r.player_names,l=r.player_colors,c=[],u=function(e,t){if(e>=t)return[];for(var a=e+1/96,n=[];a<=t;)n.push(a),a+=1/96;return n}(t,a),d=function(){var r=Object(x.a)(b.a.mark(function r(h){var _,m,p,f,g,v,y,x;return b.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(h>=o.length)){r.next=4;break}e.setState({y_data:i.concat(c),x_data:u,x_axis:"age"}),r.next=17;break;case 4:if("rank"!=n){r.next=8;break}return r.next=7,W.get_rankings_by_age(o[h],t,a);case 7:_=r.sent;case 8:m=_.map(function(e){return e[n]}),p=_.map(function(e){return e.date}),f=_.map(function(e){return e.age}),g=te(m,p,f,t,a,e.state.x_data.length),v=g[0],y=g[1],x=Q(v,y,s[h],o[h],l[h]),c.push(x),d(h+1);case 17:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}();d(0)};function ne(e,t,a){for(var n=Array(a.length).fill(null),r=Array(a.length).fill(null),i=0,o=0;o<a.length;o++){if(i>=t.length)return[n,r];t[i].yr==a[o].yr&&t[i].mo==a[o].mo&&t[i].day==a[o].day&&(n[o]=e[i],r[o]=t[i],i+=1)}return[n,r]}var re=function(e,t,a,n,r,i){var o,s=r.player_ids,l=r.player_names,c=r.player_colors,u=[],d=function(){var r=Object(x.a)(b.a.mark(function r(h){var _,m,p,f,g,v,y;return b.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!(h>=s.length)){r.next=5;break}return e.setState({y_data:i.concat(u),x_data:o,x_axis:"date"}),r.abrupt("return");case 5:if(-1!=h){r.next=11;break}return r.next=8,W.get_dates(t,a);case 8:o=r.sent,r.next=22;break;case 11:if("rank"!=n){r.next=22;break}return r.next=14,W.get_rankings_by_date(s[h],t,a);case 14:_=r.sent,m=_.map(function(e){return e.rank}),p=_.map(function(e){return e.date}),f=ne(m,p,o),g=f[0],v=f[1],y=Q(g,v,l[h],s[h],c[h]),u.push(y);case 22:d(h+1);case 23:case"end":return r.stop()}},r)}));return function(e){return r.apply(this,arguments)}}();d(-1)};var ie=function(e){return 0==e.state.available_colors.length?function(){var e=Math.round,t=Math.random;return"rgba("+e(255*t())+","+e(255*t())+","+e(255*t())+",1)"}():e.state.available_colors[0]};var oe=function(e){return k.a.controllers.myLine=k.a.controllers.line.extend({draw:function(){if(k.a.controllers.line.prototype.draw.apply(this,arguments),-1!=e.state.highlight_data_idx){var t=this.chart.getDatasetMeta(e.state.highlight_data_idx),a=this.chart.ctx,n=t.dataset._model.borderColor;a.strokeStyle=n.substr(0,n.length-2)+"0.3)",a.lineWidth=10,a.beginPath();var r=t.data[e.state.highlight_idx1];a.moveTo(r._model.x,r._model.y);var i=t.data[e.state.highlight_idx2];a.bezierCurveTo(r._model.x,r._model.y,r._model.controlPointNextX,r._model.controlPointNextY,i._model.x,i._model.y),a.stroke()}}}),k.a.controllers.myLine},se=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).event_box=r.a.createRef(),a.state={window_left_age:20,window_left_date:"20100101",window_right_age:30,window_right_date:"20200101",x_axis:"date",y_axis:"rank",x_data:[],y_data:[],available_colors:V,highlight_data_idx:-1,highlight_idx1:0,highlight_idx2:0},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;(function(){var t=Object(x.a)(b.a.mark(function t(){var a;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,W.get_dates(e.state.window_left_date,e.state.window_right_date);case 2:a=t.sent,e.setState({x_data:a});case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}})()()}},{key:"addPlayer",value:function(e,t){if(!this.state.y_data.map(function(e){return e.player_id}).includes(e)){var a=ie(this),n={player_ids:[e],player_names:[t],player_colors:[a]};return this.setState({available_colors:this.state.available_colors.slice(1)}),"age"==this.state.x_axis?ae(this,this.state.window_left_age,this.state.window_right_age,this.state.y_axis,n,this.state.y_data):"date"==this.state.x_axis&&re(this,this.state.window_left_date,this.state.window_right_date,this.state.y_axis,n,this.state.y_data),a}}},{key:"removePlayer",value:function(e){for(var t=this.state.available_colors,a=0;a<this.state.y_data.length;a++)this.state.y_data[a].player_id===e&&t.unshift(this.state.y_data[a].data.borderColor);this.setState({y_data:this.state.y_data.filter(function(t){return t.player_id!==e}),available_colors:t})}},{key:"changeXDimension",value:function(e,t,a){var n,r,i={player_ids:this.state.y_data.map(function(e){return e.player_id}),player_names:this.state.y_data.map(function(e){return e.data.label}),player_colors:this.state.y_data.map(function(e){return e.data.borderColor})};"age"==e?(n=this.state.window_left_age,r=this.state.window_right_age):"date"==e&&(n=this.state.window_left_date,r=this.state.window_right_date),"min"==t?n=a:"max"==t&&(r=a),"age"==e?(this.setState({window_left_age:n,window_right_age:r}),ae(this,n,r,this.state.y_axis,i,[])):"date"==e&&(this.setState({window_left_date:n,window_right_date:r}),re(this,n,r,this.state.y_axis,i,[]))}},{key:"changeYDimension",value:function(e){}},{key:"render",value:function(){oe(this);var e=ee(this),t={labels:this.state.x_data,datasets:this.state.y_data.map(function(e){return e.data})};return r.a.createElement("div",null,r.a.createElement("div",{id:"the_chart2"},r.a.createElement(k.b,{type:"myLine",ref:"graph",data:t,options:e})),r.a.createElement(J,{ref:this.event_box}))}}]),t}(r.a.Component),le=a(424),ce=(a(370),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={players:[],player_images:{},loading:!1,placeholder:"Select a Player",hovered_player:null,init_load:!1},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"convert_data",value:function(e){for(var t=[],a=0;a<e.length;a++){var n=e[a];t.push({text:n.last_name.concat(", ",n.first_name),value:n.id,key:n.id})}return t}},{key:"set_images",value:function(e){var t={},a=!0,n=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var s=i.value;t[s.id]=s.image}}catch(l){n=!0,r=l}finally{try{a||null==o.return||o.return()}finally{if(n)throw r}}return t}},{key:"setTopTen",value:function(e,t){var a=this;(function(){var n=Object(x.a)(b.a.mark(function n(){var r,i;return b.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,W.get_top_ten();case 2:r=n.sent,i=a.set_images(r),console.log(i),a.setState({players:a.convert_data(r),images:i,init_load:t,loading:e});case 6:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}})()()}},{key:"setTopTenFiltered",value:function(e){var t=this;(function(){var a=Object(x.a)(b.a.mark(function a(){var n,r;return b.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,W.get_ten_filtered(e);case 2:n=a.sent,r=t.set_images(n),t.setState({players:t.convert_data(n),images:r,loading:!1});case 5:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}})()()}},{key:"componentDidMount",value:function(){this.setTopTen(!1,!0)}},{key:"search_change",value:function(e){this.setState({loading:!0});var t=e.searchQuery;0==t.length?this.setTopTen(!1,this.state.init_load):this.setTopTenFiltered(t)}},{key:"label_click",value:function(e){for(var t=null,a=e.value,n=this.state.images[a],r=0;r<e.options.length;r++)e.options[r].value==a&&(t=e.options[r].text);this.props.added_player_handler(a,t,n)}},{key:"open",value:function(e){0==this.state.init_load&&this.setState({loading:!0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"the_player_selector"},r.a.createElement(le.a,{loading:this.state.loading,selectOnBlur:!1,search:!0,selection:!0,onChange:function(t,a){return e.label_click(a)},onSearchChange:function(t,a){return e.search_change(a)},options:this.state.players,onOpen:function(t,a){return e.open(a)},text:"Search a player..."}))}}]),t}(r.a.Component)),ue=a(425),de=a(17),he=(a(385),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).state={dimension:"date"},a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"change_age",value:function(e,t){this.props.slider_handler(e,t)}},{key:"change_date",value:function(e,t){var a=e.toString()+"0101";this.props.slider_handler(a,t)}},{key:"change_dimension",value:function(e){this.setState({dimension:e})}},{key:"render",value:function(){var e=this;var t=Object(de.a)({root:{color:"#2522e0",height:8},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus,&:hover,&$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(-50% + 4px)"},track:{height:8,borderRadius:4},rail:{height:8,borderRadius:4}})(ue.a);return"age"==this.state.dimension?r.a.createElement("div",{id:"the_dimension_slider"},r.a.createElement(t,{valueLabelDisplay:"auto","aria-label":"pretto slider",defaultValue:20,onChangeCommitted:function(t,a){return e.change_age(a,"min")},min:10,max:50}),r.a.createElement(t,{valueLabelDisplay:"auto","aria-label":"pretto slider",defaultValue:30,onChangeCommitted:function(t,a){return e.change_age(a,"max")},min:10,max:50})):r.a.createElement("div",{id:"the_dimension_slider"},r.a.createElement(t,{valueLabelDisplay:"auto","aria-label":"pretto slider",defaultValue:2010,onChangeCommitted:function(t,a){return e.change_date(a,"min")},min:1972,max:2020}),r.a.createElement(t,{valueLabelDisplay:"auto","aria-label":"pretto slider",defaultValue:2020,onChangeCommitted:function(t,a){return e.change_date(a,"max")},min:1972,max:2020}))}}]),t}(r.a.Component)),_e=a(423),me=a(422),pe=(a(386),function(e){function t(e){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).call(this,e))}return Object(_.a)(t,e),Object(u.a)(t,[{key:"handleChange",value:function(e){0==e?this.props.dimension_change_handler("date"):this.props.dimension_change_handler("age")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"the_switch"},r.a.createElement(me.a,{component:"div"},r.a.createElement(O.a,{component:"label",container:!0,alignItems:"center",spacing:1},r.a.createElement(O.a,{item:!0},"By Date"),r.a.createElement(O.a,{item:!0},r.a.createElement(_e.a,{onChange:function(t,a){e.handleChange(a)}})),r.a.createElement(O.a,{item:!0},"By Age"))))}}]),t}(r.a.Component)),fe=(a(387),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).graph=r.a.createRef(),a.dimension_slider=r.a.createRef(),a.current_players=r.a.createRef(),a}return Object(_.a)(t,e),Object(u.a)(t,[{key:"handle_slider_change",value:function(e,t){this.graph.current.changeXDimension(this.graph.current.state.x_axis,t,e)}},{key:"handle_added_player",value:function(e,t,a){console.log(a);var n=this.graph.current.addPlayer(e,t);this.current_players.current.addPlayer(e,t,n,a)}},{key:"handle_removed_player",value:function(e){this.graph.current.removePlayer(e)}},{key:"handle_dimension_change",value:function(e){this.dimension_slider.current.change_dimension(e),this.graph.current.changeXDimension(e,null,null)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"the_age_comparison"},r.a.createElement("div",{id:"player_selector_and_current_players"},r.a.createElement(ce,{added_player_handler:function(t,a,n){return e.handle_added_player(t,a,n)}}),r.a.createElement(v,{ref:this.current_players,removed_player_handler:function(t){return e.handle_removed_player(t)}}),r.a.createElement(pe,{dimension_change_handler:function(t){return e.handle_dimension_change(t)}})),r.a.createElement("div",{id:"chart_and_slider"},r.a.createElement(se,{ref:this.graph}),r.a.createElement(he,{ref:this.dimension_slider,slider_handler:function(t,a){return e.handle_slider_change(t,a)}})))}}]),t}(r.a.Component)),ge=function(e){function t(e){return Object(c.a)(this,t),Object(d.a)(this,Object(h.a)(t).call(this,e))}return Object(_.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"h2h")}}]),t}(r.a.Component),ve=a(196),ye=a(56);var be=function(){return r.a.createElement("div",{id:"the_app"},r.a.createElement(l,null),r.a.createElement(ve.a,null,r.a.createElement(ye.c,null,r.a.createElement(ye.a,{exact:!0,path:"/",component:fe}),r.a.createElement(ye.a,{path:"/h2h",component:ge}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(389);var xe=a(198),ke=a.n(xe).a.config();console.log(ke),o.a.render(r.a.createElement(be,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[215,1,2]]]);
//# sourceMappingURL=main.3665608a.chunk.js.map