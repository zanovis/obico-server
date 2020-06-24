(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],u=0,p=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&p.push(a[r][0]),a[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,o=1;o<i.length;o++){var c=i[o];0!==a[c]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},a={prints:0},s=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/static/frontend/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=c;s.push([5,"chunk-vendors"]),i()})({0:function(t,e){},"0302":function(t,e,i){"use strict";var n=i("a764"),a=i.n(n);a.a},"1e2d":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("a026"),a=i("5886"),s=i("967d"),r=i("5f5b"),o=i("c0eb"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"timelapse",attrs:{"sticky-container":""}},[n("div",{staticClass:"my-5 row justify-content-center"},[n("div",{staticClass:"col-12"},[n("a",{staticClass:"btn btn-outline-primary btn-block",attrs:{role:"button",href:"/prints/upload/"}},[t._v(" Upload time-lapses and earn some "),n("img",{staticClass:"dh-icon",attrs:{src:i("7cec")}})])])]),n("div",{directives:[{name:"sticky",rawName:"v-sticky"}],staticClass:"menu-bar text-right",attrs:{"sticky-offset":"{top: 0, bottom: 30}","sticky-side":"both","on-stick":"onMenuStick"}},[n("b-dropdown",{attrs:{"toggle-class":"text-decoration-none btn-sm square-btn",variant:t.filterBtnVariant,"no-caret":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("i",{staticClass:"fas fa-filter"})]},proxy:!0}])},[n("b-dropdown-item",{on:{click:function(e){return t.onFilterClick("none")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"none"===t.filter?"visible":"hidden"}}),t._v("All ")]),n("b-dropdown-divider"),n("b-dropdown-item",{on:{click:function(e){return t.onFilterClick("finished")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"finished"===t.filter?"visible":"hidden"}}),t._v("Finished ")]),n("b-dropdown-item",{on:{click:function(e){return t.onFilterClick("cancelled")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"cancelled"===t.filter?"visible":"hidden"}}),t._v("Cancelled ")]),n("b-dropdown-item",{on:{click:function(e){return t.onFilterClick("need_alert_overwrite")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"need_alert_overwrite"===t.filter?"visible":"hidden"}}),t._v("Review needed ")]),n("b-dropdown-item",{on:{click:function(e){return t.onFilterClick("need_print_shot_feedback")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"need_print_shot_feedback"===t.filter?"visible":"hidden"}}),t._v("Focused-review needed ")])],1),n("b-dropdown",{attrs:{"toggle-class":"text-decoration-none btn-sm square-btn",variant:"outline-secondary","no-caret":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("i",{staticClass:"fas",class:t.sortingBtnClasses})]},proxy:!0}])},[n("b-dropdown-item",{on:{click:function(e){return t.onSortingClick("date_desc")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"date_desc"===t.sorting?"visible":"hidden"}}),t._v("Newest to oldest ")]),n("b-dropdown-item",{on:{click:function(e){return t.onSortingClick("date_asc")}}},[n("i",{staticClass:"fas fa-check",style:{visibility:"date_asc"===t.sorting?"visible":"hidden"}}),t._v("Oldest to newest ")])],1),n("button",{staticClass:"btn ml-3",class:{"btn-light":!t.anyPrintsSelected,"btn-danger":t.anyPrintsSelected},attrs:{type:"button",disabled:!t.anyPrintsSelected},on:{click:t.onDeleteBtnClick}},[n("i",{staticClass:"fas fa-trash-alt"}),t._v(" Delete "+t._s(t.anyPrintsSelected?" ("+t.selectedPrintIds.size+")":"")+" ")])],1),n("div",{staticClass:"row"},t._l(t.prints,(function(e){return n("print-card",{key:e.id,attrs:{print:e},on:{selectedChanged:t.onSelectedChanged,printDeleted:t.onPrintDeleted,printDataChanged:t.printDataChanged}})})),1),n("mugen-scroll",{staticClass:"text-center p-4",attrs:{handler:t.fetchMoreData,"should-handle":!t.loading}},[t.noMoreData?n("div",{staticClass:"text-center p-2"},[t._v("End of your time-lapse list.")]):t._e(),t.noMoreData?t._e():n("i",{staticClass:"fa fa-spinner fa-pulse"})])],1)},l=[],d=(i("4de4"),i("4160"),i("a630"),i("d81d"),i("d3b7"),i("6062"),i("3ca3"),i("159b"),i("ddb0"),i("d0ff")),u=i("bc3a"),p=i.n(u),f=i("51f5"),h=i.n(f),v=i("996c"),b=i.n(v),m=i("7372"),g=i("502a"),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-sm-12 col-md-6 col-lg-4 pt-3"},[n("div",{staticClass:"card vld-parent"},[n("loading",{attrs:{active:t.videoDownloading,"is-full-page":!0}}),n("div",{staticClass:"card-header"},[n("div",[n("b-form-checkbox",{staticClass:"text-decoration-none",attrs:{size:"lg"},on:{change:t.onSelectedChange},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),n("b-form-radio-group",{attrs:{buttons:"","button-variant":"outline-primary",name:"radio-btn-outline"},model:{value:t.selectedCardView,callback:function(e){t.selectedCardView=e},expression:"selectedCardView"}},[n("b-form-radio",{staticClass:"square-btn",attrs:{value:"detective",disabled:!t.print.has_detective_view}},[n("img",{staticClass:"seg-control-icon",attrs:{src:i("fbc4")}})]),n("b-form-radio",{staticClass:"square-btn",attrs:{value:"info"}},[n("img",{staticClass:"seg-control-icon",attrs:{src:i("8f11")}})])],1),n("div",{staticClass:"dropdown"},[t._m(0),n("div",{staticClass:"dropdown-menu dropdown-menu-right",attrs:{"aria-labelledby":"dropdownMenuButton"}},[this.print.video_url?n("a",{staticClass:"dropdown-item",on:{click:function(e){return t.downloadVideo(!1)}}},[n("i",{staticClass:"fas fa-download"}),t._v("Download Original Time-lapse ")]):t._e(),this.print.tagged_video_url?n("a",{staticClass:"dropdown-item",on:{click:function(e){return t.downloadVideo(!0)}}},[n("i",{staticClass:"fas fa-download"}),t._v("Download Detective Time-lapse ")]):t._e(),n("div",{staticClass:"dropdown-divider"}),n("a",{staticClass:"dropdown-item text-danger",on:{click:t.deleteVideo}},[n("i",{staticClass:"fas fa-trash-alt"}),t._v("Delete ")])])])],1),n("div",{directives:[{name:"show",rawName:"v-show",value:"info"==t.cardView,expression:"cardView == 'info'"}]},[n("video-box",{attrs:{videoUrl:t.print.video_url,posterUrl:t.print.poster_url}}),n("div",{staticClass:"card-body"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"text-muted col-4"},[t._v("File:")]),n("div",{staticClass:"col-8"},[t._v(t._s(t.print.filename))])]),n("div",{staticClass:"row"},[n("div",{staticClass:"text-muted col-4"},[t._v(t._s(t.wasTimelapseUploaded?"Uploaded":"Printed")+":")]),n("div",{staticClass:"col-8"},[t._v(t._s(t.wasTimelapseUploaded?t.print.uploaded_at.fromNow():t.print.ended_at.fromNow())+" "+t._s(t.endStatus))])]),t.wasTimelapseUploaded?t._e():n("div",{staticClass:"row"},[n("div",{staticClass:"text-muted col-4"},[t._v("Duration:")]),n("div",{staticClass:"col-8"},[t._v(t._s(t.duration.humanize()))])])])])],1),n("div",{directives:[{name:"show",rawName:"v-show",value:"detective"==t.cardView&&t.print.has_detective_view,expression:"cardView == 'detective' && print.has_detective_view"}]},[n("video-box",{attrs:{videoUrl:t.print.tagged_video_url,posterUrl:t.print.poster_url},on:{timeupdate:t.onTimeUpdate}}),n("gauge",{attrs:{predictionJsonUrl:t.print.prediction_json_url,currentPosition:t.currentPosition}}),n("div",{staticClass:"feedback-section"},[n("div",{staticClass:"text-center py-2 px-3"},[n("div",{staticClass:"lead",class:[t.print.alerted_at?"text-danger":"text-success"]},[t._v(t._s(t.print.alerted_at?"The Detective found spaghetti":"The Detective found nothing fishy"))]),n("div",{staticClass:"py-2"},[t._v(" Did she get it right? "),n("b-button",{staticClass:"mx-2 btn-sm",attrs:{variant:t.thumbedUp?"primary":"outline"},on:{click:t.onThumbUpClick}},[t.inflightAlertOverwrite?n("i",{staticClass:"fas fa-spinner fa-spin"}):n("i",{staticClass:"fas fa-thumbs-up"})]),n("b-button",{staticClass:"mx-2 btn-sm",attrs:{variant:t.thumbedDown?"primary":"outline"},on:{click:t.onThumbDownClick}},[t.inflightAlertOverwrite?n("i",{staticClass:"fas fa-spinner fa-spin"}):n("i",{staticClass:"fas fa-thumbs-down"})])],1),n("transition",{attrs:{name:"bounce"}},[t.focusedFeedbackEligible?n("div",{staticClass:"pt-2"},[n("a",{staticClass:"btn btn-sm btn-outline-primary px-4",attrs:{role:"button",href:t.focusedFeedbackLink}},[t._v(" F "),n("i",{staticClass:"fas fa-search focused-feedback-icon"}),t._v("CUSED FEEDBACK "),t.focusedFeedbackCompleted?t._e():n("img",{staticClass:"seg-control-icon ml-1",attrs:{src:i("b639")}})])]):t._e()])],1),n("div",{staticClass:"text-muted py-2 px-3 help-text"},[t.focusedFeedbackEligible?n("small",[t.focusedFeedbackCompleted?n("span",[t._v(" Thank you for completing the Focused Feedback for The Detective. You have earned 2 non-expirable Detective Hours. You can click the botton again to change your feedback. ")]):n("span",[t._v(" With Focused Feedback, you can tell The Detective exactly where she got it wrong. This is the most effective way to help her improve. "),n("a",{attrs:{href:"#"}},[t._v("You will earn 2 Detective Hours once you finish the Focused Feedback")]),t._v(". ")])]):n("small",[t._v(" Every time you give The Detective feedback, "),n("a",{attrs:{href:"https://www.thespaghettidetective.com/docs/how-does-credits-work/"}},[t._v("you help her get better at detecting spaghetti")]),t._v(". ")])])])],1)],1)])},w=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"btn icon-btn",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-label":"Controls"}},[i("i",{staticClass:"fas fa-ellipsis-v"})])}],C=(i("99af"),i("19de")),k=i.n(C),y=i("c1df"),D=i.n(y),x=i("9380"),O=i.n(x),P=i("9062"),T=i.n(P),S=(i("e40d"),i("c1ee")),F=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tsd-gauge-container"},[i("div",{staticClass:"tsd-gauge"},[i("radial-gauge",{attrs:{value:t.value,options:Object.assign({},t.options,{title:t.titleText})}})],1),i("hr")])},U=[],j=(i("a9e3"),i("9b02")),B=i.n(j),E=i("7489"),A=.4,V={components:{RadialGauge:E["a"]},data:function(){return{predictions:[],currentValue:0}},props:{currentPosition:{type:Number,default:0},predictionJsonUrl:String,options:{type:Object,default:function(){return{valueDec:0,valueInt:0,width:240,height:240,units:!1,box:!1,minValue:0,maxValue:100,majorTicks:["","","",""],minorTicks:4,highlights:[{from:0,to:33,color:"#5cb85c"},{from:33,to:67,color:"#f0ad4e"},{from:67,to:100,color:"#d9534f"}],colorPlate:"rgba(255,255,255,.0)",colorTitle:"#5cb85c",colorStrokeTicks:"#EBEBEB",colorNeedleStart:"rgba(240, 128, 128, 1)",colorNneedleEnd:"rgba(255, 160, 122, .9)",valueBox:!1,animationRule:"bounce",animationDuration:500,animatedValue:!0,startAngle:90,ticksAngle:180,borders:!1}}}},computed:{value:function(){var t=Math.round(this.predictions.length*this.currentPosition);return this.scaleP(B()(this.predictions[t],"fields.ewm_mean"))},titleText:function(){switch(this.level()){case 0:return"Looking Good";case 1:return"Fishy...";case 2:return"Failing!";default:return"Looking Good"}}},mounted:function(){this.fetchData()},methods:{fetchData:function(){var t=this;p.a.get(this.predictionJsonUrl).then((function(e){t.predictions=e.data}))},scaleP:function(t){var e=100/3/(1-A),i=200/3/A;return t>A?(t-A)*e+200/3:t*i},level:function(){return this.value>66?2:this.value>33?1:0}}},M=V,I=(i("eda8"),i("2877")),L=Object(I["a"])(M,F,U,!1,null,"430daabe",null),N=L.exports,$={name:"PrintCard",components:{Loading:T.a,VideoBox:S["a"],Gauge:N},data:function(){return{videoDownloading:!1,currentPosition:0,selectedCardView:"detective",selected:!1,inflightAlertOverwrite:null}},props:{print:Object},computed:{wasTimelapseUploaded:function(){return null!==this.print.uploaded_at},endStatus:function(){return this.print.cancelled_at?"(Cancelled)":""},duration:function(){return D.a.duration(this.print.ended_at.diff(this.print.started_at))},cardView:function(){return this.print.has_detective_view?this.selectedCardView:"info"},thumbedUp:function(){return!!this.print.alert_overwrite&&this.print.has_alerts^"NOT_FAILED"===this.print.alert_overwrite},thumbedDown:function(){return!!this.print.alert_overwrite&&this.print.has_alerts^"FAILED"===this.print.alert_overwrite},focusedFeedbackEligible:function(){return this.print.printshotfeedback_set.length>0&&this.print.alert_overwrite},focusedFeedbackCompleted:function(){return this.print.printshotfeedback_set.length>0&&0==O()(this.print.printshotfeedback_set,(function(t){return!t.answered_at})).length},focusedFeedbackLink:function(){return"/prints/shot-feedback/".concat(this.print.id,"/")}},methods:{onTimeUpdate:function(t){this.currentPosition=t},onSelectedChange:function(){this.$emit("selectedChanged",this.print.id,!this.selected)},downloadVideo:function(t){var e=this;this.videoDownloading=!0;var i=new XMLHttpRequest,n="".concat(this.print.filename).concat(t?"_detective_view":"",".mp4");i.open("GET",t?this.print.tagged_video_url:this.print.video_url,!0),i.responseType="blob",i.onload=function(t){k()(t.target.response,n),e.videoDownloading=!1},i.send()},deleteVideo:function(){var t=this;p.a.delete(m["a"].print(this.print.id)).then((function(){t.$emit("printDeleted",t.print.id)}))},onThumbUpClick:function(){this.inflightAlertOverwrite=this.print.has_alerts?"FAILED":"NOT_FAILED",this.alertOverwrite(this.inflightAlertOverwrite)},onThumbDownClick:function(){this.inflightAlertOverwrite=this.print.has_alerts?"NOT_FAILED":"FAILED",this.alertOverwrite(this.inflightAlertOverwrite)},alertOverwrite:function(t){var e=this;p.a.post(m["a"].printAlertOverwrite(this.print.id),{value:t}).then((function(t){e.$emit("printDataChanged",t.data),e.inflightAlertOverwrite=null}))}}},q=$,z=(i("8bc4"),Object(I["a"])(q,_,w,!1,null,"1dd8e33d",null)),G=z.exports,J={name:"PrintsApp",components:{MugenScroll:b.a,PrintCard:G},data:function(){return{prints:[],selectedPrintIds:new Set,loading:!1,noMoreData:!1,filter:"none",sorting:"date_desc"}},computed:{filterBtnVariant:function(){return"none"===this.filter?"outline-secondary":"outline-primary"},sortingBtnClasses:function(){return"date_asc"===this.sorting?" fa-sort-amount-up":"fa-sort-amount-down"},anyPrintsSelected:function(){return this.selectedPrintIds.size>0}},methods:{fetchMoreData:function(){var t=this;this.noMoreData||(this.loading=!0,p.a.get(m["a"].prints(),{params:{start:this.prints.length,limit:6,filter:this.filter,sorting:this.sorting}}).then((function(e){var i;t.loading=!1,t.noMoreData=e.data.length<6,(i=t.prints).push.apply(i,Object(d["a"])(e.data.map((function(t){return Object(g["a"])(t)}))))})))},refetchData:function(){this.prints=[],this.selectedPrintIds=[],this.noMoreData=!1,this.fetchMoreData()},onSelectedChanged:function(t,e){var i=new Set(this.selectedPrintIds);e?i.add(t):i.delete(t),this.selectedPrintIds=i},onMenuStick:function(t){console.log(t)},onFilterClick:function(t){this.filter=t,this.refetchData()},onSortingClick:function(t){this.sorting=t,this.refetchData()},onDeleteBtnClick:function(){var t=this,e=Array.from(this.selectedPrintIds);this.$swal({title:"Are you sure?",text:"Delete ".concat(this.selectedPrintIds.size," print(s)? This action can not be undone."),showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No"}).then((function(i){i.isConfirmed&&p.a.post(m["a"].printsBulkDelete(),{print_ids:e}).then((function(){e.forEach((function(e){return t.onPrintDeleted(e)})),t.selectedPrintIds=[]}))}))},onPrintDeleted:function(t){var e=h()(this.prints,(function(e){return e.id==t}));this.$delete(this.prints,e)},printDataChanged:function(t){var e=h()(this.prints,(function(e){return e.id==t.id}));this.$set(this.prints,e,Object(g["a"])(t))}}},R=J,Y=(i("5931"),Object(I["a"])(R,c,l,!1,null,null,null)),H=Y.exports;n["default"].use(r["a"]),n["default"].use(a["a"]),n["default"].use(s["default"]),n["default"].use(o["a"]),new n["default"]({components:{App:H}}).$mount("#prints-mount")},5:function(t,e,i){t.exports=i("1e2d")},"502a":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("c1df"),a=i.n(n),s=function(t){return t?a()(t):null},r=function(t){return t.ended_at=s(t.cancelled_at||t.finished_at),t.started_at=s(t.started_at),t.uploaded_at=s(t.uploaded_at),t.has_alerts=Boolean(t.alerted_at),t.has_detective_view=null!==t.prediction_json_url&&null!==t.tagged_video_url,t}},5931:function(t,e,i){"use strict";var n=i("5a5d"),a=i.n(n);a.a},"5a5d":function(t,e,i){},"711a":function(t,e,i){},7372:function(t,e,i){"use strict";i("99af");e["a"]={printShotFeedbackList:function(t){return"/api/v1/printshotfeedbacks/?print_id=".concat(t)},printShotFeedback:function(t,e){return"/api/v1/printshotfeedbacks/".concat(t,"/?print_id=").concat(e)},print:function(t){return"/api/v1/prints/".concat(t,"/")},prints:function(){return"/api/v1/prints/"},printsBulkDelete:function(){return"/api/v1/prints/bulk_delete/"},printAlertOverwrite:function(t){return"/api/v1/prints/".concat(t,"/alert_overwrite/")}}},"7cec":function(t,e,i){t.exports=i.p+"img/detective-hour-primary.png"},"8bc4":function(t,e,i){"use strict";var n=i("a416"),a=i.n(n);a.a},"8f11":function(t,e,i){t.exports=i.p+"img/info-inverted.png"},a416:function(t,e,i){},a764:function(t,e,i){},b639:function(t,e,i){t.exports=i.p+"img/detective-hour-2-primary.png"},c1ee:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"card-img-top"},[i("video-player",{ref:"videoPlayer",staticClass:"vjs-default-skin vjs-big-play-centered",attrs:{options:t.playerOptions,playsinline:!0},on:{timeupdate:t.onTimeUpdate}}),t.fullScreenBtn?i("a",{staticClass:"fullscreen-btn",attrs:{href:"#tl-fullscreen-modal",role:"button","data-toggle":"modal"}},[i("i",{staticClass:"fa fa-expand fa-2x",attrs:{"aria-hidden":"true"}})]):t._e()],1)},a=[],s=i("d6d3"),r={name:"VideoBox",components:{videoPlayer:s["videoPlayer"]},props:{videoUrl:String,posterUrl:String,fullScreenBtn:{default:function(){return!0},type:Boolean}},computed:{playerOptions:function(){return{muted:!0,preload:"none",language:"en",playbackRates:[.5,1,1.5,2],fluid:!0,sources:[{type:"video/mp4",src:this.videoUrl}],controlBar:{fullscreenToggle:!1},poster:this.posterUrl}}},methods:{onTimeUpdate:function(t){this.$emit("timeupdate",t.currentTime()/t.duration())}}},o=r,c=(i("0302"),i("2877")),l=Object(c["a"])(o,n,a,!1,null,"51a7ec90",null);e["a"]=l.exports},eda8:function(t,e,i){"use strict";var n=i("711a"),a=i.n(n);a.a},fbc4:function(t,e,i){t.exports=i.p+"img/logo-square-inverted.png"}});
//# sourceMappingURL=prints.js.map