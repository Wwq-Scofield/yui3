YUI.add("base",function(A){var J=A.Lang,H=A.Object,I=":",E="destroy",N="init",G="value",M="initialized",F="destroyed",B="initializer",K="destructor";var C=A.Event.Target.prototype;var D=function(){A.Attribute.call(this);this.init.apply(this,arguments);};D.NAME="base";D.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};D._buildCfg={aggregates:["ATTRS"]};var P={};D.build=function(S,W,V){var Y=D.build,L=Y._getClass(S,V),U=Y._getAggregates(S,V),Q=L._yuibuild.dynamic,Z=S.NAME,T,R;if(Q){if(U){for(T=0,R=U.length;T<R;++T){var O=U[T];if(H.owns(S,O)){L[O]=J.isArray(S[O])?[]:{};}}A.aggregate(L,S,true,U);}}for(T=0,R=W.length;T<R;T++){var X=W[T];if(U){A.aggregate(L,X,true,U);}A.mix(L,X,true,null,1);L._yuibuild.exts.push(X);Z=Z+":"+A.stamp(X);}L._yuibuild.id=Z;L.prototype.hasImpl=Y._hasImpl;if(Q){L.NAME=S.NAME;L.prototype.constructor=L;}return L;};A.mix(D.build,{_template:function(L){function O(){O.superclass.constructor.apply(this,arguments);var S=O._yuibuild.exts,Q=S.length;for(var R=0;R<Q;R++){S[R].apply(this,arguments);}return this;}A.extend(O,L);return O;},_hasImpl:function(O){if(this.constructor._yuibuild){var R=this.constructor._yuibuild.exts,L=R.length,Q;for(Q=0;Q<L;Q++){if(R[Q]===O){return true;}}}return false;},_getClass:function(L,O){var Q=(O&&false===O.dynamic)?false:true,R=(Q)?D.build._template(L):L;R._yuibuild={id:null,exts:[],dynamic:Q};return R;},_getAggregates:function(L,O){var Q=[],S=(O&&O.aggregates),T=L;while(T&&T.prototype){var R=T._buildCfg&&T._buildCfg.aggregates;if(R){Q=Q.concat(R);}T=T.superclass?T.superclass.constructor:null;}if(S){Q=Q.concat(S);}return Q;}});D.create=function(O,R,Q){var T=D.build(O,R),L=A.Array(arguments,2,true);function S(){}S.prototype=T.prototype;return T.apply(new S(),L);};D.prototype={init:function(L){this.name=this.constructor.NAME;this.publish(N,{queuable:false,defaultFn:this._defInitFn});this.fire(N,null,L);return this;},destroy:function(){this.publish(E,{queuable:false,defaultFn:this._defDestroyFn});this.fire(E);return this;},_defInitFn:function(O,L){P[A.stamp(this)]=this;this._initHierarchy(L);this._set(M,true);},_defDestroyFn:function(L){this._destroyHierarchy();delete P[this._yuid];this._set(F,true);},_getClasses:function(){if(!this._classes){var O=this.constructor,L=[];while(O&&O.prototype){L.unshift(O);O=O.superclass?O.superclass.constructor:null;}this._classes=L;}return this._classes.concat();},_initHierarchy:function(T){var S,Q=this._getClasses();for(var O=0,L=Q.length;O<L;O++){S=Q[O];if(S._yuibuild&&S._yuibuild.exts&&!S._yuibuild.dynamic){for(var U=0,R=S._yuibuild.exts.length;U<R;U++){S._yuibuild.exts[U].apply(this,arguments);}}this._initAtts(S.ATTRS,T);if(H.owns(S.prototype,B)){S.prototype[B].apply(this,arguments);}}},_destroyHierarchy:function(){var Q,O=this._getClasses();for(var L=O.length-1;L>=0;L--){Q=O[L];if(H.owns(Q.prototype,K)){Q.prototype[K].apply(this,arguments);}}},toString:function(){return this.constructor.NAME+"["+A.stamp(this)+"]";},subscribe:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.subscribe.apply(this,L);},fire:function(){var L=arguments;if(J.isString(L[0])){L[0]=this._prefixEvtType(L[0]);}else{if(L[0].type){L[0].type=this._prefixEvtType(L[0].type);}}return C.fire.apply(this,L);},publish:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.publish.apply(this,L);},after:function(){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.after.apply(this,L);},unsubscribe:function(R,Q,O){var L=arguments;if(J.isString(L[0])){L[0]=this._prefixEvtType(L[0]);}return C.unsubscribe.apply(this,L);},unsubscribeAll:function(O){var L=arguments;L[0]=this._prefixEvtType(L[0]);return C.unsubscribeAll.apply(this,L);},_prefixEvtType:function(L){if(L.indexOf(I)===-1&&this.name){L=this.name+":"+L;}return L;}};A.mix(D,A.Attribute,false,null,1);D.prototype.constructor=D;A.Base=D;},"@VERSION@",{requires:["attribute"]});