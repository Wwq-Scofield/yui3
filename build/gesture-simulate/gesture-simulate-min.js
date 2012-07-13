YUI.add("gesture-simulate",function(d){var j="gesture-simulate",h={tap:1,doubletap:1,press:1,move:1,flick:1,pinch:1,rotate:1},e={touchstart:1,touchmove:1,touchend:1,touchcancel:1},p=d.config.doc,n,g=20,l,k,b={HOLD_TAP:10,DELAY_TAP:10,HOLD_PRESS:3000,MIN_HOLD_PRESS:1000,MAX_HOLD_PRESS:60000,DISTANCE_MOVE:200,DURATION_MOVE:1000,MAX_DURATION_MOVE:5000,MIN_VELOCITY_FLICK:1.3,DISTANCE_FLICK:200,DURATION_FLICK:1000,MAX_DURATION_FLICK:5000,DURATION_PINCH:1000},i="touchstart",r="touchmove",s="touchend",v="gesturestart",f="gesturechange",a="gestureend",w="mouseup",x="mousemove",t="mousedown",o="click",c="dblclick",q="x",u="y";function m(y){if(!y){d.error(j+": invalid target node");}this.node=y;this.target=d.Node.getDOMNode(y);l=this.node.getX()+this.target.getBoundingClientRect().width/2;k=this.node.getY()+this.target.getBoundingClientRect().height/2;}m.prototype={_toRadian:function(y){return y*(Math.PI/180);},_calculateDefaultPoint:function(y){if(!d.Lang.isArray(y)||y.length===0){y=[l,k];}else{if(y.length==1){y[1]=this.target.getBoundingClientRect().height/2;}y[0]=this.node.getX()+y[0];y[1]=this.node.getY()+y[1];}return y;},rotate:function(C,y,F,G,D,z,H){var E,B=F,A=G;if(!d.Lang.isNumber(B)||!d.Lang.isNumber(A)||B<0||A<0){E=(this.target.offsetWidth<this.target.offsetHeight)?this.target.offsetWidth/2:this.target.offsetHeight/2;B=E;A=E;}if(!d.Lang.isNumber(H)){d.error(j+"Invalid rotation detected.");}this.pinch(C,y,B,A,D,z,H);},pinch:function(K,X,N,D,z,E,M){var J,U=g,I,L=0,Q=N,O=D,W,H,F,V,T,Y,C,S,y,G,B={start:[],end:[]},A={start:[],end:[]},R;X=this._calculateDefaultPoint(X);if(!d.Lang.isNumber(Q)||!d.Lang.isNumber(O)||Q<0||O<0){d.error(j+"Invalid startRadius and endRadius detected.");}if(!d.Lang.isNumber(z)||z<=0){z=b.DURATION_PINCH;}if(!d.Lang.isNumber(E)){E=0;}else{E=E%360;if(E<0){E+=360;}}if(!d.Lang.isNumber(M)){M=0;}d.AsyncQueue.defaults.timeout=U;J=new d.AsyncQueue();H=X[0];F=X[1];C=E;S=E+M;B.start=[H+Q*Math.sin(this._toRadian(C)),F-Q*Math.cos(this._toRadian(C))];B.end=[H+O*Math.sin(this._toRadian(S-C)),F-O*Math.cos(this._toRadian(S-C))];A.start=[H-Q*Math.sin(this._toRadian(C)),F+Q*Math.cos(this._toRadian(C))];A.end=[H-O*Math.sin(this._toRadian(S-C)),F+O*Math.cos(this._toRadian(S-C))];V=1;T=D/N;J.add({fn:function(){var aa,Z,ac,ab;aa={pageX:B.start[0],pageY:B.start[1],clientX:B.start[0],clientY:B.start[1]};Z={pageX:A.start[0],pageY:A.start[1],clientX:A.start[0],clientY:A.start[1]};ab=this._createTouchList([d.merge({identifier:L++},aa),d.merge({identifier:L++},Z)]);ac={pageX:(B.start[0]+A.start[0])/2,pageY:(B.start[0]+A.start[1])/2,clientX:(B.start[0]+A.start[0])/2,clientY:(B.start[0]+A.start[1])/2};this._simulateEvent(this.target,i,d.merge({touches:ab,targetTouches:ab,changedTouches:ab,scale:V,rotation:C},ac));if(d.UA.ios>=2){this._simulateEvent(this.target,v,d.merge({scale:V,rotation:C},ac));}},timeout:0,context:this});R=Math.floor(z/U);W=(O-Q)/R;Y=(T-V)/R;y=(S-C)/R;G=this._toRadian(S-C)/R;for(var P=0;P<R;P++){J.add({fn:function(ac){var ag=Q+(W)*ac,ae=H+ag*Math.sin(C+G*ac),aa=F-ag*Math.cos(C+G*ac),ab=H-ag*Math.sin(C+G*ac),Z=F+ag*Math.cos(C+G*ac),ak=(ae+ab)/2,aj=(aa+Z)/2,ai,ah,af,ad;ai={pageX:ae,pageY:aa,clientX:ae,clientY:aa};ah={pageX:ab,pageY:Z,clientX:ab,clientY:Z};ad=this._createTouchList([d.merge({identifier:L++},ai),d.merge({identifier:L++},ah)]);af={pageX:ak,pageY:aj,clientX:ak,clientY:aj};this._simulateEvent(this.target,r,d.merge({touches:ad,targetTouches:ad,changedTouches:ad,scale:V+Y*ac,rotation:C+y*ac},af));if(d.UA.ios>=2){this._simulateEvent(this.target,f,d.merge({scale:V+Y*ac,rotation:C+y*ac},af));}},args:[P],context:this});}J.add({fn:function(){var ac=this._getEmptyTouchList(),aa,Z,ad,ab;aa={pageX:B.end[0],pageY:B.end[1],clientX:B.end[0],clientY:B.end[1]};Z={pageX:A.end[0],pageY:A.end[1],clientX:A.end[0],clientY:A.end[1]};ab=this._createTouchList([d.merge({identifier:L++},aa),d.merge({identifier:L++},Z)]);ad={pageX:(B.end[0]+A.end[0])/2,pageY:(B.end[0]+A.end[1])/2,clientX:(B.end[0]+A.end[0])/2,clientY:(B.end[0]+A.end[1])/2};if(d.UA.ios>=2){this._simulateEvent(this.target,a,d.merge({scale:T,rotation:S},ad));}this._simulateEvent(this.target,s,d.merge({touches:ac,targetTouches:ac,changedTouches:ab,scale:T,rotation:S},ad));},context:this});if(K&&d.Lang.isFunction(K)){J.add({fn:K,context:this.node});}J.run();},tap:function(A,F,y,z,C){var H=new d.AsyncQueue(),G=this._getEmptyTouchList(),D,E,B;F=this._calculateDefaultPoint(F);if(!d.Lang.isNumber(y)||y<1){y=1;}if(!d.Lang.isNumber(z)){z=b.HOLD_TAP;}if(!d.Lang.isNumber(C)){C=b.DELAY_TAP;}E={pageX:F[0],pageY:F[1],clientX:F[0],clientY:F[1]};D=this._createTouchList([d.merge({identifier:0},E)]);for(B=0;B<y;B++){H.add({fn:function(){this._simulateEvent(this.target,i,d.merge({touches:D,targetTouches:D,changedTouches:D},E));},context:this,timeout:(B===0)?0:C});H.add({fn:function(){this._simulateEvent(this.target,s,d.merge({touches:G,targetTouches:G,changedTouches:D},E));},context:this,timeout:z});}if(y>1&&!((d.config.win&&("ontouchstart" in d.config.win))&&!(d.UA.chrome&&d.UA.chrome<6))){H.add({fn:function(){this._simulateEvent(this.target,c,E);},context:this});}if(A&&d.Lang.isFunction(A)){H.add({fn:A,context:this.node});}H.run();},flick:function(z,y,A,D,C){var B;y=this._calculateDefaultPoint(y);if(!d.Lang.isString(A)){A=q;}else{A=A.toLowerCase();if(A!==q&&A!==u){d.error(j+"(flick): Only x or y axis allowed");}}if(!d.Lang.isNumber(D)){D=b.DISTANCE_FLICK;}if(!d.Lang.isNumber(C)){C=b.DURATION_FLICK;}else{if(C>b.MAX_DURATION_FLICK){C=b.MAX_DURATION_FLICK;}}if(Math.abs(D)/C<b.MIN_VELOCITY_FLICK){C=Math.abs(D)/b.MIN_VELOCITY_FLICK;}B={start:d.clone(y),end:[(A===q)?y[0]+D:y[0],(A===u)?y[1]+D:y[1]]};this._move(z,B,C);},move:function(y,A,z){var B;if(!d.Lang.isObject(A)){A={point:this._calculateDefaultPoint([]),xdist:b.DISTANCE_MOVE,ydist:0};}else{if(!d.Lang.isArray(A.point)){A.point=this._calculateDefaultPoint([]);}else{A.point=this._calculateDefaultPoint(A.point);}if(!d.Lang.isNumber(A.xdist)){A.xdist=b.DISTANCE_MOVE;}if(!d.Lang.isNumber(A.ydist)){A.ydist=0;
}}if(!d.Lang.isNumber(z)){z=b.DURATION_MOVE;}else{if(z>b.MAX_DURATION_MOVE){z=b.MAX_DURATION_MOVE;}}B={start:d.clone(A.point),end:[A.point[0]+A.xdist,A.point[1]+A.ydist]};this._move(y,B,z);},_move:function(A,G,B){var H,z=g,D,F,E,y=0;if(!d.Lang.isNumber(B)){B=b.DURATION_MOVE;}else{if(B>b.MAX_DURATION_MOVE){B=b.MAX_DURATION_MOVE;}}if(!d.Lang.isObject(G)){G={start:[l,k],end:[l+b.DISTANCE_MOVE,k]};}else{if(!d.Lang.isArray(G.start)){G.start=[l,k];}if(!d.Lang.isArray(G.end)){G.end=[l+b.DISTANCE_MOVE,k];}}d.AsyncQueue.defaults.timeout=z;H=new d.AsyncQueue();H.add({fn:function(){var J={pageX:G.start[0],pageY:G.start[1],clientX:G.start[0],clientY:G.start[1]},I=this._createTouchList([d.merge({identifier:y++},J)]);this._simulateEvent(this.target,i,d.merge({touches:I,targetTouches:I,changedTouches:I},J));},timeout:0,context:this});D=Math.floor(B/z);F=(G.end[0]-G.start[0])/D;E=(G.end[1]-G.start[1])/D;for(var C=0;C<D;C++){H.add({fn:function(K){var J=G.start[0]+(F*K),I=G.start[1]+(E*K),M={pageX:J,pageY:I,clientX:J,clientY:I},L=this._createTouchList([d.merge({identifier:y++},M)]);this._simulateEvent(this.target,r,d.merge({touches:L,targetTouches:L,changedTouches:L},M));},args:[C],context:this});}H.add({fn:function(){var J={pageX:G.end[0],pageY:G.end[1],clientX:G.end[0],clientY:G.end[1]},I=this._createTouchList([d.merge({identifier:y},J)]);this._simulateEvent(this.target,r,d.merge({touches:I,targetTouches:I,changedTouches:I},J));},timeout:0,context:this});H.add({fn:function(){var K={pageX:G.end[0],pageY:G.end[1],clientX:G.end[0],clientY:G.end[1]},J=this._getEmptyTouchList(),I=this._createTouchList([d.merge({identifier:y},K)]);this._simulateEvent(this.target,s,d.merge({touches:J,targetTouches:J,changedTouches:I},K));},context:this});if(A&&d.Lang.isFunction(A)){H.add({fn:A,context:this.node});}H.run();},_getEmptyTouchList:function(){if(!n){n=this._createTouchList([]);}return n;},_createTouchList:function(A){var B=[],z,y=this;if(!!A&&d.Lang.isArray(A)){if(d.UA.android&&d.UA.android>=4||d.UA.ios&&d.UA.ios>=2){d.each(A,function(C){if(!C.identifier){C.identifier=0;}if(!C.pageX){C.pageX=0;}if(!C.pageY){C.pageY=0;}if(!C.screenX){C.screenX=0;}if(!C.screenY){C.screenY=0;}B.push(p.createTouch(d.config.win,y.target,C.identifier,C.pageX,C.pageY,C.screenX,C.screenY));});z=p.createTouchList.apply(p,B);}else{if(d.UA.ios&&d.UA.ios<2){d.error(j+": No touch event simulation framework present.");}else{z=[];d.each(A,function(C){if(!C.identifier){C.identifier=0;}if(!C.clientX){C.clientX=0;}if(!C.clientY){C.clientY=0;}if(!C.pageX){C.pageX=0;}if(!C.pageY){C.pageY=0;}if(!C.screenX){C.screenX=0;}if(!C.screenY){C.screenY=0;}z.push({target:y.target,identifier:C.identifier,clientX:C.clientX,clientY:C.clientY,pageX:C.pageX,pageY:C.pageY,screenX:C.screenX,screenY:C.screenY});});z.item=function(C){return z[C];};}}}else{d.error(j+": Invalid touchPoints passed");}return z;},_simulateEvent:function(B,z,y){var A;if(e[z]){if((d.config.win&&("ontouchstart" in d.config.win))&&!(d.UA.chrome&&d.UA.chrome<6)){d.Event.simulate(B,z,y);}else{if(this._isSingleTouch(y.touches,y.targetTouches,y.changedTouches)){z={touchstart:t,touchmove:x,touchend:w}[z];y.button=0;y.relatedTarget=null;A=(z===w)?y.changedTouches:y.touches;y=d.mix(y,{screenX:A.item(0).screenX,screenY:A.item(0).screenY,clientX:A.item(0).clientX,clientY:A.item(0).clientY},true);d.Event.simulate(B,z,y);if(z==w){d.Event.simulate(B,o,y);}}else{d.error("_simulateEvent(): Event '"+z+"' has multi touch objects that can't be simulated in your platform.");}}}else{d.Event.simulate(B,z,y);}},_isSingleTouch:function(A,z,y){return(A&&(A.length<=1))&&(z&&(z.length<=1))&&(y&&(y.length<=1));}};d.GestureSimulation=m;d.GestureSimulation.defaults=b;d.GestureSimulation.GESTURES=h;d.Event.simulateGesture=function(C,B,A,y){C=d.one(C);var z=new d.GestureSimulation(C);B=B.toLowerCase();if(!y&&d.Lang.isFunction(A)){y=A;A={};}A=A||{};if(h[B]){switch(B){case"tap":z.tap(y,A.point,A.times,A.hold,A.delay);break;case"doubletap":z.tap(y,A.point,2);break;case"press":if(!d.Lang.isNumber(A.hold)){A.hold=b.HOLD_PRESS;}else{if(A.hold<b.MIN_HOLD_PRESS){A.hold=b.MIN_HOLD_PRESS;}else{if(A.hold>b.MAX_HOLD_PRESS){A.hold=b.MAX_HOLD_PRESS;}}}z.tap(y,A.point,1,A.hold);break;case"move":z.move(y,A.path,A.duration);break;case"flick":z.flick(y,A.point,A.axis,A.distance,A.duration);break;case"pinch":z.pinch(y,A.center,A.r1,A.r2,A.duration,A.start,A.rotation);break;case"rotate":z.rotate(y,A.center,A.r1,A.r2,A.duration,A.start,A.rotation);break;}}else{d.error(j+": Not a supported gesture simulation: "+B);}};},"@VERSION@",{requires:["event-simulate","async-queue","node-screen"]});