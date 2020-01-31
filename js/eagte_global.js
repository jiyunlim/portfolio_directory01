function GC() {}
GC.site = null;
GC.user = null;
GC.socket = {ucpost:null,push:null}
GC.rootproxy = null;
GC.debug = true;
GC.dbinfo = null;
GC.lang = null;
GC.sortUrlRefer = null;
GC.isPreview = false;
GC.isSummary = false;
GC.rootpath = "egate45/kr"
GC.eztoken = {"id":"" , "time":""};
GC.pagegroup = "";
GC.referer = [];
GC.egateplustype = "GET";
GC.layout ={ 
		header : "fm_pt_header",
		body:"fm_pt_body", 
		nav : "fm_pt_lnb", 
		quickbar : "fm_pt_quickbar", 
		contents : "fm_pt_contents",
		content:"fm_pt_content",
		tab : "fm_pt_tab",
		search : "fm_pt_search",
		deskbar : "fm_pt_desk", 
		timeline : "fm_pt_timeline",
		messenger :"fm_pt_messenger",
		ucpost:"fm_pt_ucpost",
		quickicon:"fm_pt_quickicon" 
}
GC.bodyShowID = "fm_body_view";
GC._activeFormID = "";
GC._activeID = "";
GC.viewcmd = null;
GC.undockURI = "/"+ GC.rootpath+"/eip/home/home.nsf/openpage?readform";
GC.printURI = "/"+ GC.rootpath +"/eip/home/home.nsf/win_print?readform&isprint=1";
GC.timeinterval = null;
GC.activeID = function(sVal,isForm) {
	switch(typeof(sVal)) {
	case "string":
		if(GC.isPreview && isForm) {
			GC._activeFormID = sVal;
			return;
		}
		GC._activeID = sVal;
		return;
		break;
	case "boolean":
		if (GC.isPreview && sVal) {
			return GC._activeFormID;
		} else {
			return GC._activeID;
		}
		break;
	case "undefined":
		return GC._activeID;
		break;
	}
}
/* 현재 활성 페이지 jquery Object */
GC.active = function(isForm) {
	if (GC.isPreview && isForm) {
		return $("#"+GC._activeFormID);
	}
	
	return $("#"+GC._activeID);
}
GC.eugp = {
	user: "user"
	,	group: "group"
	,	publicgroup: "publicgroup"
	,	globalgroup:"globalgroup"
	,	person: "person"
	,	persongroup: "persongroup"
	,	jobgroup: "jobgroup"
}
//}
GC.browser = function(){
	if(GC.isIE){ return "IE" + $.browser.version; }
	if($.browser.mozilla){ return "FF"; } 
	if($.browser.safari){ return "SA"; } 
	if($.browser.opera){ return "OP"; }
	return "";
}
GC.isIE = function(){
	var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
	if ( isIE11 ){
		return true;
	}
	if (navigator.appName == 'Microsoft Internet Explorer') {
		return true;
	}else{
		return false;
	}
}
GC.checkBrowser = {
	win		: navigator.platform.match('Win') == 'Win',
	ie			: GC.isIE(),
	ns			: navigator.appName == 'Netscape',
	ff			: navigator.userAgent.match('Firefox') == 'Firefox',
	sf			: navigator.userAgent.match('Safari') == 'Safari',
	op			: navigator.userAgent.match('Opera') == 'Opera',
	cr			: navigator.userAgent.match('Chrome') == 'Chrome'
}
GC.getOSName = function(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="Mac";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	return OSName;
}
GC.browserEx = function() {
	if ( !!navigator.userAgent.match(/Trident.*rv\:11\./) )return "ie";
	if (GC.checkBrowser.ie) {
		return "ie";
	} else if (GC.checkBrowser.ff) {
		return "ff";
	} else if (GC.checkBrowser.sf && !GC.checkBrowser.cr) {
		return "sf";
	} else if (GC.checkBrowser.sf && GC.checkBrowser.cr) {
		return "cr";
	} else if (GC.checkBrowser.op) {
		return "op";
	} else {
        if (navigator.userAgent.match('MSIE') == 'MSIE') {
            return "ie";
        }
		return "";
	}
}
GC.browserVerEx = function(ver) {
	var rv = -1; // Return value assumes failure.      
	var ua = navigator.userAgent;  
	var re = null;
	if(ver == "ie"){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})|rv:([0-9]{1,}[\.0-9]{0,})");
	}else{
		re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
	}

	if (re.exec(ua) != null){ 
		rv = parseFloat(RegExp.$1);
		if(!rv){
			rv = parseFloat(RegExp.$2);
		}
	} 
	return rv;
}
function GF() {}
GF.contentName = "공통 함수"
GF.cacheData = {
	applProfile : new Array()		//see GF.getApplProfile
}
GF.debugLog = function(name, obj) {
	if (!GC.debug) return;
	if (window.console == undefined) { console = {log : function(){}};}
	try{console.log(name+" = ",Array.prototype.slice.call(arguments,1));}catch(e){}
	return;
}
GF.log = GF.debugLog;

GF.langInit = function(setting) {
	var _def = {language: GC.user.userlang == "" ? GC.site.defaultlang : GC.user.userlang};
	if (typeof(setting) !== "undefined") {
		_def = $.extend(true , _def , setting);
	}
	if ( typeof(selector) === "undefined" ) {
		var __$lang = $("div#wrap");
		if ( __$lang.length <= 0 ) {
			__$lang = $("div:first");
		}
		__$lang.lang(_def);
	} else {
		$(selector).lang(_def);
	}
}
GF.goSNS = function() {
	window.open("/stre");
};

GF.goUCPOST = function() {
	var url = GC.site.localmsghost + "/&urltype=ucpwhois&command=ID_WEB_SHOW&callback=?"
	$.getJSON(url, function(){});
};

GF.langLoad = function(selector) {
	$("div:first").lang().setProperties(selector);
	GF.langSelectBox(selector);
}
GF.langSelectBox = function(selector) {
	$("select" , selector).each(function(){
		var __txt = [];
		$(this).find("option").each(function(){
			try {
				if ( $(this).text().indexOf(";") > 0 ) {
					__txt = $(this).text().split(";");
					$(this).text( GF.langPropEx( __txt[0] , (__txt[1] ? $.trim(__txt[1]) : "" ) ) );
				}
				__txt = null;
			} catch (e) {
			}
		});
	});
	//-- 조회시에 콤보박스 값 다국어 처리
	$(".ex_langprop" , selector).each(function(){
		var _val = $(this).text();
		if ( $.trim(_val) != "" ) {
			var _vals = _val.split(";");
			if (_vals.length <=2 ) {
				$(this).text( GF.langPropEx(_vals[0] , _vals[1]) );
			}
			_vals = null;
		}
	});
}
GF.langPropEx = function(msg, langcode, ch) {
	/*
	if (typeof(langcode) === "undefined") {return msg;}
	if (langcode === "") {return msg;}
	return GF.langProp({"msg":msg , "langcode":langcode});
	*/
	if (typeof(langcode) === "undefined") {return msg;}
	if (langcode === "") {return msg;}
	if (typeof(ch) == "undefined" || typeof(ch) != "object") {
		return GF.langProp({"msg":msg , "langcode":langcode});
	} else {
		return GF.langProp({"msg":msg , "langcode":langcode, "ch":ch});
	}
}
/**
 * 
 * @param key : String 또는 JSON Object
 * @return string
 * json object 예제 : {"msg":"기본 메세지" , "langcode":"code" , "ch":["바꿀 단어1","바꿀 단어2"]}
 */
GF.langProp = function(key) {
	/*
	if ( typeof(key) === "string") {
		return $("div:first").lang().propStr(key , arguments);
	} else if (typeof(key) === "object") {
		if ( typeof(key.langcode) === "undefined" ){
			return key.msg;
		}
		var _args = [], _msg = "";
		if (key.ch) {
			for(var i = 0 ; i < key.ch.length ; i++){
				_args.push( key.ch[i] );
			}
		}
		if (_args.length > 0) {
			_msg = GF.langProp(key.langcode , _args);
		} else {
			_msg = GF.langProp(key.langcode);
		}
		
		if ( _msg == "" ) {_msg = key.msg;}
		_args = null;
		return _msg;
		_msg = null;
	}
	return "";
	*/
	if ( typeof(key) === "string") {
		var __$lang = $("div#wrap");
		if ( __$lang.length <= 0 ) {
			__$lang = $("div:first");
		}
		
		try{
			//return $("div:first").lang().propStr(key , arguments);
			return __$lang.lang().propStr(key , arguments);
		} catch(e) {
			return "";
		}
		
	} else if (typeof(key) === "object") {
		_msg = key.msg;
		if ( typeof(key.langcode) === "undefined" ){
			return key.msg;
		}
		var _args = [], _msg = "";
		if (key.ch) {
			for(var i = 0 ; i < key.ch.length ; i++){
				_args.push( key.ch[i] );
			}
		}
		if (_args.length > 0) {
			_msg = GF.langProp(key.langcode , _args);
		} else {
			_msg = GF.langProp(key.langcode);
		}
		
		if ( _msg == "" ) {_msg = key.msg;}
		_args = null;
		// * /
		return _msg;
		_msg = null;
	}
	return "";
	
}
GF.langText = function(txtobj) {
	if (txtobj.text) {
		return ( txtobj.text_lang ? GF.langProp(txtobj.text_lang) : txtobj.text );
	}
	if (txtobj.title) {
		return ( txtobj.title_lang ? GF.langProp(txtobj.title_lang) : txtobj.title );
	}
}

GF.goAppl =  function(applCode, hashChange,_opt) {
	if(typeof(hashChange) == "undefined") {hashChange = true;}
	if(applCode === "logout") {
		GF.Logout();
		return;
	}
	if(applCode.substr(0,1) === "!") return;
	var leftUrl = "", contentUrl = "", topUrl = "";
	if(applCode === "ha0100") {
		top.location = "/";
		return;
	}
	
	if(applCode === "hr0100") {
		top.location = "/egate45/kr/eip/home/home.nsf/hrhome?readform";
		return;
	}
	
	GF.getApplProfile(applCode, function(data) {
		var filename = "";
		var empno = GC.user.empno;
		if(data === "") return;
		filename = data.applfilename;
		if(data.leftpage != "")leftUrl = (data.leftpage.indexOf(".nsf") == -1 ? "/"+data.appldir+"/"+filename +"/" : "") + data.leftpage;
		contentUrl = (data.contentpage.indexOf(".nsf") == -1 ? "/"+data.appldir+"/"+filename +"/" : "") +data.contentpage;
				
		if(typeof _opt  != "undefined"){
			 leftUrl += typeof _opt.first != "undefined" && _opt.first!="" && leftUrl != ""? "&first="+_opt.first:"";
			 if(typeof _opt.viewalias != "undefined" && _opt.viewalias != "") contentUrl =contentUrl.left("&")+"&view="+ _opt.viewalias				
		}
		//--포탈퀵바숨기기
		try{quickbar._hide();}catch(e){}
		portal.loadContent(
			leftUrl ? new GF.CURL(leftUrl, (_opt ? _opt.left ? _opt.left.arguments : undefined : undefined)).url : ""
			,new GF.CURL(contentUrl, (_opt ? _opt.content ? _opt.content.arguments : undefined : undefined)).url
		);
	});		
	
}
GF.pubInit = function(sel,mode) { /* sel = selector, mode = editmode */
	var $me = sel;	
	/* Datepicker type input */
	function _datepickerInit(_t) {
		var picker = new Array(); 
		$(_t).each(function() {
			var o = {} ,$t = $(this);
			o.name = $t.attr("name");
			if ($t.attr("startdate")) { o.start = $t.attr("startdate");}
			if ($t.attr("enddate")) {o.end = $t.attr("enddate");}
			if($t.attr("format")) {o.dateFormat = $t.attr("format");}
			if($t.attr("mindate")) {o.mindate = $t.attr("mindate");}
			if($t.attr("maxdate")){o.maxdate = $t.attr("maxdate");}
			if($t.hasClass("nobefore")) {o.before = true;}
			o.hasyear = true;
			o.hasmonth = true;
			picker.push(o);
		});			 

		if(picker.length > 0) GF.datePicker(picker, $me.selector.right($me.selector.length - 1));
	}
	function _timeComboInit(_t) { 
		function __initHour(__t) {
			var _start = $(__t).is("[start]") ? parseInt($(__t).attr("start"),10) : 0;
			var _end = $(__t).is("[end]") ? parseInt($(__t).attr("end"),10) : 23;
			function ___hour() {var x = [];for(var __i = _start ; __i <= _end; __i++) x.push({ text : ("0"+__i).right(2), value :("0"+__i).right(2) });	return x; }
		
			$(__t).eCombo({
				fieldset : ___hour()
				,usefield : true	,width : 40 , ocxhide : true
				,fieldname : $(_t).attr("name")
			});
		}
		function __initMinute(__t) {
			var _term = $(__t).is("[interval]") ? parseInt($(__t).attr("interval"),10) : 15;
			function ___minute() {var x = [];for(var __i = 0 ; __i < 59; __i+=_term) x.push({ text : ("0"+__i).right(2)});	return x;	}
			$(__t).eCombo({	fieldset : ___minute() 
				,usefield : true ,width : 40	, ocxhide : true ,fieldname : $(_t).attr("name")
			});
			return;
		}
		$(_t).each(function() {
			if ($(this).hasClass("egate_i_hour")) {__initHour(this);}
			if ($(this).hasClass("egate_i_minute")) {__initMinute(this);}
		});
	}
	
	var _s = null;
	_s = $("input.egate_i_date",$me);	if (_s.size() > 0) {_datepickerInit(_s);}
	_s = $("input.egate_i_hour,input.egate_i_minute"); if (_s.size() > 0) {_timeComboInit(_s);}
}
GF.getMultiTimeZone = function(_d) {
	try{
		var __ = _d.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}),\d+([+-].*)/g,"$1-$2-$3T$4:$5:$6$7");
		var date = new Date(Date.parse(__));
		return date.format("yyyy.mm.dd TT hh:MM");		   
	}catch(e){return _d}
}
GF.getTimeZone = function() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}
GF.getPrevNextUrl = function(_opt, callback,isasync) {
	var ourl = new GF.CURL(	"/"+_opt.dbpath + "/view_navi?readform",{ outputformat : "json"
		,	count : (parseInt(_opt.count , 10) + 1 ) 
		,	start : _opt.start	
		,	view : _opt.view
		,	restricttocategory : _opt.category
	});
	
	function __getStart(url,_callBack, ocmd) {
		var result = null;
		var ajaxOpt = { 
				url :url	
				, type : "POST"
				, cache : false
				, async: _callBack ? true : false 
				, data : "__Click=" + encodeURIComponent(ocmd)
				, success : function(data,stat,xhr) {
					if (typeof _callBack !== "undefined") _callBack(data);
					result = data;
				}
		}
		$.ajax(ajaxOpt);
		return result;
	}
	
	function _nextdraw(_data) {
		if (_opt.cmd == "prev") {
			if(parseInt(_opt.start , 10) == parseInt(_data.start , 10)) {
				GF.alert("첫번째 페이지입니다.", "fpage");return;
			}
		} else {
			if(parseInt(_opt.start , 10) + parseInt(_opt.count , 10) > parseInt(_data.start , 10)) {
				GF.alert("마지막 페이지 입니다.", "lpage");return;
			} 						
		}
		if (typeof _data !== "undefined") {	_opt.start = _data.start; }
		if(callback) {	callback(_opt);}
		return;
	}
	return __getStart(ourl.url, isasync === false ? undefined : _nextdraw, _opt.cmd == "prev" ? GC.viewcmd.prev :  GC.viewcmd.next );
}
GF.openReferer = function(isform) {
	if (GC.referer.length == 0) {
		portal.showHome();
		return;
	}
	GF.load(GC.active(isform), GC.referer.pop());
}

GF.href = function(o) {	
	if(o == "clear") { GC.referer = []; return;}
	GC.referer.push(o);
	return;
}
GF.blockObject = function(isview,sels) {
	var tid = sels ? $(sels) : GC.active();
	var edt = $("object,embed",tid);
	if(isview) edt.show(); else edt.hide();
}
GF.encodeURI = function(uri) {
	var result = uri;
	result = result.replace(/&/g,"%26"); 
	result = result.replace(/\?/g,"%3F");
	try {
		return result;
	} finally {
		result = null;
	}
}
GF.winPrint = function( url , param , ofeatures , urlcallfunc) {
	var turl = new GF.CURL(url);
	
	if (urlcallfunc) {
		var ourl = new GF.CURL(GC.printURI + param ,{
			url : turl.url
		});
		urlcallfunc( ourl.url );
		return;
	} else {
		var ourl = GC.printURI + param + "&url=" + GF.encodeURI(turl.url);
		var w = GF.winopen(ourl,"",ofeatures);
		return;
	}

	var w = GF.winopen(ourl.url,"",ofeatures);	
}
GF.winContent = function(url,ofeatures , urlcallfunc,isnoproxy) {
	var turl = new GF.CURL(url,undefined,isnoproxy);
	
	if (urlcallfunc) {
		var ourl = new GF.CURL(GC.undockURI,{
			url : turl.url
		},isnoproxy).encode();
		urlcallfunc( ourl.url );
		return;
	} else {
		var ourl = new GF.CURL(GC.undockURI,{
			url : turl.url
		},isnoproxy).encode();
	}
	if(typeof ofeatures != "undefined"){
		if(typeof ofeatures.newwindow != "undefined" &&  (ofeatures.newwindow == "1" ||  ofeatures.newwindow)){
			var w = GF.winopen(ourl.url,"win_"+ new Date().getTime(),ofeatures);
		}else{
			var w = GF.winopen(ourl.url,"",ofeatures);
		}
	}
	else{
		var w = GF.winopen(ourl.url,"",ofeatures);
	}
		
}
GF.undock = function(elem , urlcallfunc) {
	var tv = GF.getValue("pane",elem);
	if (typeof tv === "undefined") return;
	var turl = new GF.CURL( tv.href.replace(/&is_preview=1/ , "") , {isundock : "1"});
	var w = GF.winContent(turl.url,{
		location:"0"
		,resizable : "1"
		,status: "1"
		,menubar:"0"
		,scrollbars:"0"
		,top:"0"
	} , urlcallfunc);	
}
GF.winopen = function(url,target,ofeatures,isreplace) {
	function getFeatures() {
		var ret = "";
		if(typeof ofeatures === "string") {return ofeatures;}
		ofeatures.width = ofeatures.width|| 1050, ofeatures.height =ofeatures.height || 900,ofeatures.top =ofeatures.top || 0;  

		$.each(ofeatures,function(x) {
			if(this != "") {ret += ((ret == "" ? "" : ",")+(x +"=" + this));}
		});
		return ret;
	}
	var w = window.open(url,(typeof target == "undefined"|| target == "_parent" ? "_target":target),(ofeatures ? getFeatures() : ""),isreplace);
	
	if (w == null) {
		GF.alert("차단된 팝업창을 허용해 주세요", "comnmsg16");
		return null;
	}
	w.focus();
	
	return w;
}

GF.setValue = function(keyVal,oVal,selector) {
	var paneID = "";
	if(typeof(keyVal) == "undefined") return;
	if(typeof(oVal) == "undefined") return;
	if(typeof(selector) == "undefined") {
		paneID = "#"+GC.activeID();
	} else {
		paneID = selector;
	}

	var data = $(paneID).data(keyVal);
	if(data) {
		$.extend(data,oVal);
	}else {
		$(paneID).data(keyVal,oVal);
	}
		
}

GF.getValue = function(keyVal,selector) {
	var paneID = "";
	if(typeof(keyVal) == "undefined") return;
	if(typeof(selector) == "undefined") {
		paneID = "#"+GC.activeID();
	} else {
		paneID = selector;
	}
	return $(paneID).data(keyVal);
}
GF.loadTab = function(selector,info,callback){
	var _contents = $("#"+GC.layout.content);	var _tabs = $("#"+ GC.layout.tab,_contents);	var _tul = null; var _tli = null;
	function _init(){
		if(_tabs.size()==0){
			_tabs = $("<div id=\""+GC.layout.tab+"\" />").appendTo(_contents);
			_tul = $("<ul class=\"egate_pt_tab\" />").appendTo(_tabs);
		}else	_tul = _tabs.find("ul.egate_pt_tab").eq(0);
		 _tli = _tabs.find("li[tab='egate_tab']");
		if(info.url && typeof info.editmode == "undefined" ){
			//$.extend(true,info,{"editmode": info.url.indexOf("?editdocument")>-1|| info.url.indexOf("?openform")>-1?true:false})
		}
		if(!_is())return;
		_add();
		_rewith();
		_event();
	}
	function _viewrefresh(){
		if ($(GC.active(false)).viewform()){
			if($(GC.active(false)).viewform().getView()){				
				if($(GC.active(false)).viewform().getView().getOption("query") =="")$(GC.active(false)).viewform().getView().refresh();
			}
			else $(GC.active(false)).viewform().refresh();
			if(GC.isPreview){
				GC.activeID($(GC.active(false)).viewform().getpreviewid() , true);													
			}
		}
	}
	function _is(){
		//--선택되어 있는 탭이 있는지 체크한다.
		var _ck = true;	var _tabkey = info.url.urlParam("tabkey");	
		var _hasedit = false;
		var _fm = _getformname(info.url);
		 _tli.each(function(i){
			var __d = $(this).data("tabs");
			if(__d.type == "form"){
				if(info.editmode && __d.editmode)_hasedit = true;
				if(_tabkey && (_tabkey === __d.url.urlParam("tabkey"))) {_ck = false;}   // tony 15-09-18 
				else if(!_tabkey && _fm == _getformname(__d.url)) { _ck = false;}	
			}else{
				if(info.editmode && __d.editmode)_hasedit = true;
				if(_tabkey && (_tabkey === __d.url.urlParam("tabkey"))) {_ck = false;}   // tony 15-09-18 
				else if(__d.url == info.url){_ck= false;}
			}
			if(_hasedit){	
				GF.alert("이미 작성 중이 탭이 있습니다.\n 작성 탭은 하나만 사용하실 수 있습니다.", "comnmsg65");
				_ck = false;
				return false;
			}
			if(!_ck){	
				//--현재열려있는 탭이라면 ViewFresh해야 한다. 아니면 
				if(i == _tabs.tabs( "option", "active" )){
					_viewrefresh();
				}else 	_tabs.tabs({ active: i });	
				return false;
			}
		});
		
		return _ck; 
	}
	function _getformname(__a){
		var a = __a.toLowerCase();
		var b = a.left("?").split("/");
		return b[b.length-1];
	}
	function _add(){
		//--새로운탭을 만든다.
		var _tt = "<li tab=\"egate_tab\"><a href='#{href}'><span>#{label}</span></a> <span "+(_tli.size() == 0 ? "" : "class='btn_close ui-icon ui-icon-close'")+" role='presentation'></span></li>";
	 	var _tkey = "egate_"+ new Date().valueOf() + Math.random().toFixed(16).substring(2)
	 	
		var _li = $(_tt.replace(/#\{href\}/g,"#"+_tkey).replace(/#\{label\}/g,(typeof info.title=="undefined"?"":info.title))).appendTo(_tul).data("tabs",$.extend(true,info,{"panel":_tkey}));
		//--탭이 지정될 영역을 만든다.
		var _tbody = $("<div id=\""+_tkey+"\" class=\"egate_pt_wrap\" />").appendTo(_tabs);
		_tli =  _tabs.find("ul.egate_pt_tab").find("li");
		
		_tli.size() == 1 ?	_tabs.tabs({
									activate: function( event, ui ) {
										//--탭이 활성화될을경우
										var _isform = ui.newTab.data("tabs").type == "view"?false:true;
										GC.activeID(ui.newPanel.selector.right("#"),_isform);									
										//--refresh	
										_viewrefresh();
										$(GC.active(_isform)).trigger("tabrefresh");
										try{
											if(_isform){
												var __doc = $(GC.active(_isform)).doc();
												__doc.resize();
											}else{
												var _v = $(GC.active(true)).viewform();
												if(_v) _v.getView().resize();
											}
										}catch(e){}
									}
									
							}) : _tabs.tabs( "refresh" );
		if(_tli.size() > 1)_tabs.tabs({active:_tli.size() -1});
		_open(_li.data("tabs"))
	}
	function _open(_info){
		GC.activeID(_info.panel, _info.type == "view"?false:true);
		GF.load("#"+_info.panel,_info.url+"&tab=1")	
	}
	function _rewith(isallchk){
		var tab_list_wid = $('.egate_pt_tab').width();
		var tab_list_child_wid = 0;		
		if (isallchk) {
			$('.egate_pt_tab > li').each(function() {
				tab_list_child_wid += $(this).width();
			});
		} else {
			$('.egate_pt_tab > li:not(:last-child)').each(function(i) {
				tab_list_child_wid += $(this).width();
			});
			var __as = tab_list_child_wid/($('.egate_pt_tab > li').length-1);
			tab_list_child_wid += __as + 10;
			setTimeout(function() {
				_rewith(true);
			}, 500);
		}	
		if(tab_list_child_wid > tab_list_wid) {
			$('.egate_pt_tab > li').css({width : + 100/($('.egate_pt_tab > li ').size()) + '%'});
			$('.egate_pt_tab > li > a').css({padding : 4 + 'px', fontSize : 11 + 'px'});
		}
	}
	function _event(){
		_tabs.find( "span.ui-icon-close").off().on("click", function() {		
			GF.closeTab("#"+$( this ).closest( "li" ).attr( "aria-controls" ));
		});
	}
	_init();
}
GF.closeTab = function(_tabid,_alldel){	
	//--모두를 닫을 경우
	var _contents = $("#"+GC.layout.content);	var _tabs = $("#"+ GC.layout.tab,_contents);	
	function _remove(_t){
		//--현재 DIV영역삭제
		if (!GF.onBeforeUnload($(_t))){return;}
		GF.cleanObject( $( _t ));
		var _info = $( _tabs ).find( "li[aria-controls='"+$(_t).attr("id")+"']" ).data("tabs");
		$( _tabs ).find( "li[aria-controls='"+$(_t).attr("id")+"']" ).remove();
		$( _t ).remove();
		_tabs.tabs( "refresh" );
		if (_info.active_tab_id){
			 _tabs.find("li[tab='egate_tab']").each(function(i){
				 if($(this).attr("aria-controls") == _info.active_tab_id){
						//_tabs.tabs({ active: i });
						_tabs.tabs({
							active: i
							,activate: function( event, ui ) {
								//--탭이 활성화될을경우
								var _isform = ui.newTab.data("tabs").type == "view"?false:true;
								GC.activeID(ui.newPanel.selector.right("#"),_isform);									
							}
							
						})
						return false;
				 }
			 })
		}  
	}
	function _rewith(){
		var tab_list_wid = $('.egate_pt_tab').width();
		var tab_list_child_wid = $('.egate_pt_tab > li').size() * 140;		
		
		if(tab_list_child_wid > tab_list_wid) {
			$('.egate_pt_tab > li').css({width : + 100/($('.egate_pt_tab > li ').size()) + '%'});
			$('.egate_pt_tab > li > a').css({padding : 4 + 'px', fontSize : 11 + 'px'});
		} else {
			$('.egate_pt_tab > li > a').removeAttr("style")
		}
	}
	var _ret = true;
	if(_tabid == "all"){
		if(_alldel){
			//--탭모두 삭제하고 
			_tabs.tabs("destroy");
		}else{
			//--모두삭제아닐경우
			$(_tabs).find("li[tab='egate_tab']").each(function(i,v){
				var _info = $(this).data("tabs");
				if(_info.type == "form" && (_info.url.indexOf("openform") > -1|| _info.url.indexOf("editdocument") > -1)){
					_ret = false;
					return false;
				}
			})
		}
	}else _remove(_tabid);
	_rewith();
	return _ret;
}
GF.changeData = function(_tabid,options){
	var _contents = $("#"+GC.layout.content);	var _tabs = $("#"+ GC.layout.tab,_contents);	
	$( _tabs ).find( "li[aria-controls='"+_tabid+"']" ).data("tabs",options)
}
GF.refreshTab = function(type,options){
	var _contents = $("#"+GC.layout.content);	var _tabs = $("#"+ GC.layout.tab,_contents);	
	$(_tabs).find("li[tab='egate_tab']").each(function(i,v){
		var _info = $(this).data("tabs");
		if(type == "view" &&  _info.type=="view"){
			$("#"+_info.panel).viewform().previewChange();
			//--보기RELOAD
			$("#"+_info.panel).viewform().refresh("all",options);
		}else{
			
		}
	})
	
}
GF.loadCoreJS = function(applCode,js) {
	var labs = $LAB;
	var script = null;

	function _loadjs(_applCode,_js) {		
		var app_path = (_applCode.substr(0,4) == "core" ? _applCode : "app/" + _applCode),
		jj = _js.left(_js.indexOf(".js") > -1 ? _js.indexOf(".js") : ""),
		__js = (jj ? GC.minify.isMember(jj) ? jj+".min.js" : _js : _js);

		//nocahe 옵션 셋팅
		var cachebust = false;
		var cachebustdaily = false;
		if(typeof(GC.cachebustlists) != "undefined") {
			if(typeof(GC.cachebustver) != "undefined") {
				if(GC.cachebustlists.isMember(__js)) cachebust=true; else cachebust=false;
			}
		}
		
		if(GC.cachebustdaily == "1") cachebustdaily = true; else cachebustdaily = false;
		//----
		var jspath = GC.site.jsdir + "/" + app_path + "/js/" + __js +"?open"
		+(cachebustdaily ? "&_" + new Date().format("yyyymmdd"):"")
			+(cachebust ? "&_" + (GC.cachebustver ? GC.cachebustver : "") : "");

		script = (script ? script.script(jspath) : labs.script(jspath));	
		return {loadCoreJS : _loadjs , wait : script.wait };
	} 
	return _loadjs(applCode,js);
}
GF.load = function(selector,url,callBack) {
	if($(selector).size() == 0){
		setTimeout(function(){GF.load(selector,url,callBack)},0);
		return;
	}
	var oSel = $(selector);
	if(oSel.length == 0) return;
	if(url == "") return;
	if(typeof(url) == "undefined") return;
	
	if (!GF.onBeforeUnload(oSel)) {return;}
	GF.cleanObject(oSel);
	
	oSel.empty(); 
	$.ajax({
		url : url
		,dataType: "html"
		,type : "GET"
		,async : true
		,cache : false
		,success : function(data,textStatus,xhr) {

			try {
				data.match(/<!-- JJFALDATAERR>((.|[\r\n]*)+)<\/JJFALDATAERR -->/i);
				var rdata = RegExp.$1;
				rdata = rdata.toLowerCase();
				if ( $.trim(rdata) == "failureform_1" || $.trim(rdata) == "failureform_2" ) {
					GF.load(selector , "/domcfg.nsf/CustomGeneralErrorForm?readform");
					return;
				}
			} catch (e) {}
		
			GF.setValue("pane",{href : url},selector);
			oSel.html(data);
			if(typeof(callBack)== "function") callBack(data,textStatus,xhr);
			oSel.trigger("resize");
		}
		,error : function(xhr,textStatus) {
			if (xhr.status == "404") {
				GF.load(selector , "/domcfg.nsf/CustomGeneralErrorForm?readform");
				return;
			}
			if(typeof(callBack)== "function") callBack(undefined,textStatus,xhr);
			return;
		} 
		,complete : function(xhr , status) {
			var _responseText = "";
			if (xhr != null){
				if (xhr.responseText){_responseText = xhr.responseText;}
				xhr.onreadystatechange = null;
				xhr.abort = null;
				xhr = null;
			}
			if (_responseText != "") {
				GF.chkSession(_responseText);
			}
		}
	});
}
GF.onBeforeUnload = function(jObj) {
	if (jObj.doc()) {
		if ( jObj.doc().onBeforeUnload("close") == false ) {
			if ( !GF.confirm("작성중인 문서가 저장되지 않았습니다.\n계속 하시겠습니까?", "msg33_conf") ){return false;}
		}
	}
	return true;
}
GF.cleanObject = function(jObj) {
	if (jObj.doc()) jObj.doc('destroy');
	if (jObj.viewform()) jObj.viewform('destroy');
	if ( $("body").find("#layer_popup_jj").length > 0 ) {$("body").find("#layer_popup_jj").remove();}
}

GF.dialog = function(opt,selector) {
	if (!opt) return null;
	var fid =  GC.activeID();		/* dialog (에디터 있음)에 dialog일때 에디터 숨김 처리 위함 */ 
	var _parent = typeof selector === "undefined" ? $("body") : typeof selector === "string" ?	selector == "" ? $("body") : $(selector) : selector;
	var _opt = opt;
	
	var __opt = {
			content : {
				html : typeof opt.content === "string" ? opt.content : typeof opt.content === "object" ? opt.content.html || "" : "" 
				,url : typeof opt.content === "object" ? opt.content.url ? opt.content.url : "" : ""				
			}
			,isactive : typeof opt.isactive === "undefined" ? false : opt.isactive 
			,modal :	typeof opt.modal === "undefined" ? true : opt.modal
			,position: typeof(opt.position)=="undefined"?{ my: "center center", at: "center center-10%", of: window }:opt.position
			,onload : _opt.onload
			,_close : _opt.close
			,close : function(event,ui){
				var opt = $(this).dialog("option");
				if (opt.activeid) {
					GC.activeID(opt.activeid);
					GC.isPreview = _opt.ispreview;
				}
				/* jquery dialog close시 iframe이 reload되는 
				 * 현상과 함께 ie에서 script오류(ie에서)가 발생하여 close전에
				 * iframe으로 open된 wec를 제거하도록 예외처리
				*/
				var _$wec = $("iframe[name='ifbody']" ,$(this).dialog())
				if(typeof _$wec != "undefined" && typeof editor != "undefined" ){
					if(_$wec.length > 0){
						var $body = $("[role$='fm_body_editor']",$(this).dialog());					
						$body.empty();
						$body.remove();
					}
				}
				//$.unblockUI();
				var _$parent = $(this).data("parentobj");
				if (_$parent) {
					_$parent.dialog("widget").unblock();
				} else {
					$.unblockUI(); 
				}
			
				if(typeof opt._close ==="function") opt._close.apply(this,arguments);
				$(this).dialog('destroy').remove();
			}
	}
	$.extend(true,_opt,__opt);
	//-- 다국어 처리
	if (_opt.title) {
		_opt.title = GF.langText(_opt);
	}
	var _$pdialog = null;
	var did = "ez-dialog-" + $(".ui-dialog").length;
	if (_opt.isactive) {
		_opt.modal = true;
		_opt.activeid = GC.activeID();
		_opt.ispreview = GC.isPreview;
		GC.isPreview = false;
		GC.activeID(did);
	}
	//if($(".blockUI").size() > 0 ) {_opt.modal = false;}
	if (_opt.modal) {
		if ($(".ui-dialog").size() == 0) {
		//if (typeof(selector) == "undefined" || selector == "") {
			_opt.modal = false;
			$.blockUI( {message:null, bindEvents:false, overlayCSS : { 
				backgroundColor: '#aaaaaa'
				,opacity: .5	
			}});
		} else {
			//debugger;
			_opt.modal = false;
			_$pdialog = $(".ui-dialog").last().find(".ui-dialog-content");
			/*if ( selector.hasClass("ui-dialog-content") ) {
				_$pdialog = selector;
			} else {
				_$pdialog = selector.parents("div.ui-dialog-content");
			}*/
			if (_$pdialog.size() > 0) {
				//$(_$pdialog).dialog("option","stack",false);
				$(_$pdialog).data("ui-dialog")._moveToTop = function() {return false;}
				_$pdialog.dialog("widget").block( {message:null, bindEvents:false, overlayCSS : { 
					backgroundColor: '#aaaaaa'
					,opacity: .5
				}})
			} else {
				_$pdialog = null;			
			}
		}
	}

	var _hdialog = $("<div id=\"" +did + "\"/ class='div_dlg_modal_ez_dialog'>").appendTo(_parent);
	//var _hdialog = $("<div id=\"" +did + "\"/ class='layer_modal'>").appendTo(_parent);
	if (_$pdialog != null) {
		_hdialog.data("parentobj", _$pdialog);
	}
	$(_hdialog).dialog(_opt);
	
	if (_opt.content.html != "") {_hdialog.html(_opt.content.html);}
	if (_opt.content.url != "") {
		var ourl = new GF.CURL(_opt.content.url,{dialogid : did,isdialog: "1"}); 
		GF.ajax({
			url : ourl.url
			,dataType : "html"
			,type : "get" 
			,async : false
			,cache : false 
			,success : function(data,textStatus,xhr) {
				GF.setValue("pane", {href : ourl.url}, _hdialog);
				_hdialog.html(data);
				return;
			}
			,error : function(xhr,textStatus) {
				_hdialog.html("Error : " + textStatus); 
				return;
			}
		});
	}
	
	if(typeof _opt.onload === "function") {_opt.onload(_hdialog);}
}

GF.alert = function(msg , langcode) {
	if ( typeof(langcode) === "undefined" ){
		alert(msg);
		return;
	}
	var _args = [], _msg = "";
	if (arguments.length > 2) {
		for(var i = 2 ; i < arguments.length ; i++){
			_args.push( arguments[i] );
		}
	}
	if (_args.length > 0) {
		_msg = GF.langProp(langcode , _args);
	} else {
		_msg = GF.langProp(langcode);
	}
	
	if ( _msg == "" ) {
		_msg = msg;
	}
	alert(_msg);
	_msg = null;
	_args = null;
}
GF.confirm = function(msg , langcode) {
	if ( typeof(langcode) === "undefined" ){
		return confirm(msg);
	}
	var _args = [], _msg = "";
	if (arguments.length > 2) {
		for(var i = 2 ; i < arguments.length ; i++){
			_args.push( arguments[i] );
		}
	}
	if (_args.length > 0) {
		_msg = GF.langProp(langcode , _args);
	} else {
		_msg = GF.langProp(langcode);
	}
	
	if ( _msg == "" ) {
		_msg = msg;
	}
	
	if ( !confirm(_msg) ) {return false;}
	_msg = null;
	_args = null;
	return true;
}
GF.alert_x = function(title, msg, callback, opts) {
//-- Session 종료 시 msg알림으로 사용중
	GF.dialog(	{ 
		content : {
			html : "<P>&nbsp;</P><P>"+msg+"</P><P>&nbsp;</P>"
		}
		,autoOpen:true
		,isactive: false
		,modal:typeof(opts)=="undefined" || typeof(opts.modal)=="undefined"?true : opts.modal 
		,draggable: true
		,closeOnEscape:true
		,resizable: true
		,position:typeof(opts)=="undefined" || typeof(opts.selector)=="undefined"?{ my: "center", at: "center", of: window }:{ my : "left top",at : "left bottom"	,of : opts.selector, offset:"0 0" }
		,minHeight : 30
		,minWidth : 300				
		,title: title
		,close: function() { if (typeof(callback) == "function") callback(); }
	});	
}

GF.confirm_xx = function(title, msg, callback, opts) {
	var yestext = typeof(opts)=="undefined"?GF.langPropEx("예","yes"):opts.yestext;
	var notext = typeof(opts)=="undefined"?GF.langPropEx("아니오","no"):opts.notext;
	var focus = typeof(opts)=="undefined"?0:opts.focus;
	 var _buttons = [
		 { text: yestext, highlight:focus==0?true:false, click : function() { $(this).dialog("close"); callback(6); }}
		 ,{ text: notext, highlight:focus==1?true:false, click : function() { $(this).dialog("close"); callback(7); }}
	 ];

	 if (opts) {
		 if(opts.othertext) 
			 _buttons.push({
				 text: opts.othertext, highlight:focus==2?true:false, click : function() { $(this).dialog("close"); callback(0); }
			 });
	 }
	 
	GF.dialog(	{ 
		content : {
			html : "<P>&nbsp;</P><P>&nbsp;"+msg+"</P>"
		}
		,open : function() {
			//$(this).css({"overflow":'hidden'});
			$(this).nextAll().find("button").eq(focus).focus();	
		}
		,autoOpen:true
		,isactive: false
		,modal:true
		,draggable: true
		,closeOnEscape:true
		,resizable: false
		,position:typeof(opts)=="undefined"?{ my: "center", at: "center", of: window }:{ my : "left top",at : "left bottom"	,of : opts.selector, offset:"0 0" }
		,minHeight : 30
		,minWidth : 360			
		,title: title
		,buttons : _buttons
	});	
}
GF.COrg = function(opt, o_nm, selector, callback, okCallback) {
	var _opt = opt;
	var __opt = {
			orgkind :  _opt.ismulti
			,dlgurl : new GF.CURL("/" + GC.site.librarypath + "/win_org?readform&").url
			,member : o_nm.m
	};
	
	$.extend(true,__opt,_opt);
	function _dialog() {
		GF.dialog(	{ 
			content : {
				url: __opt.dlgurl
			}
			, isactive : true
			, onload : function(dialog) {
				callback(__opt, dialog);
			}
			, modal:true 
			, resizable : false 
			, title : __opt.title
			, title_lang : __opt.title_lang||false
			, okCallback : function(o){
				setTimeout(function() {okCallback(o)},0);
			}
			, width :  __opt.width ? __opt.width : 760
			, wopt : __opt
		});
		return;
	}
	_dialog();	
};

GF.CTree = function(opt,selector) {
	if(!selector) {return null;};
	var _that = this, $me = $(selector),_ctree = null,
	_opt = opt
	,__opt = {
		_onLazyRead : opt.onLazyRead ,_onPostInit : opt.onPostInit
		,_onActivate : opt.onActivate ,_onClick : opt.onClick
		,_onSelect : opt.onSelect ,_onDblClick : opt.onDblClick
		,_onCreate : opt.onCreate,_onQuerySelect  : opt.onQuerySelect 
		,noLink : true
		,clickFolderMode : 3
	};
	$.extend(true,__opt,_opt);
	$.extend(true,_opt,__opt);
	_opt.onFocus = _opt._onFocus ?
		function(node) {if(_opt._onFocus) {_opt._onFocus(_that,node);};return;} : null ,
	_opt.onLazyRead = _opt._onLazyRead ? 
		function(node) {if(_opt._onLazyRead) {_opt._onLazyRead(_that,node);};return;} : null ,
	_opt.onPostInit = _opt._onPostInit ? 
		function(isReloading,isError, XMLHttpRequest, textStatus, errorThrown) {if(_opt._onPostInit) {_opt._onPostInit(_that,isReloading,isError);}return;} : null,
	_opt.onActivate = _opt._onActivate ? 
		function(dtnode) {	if(_opt._onActivate) _opt._onActivate(_that,dtnode);return;} : null,
	_opt.onClick = _opt._onClick ?
		function (dtnode,evt) {	if(dtnode.getEventTargetType(evt) == "expander"){return true;};if(_opt._onClick) _opt._onClick(_that,dtnode,evt);} : null;
	_opt.onSelect = _opt._onSelect ?
		function (flag,dtnode) {	if(_opt._onSelect) _opt._onSelect(_that,flag,dtnode);} : null;
	_opt.onDblClick = _opt._onDblClick ?
		function (dtnode,evt) {	if(_opt._onDblClick) _opt._onDblClick(_that,dtnode,evt);} : null;
	_opt.onCreate = _opt._onCreate ?
		function (node,nodeSpan) {	if(_opt._onCreate) _opt._onCreate(_that,node,nodeSpan);} : null;
	_opt.onQuerySelect  = _opt._onQuerySelect ?
		function (flag,dtnode) {	if(_opt._onQuerySelect) _opt._onQuerySelect(_that,flag,dtnode);} : null;
	
				
	this.getThis = function() {return $me};
	this.getTree = function() {if(_ctree) {return _ctree;} else { _ctree = $me.dynatree("getTree");return _ctree;}}
	this.rootNode = function() { return _that.getTree().getRoot();}
	this.getActiveNode = function() { return _that.getTree().getActiveNode()};
	this.getSelectedNodes = function() {return _that.getTree().getSelectedNodes();}
	this.getNodeByKey = function(key) {return _that.getTree().getNodeByKey(key);}
	this.removeNodeByKey = function(key) {var node = _that.getNodeByKey(key);if(node != null) {node.remove();}}
	this.removeChildrenByKey = function(key) {var node = _that.getNodeByKey(key);if(node != null) {node.removeChildren();}	return node;	}
	this.redraw = function() {_that.getTree().redraw();}
	this.reload = function() {
		if (typeof _opt.children === "undefined") {
			_that.getTree().reload();
			return;
		} else {
			_that.rootNode().removeChildren();
			_that.rootNode().addChild(_getChildren());
			return;
		}
	}
	this.expendKey = function(keyarr) {
		var node = null;
		$.each(keyarr,function(i,val) {
			node = _that.getNodeByKey(val); 
			if(node){
				node.expand(true);
			}
		});
		if(node) {	$(":first",$me).scrollTop($(node.li).offset().top - $me.offset().top);};
		return ;
	}
	
	function _getChildren() {
		switch(typeof(_opt.children)) {
			case "object":
				return _opt.children;
				break;
			case "function":
				var result = _opt.children();
				return result;
				break;
		}
	}
	$me.dynatree(_opt);
	return;
}

GF.CProfile = function(key,selector,name) {	
	var opt = {
		content : {
			url : new GF.CURL("/" + GC.site.librarypath + "/userinfo?readform&userid="+(key.indexOf("CN=")> -1? this.notesName(key,"ou2"):key)).url
		}
		,	open : function() {
			$(this).css({"overflow":'hidden'});
			try {
				$(this).focus();
			}catch(e){}
		}
		,	position : {my:"left top", at:"left top", of:selector, offset:"0,0"}
		,	width : 370
		,	height: 400
		,	title : (key.indexOf("CN=")> -1? this.notesName(key,"cn"):name)+GF.langPropEx("님 프로파일 카드","profile")
		,	resizable : false
	}
	var btns= [];
	var mf= false; var xf= false;
	var en= GF.notesName(key,"ou2");
	if (en==GC.user.empno) {
		xf= true;
	}
	if(!mf && !xf){
		btns[btns.length]= 	{
			text: GF.langPropEx("업무관련자로 추가", "busiadd")
			,	click: function() {
	 			GF.runIM("mynetwork",GF.notesName(key,"ou2"));
	 		}
	 	};
	}
	btns[btns.length]= 	{
 		text: GF.langPropEx("상세보기","Learnmore"), highlight: true
 		,	click: function() {
	 		GF.runIM("profile",key);
	 		$(this).dialog("close")
		}
	};
	opt.buttons= btns;
	$("div.egate_mini_profile_area").parents("div.ui-dialog-content").dialog("close");
	GF.dialog(opt,selector);
}

GF.ajax = function(opt) {
	var _opt = {
		complete : function(xhr , status) {
			var _responseText = "";
			if (xhr != null){
				if (xhr.responseText){_responseText = xhr.responseText;}
				GF.ajaxclear(xhr);
			}
			if (_responseText != "") {
				GF.chkSession(_responseText);
			}
		}
	};
	$.extend(true , opt , _opt);
	return $.ajax(opt);
}
GF.ajaxclear = function(xhr) {
	function doNothing(){}
	if (xhr != null){
		xhr.onreadystatechange = doNothing;
		xhr.abort();
		try {
			delete xhr;
		} catch(e){}
	}
}
GF.loadJS = function(applCode,js,path) {
	var labs = $LAB;
	var script = null;

	function _loadjs(_applCode,_js,_path) {
		var app_path = ( 
			_applCode.match(/^core\//g) ? _applCode :
			(_path  ? "app/"+_path : "app/" + _applCode ) ),
		jj = _js.left(_js.indexOf(".js") > -1 ? _js.indexOf(".js") : ""),
		__js = (jj ? GC.minify.isMember(jj) ? jj+".min.js" : _js : _js);

		//nocahe 옵션 셋팅
		var cachebust = false;
		var cachebustdaily = false;
		if(typeof(GC.cachebustlists) != "undefined") {
			if(typeof(GC.cachebustver) != "undefined") {
				if(GC.cachebustlists.isMember(__js)) cachebust=true; else cachebust=false;
			}
		}
		if(GC.cachebustdaily == "1") cachebustdaily = true; else cachebustdaily = false;
		var jspath = "";
		if(typeof _path != "undefined" && _path == "core"){
			jspath = "/"+ GC.site.resourcepath+"/"+app_path +"/js/"+__js +"?open"+(cachebustdaily ? "&_" + new Date().format("yyyymmdd"):"")+(cachebust ? "&_" + (GC.cachebustver ? GC.cachebustver : "") : "");
		}else{
			var appInfo = GF.getApplProfile(_applCode);
			if(appInfo.appldir === ""){
				jspath = app_path + "/js/" + __js +"?open"+(cachebustdaily ? "&_" + new Date().format("yyyymmdd"):"")+(cachebust ? "&_" + (GC.cachebustver ? GC.cachebustver : "") : "");
			} else {
				jspath = GC.site.host +GF.getRootproxyPath("/" + appInfo.appldir) + "/" + appInfo.applfilename + "/" + app_path + "/js/" + __js +"?open"+(cachebustdaily ? "&_" + new Date().format("yyyymmdd"):"")+(cachebust ? "&_" + (GC.cachebustver ? GC.cachebustver : "") : "");
			}
		}		
		
		script = (script ? script.script(jspath).wait() : labs.script(jspath).wait());	
	
		return {loadJS : _loadjs , wait : script.wait };
	} 

	return _loadjs(applCode,js,path);
}

GF.datePickerSetOpt = function(selector , opt) {
	selector.datepicker("option", opt);
}
GF.datePicker = function(opt,layoutId,dateOpt) {
	var fid = layoutId || GC.activeID();
	var opts = {};
	$.extend(opts,{
		showOn: "both"
		,buttonText: "달력"
		,buttonImage: GC.site.jsdir + "/core/resources/images/btn/date.png"
		,buttonImageOnly : true
		,beforeShow : function(inp,picker) {			
			setTimeout(function() {	$(picker.dpDiv).css("zIndex",9999);},0);
		}
		,onClose : function() {}
	},dateOpt); 
	
	function getObject(fld) {
		return $("input[name='" + fld + "'][type!='hidden']","#"+fid);
	} 
	function initPicker(x,o) {
		switch(typeof(o)) {
			case "string":
				getObject(o).datepicker(opts);
				break;
			case "object":
				var $start = null;
				var $end = null;
				var __beforeShowDay = null;
				var __onSelect = null;
			
				if(o.dateFormat) {opts["dateFormat"] = o.dateFormat}
				if(o.onSelect) __onSelect = o.onSelect;
				if(o.start) $start = getObject(o.start);
				if(o.end) $end = getObject(o.end);
				
				if(o.mindate) {
					__beforeShowDay = function(_odate,inst) {
						var _x = o.mindate.toDate("yyyy-MM-dd");_x.setHours(0,0,0,0);return [_x.getTime() <= _odate.getTime(), '']											
					}
				}
				if($start) {
					__beforeShowDay = function(_odate,inst) {
						var _x = $start.val().toDate("yyyy-MM-dd");_x.setHours(0,0,0,0);return [_x.getTime() <= _odate.getTime(), '']											
					}
				}
				if($end) {
					if(!o.onSelect) {
						__onSelect = function(_sdate,inst) {
							var _e = $end.val().toDate("yyyy-MM-dd");var _me = _sdate.toDate("yyyy-MM-dd");
							_me.setHours(0,0,0,0);_e.setHours(0,0,0,0);
							if (_e.getTime() < _me.getTime()) {$end.val(_me.format("yyyy-mm-dd"));	}
						}
					}
				}
				if (o.before && typeof(opts.beforeShowDay) == "undefined" ) {
					__beforeShowDay = function(_odate,inst) {
						var _today = new Date();
						_today.setHours(0,0,0,0);
						
						return [_today.getTime() <= _odate.getTime(), ""]
					}
				}
				var __opt = {
						beforeShowDay : __beforeShowDay
					,	onSelect : __onSelect
					,	changeYear: o.hasyear
					,	changeMonth: o.hasmonth
				};
				$.extend(true , __opt , opts);
				getObject(o.name).datepicker(__opt);
				break;
		}
	}
	if ($.isArray(opt)) {
		$.each(opt,initPicker);	
	} else { initPicker(0,opt);}
	
}

GF.tabs = function(selector,opts) {
	return $(selector).tabs(opts);
}
GF.tabsInit = function(selector , opt , obj){
	if (opt.type == "cust") {GF.tabsCustInit(selector , opt , obj);return;}
	var $tabs = $(selector).is("[tabs]") ? $(selector) : $("[tabs]",selector);
	if($tabs.length == 0) return;
	if($.isArray(opt.tabs) && opt.tabs.length == 0) return;
	if(!$.isArray(opt.tabs) && $.isEmptyObject(opt.tabs)) return;
	function _drawTab(sel , tabs , ids) {
		var html = "";
		if (ids.length == 0) return; 
		var __tabs = tabs;
		for (x in __tabs) {
			if($.inArray(x,ids) > -1) {
				html += "<li><a id=\"" + (__tabs[x].tabid ? __tabs[x].tabid : x) + "\" href=\"#" + __tabs[x].dspid + "\">";
				html += GF.langText(__tabs[x]);	
				html += "</a></li>";
			}
		}
		sel.append(html);
	}
	
	var _tabs = opt.tabs;
	$tabs.empty();
	$tabs.each(function() {
		var ids = $(this).attr("tabs").split(",");
		_drawTab($(this) , _tabs , ids);
	});

	$(selector).eztabs(opt.options);	
}
GF.tabsCustInit = function(selector , opt , obj) {
	var $tabs = $("[tabs]",selector);
	if($tabs.length == 0) return;
	if(opt.tabs.length == 0) return;
	
	selector.append('<div class="clear"></div><div class="egate_j_tabempty_area"></div>');
	selector.find("div.egate_tr").empty();
	
	function _drawTab(sel , tabs , ids) {
		var html = "";
		if (ids.length == 0) return; 
		var __tabs = tabs;
		var __fisttabid = "";
		var __countid = "";
		for (x in __tabs) {
			if($.inArray(x,ids) > -1) {
				__countid = "";
				if (__fisttabid == "") {__fisttabid = (__tabs[x].tabid ? __tabs[x].tabid : x);}
				if ( __tabs[x].firsttab ) {
					__fisttabid = (__tabs[x].tabid ? __tabs[x].tabid : x);
				}
				$.extend(true , __tabs[x] , {taboptid : x}); /* 각 tab의 object name를 저장한다. (사용예) 각 tab의 버튼표시 사용. */
				html = "<li>";
				html += "<span role=\"" + (__tabs[x].tabid ? __tabs[x].tabid : x) + "\">";
				html += GF.langText(__tabs[x]);	//__tabs[x].text;
				if ( typeof __tabs[x].countfunc === "function" ) {
					__countid = "j_cnt_" + (Math.floor(Math.random() * 1000) + 1);
					$.extend(true , __tabs[x] , {countid : __countid}); /* tab에 count id를 저장한다. (사용예) 각 tab의 count 표시 사용. */
					html += '<span role="' + __countid + '" class="egate_num"> ('+GF.langPropEx("총", "total")+'<span role="' + __countid + '_inner" class="color">0'+GF.langPropEx("건", "case")+'</span>)</span>';
				}
				html += "</span>";
				html += "</li>";
				sel.append(html).find("li:last").data("tabdata" , __tabs[x]).off("click").on("click" , function() {
						var _d = $(this).data("tabdata");
						selector.find("div.egate_j_tabempty_area").empty().html("<div role=" + _d.disid + "></div>");
						$(this).parent("ul").find("li").removeClass("on");
						$(this).addClass("on");
						_dwTabRBtn(_d , sel);
						if ( _d.click ) { _doClickAct(_d.click , _d); }
					});
				if ( (__tabs[x].firsttab ? false : true) && typeof __tabs[x].countfunc === "function" ) {
					_doCountAct(__tabs[x].countfunc ,  __tabs[x]);
				}
			}
		}
		__tabs = null;
		
		if ( __fisttabid != "" ) {
			var __d = sel.find("[role$='" + __fisttabid+"']").parent("li").addClass("on").data("tabdata");
			selector.find("div.egate_j_tabempty_area").empty().html("<div role=" + __d.disid + "></div>");
			_dwTabRBtn(__d , sel);
			if ( __d.click ) {
				_doClickAct(__d.click , __d);
			}
		}
	}
	function _doCountAct(callBack , info) {
		callBack(obj , info.countid + "_inner" );
	}
	function _doClickAct(callBack , info) {
		callBack(obj , info.disid , info , info.countid + "_inner");
	}
	function _dwTabRBtn(tabinfo , sel) {
		selector.find("div.tr").empty();
		var __tbtns = sel.attr("tabsaction");
		var __blist = [];
		if ( typeof __tbtns === "undefined" || __tbtns == "" ) {
			if ( tabinfo.btn ) {
				for (xb in tabinfo.btn) {
					__blist[__blist.length] = xb;
				}
			}
		} else {
			try {
				__tbtns = $.parseJSON("{" + __tbtns + "}");
			} catch(e) {
				__tbtns = eval("({" + __tbtns + "})");
			}
			if ( typeof __tbtns[tabinfo.taboptid] === "undefined") {
				if ( tabinfo.btn ) {
					for (xb in tabinfo.btn) {
						__blist[__blist.length] = xb;
					}
				}
			} else if ( __tbtns[tabinfo.taboptid] == "" ) {
				return;
			} else {
				__blist = __tbtns[tabinfo.taboptid].split(",");
			}
		}
		if ( __blist.length <= 0 ) { return; }
		if ( tabinfo.btn ) {
			for (xb in tabinfo.btn) {
				if($.inArray(xb , __blist) > -1) {
					selector.find("div.tr")
							.append('<span class="egate_btn_gray"><span>' + tabinfo.btn[xb].text + '</span></span>')
							.find("span.egate_btn_gray:last")
							.data("tabbtndata" , tabinfo.btn[xb])
							.off("click")
							.on("click" , function() {
								var _d = $(this).data("tabbtndata");
								if ( _d.click ) {
									_doClickAct(_d.click , _d);
								}
							});
				}
			}
		}
	}
	
	var _tabs = opt.tabs;
	$tabs.empty();
	$tabs.each(function() {
		var ids = $(this).attr("tabs").split(",");
		_drawTab($(this) , _tabs , ids );
	});
}
GF.dlgBtnInit = function(selector , opt , obj){
	var $btns = $("[dlgbtns]",selector);
	if($btns.length == 0) return;
	var _btns = opt.btns;
	if(_btns.length == 0) return;
	
	function _executeButton(_CallButton){
		var id = $(this).attr("id");
		var CallEvent = _btns[id].click;
		if (CallEvent) {CallEvent(obj);}
		return;
	}
	function _drawBtns(sel , btns , ids) {
		if (ids.length == 0) return; 
		var __btns = btns;
		for (x in __btns) {
			if($.inArray(x,ids) > -1) {
				var html = "";
				var _click = __btns[x].click;
				html = '<li id="' + x + '"><span class="' + __btns[x].css + '" title="'+ __btns[x].title+'"></span></li>';
				var o = $(html);
				if(_click) {o.click( _executeButton);};
				sel.append(o);
			}
		}
	}
		
	$btns.empty();
	$btns.each(function() {
		var ids = $(this).attr("dlgbtns").split(",");
		_drawBtns($(this) , _btns , ids);
	});
}
GF.getByteSize = function (code){
	var code_byte = 0;
    for (var inx = 0; inx < code.length; inx++) {
        var oneChar = escape(code.charAt(inx));
        if ( oneChar.length == 1 ) {
            code_byte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            code_byte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            code_byte += oneChar.length/3;
        }
    }
    return code_byte;
}
GF.textareaChkLimit = function (selector , options , callback) {
	var rttimer = [];
	function _setRichtext(sel , max , isbyte , kind){
		var m = (max == undefined ? "0" : max);
		if (m == "0") return;
		rttimer[sel.attr("name")] = null;
		if ( options.textarea ) {
			for ( var __i = 0 ; __i < options.textarea.length ; __i++ ) {
				if ( sel.attr("name") == options.textarea[__i].fldname ) {
					sel.data("txtopt" , options.textarea[__i]);
				}
			}
		}
		sel.attr({ "max":m })
			.off("focusin focusout").on("focusin focusout", function(e) {
				_textareaEvent(sel, e, isbyte , kind);
			});
		
		_textareaEvent(sel, {"type" : "focusin"}, isbyte , "firstinit");
	}
	function _textareaEvent(sel, e, isbyte , kind){
		var __$tarea = null;
		var __dfmsg = GF.langPropEx("입력 글자수를 초과 하였습니다.", "comnmsg2");
		var __always = false;
		if ( typeof(sel.data("txtopt")) == "object" ) {
			__$tarea = sel.data("txtopt");
			__dfmsg = __$tarea.show_msg;
			if ( __$tarea.always ) {__always = __$tarea.always;}
		}
		var __max = parseInt(sel.attr("max") , 10);
		switch(e.type){
		case "focusin":
			rttimer[sel.attr("name")] = setInterval(function() {
				if (__max > 0) {
					var __clentype = "";
					if (isbyte == "byte") {
						var __clen = GF.getByteSize( sel.val() );
						__clentype = "byte";
					} else {
						var __clen = sel.val().length;
						__clentype = GF.langProp({msg:"자", langcode:"characters"});
					}
					
					if ( callback ) {
						callback( selector , __clen ,  __max );
					} else {
						var __altmsg = __dfmsg + " (" + __clen + " " + __clentype + " / "+GF.langProp({msg:"최대", langcode:"max"})+" " + __max + " " + __clentype + ")";
						if ( __always ) {
							if ( __$tarea.show_msg_id ) {
								$("#" + __$tarea.show_msg_id , selector).empty().html(__altmsg);
							} else {
								sel.parent().find("span.chk_limit_dw_count").remove();
								sel.after("<span class='chk_limit_dw_count' style='float:left;width:100%;'>" + __altmsg + "</span>");
							}
						} else {
							if (__clen > __max) {
								sel.parent().find("span.chk_limit_dw_count").remove();
								sel.after("<span class='chk_limit_dw_count' style='float:left;width:100%;'>" + __altmsg + "</span>");
							} else {
								sel.parent().find("span.chk_limit_dw_count").remove();
							}
						}
						__altmsg = null;
					}
					if (kind == "firstinit") {clearInterval(rttimer[sel.attr("name")]);}
				}
			}, 500);
			break;
		case "focusout":
			try{
				clearInterval(rttimer[sel.attr("name")]);
			} catch(e){}
			break;
		}		
	}
	function _textareaByte( sel , islimit , isbyte , kind ) {
		if ( islimit ) {
			sel.parent().find("span.chk_limit_dw_count").remove();
			sel.after("<span class='chk_limit_dw_count' style='float:left;width:100%;'>"+GF.langProp({"msg" : "입력 가능한 글자수는 '" + _a + " 자' 입니다.", "langcode":"comnmsg18", "ch" : [_a]})+"</span>");
		} else {
			sel.parent().find("span.chk_limit_dw_count").remove();
		}
	}

	$("textarea" , selector).each(function(){
		var _max = $(this).attr("chk_limit");
		if (typeof _max !== "undefined") {
			_setRichtext( $(this) , _max , "length" , "" );
		}
	});
}
/*
*  GF.CURL 
*/
GF.CURL = function(v,arg,isnopxy) {
	var _that = this,_ou = {_$protocol : "", _$host : "", _$path : "", _$port : "", _$cmd : "", _$query : null, _$anchor : ""}
	var _isencode = false;
	var _disableProxy = (typeof isnopxy === "undefined" ? false : isnopxy ); 
	this.arguments = null;
	this.encode = function() {	_isencode = true;_update();return _that;}
	this.decode = function() {	_isencode = false;_update();return _that;}
	this.url = "";
	this.full = "";
	this.host = function(_v) {if (_v){_ou._$host = _v;_update();return;} else {return _ou._$host ? _ou._$host : location.hostname == "" ? "localhost": location.hostname; }};
	this.port = function(_v) { if (_v) {_ou._$port = _v;_update();return;} else { return _ou._$port;}};
	this.path = function(_v) { if (_v) {_ou._$path = _v;_update();return;} else { return _ou._$path;}};
	this.cmd = function(_v) { if (_v) {_ou._$cmd = _v;_update();return;} else { return _ou._$cmd;}};
	this.anchor = function(_v) {if (_v) {_ou._$anchor = _v;_update();return;} else { return _ou._$anchor;}};
	this.getArguments = function(sep) {
	  var _r = "", _q = _ou._$query;
	  for(var _o in _q) {
		  _r = (_q[_o] ?_r ? _r + sep + _o + "=" + 
				  (_isencode ? encodeURIComponent(_q[_o]) : _q[_o]) : _r + _o + "=" +(_isencode ? encodeURIComponent(_q[_o]) : _q[_o]) : _r);
	  }
	  return _r;
	}
	this.getParam = function(_v) {return _ou._$query[_v];}
	this.getParmVal = _that.getParam;
	this.setParam = function(k,_v) {if (typeof(k) == "object") {_OBJparse(k);} else { _ou._$query[k] = _v;};_update();return;}
	this.argv = function(_v) {
	  if(typeof _v === "string") { _QParse(_v); }
	  else if(typeof _v === "object") {_OBJparse(_v);}
	  _update();
	};
	this.baseurl = function() {
		return _ou._$path + (_ou._$cmd ? "?"+_ou._$cmd : ""); 
	}
	this.setBase = function(_v) {
		_URLparse(_v);
		_update();
		return;
	}
	function _init() {
		if (typeof v === "undefined") return;
		switch(typeof(v)) {
		case "string":	_URLparse(v);	break;
		case "object": _OBJparse(v);break;}
		switch(typeof(arg)) {case "object" :_OBJparse(arg);break;case "string": _QParse(arg);break;}
	  _update();
	};
	function _URLparse(_s) {
	    if (!_s.match(/^(?:([a-z]*(?=[:]\/\/))[:]\/\/([^\/:]*(?=[:\/]|$))?[:]?([0-9]*)?)?([^?&]+)?(?:[?]?([^#&$]+))?(?:[&]?([^#]+))?(?:[#]?(.*))/gi)) return;
	    _ou._$protocol = (RegExp.$1 ? RegExp.$1 : _ou._$protocol),_ou._$host = (RegExp.$2 ? RegExp.$2 : _ou._$host)
	    ,_ou._$port = (RegExp.$3 ? RegExp.$3 : _ou._$port), _ou._$path = (RegExp.$4 ? RegExp.$4 : _ou._$path)
	    ,_ou._$cmd = (RegExp.$5 ? RegExp.$5 : _ou._$cmd);
	    _QParse(RegExp.$6);
	    _ou._$anchor = (RegExp.$7 ? RegExp.$7 : _ou._$anchor);
	    
	    
	    //- 현재 host가 proxy host가 아님 and 호출하려는 url은 proxy를 거쳐야 함. and proxy주소 변환 전 주소인 경우
	    if(_disableProxy) {return;}	
	    if(GF.getProxyHost().indexOf(location.hostname) >= 0 && GF.isUseProxy(_ou._$path)) {
	    	var h = GF.getProxyHost();  
	    	_ou._$path = GF.getRootproxyPath(_ou._$path)
	    } 
	};
	function _QParse(_s) {
	  if (!_s) {return null;};
	  var _a = _s.split("&");
	  for (var o = 0; o < _a.length; o++) { var __a = _a[o].split("=");if(!_ou._$query) _ou._$query = {};
		  _ou._$query[__a[0]] = (__a.length > 1 ? __a.slice(1,__a.length).join("=") : ""); }; 
	};
	function _OBJparse(_v) {
	  for (var __o in _v) {
	    if(typeof _ou[__o] !== "undefined") {_ou[__o] = (typeof _v[__o] === "function" ? _v[__o]() : _v[__o]) ;continue;}
	    if(__o == "base") {_URLparse(_v[__o]);continue;}
	    if(!_ou._$query) {_ou._$query = {};}
	    _ou._$query[__o] = (typeof _v[__o] === "function" ? _v[__o]() : _v[__o]);
	  }
	};
	function _update() {
	  _that.arguments = _ou._$query;
	  _that.url = (_ou._$protocol ? _ou._$protocol + "://" : (_ou._$port||_ou._$host != "") ? "http://" : "")
	  + (_ou._$port ? _that.host() : _ou._$host) + (_ou._$port ?  (_ou._$port == "80" ? "" : ":"+_ou._$port) : "") +_ou._$path + (_ou._$cmd ? "?"+_ou._$cmd : "")
	  + (_ou._$query ? (_ou._$cmd ? "&" : "?" ) +_that.getArguments("&") : "") + (_ou._$anchor ? "#"+_ou._$anchor : "");
	  _that.full = (_ou._$protocol ? _ou._$protocol : "http") + "://"
	  + _that.host()  + (_ou._$port ? ":" + (_ou._$port == "80" ? "" : _ou._$port) : "") 
	  + _ou._$path + (_ou._$cmd ? "?"+_ou._$cmd : "")
	  + (_ou._$query ? (_ou._$cmd ? "&" : "?" )+_that.getArguments("&") : "") + (_ou._$anchor ? "#"+_ou._$anchor : "");
	};_init();
}
/*
 * dbpath 대한 rootproxy return
 */
GF.getRootproxy = function(d) {
	var _rootproxy = "";
	//--이미지 및 첨부에 대한 패스를 정의한다.
	if(d.indexOf(GC.site.imagepath)>=0 || d.indexOf(GC.site.attachpath) >=0){
		_rootproxy = GC.rootproxy[GC.dbinfo.server];
	}else if(d.split("/")[1] == "mail"){
		//--첫번째 디렉토리가 메일일 경우
		_rootproxy = GC.user.maildirprefix
	}
	if (typeof(_rootproxy) == "undefined" || _rootproxy == "") {return "";}
	return _rootproxy;
}
GF.getRootproxyPath = function(d) {
	var _rootproxy = "";
	//--이미지 및 첨부에 대한 패스를 정의한다.
	if(d.indexOf(GC.site.imagepath)>=0 || d.indexOf(GC.site.attachpath) >=0){
		_rootproxy = GC.rootproxy[GC.dbinfo.server];
	}else if(d.split("/")[1] == "mail"){
		//--첫번째 디렉토리가 메일일 경우
		_rootproxy = GC.user.maildirprefix
	}
	if (typeof(_rootproxy) == "undefined" || _rootproxy == "") {return d;}
	return "/"+ _rootproxy + d;
}
//내부인지 외부인지에 따라 proxy host 리턴
GF.getProxyHost = function() {
	var chost = location.hostname.toLowerCase();
	if(GC.site.hostmobile.indexOf(chost) >= 0) return GC.site.hostmobile;
	if(GC.site.hostext.indexOf(location.hostname) >= 0) return GC.site.hostext; else return GC.site.host;
}
//디리 경로 Proxy서버를 통한 서비스 여를 리턴한다.
GF.isUseProxy = function(_path) {
	if(_path.indexOf(GC.site.imagepath) >= 0 || _path.indexOf(GC.site.attachpath)>=0)return true;
	if(_path.split("/")[1] == "mail")return true;
	return false;	
}
GF.Font = function(action){
	var fontsize = GC.Storage.getItem("fontsize");
	if(fontsize == null)fontsize=12;
	_save = function(){GC.Storage.setItem("fontsize",fontsize);}
	_small = function(){if(parseInt(fontsize) >= 10){fontsize = parseInt(fontsize)- 3;}_set();}
	_large = function(){if(parseInt(fontsize) < 30){fontsize = parseInt(fontsize) + 3;}_set();}
	_set = function(){
		$("[role$='fm_body_view']",GC.active(true)).css("font-size",fontsize+"px").find("*").css("font-size",fontsize+"px");	
		if($("iframe[name='ifr_body']").size() > 0 ){
			var _iframe = $("iframe[name='ifr_body']");
			_iframe.contents().find("body").css("font-size",fontsize+"px").find("*").css("font-size",fontsize+"px");	
			_iframe.css("height", _iframe.get(0).contentWindow.document.body.offsetHeight);
		}
		_save();
	}
	action ? _small():_large();
}
GF.createSNS = function(unid, dbpath){
	
	GF.dialog({
		content:{
			url : new GF.CURL("/"+GC.site.homepath+"/win_sns?openform&unid="+unid+"&dbpath="+dbpath).url
		}
	,	title : "SNS"
	,	isactive : true
	,	width : 600
	,	resizable : false
	,	buttons : [
			{ text: GF.langProp({"msg":"확인", "langcode":"confirm"}), click : function (){
					var _mem = $("[role='share']",GC.active(true)).eugp().members();
					var _usrs = [], _deps = [];
					$.each(_mem, function(){
						if(this.info.kind == GC.eugp.user){
							_usrs.push(this.info.userid)
						}else{
							_deps.push(this.info.groupcode)
						}
					});
					
					if(_usrs.length ==0 && _deps.length ==0){
						GF.alert('공유범위를 지정해 주시기 바랍니다.','comnmsg60');
						return ;
					}
					
					var _data = $("[role='share']",GC.active(true)).data("data")
					var _body = $("[role='share']",GC.active(true)).data("body")
					var url = new GF.CURL("/stre/api/article/write.do");
					var param = {
						loginid : GC.user.userid
						,articleType : "105"
						,ctnt : _body
						,url :  GC.undockURI +"&url="+_data.url
						,title : _data.subject
						,thumb : "http://"+ location.hostname +  GC.site.imgdir +"/core/resources/images/img/img_mart_link.png"
						,site:"eGate Groupware"
						,users:_usrs.join(",")
						,depts:_deps.join(",")
					}
					var _this = $(this);
					GF.ajax({
						url : url.url
						,type : "POST"
						,async : true
						,data : param
						,dataType : "json"
						,cache : false 
						,success : function(data,textStatus,xhr) {
							if(data.sns.result == "100"){
								GF.alert('SNS에 등록되었습니다.','comnmsg61');
								_this.dialog("close");
							}else{
								GF.alert('오류가 발생되었습니다.관리자에게 문의하시기 바랍니다.','kmmsgno');
								return;
							}
							
						}
						,error : function (xhr,textStatus){_this.dialog("close");}
					});
										
				}
			}
		,	{ text: GF.langProp({"msg":"취소", "langcode":"cancel"}), click : function (){
					$(this).dialog("close");					
				} 
			}
		]
	});	
	
	
}
/* 본문 html을 filtering */
GF.html = {
	tagReplace : function(shtml,stag,srep,isInner) {
		var _reg = new RegExp('(<'+stag+'[^>]*?>)([\\s\\S]*?)(</'+stag+'>)|<'+stag+'[^>]*?[/]?>',"gi"); 
		return isInner === true ? shtml.replace(_reg,"$1"+srep+"$3") : shtml.replace(_reg,srep); 
	}
	,tagData : function(shtml,stag,isInner) {
		var _reg = new RegExp('(<'+stag+'[^>]*?>)([\\w\\W]*?)(</'+stag+'>)|<'+stag+'[^>]*?[/]?>',"gi")
			,_result = shtml.match(_reg) ? isInner === true ? RegExp.$2 : RegExp.$1 + RegExp.$2 + RegExp.$3 : "";
		return this.tagReplace(_result,"style","");   
	}
	,tagReplaceAttribute : function(shtml,stag,attr,srep) {
			var _reg = new RegExp('(<'+stag+'[^>]*?)('+attr+'=")([\\s\\S]*?)(")([^>]*>)',"gi"); 
			return shtml.replace(_reg,"$1$2"+srep+"$4$5");
	}
	,removeAllTags : function(shtml){
		return shtml.replace(/(<([^>]+)>)/gi, "");
	}
}
GF.bodyFilter = function(opt,cid,data) {
	data = data.replace(/&#60;/gi,"<").replace(/&#62;/gi,">");
	if (opt.isedit)	{
		data = data.replace(/<script/gi, '<!-- script').replace(/<\/script>/gi, '<\/script -->');
		data = data.replace(/<object/gi, '<!-- object').replace(/<\/object>/gi, '<\/object -->');
		data = data.replace(/<OBJECT/gi, '<!-- object').replace(/<\/OBJECT>/gi, '<\/OBJECT -->');		
	} else {
		if (data.indexOf("POSITION: absolute") > 0 || data.indexOf("POSITION:absolute") > 0 || data.indexOf("position: absolute") > 0 || data.indexOf("position:absolute") > 0) {
			data = data.replace(/LINE-HEIGHT: 1.8/gi,"LINE-HEIGHT:2.3").replace(/LINE-HEIGHT: 1.5/gi,"LINE-HEIGHT: 2.0").replace(/LINE-HEIGHT: 1.2/gi, "LINE-HEIGHT: 1.7");
			data = data.replace(/LINE-HEIGHT:1.8/gi,"LINE-HEIGHT:2.3").replace(/LINE-HEIGHT:1.5/gi,"LINE-HEIGHT:2.0").replace(/LINE-HEIGHT:1.2/gi, "LINE-HEIGHT:1.7");
			data = data.replace(/LINE-HEIGHT: 14pt/gi,"LINE-HEIGHT:19pt");
		}
		data = data.replace(/<script/gi, '<div style="display:none;">&#60;script').replace(/<\/script>/gi, '&#60;&#47;script&#62;</div>');
		data = data.replace(/<object/gi, '<div style="display:none;">&#60;object').replace(/<\/object>/gi, '&#60;&#47;object&#62;</div>');
		data = data.replace(/<OBJECT/gi, '<div style="display:none;">&#60;object').replace(/<\/OBJECT>/gi, '&#60;&#47;OBJECT&#62;</div>');				
		data = data.replace(/<v:rect/gi, '<div style="border:1px solid #000000;" ').replace(/<\/v:rect>/gi, '</div>');
		data = data.replace(/role=/gi, 'roles=');
	}
	
	return data;
}
/* 본문html 화면에 출력 */
GF.setBodyHtml = function(opt,cid,data) {
	var tid = cid||GC.activeID();
	if (opt.isedit) {
		ceditor.bodydata = GF.bodyFilter(opt, cid, data);
	} else {
		var _$bodylayer = $("[role$='"+GC.bodyShowID+"']","#"+tid).html(GF.bodyFilter(opt, cid, data));
		$("[role$='"+GC.bodyShowID+"']","#"+tid).find("a[href^='http://']").each(function(){
			$(this).attr("target","_blank");
		});
		
		$("table[border='1'][cellspacing='2'][cellpadding='4']",_$bodylayer).remove();
	}
}
GF.setImageProxy = function(opt,cid,data){
	var tid = cid||GC.activeID();
	var images = $("[role$='"+GC.bodyShowID+"']","#"+tid).find("img[src~='"+opt.dbpath+"']");
	$.each(images,function(){
		$(this).attr("src",new GF.CURL($(this).attr("src")).url)
	})
}
GF.showBody = function(opt,cid) {
	if(opt.isnewnote) {ceditor.bodydata="";return;}
	//--메일은 자체에서 처리함
	if(opt.skipbody === true) {return;}  
	//if(opt.noproc !== true && opt.dbpath == GC.user.mailfile)return;
	/*var tid = cid||GC.activeID();*/
	var url = new GF.CURL("/"+opt.dbpath+"/0/"+opt.unid+"/"+opt.body+"?OpenField");
	return GF.ajax({
		url : url.url
		,type : "GET"
		,async : true
		,cache : false 
		,success : function(data,textStatus,xhr) {
			if(opt.noproc === true) {return;} /*noproc가 있으면 html을 쓰지 않는다.*/
			GF.setBodyHtml(opt,cid,data);
			GF.setImageProxy(opt,cid,data)
		}
		,error : function (xhr,textStatus){}
	});
}

GF.getApplProfile = function(applCode, callback) {
	/* application profile json 객체 리턴 */
	var url = {
		base: new GF.CURL( "/"+GC.site.librarypath+"/get_appl_info?readform").url
		,applcode: applCode
	}
	var jsonObj = null;
	var curl = new GF.CURL(url);
	GF.ajax({
		url : curl.url
		,dataType: "html"
		,type : "GET"
		,async : callback ? true : false
		,success : function(data,textStatus,xhr) {
			if ( $.trim(data) == "") {
				jsonObj = "";
				if(callback != null) callback(""); 
			} else {
				try {
					jsonObj = $.parseJSON(data);
				} catch(e) {
					jsonObj = "";
					if(callback != null) callback("");
				}
				GF.cacheData.applProfile[applCode] = jsonObj;
				if(callback != null) callback(jsonObj); 
			}
		}
		,error : function(xhr,textStatus) {
			jsonObj = "";
			GF.cacheData.applProfile[applCode] = "";
			if(callback != null) callback(""); 
		} 
	});
	try { 
		if(typeof(callback)=="undefined") {
			return jsonObj;			
		}
	}
	finally {
		jsonObj = null;
		curl = null;
		url = null;
		_rootproxy = null;
	}
}
GF.notesName = function(notesname, kind) {
	if (kind == "cn") {
		return ( notesname.toUpperCase().indexOf("CN=")>-1 ? notesname.right("CN=").left("/") : notesname );
	} else if (kind == "ou1") {
		return ( notesname.toUpperCase().indexOf("OU=")>-1 ? notesname.right("OU=").left("/") : notesname );
	} else if (kind == "ou2") {
		return ( notesname.toUpperCase().indexOf("OU=")>-1 ?notesname.split("OU=")[1].left("/") :notesname );
	} else {
		return notesname;
	}
}
GF.getUser = function(key, callback){
	if(key.indexOf("CN=")>-1) key = GF.notesName(key, "ou2")
	var _ret;
	var uri = new GF.CURL("/" + GC.site.librarypath + "/(get_usr)?openagent&userid=" + key);
	GF.ajax({
		url : uri.url, data : "", dataType: "json", type : "POST", async : false, cache : false
		,success : function(data,textStatus,xhr) {
			if(data.code==1){
				if(typeof(callback)=="function"){
					callback(data.value);
				}else{
					_ret =  data.value;
				}	
			}else{
				//alert(data.value==""?"사용자 정보를 찾을 수 없습니다.":data.value);
				data.value = key.indexOf("CN=")>-1 ? {"notesid":key} : {"empno":key} ; 
				if(typeof(callback)=="function"){
					callback(data.value);
				}else{
					_ret = data.value;
				}
			}
		}
		,error : function(xhr,textStatus) {
			alert("오류 :: "+textStatus);
			return;
		}
	});
	return _ret;
}
GF.getBasicUser = function(key, callback){
	if(key.indexOf("CN=")>-1) key = GF.notesName(key, "ou2")
	var _ret;
	var uri = new GF.CURL("/" + GC.site.librarypath + "/(get_basic_user)?openagent&userid=" + key);
	GF.ajax({
		url : uri.url, data : "", dataType: "json", type : "POST", async : false, cache : false
		,success : function(data,textStatus,xhr) {
			if(data.code==1){
				if(typeof(callback)=="function"){
					callback(data.value);
				}else{
					_ret =  data.value;
				}	
			}else{
				//alert(data.value==""?"사용자 정보를 찾을 수 없습니다.":data.value);
				data.value = key.indexOf("CN=")>-1 ? {"notesid":key} : {"empno":key} ; 
				if(typeof(callback)=="function"){
					callback(data.value);
				}else{
					_ret = data.value;
				}
			}
		}
		,error : function(xhr,textStatus) {
			alert("오류 :: "+textStatus);
			return;
		}
	});
	return _ret;
}
/* 게시알림/간단메모 발송 - notice , simplememo */
GF.docNoticeSend = function(callback , opts) {
	var __opt = {
			"title" : "게시내용알림"
		,	"type" : "notice"
		,	"body" : ""
		,	"applname" : ""
	}
	$.extend(true , __opt , opts);
	var _rootproxy = GF.getRootproxy(__opt.dbpath);
	_rootproxy = (_rootproxy == "" ? "" : "/" + _rootproxy);
	function __eugpSendInit( __active ) {
		$("#notice_list", __active).eugp({
			title: "수신처 선택"
			,	ismulti: true
			,	isedit: true
			, 	dlgTabs : {tab1 : {
							text : "수신처"
							, tree	: {
										type:{display:"all",select : "user"}
									}
							}
						}
		});
	}
	function __sendNotice( a , b , c , d) {
		var _b = [];
		for ( var i = 0 ; i < b.length ; i++ ) {
			_b[_b.length] = b[i].info.notesid;
		}
		if (__opt.type == "reqvalue") {
			if ( typeof(callback) == "function" ) {
				callback({
					"subject" : c
					,"members" : _b.join(";")
					,"body" : d
				});
			}
			a.dialog("close");
			return;
		}
		
		var inputdata = {
				"__Click" : "0"
				, "Writer" : GC.user.notesid, "EmpNo" : GC.user.empno, "DspDeptName" : GC.user.dspgroupname , "DspPost" : GC.user.dsppost
				, "OrgiDbPath" : __opt.dbpath
				, "OrgiUnid" : __opt.unid
				, "SystemCode" : __opt.applcode
				, "Action" : "sendnotice"
				, "func" : "sendnotice"
				, "NoticeType" : __opt.type
				, "NoticeTitle" : __opt.title
				, "NoticeSubject" : c
				, "NoticeRecipients" : _b.join(";")
				, "NoticeBody" : (typeof(d) != "undefined" ? d : "")
			};
		var posturl = new GF.CURL( _rootproxy + "/" + GC.site.librarypath + "/process_docs?openform" ).url;
		GF.ajax({
			type : "POST", cache : false, async : true, url : posturl, data : inputdata, dataType:"html",	
			success : function(data, status, xhr) {
				data = $.parseJSON(data);
				if(data.ret == "true") {
					if ( typeof(callback) == "function" ) {
						callback();
					} else {
						alert(__opt.title + " 메일을 발송 하였습니다.");
						a.dialog("close");
					}
					return;
				} else {
					alert(data.msg);
				}
			},
			error : function(xhr, status, thrown) {
				alert(__opt.title + "  처리중 오류가 발생 하였습니다.");
			}
		});
	}
	GF.dialog({
		content : {
			url : (new GF.CURL(_rootproxy + "/" + GC.site.librarypath + "/docnoticesend?openform&type=" + __opt.type)).url
		}
	,	onload : function (_dialog){
			__eugpSendInit($(_dialog));
			$("div.eugp_box_area" , $(_dialog)).height("65px").find("div").css("height" , "60px");
			if ( __opt.body != "" ) {
				$("textarea[name='Body']" , $(_dialog)).val(__opt.body);
			}
		}
	,	open: function() {
			$(this).css("overflow" , "hidden");
		}
	,	title : __opt.title
	,	isactive : true
	,	width : 720
	//,	height : (__opt.type == "simplememo" ? 320 : 220)
	,	resizable : false
	,	buttons : [
				{ 	text: "확인"
					,click : function () {  
						var __active = $(this);
						var __subj = $.trim($("input[name='Subject']" , __active).val());
						if ( __subj == "" ) {alert("제목을 입력하여 주세요.");return;}
						var __members = $("#notice_list", __active).eugp().members();
						if ( __members.length <= 0 ) {alert("수신자를 지정하여 주세요.");return;}
						var __body = $("textarea[name='Body']" , __active).val();
						if ( $.trim(__body) != "" ) {
							__body = __body.replace(/\n\r/gi , "<br/>");
							__body = __body.replace(/\r\n/gi , "<br/>");
							__body = __body.replace(/\n/gi , "<br/>");
							__body = __body.replace(/\r/gi , "<br/>");
						}
						
						GF.getApplProfile( __opt.applcode , function(appldata){
							if ( __opt.type == "notice" ) {
								if (__opt.applname == "" ){
									__subj = "[" + appldata.applname + "]" + __subj;
								} else {
									__subj = "[" + __opt.applname + "]" + __subj;
								}
							}
							__sendNotice(__active , __members , __subj , __body );
				 		});
					} 
				}
				,{ 	text: "취소"
					,click : function () { 
						$(this).dialog("close");
					} 
				}
		 ]
	});	
}
GF.runIM = function(kind,userid,object,opt,callback) {
	function _off(){
		object.addClass("egate_icon_messenger");
		if(object.find(".egate_usericon_status").size() == 0 ){
			$("<span class=\"egate_usericon_status\">"+GF.langPropEx("메신저가 활성화된 경우에만 상태확인이 가능합니다.", "comnmsg54")+"</span>").appendTo(object)
		}
		
	}
	switch(kind) {
		case "status": {
			object.empty();
			if (GC.site.onlineyn == "1") {
				var url = GC.site.localmsgstatushost;
				$.post(url, {"_dat01":userid},function(data){	
					if(data[0].statuspc != "0" ){
						object.addClass("egate_icon_messenger"+data[0].statuspc);
						object.off("click").on("click", function(e){
							e.stopPropagation(); 
							e.preventDefault();
							GF.runIM("chat",userid);							
						});
					}else {
						if(data[0].statusweb == "1")object.addClass("egate_icon_messenger7")
						else if(data[0].statusmobile == "1")object.addClass("egate_icon_messenger8")
						else {_off()};
						if(data[0].statusweb == "1" || data[0].statusmobile == "1"){
							object.off("click").on("click", function(e){
								e.stopPropagation(); 
								e.preventDefault();
								GF.runIM("chat",userid);							
							});
									
						}
									
					}
				},"json").error(function() { 
					_off();
				})
			} else {
				object.removeClass().addClass("egate_icon_messenger_none");
			}
			break;
		}
		case "chat": {
			var url = GC.site.localmsghost + "/&urltype=ucptime&command=ID_WEB_TALK&empno="+userid + "&callback=?"
			$.getJSON(url, function(){});
			break;
		}
		case "note": {	
			var url = GC.site.localmsghost + "/&urltype=ucptime&command=ID_WEB_MEMO&empno="+userid +"&callback=?"
			$.getJSON(url, function(){});
			break;
		}
		case "mail": {
			var mailopt= {};
			if (opt.applcode) mailopt.SystemCode= opt.applcode;
			if (opt.path) mailopt.OrgiDbPath= opt.path;
			if (opt.unid) mailopt.OrgiUnid= opt.unid;
			if (opt.attach) mailopt.isattach= opt.attach;
			if (opt.subject) mailopt.subject= opt.subject;
			if (opt.body) mailopt.bodymsg= opt.body;
			if (opt.sendto) mailopt.sendinfo= opt.sendto; else mailopt.sendinfo= GC.eugp.user+GC.site.colsep+userid;
			if (opt.doclink) mailopt.isdoclink= opt.doclink;
			
			GF.doMailWrt(object, mailopt);
			break;
		}		
		case "file": {
			var url = GC.site.localmsghost + "/&urltype=ucptime&command=ID_WEB_FILE&empno="+userid +"&callback=?"
			$.getJSON(url, function(){});
			break;
		}
		case "mynetwork": {
			if (!GF.confirm("업무관련자로 추가하시겠습니까?", "comnmsg19")) return;
			var uri = new GF.CURL("/"+GC.site.prefpath+"/cmdpost?openform");
			var datas = {
				__click : 0
				,	agent: "(mynet_prcss)"
				,	action: "add_mynetwork"
				,	data_1: userid
			}
			GF.ajax({url: uri.url,	type: "post",	data: datas,	async: true
				,	success: function(jsondata,textStatus,xhr) {
					var jobj = $.parseJSON(jsondata);
					if(jobj != null) {
						alert(jobj.value);
					} else {
						alert("JSON Parsing error !");
					}
				}
			});
			break;
		}
		case "profile": {
			var uri = new GF.CURL( "/"+GC.site.librarypath+"/userprofile?readform"
	 				,	{ userid: userid,	isundock: "1" });
			_url = uri.url;
	 		var opts = {width:850,height:800}
			GF.winContent(_url,opts);
							
	 		break;
		}
		case "video" : {
			var url = GC.site.localmsghost + "/command=ID_WEB_VIDEOEXE&empno="+userid +"&callback=?"
			$.getJSON(url, function(){});
			break;
		}
		case "audio" : {
			var url = GC.site.localmsghost + "/command=ID_WEB_VOICEEXE&empno="+userid +"&callback=?"
			$.getJSON(url, function(){});
			break;
		}
		case "remote" : {
			var url = GC.site.localmsghost + "/command=ID_WEB_REMOTE&empno="+userid +"&callback=?"
			$.getJSON(url, function(){});
			break;
		}
	}

}
GF.doButtonInit = function(selector , opt , _$me) {
	if(!opt.buttons) return;
	var _$btns = $("[actions]" , _$me);
	var _$form = $("form" , _$me);
	if(_$btns.length == 0) {
		_$btns = null;
		_$form = null;
		return;
	}
	function __drawButton(sel,buttons,ids) {
		var html = "";
		var _btns = buttons;
		if (ids.length == 0) return; 
		$.each(_btns,function(x,obj){
			html = "";
			if($.inArray(x,ids) > -1) {
				if(_btns[x].render) {
					if(_btns[x].render(selector,sel,x,obj,_btns,opt) === false) {return true;};
				}	
				if (_btns[x].css) {
					var _css = _btns[x].css;
				} else {
					var _css = _btns[x].highlight ? "btn_highlight" : "btn_gray";
				}
				var _click = _btns[x].click;
				if(!_btns[x].children) {
					html += "<span class=\"txt_btn\">";
					html += "<span class=\""+_css+"\" role=\"" + x + "\">" ;
					html += (obj.checkbox ? '<span class="ip_chk_img"><input type="checkbox"><span class="chk_img"></span></span>' : '');
					html += GF.langText(_btns[x]);
					html += "</span>";
					html += "</span>"
				}else{
						/* 서브 메뉴 첫번째 구함 */
						var _sbid = sel.attr("actions_" + x);(_sbid)
						var _sbids = [];
						if (typeof _sbid != 'undefined') {
							$(_sbid.split(",")).each(function(i,v){
								if(_btns[x].children[v])_sbids.push(v);
							})
						}					
						if(_sbids.length > 0 ){
							html += "<div class=\"sel_btn_area\" role=\"" + x + "\">";
							var _sflg = false;
							$(_sbids).each(function(i,v){
								if(i == 0){	
									if(_btns[x].text){
										html += "<span class=\"txt_btn\">";
										html += "<span class=\"btn_gray\" prole=\""+x+"\">" +GF.langText(_btns[x])  +"</span>"
										html += "<span class=\"btn_arr\" title=\"더보기\">상세보기</span>";
										html += "</span>";
									}else{
										html += "<span class=\"txt_btn\">";
										html += "<span class=\"btn_gray\" prole=\""+x+"\" role=\"" + v + "\">" + GF.langText(_btns[x].children[v]) +"</span>"
										html += "<span class=\"btn_arr\" title=\"더보기\">상세보기</span>";
										html += "</span>";
										_click = _btns[x].children[v].click;
									}			
									html += "<ul class=\"sel_list\" style=\"display:none\">";
								}
								if(_btns[x].text || (!_btns[x].text && i > 0 )){
									html += "<li>"
									html += "<span prole=\""+x+"\" role=\""+v+"\">"+GF.langText(_btns[x].children[v]) +"</span>";
									html += "</li>";
								}								
							
							})
							if(_sbids.length >= 1)html += "</ul>";
							html += "</div>";
						}
				}
				var o = $(html);
				if(_click) {
					var _e = o.find("[role]").eq(0);
					_e.click(_executeButton);
				};
				$(o).appendTo(sel);
				
			}
		});
		//--하위 선택 버튼이 존재할 경우 사용하는 이벤트 처리임..
		sel.find(".btn_arr").off().on("click", function(e) {
			e.stopPropagation(); 
			e.preventDefault();
			if(!$(this).hasClass('on')) {
				$(this).addClass('on').parents('.txt_btn').siblings('.sel_list').show();
			}else {
				$(this).removeClass('on').parents('.txt_btn').siblings('.sel_list').hide();
			}
		});
		sel.find("div.sel_btn_area").find("span[prole].not[role]").off().on("click",function(){
			$(this).find(".btn_arr").trigger("click");
		});
		sel.find("ul.sel_list").find("span[role]").off().on("click",function(){
			var id = $(this).attr("role");
			var CallEvent = opt.buttons[$(this).attr("prole")].children[id].click;
			if (CallEvent) {
				var act = $("INPUT[name='Action']" , _$form);
				if (act.length > 0) {	act.val(id.toLowerCase()); }  
				else { $("<INPUT type=hidden name='Action'>").appendTo(_$form).val(id.toLowerCase());}
				CallEvent(selector , $(this));
			}
			$(this).parents(".sel_btn_area").find(".btn_arr").trigger("click");
		})
	}
	function _executeButton(e){
		var id = $(this).attr("role");
		var _button = opt.buttons[id] || opt.buttons[$(this).attr("prole")].children[id];
		var _ischeckbox = $(this).find("input:checkbox").size() > 0;
		
		if(_ischeckbox) {
			var __chk = $(this).find("input:checkbox");
			if(!$(e.target).is("input:checkbox")) {					
				if(__chk.is(":checked")) {__chk.prop("checked",false);_button.checked = false;}
				else {__chk.prop("checked",true);_button.checked = true;}				
			} else {
				_button.checked = __chk.prop("checked");
			}
			
		}
		//if(opt.buttons[id]) {
			var CallEvent = _button.click;
		//} else{
			//--하위 값이 존재할 경우 하위값을 먼저 세팅
		//	var CallEvent = opt.buttons[$(this).attr("prole")].children[id].click;
		//}		
		if (CallEvent) {
			var act = $("INPUT[name='Action']" , _$form);
			if (act.length > 0) {	act.val(id.toLowerCase()); }  
			else { $("<INPUT type=hidden name='Action'>").appendTo(_$form).val(id.toLowerCase());}
			CallEvent(selector , $(this),_button);
		}
		return ;
	}
	var __btns = opt.buttons;			
	_$btns.empty();	
	_$btns.each(function() {
		var ids = $(this).attr("actions").split(",");
		__drawButton($(this) , __btns , ids);
	});
	
	return;
}

/* 읽은문서 marking:rhcode이용 */ 
GF.markRead = function(rhcode, dbpath, unid) {
	if(typeof(rhcode) == "undefined" || rhcode=="") return;
	
	GF.getApplProfile(rhcode, function(data) {
		if(data === "") return;

		var url = {
			base: "/"+data.appldir+"/"+data.applfilename+"/(update_read_history)?openagent"
			,dbpath: dbpath
			,unid:unid
		}
		var curl = new GF.CURL(url);
		GF.ajax({
			url : curl.url
			,dataType: "html"
			,type : "GET"
			,async : "true"
			,success : function(data,textStatus,xhr) {
				var jsonObj = $.parseJSON(data);
				if(jsonObj.code==="0") { 
					//alert("조회 처리 중 아래와 같은 오류 발생\n\n"+jsonObj.value); 
				}
			}
			,error : function(xhr,textStatus) {
				GF.log("load error",textStatus);
			} 
		});				
	});
}
/* 읽은문서 marking:rhpath - 조회여부관리db의 를 이용*/ 
GF.markReadWithPath = function(rhpath, dbpath, unid) {
	if(typeof(rhpath) == "undefined" || rhpath=="") return;

	var url = {
		base: "/"+rhpath+"/(update_read_history)?openagent"
		,dbpath: dbpath
		,unid:unid
	}
	var curl = new GF.CURL(url);
	GF.ajax({
		url : curl.url
		,dataType: "html"
		,type : "GET"
		,async : "true"
		,success : function(data,textStatus,xhr) {
			var jsonObj = $.parseJSON(data);
			if(jsonObj.code==="0") { 
				//alert("조회 처리 중 아래와 같은 오류 발생\n\n"+jsonObj.value); 
			}
		}
		,error : function(xhr,textStatus) {
			GF.log("load error",textStatus);
		} 
	});
}


/* 공휴일 여부 체크 holiday, */
GF.isHoliday = function(hday) {
	if (typeof hday === "undefined") { return ["0"]; }
	var inputdata = {
			"func" : "chkholiday"
		,	"day" : (typeof(hday) == "string" ? hday : hday.join(";"))
	}
	var _isholiday = ["0"];
	var posturl = new GF.CURL(  "/" + GC.site.librarypath + "/(process_action_svr)?openagent" ).url;
	GF.ajax({
		type : "POST", cache : false, async : false, url : posturl, data : inputdata, dataType:"html",	
		success : function(data, status, xhr) {
			data = $.parseJSON(data);
			if(data.ret == "true") {
				_isholiday = data.isholiday.split(";");
			} else {
				alert(data.msg);
			}
		},
		error : function(xhr, status, thrown) {
			GF.alert("휴일 체크중 오류가 발생 하였습니다.", "kmmsgno");
		}
	});
	return _isholiday;
}

/*목록에 첨부 아미콘 클릭 시 실행함수*/
GF.showAttachment = function(_adb,_akey,selector) {	
	var opt = {
		content : {
			url : new GF.CURL("/" + GC.site.librarypath + "/attachment?readform&orgdb="+_adb+"&unid="+_akey).url
		}
		,	open : function() {
			$(this).css({"overflow":'auto'});
			try {
				$(this).focus();
			}catch(e){}
		}
		,	position : {my:"left top", at:"left bottom", of:selector, offset:"0 0"}
		,	width : 500
		,	height : 150
		,	title : "첨부파일"
		,	resizable : false
	}
	
	$("div.fm_attachment_area").parents("div.ui-dialog-content").dialog("close");
	GF.dialog(opt,selector);	
}
GF.drawAttachment = function(_diaid,_adb,_key) {
	var _url = new GF.CURL("/"+_adb+"/view_by_attachment?readviewentries&RestrictToCategory="+_key+"&outputformat=json").url;
	
	GF.ajax({
		url : _url
		,dataType: "json"
		,type : "GET"
		,async : "true"
		,success : function(data,textStatus,xhr) {							
			if (data["@toplevelentries"]) {	GF.drawAttTable(data.viewentry,_adb,_diaid);} 
		}
		,error : function(xhr,textStatus) { GF.log("load error",textStatus); return; }
	});	
}
GF.drawAttTable = function(obj,_attdb,_sel) {
	var b = [];
	var objAct = GC.active(true);			
	var attid = obj[0]["@unid"];

	var _cn = obj[0].entrydata[0].number[0];	
	var _attlink = '/'+_attdb+"/0/"+attid+"/$FILE/";
	var h = "";		
	h += '	<table width="100%" cellspacing=0 cellpadding=0 border=1 bordercolor="#f3f3f3">';
	h += '	<col width="20px"><col width="*">';
	if (_cn == "1") {
		h += '<tr height=20>';
		h += '<td></td><td>&nbsp;<font style="font-size:12px"><a target=\"_blank\" href="'+_attlink+obj[0].entrydata[1].text[0]+'">'+obj[0].entrydata[1].text[0]+'</a></font></td>';
		h += '</tr>';
	} else {
		var _tt = obj[0].entrydata[1].textlist["text"].length;
		var _tn = obj[0].entrydata[1]["textlist"]["text"];
		for ( var ss= 0 ; ss < _tt ; ss++) {
			h += '<tr height=20>';
			h += '<td></td><td>&nbsp;<font style="font-size:12px"><a href="'+_attlink+_tn[ss][0]+'">'+_tn[ss][0]+'</a></font></td>';
			h += '</tr>';
		}
	}	
	h += '</tagle>';	
	$("#attList",_sel).html(h)	
}
GF.getDeptProfile = function(deptCode, callback) {
	/* dept profile json 객체 리턴 */
	var _url = new GF.CURL( "/"+GC.site.librarypath+"/get_dept_profile?openagent&deptcode="+deptCode).url;
	GF.ajax({
		url : _url
		,dataType: "html"
		,type : "GET"
		,async : "true"
		,success : function(data,textStatus,xhr) {
			var jsonObj = $.parseJSON(data);
			if(callback != null) callback(jsonObj); else return jsonObj;
		}
		,error : function(xhr,textStatus) {
			GF.log("load error",textStatus);
			if(callback != null) callback(""); else return "";
		} 
	});
}
//-- 의견입력 창
GF.inputOpinion = function(callback) {
	GF.dialog({
		content:{
			url : new GF.CURL("/" + GC.site.librarypath + "/opinion?openform").url
		}
	,	onload : function (){
			$("textarea[name='reqopinion']" , $(this)).focus();
		}
	,	title : GF.langPropEx("의견 입력", "opinion_input")
	,	isactive : true
	,	width : 420
	,	height : 230
	,	resizable : false
	,	buttons : [
			{ text: GF.langProp({"msg":"확인", "langcode":"confirm"}), click : function (){
					var comments = $("textarea[name='reqopinion']" , $(this)).val();
					if (comments.trim() == ""){
						GF.alert("의견을 입력하여 주십시오.", "comnmsg21");
						return;
					}
					//comments = comments.replace(/\</g,"&lt").replace(/\>/g,"&gt").replace(/\(/g,"&#40").replace(/\)/g,"&#41");
					$(this).dialog("close");
					callback(comments);
				}
			}
		,	{ text: GF.langProp({"msg":"취소", "langcode":"cancel"}), click : function (){
					$(this).dialog("close");					
				} 
			}
		]
	});	
}

//-- 결재암호 검사
GF.CHKPW = {
	doChk:  function(callback) {
		var wrongMsg = GF.langPropEx("비밀번호가 틀립니다. 다시 입력 하여 주십시오.", "comnmsg22");
		var __dlg = null;
		GF.dialog({
			content : {
				url : new GF.CURL("/" + GC.site.librarypath + "/enterpwd?openform").url
			}
		,	onload : function (a,b,c,d){
				var __active = GC.active(true);
				$("input[name='pw']", __active).keypress( function (e){
					if (e.which == 13){
						if(!GF.lockDblClick($(__active),3000)) {return;}
						var pwd = $("input[name='pw']", __active).val();
						GF.CHKPW.validatePwd(pwd, function(ret) {
							if(ret=="0") {
								GF.unlockDblClick($(__active));
								alert(wrongMsg);
								$("input[name='pw']", GC.active(true)).focus();
							} else if (ret == "1") {
								__dlg.dialog("close");
								callback(true);
							} else {
								GF.alert("결재암호 검사 중 오류가 발생하였습니다. 잠시 후 다시 수행하여 주십시오.", "kmmsgno");
								__dlg.dialog("close");
								GF.unlockDblClick($(__active)); 
								callback(false);
							}
						})
						return false;
					}
				});
			}
		,	open: function() {
				__dlg = $(this);
				__dlg.css({"overflow":"hidden"});
			}
		,	title : GF.langPropEx("비밀번호 입력", "input_password")
		,	isactive : true 
		,	width : 270
		,	height : 150
		,	resizable : false
		,	buttons : [
					{ 	text: GF.langProp({"msg":"확인", "langcode":"confirm"})
						, text_lang : "confirm"
						,click : function () {  
							if(!GF.lockDblClick($(this),3000)) {return;}
							var __active = $(this);
							var pwd = $("input[name='pw']", __active).val();	
							GF.CHKPW.validatePwd(pwd, function(ret) {
								if(ret=="0") {
									GF.unlockDblClick($(__active));
									alert(wrongMsg); 
									$("input[name='pw']", __active).focus();
								} else if (ret == "1") {
									__dlg.dialog("close");
									callback(true);
								} else {
									GF.unlockDblClick($(__active));
									GF.alert("결재암호 검사 중 오류가 발생하였습니다. 잠시 후 다시 수행하여 주십시오.", "kmmsgno");
									__dlg.dialog("close");
									callback(false);
								}
							});	
						} 
					}
					,{ 	text: GF.langProp({"msg":"취소", "langcode":"cancel"})
						, text_lang : "cancel"
						,click : function () { 
							$(this).dialog("close");
						} 
					}
			 ]
		});	

	}
	
	, validatePwd : function(data, callback) {	
			var __active = GC.active(true);
			var _ifr = $("#CHKPWD", __active).contents();
			var _ifrm = $($("form", _ifr).get(0));
			$("input[name='id']", _ifr).val(GC.user.notesid);
			$("input[name='aprv']",_ifr).val(typeof data == "object"?data.aprv:"");
			$("input[name='pw']", _ifr).val(typeof data == "object"?data.pwd:data);
			$("input[name='callhost']", _ifr).val( location.hostname+(location.port != "" ? ":"+location.port : "") );
			_ifrm.attr("action", "http://" + location.hostname + "/"+GC.site.librarypath+"/(verifyPwWithPost)?openagent");
			_ifrm.submit();			
			GF.CHKPW.waitResponse(callback);
	}

	,waitResponse : function(callback) {
		setTimeout( function(dlg) {
			try {
				var _ifr = $("#CHKPWD",GC.active(true)).contents();
				var _ret = $("#CHKRET", _ifr).html();
				if(_ret == "1" || _ret == "0" || _ret == "2" ) {
					callback( _ret);
				} else {
					GF.CHKPW.waitResponse(callback);
				}
			} catch(e) {
				callback("0");
				//GF.CHKPW.waitResponse(callback);
			}
				
		}, 500);
	}
}

GF.strConvert = {
	/* 문자열 16진수 encode, decode */
	convert :	function(strbuf, flag) {
		source = new String();
		buf1 =  new String();
		buf = new String();
		source = strbuf;
	
		if ( flag == 1 ) {
			slen = source.length;
			for ( var ss= 0 ; ss < slen ; ss++) {
				buf1 = source.substring(ss, ss+1);
				if (buf1 == null ) return false;
				k= GF.strConvert.decTohex( buf1.charCodeAt(0)) ;
				t = "0000" + k;
				o = t.substring(t.length - 4 , t.length);
				buf  = buf + o;		
			}
		}
		else { 
			/* //----Decoding ----------------------------------- */
			buf1 = "";
			var k = new String();
			for ( i=0 ; i < strbuf.length; ) {
				buf1 =strbuf.substring(i, i+4);
				k = "";
				Test = String.fromCharCode(parseInt(buf1, '16'));
				buf = buf + Test;
				i = i +4;
			}
		}
		return buf;
	}
	
	, decTohex : function (x) {
		var chex = "0123456789ABCDEF";
		var hexval = new Array();
		var i=0;
		tmpval = x;
		for ( i=0 ; i  < hexval.length ; i++ ) hexval[i] = "";
		if ( tmpval >= 16 ) {
			while ( tmpval >= 16 ) {
				tmpRem = tmpval%16;
				tmpmok = (tmpval-tmpRem)/16;
				hexval[i] = chex.charAt(tmpRem);
				if (tmpmok < 16) {
					hexval[i+1] = chex.charAt(tmpmok );
					tmpval = tmpmok;
				}
				else {
					tmpval = tmpmok;
				}
				i = i +1;
		}
		} else {
	    		hexval = chex.charAt(tmpval);
		}
		converthex = "";
		hexval.reverse();
		for ( k = 0 ; k < hexval.length ; k++)
			converthex = converthex + hexval[k];
		return converthex ;
	}
}
/*
 * 메일 연계
 */
GF.doMailWrt = function(obj , options , callback, pluginobject) {
	function _doMailWrt() {
		var _posturl = new GF.CURL( "/" + GC.site.librarypath + "/process_docs?openform" ).url;
		GF.ajax({
			type : "POST", cache : false, async : true,
			url : _posturl, data : _indata, dataType:"html",	
			success : function(data, status, xhr) {
				data = $.parseJSON(data);
				if(data.ret != "true") {
					alert(data.msg);
				} else {
					var _url = "/" + data.mail.dbpath + "/0/" + data.mail.unid + "?editdocument&isundock=1";
					GF.winContent(_url,"width=860,height=700");
					if(callback) {callback(data,status,xhr);return;}
				}
			},
			error : function(xhr, status, thrown) {
				GF.log("GF.doMailWrt",data,ourl);
			}
		});
	}
	
	if (obj==null) {
		var _opt={};
	} else {
		var _opt = obj.options();
	}
	
	var _indata = {
			"__Click" : "0"
		,	"Writer" : GC.user.notesid, "EmpNo" : GC.user.empno, "DspDeptName" : GC.user.dspgroupname , "DspPost" : GC.user.dsppost
		,	"OrgiDbPath" : _opt.dbpath ||""
		,	"SystemCode" : _opt.applcode ||""
		,	"ReqServerName" : GC.dbinfo.server
		,	"DocStatus" : "WIPEOUT"
		, 	"Action" : "mail_send"
		, 	"func" : "mail_send"
		,	"OrgiUnid" : ""
		,	"isattach":""
		,	"bodymsg":""
		,	"subject" : ""
		,	"sendinfo" :""
		,	"sendto":""
		,	"sendtolist":""
		,	"isdoclink":""
		,	"doclink":""
		,	"exsendto":""
		,	"exunid":""
	};
	if ( typeof(options) == "object" ) { $.extend(true , _indata , options); }
	if (_indata.sendinfo != "") {
		var _eugplist = GF.getEUGPInfo(_opt.dbpath , _indata.sendinfo);
		if ( _eugplist != null ) {
			$.extend(true , _indata , _eugplist);
		}
	}
	if ( _indata.isdoclink == "1" ) {
		var _linkhost = location.protocol + "//" + location.hostname + (location.port == "" || location.port == "80" ? "" : ":" + location.port);
		if (obj==null) {
			var _url = _linkhost + GC.undockURI + "&url=/" + _indata.OrgiDbPath + "/0/" + _indata.OrgiUnid + "?opendocument" + GF.encodeURI("&isundock=1");
			_url = new GF.CURL( _url ).url;
			var _img = new GF.CURL("/"+GC.site.resourcepath+"/core/resources/images/img/img_goto_doc.gif" ).url;
			_indata.doclink = '<br/><br/><a class="link" href="'+_url+'" target="_blank"><img src="'+_img+'" border=0></a>';
			_linkhost = null;
			_url = null;
			_img = null;
			_doMailWrt();
		} else {
			GF.undock( obj.Element() , function(url) {
				var _url = new GF.CURL(_linkhost + url.replace(/&is_preview=1/gi , "") ).url;
				var _img = new GF.CURL("/"+GC.site.resourcepath+"/core/resources/images/img/img_goto_doc.gif" ).url;
				_indata.doclink = '<br/><br/><a class="link" href="'+_url+'" target="_blank"><img src="'+_img+'" border=0></a>';
				_linkhost = null;
				_url = null;
				_img = null;
				_doMailWrt();
			});
		}

	} else {
		_doMailWrt();
	}
	
}
/*
 * eugp 구하기
 */
GF.getEUGPInfo = function(dbpath , list) {
	var _indata = {
			"__Click" : "0"
		,	"Writer" : GC.user.notesid, "EmpNo" : GC.user.empno, "DspDeptName" : GC.user.dspgroupname , "DspPost" : GC.user.dsppost
		,	"DocStatus" : "WIPEOUT"
		, 	"Action" : "geteugp"
		, 	"func" : "geteugp"
		,	"OrgiUnid" : ""
		,	"sendto":list
	};
	var _ret = null;
	var _posturl = new GF.CURL(  "/" + GC.site.librarypath + "/process_docs?openform" ).url;
	GF.ajax({
		type : "POST", cache : false, async : false,
		url : _posturl, data : _indata, dataType:"html",	
		success : function(data, status, xhr) {
			data = $.parseJSON(data);
			if(data.ret != "true") {
				alert(data.msg);
			} else {
				if ( data.info.length > 0) {
					_ret = {"sendto":"" , "sendtolist":""};
					for (var i = 0 ; i < data.info.length ; i++) {
						var entry = null;
						switch (data.info[i].kind) {
							case GC.eugp.user:
								entry = new eu(); break;
							case GC.eugp.group:
								entry = new eg(); break;
							case GC.eugp.publicgroup:
								 entry = new ep(); break;
							case GC.eugp.globalgroup:
								 entry = new egg(); break;
							case GC.eugp.person:
								entry = new eau(); break;
							case GC.eugp.persongroup:
								entry = new eag(); break;
						}
						if ( entry != null ) {
							entry.setInfo(data.info[i]);
							switch (entry.info.kind) {
								case GC.eugp.user:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.notesid;
									break;
								case GC.eugp.group:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.groupcode;
									break;
								case GC.eugp.publicgroup:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.listname;
									break;
								case GC.eugp.globalgroup:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.listname;
									break;
								case GC.eugp.person:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.korname;
									break;				
								case GC.eugp.persongroup:
									_ret.sendto += (_ret.sendto == "" ? "" :";") + entry.info.listname;
									break;
							}
							_ret.sendtolist += (_ret.sendtolist == "" ? "" :";") + entry.makeString(GC.site.fieldsep) + GC.site.fieldsep + "send_to";
						}
					}
				}
			}
		},
		error : function(xhr, status, thrown) {
			GF.log("GF.doMailWrt",data,ourl);
		}
	});
	return _ret;
}
/* 삭제 */
GF.deleteDocument = function(obj, delopt , callBack , argv) {
	var _opt = obj.options();
	var _cmtcode = "";	/* 댓글 */
	var _rhiscode = "";		/* 조회여부기록 */
	var _rhisdbpath = "";	/* 조회여부기록 Dbpath */
	if(typeof(_opt.rhpath) != "undefined" && _opt.rhpath != "") {
		_rhisdbpath = _opt.rhpath;
	} else {
		if(typeof(_opt.rhcode) != "undefined" && _opt.rhcode != "") {
			_rhiscode = _opt.rhcode;
		}
	}
	_cmtcode = _rhiscode;
	if (_opt.rcmtopt) {
		if (typeof _opt.rcmtopt.rcmtcode === "string") {
			_cmtcode = _opt.rcmtopt.rcmtcode;
		}
	}
	
	var inputdata = {
			"__Click" : "0"
			, "Writer" : GC.user.notesid, "EmpNo" : GC.user.empno, "DspDeptName" : GC.user.dspgroupname , "DspPost" : GC.user.dsppost
			, "OrgiDbPath" : _opt.dbpath
			, "SystemCode" : _opt.applcode
			, "ReqServerName" : GC.dbinfo.server
			, "DeleteUnids" : ""
			, "Action" : "delete"
			, "func" : "delete"
			, "wipeout" : "0"
			, "ForceDelete" : "0"
			, "cmtcode" : _cmtcode
			, "rhiscode" : _rhiscode
			, "rhisdbpath" : _rhisdbpath
			, "andbpath" : ""
			, "anunid" : ""
			, "is_preview" : false
		};
	if ( typeof delopt === "object" ) { $.extend(true , inputdata , delopt); }
	var posturl = new GF.CURL( "/" + GC.site.librarypath + "/process_docs?openform" ).url;
	obj.block();
	GF.ajax({
		type : "POST", cache : false, async : true,
		url : posturl, data : inputdata, dataType:"html",	
		success : function(data, status, xhr) {
			obj.unblock();
			if(callBack) {callBack(data,status,xhr);return;}
			data = $.parseJSON(data);
			if(data.status != "true") {
				alert(data.msg);
				switch ( _opt.opttype ) {
				case "view" :
					$("input:checkbox[name='checkall']",obj.getElement()).removeAttr("checked");
					obj.getView().refresh();
					break;
				}
				return;
			} else {
				alert(data.msg);
			}
			switch ( _opt.opttype ) {
			case "form" :
				obj.close( inputdata );
				break;
			case "view" :
				$("input:checkbox[name='checkall']",obj.getElement()).removeAttr("checked");
				obj.getView().refresh();
				break;
			}

		},
		error : function(xhr, status, thrown) {
			GF.log("delete document");
			obj.unblock();
		}
	});
}
/*
*  GF.CCalendar
*/
GF.CCalendar = function(opt,selector) {
	var _this = this, $me = $(selector),_opt = opt
	,_monthNames = ['01'+GF.langPropEx('월', 'month'),'02'+GF.langPropEx('월', 'month'),'03'+GF.langPropEx('월', 'month'),'04'+GF.langPropEx('월', 'month'),'05'+GF.langPropEx('월', 'month'),'06'+GF.langPropEx('월', 'month'),'07'+GF.langPropEx('월', 'month'),'08'+GF.langPropEx('월', 'month'),'09'+GF.langPropEx('월', 'month'),'10'+GF.langPropEx('월', 'month'),'11'+GF.langPropEx('월', 'month'),'12'+GF.langPropEx('월', 'month')]
	,_monthNamesShort = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	,_dayNames = [GF.langPropEx('일요일', 'sunday'),GF.langPropEx('월요일', 'monday'),GF.langPropEx('화요일', 'tuesday'),GF.langPropEx('수요일', 'wednesday'),GF.langPropEx('목요일', 'thursday'),GF.langPropEx('금요일', 'friday'),GF.langPropEx('토요일', 'saturday')]
	,_dayNamesShort =  [GF.langPropEx('일', 'sun'),GF.langPropEx('월', 'mon'),GF.langPropEx('화', 'tue'),GF.langPropEx('수', 'wed'),GF.langPropEx('목', 'thurs'),GF.langPropEx('금', 'fri'),GF.langPropEx('토', 'sat')]
	,_titleFormat = {	month: 'yyyy.MM', week: "yyyy.MM.dd{ '&#8212;'[ yyyy] MM.dd }",day: 'yyyy.MM.dd dddd'}
	,_columnFormat = { month: 'ddd', week: "d '('ddd')'",day : "M/d '('dddd')'"}
	,_buttonText = {	
		prev: 		'&nbsp;&#9668;&nbsp;', next: '&nbsp;&#9658;&nbsp;', prevYear: '&nbsp;&lt;&lt;&nbsp;', 
		nextYear: '&nbsp;&gt;&gt;&nbsp;', today: '오늘',	
		month: 	'월간', week: '주간', day: '일간' }
	,__opt = {		theme: true ,timeFormat: { agenda: 'HH:mm{-HH:mm}', '': 'HH:mm'}
		,axisFormat : 'h:mm TT'	,allDayText : GF.langPropEx('종일', 'allday')		,monthNames : _monthNames ,monthNamesShort : _monthNamesShort
		,dayNames :_dayNames ,dayNamesShort : _dayNamesShort	,titleFormat : _titleFormat ,buttonText : _buttonText
		,columnFormat : _columnFormat
		,header: {	left: 'prevYear',	center: 'prev title next today', right: 'nextYear'}
		,aspectRatio: 2	,selectable: true		,allDayDefault:true		,firstDay: 0		,firstHour : 9		,slotMinutes : 15
		,disableHoliday : false,	editable : (typeof opt.editable === "undefined" ? true : opt.editable ) 
		,displayTrigger : false
		,_events : opt.events	,_viewDisplay : opt.viewDisplay		,_windowResize : opt.windowResize
		,_select : opt.select	,_dayClick : opt.dayClick, _loading : opt.loading, _complete : opt.complete	
		,_eventResize : opt.eventResize, _eventDrop : opt.eventDrop, _eventRender : opt.eventRender
		,_eventClick : opt.eventClick		
		,picker : opt.picker
	},_dumyEvents = [],_picker = null,_isReady = false,_log = GF.log;
	$.extend(true,__opt,_opt);$.extend(true,_opt,__opt);
	
	function _Calendar() { return $me.fullCalendar.apply($me,arguments);	}
	function _holidayHandle(event,element,view) {
		var _s = view.visStart.diffday(event.start)
			,_e = view.visStart.diffday(event.end ? event.end : event.start);
		switch(view.name) {
		case "month":
			for (var _x=_s; _x <= _e; _x++) {
				var __day = $("div.fc-view-month td.fc-day"+_x,$me);
				if($(".fc-day-title",__day).size() > 0) {continue;}
				if (event.isholiday) {	__day.addClass("fc-holiday");}
				$(".fc-day-number",__day).after($("<div class=\"fc-day-title"+(event.isholiday ? " fc-holiday" : "") + "\">"+event.title+"</div>"));
			}
			break;		
		case "agendaWeek":
			for (var _x=_s; _x <= _e; _x++) {
				var __day = $("div.fc-view-agendaWeek th.fc-col"+_x,$me);
				if($(".fc-day-title",__day).size() > 0) {continue;}
				if(event.isholiday) {__day.addClass("fc-holiday");}
				__day.append($("<span class=\"fc-day-title"+(event.isholiday ? " fc-holiday" : "") + "\">"+event.title+"</span>"));
			}
			break;
		case "agendaDay":
			var __day = $("div.fc-view-agendaDay th.fc-col0",$me);
			if($(".fc-day-title",__day).size() > 0) {return false;}
			if(event.isholiday) {__day.addClass("fc-holiday");}
			__day.append($("<span class=\"fc-day-title"+(event.isholiday ? " fc-holiday" : "") + "\">"+event.title+"</span>"));
			break; 
		}
		return false;
	}
	function _externalEvents() {
		var __evt = _opt._events;
		if (!__evt) return;
		if (!$.isArray(__evt)) {_this.addEventSource(__evt);return;}
		for (var x = 0; x < __evt.length; x++) {_this.addEventSource(__evt[x]);}		
	}

	function _eventRender(event,element,view) {
		var result = true;
		if(event.ismemorialday ) { return _holidayHandle(event,element,view);}
		if(_opt._eventRender) {result = _opt._eventRender(_this,event,element,view);}
		if(event.eventclick != false && event.editable == false) {$(element).css("cursor", "pointer");}
		if(event.resizable == false) {	$(".ui-resizable-handle.ui-resizable-e, .ui-resizable-handle.ui-resizable-s",element).remove();}
		if(event.monthlyresizable == false) {	$(".ui-resizable-handle.ui-resizable-e",element).remove();}
		return result;
	}
	function _holidayEvent(start,end,Callfnc) {
		var __sd = new Date(start);__sd.adjust(0,0,7,0,0,0);
		var __view = _this.getView()
		,__hview = { 
			month : {name : "monthly", q :  $.fullCalendar.formatDate(__sd,"yyyyMM")}
			,agendaWeek : {name : "weekofyear" , q : $.fullCalendar.formatDate(start,"yyyy")+("0"+start.getWeek()).right(2)}
			,agendaDay : { name : "daily" , q : $.fullCalendar.formatDate(start,"yyyyMMdd")} 
		}
		,__holi = new GF.CURL({_$path : "/"+GC.site.codepath+"/"+__hview[__view.name].name,_$cmd : "readviewentries"
			, restricttocategory : __hview[__view.name].q ,outputformat : "json" ,count : "9999"});		
		function __rendHoli(data,textStatus,xhr) {
			var __event = [];
			function __parse(_e) {
				function __p(_x) {
					var _c = _e.entrydata[_x],_data = (_c["text"] ||_c["datetime"]||  _c["datetimelist"]["datetime"]["0"] || _c["number"]);
					return (_data.length > 1 ? _data : _data[0]); 
				}
				return { start : $.fullCalendar.formatDate(__p(0).toDate("yyyyMMdd"),"yyyy-MM-dd")
					,allDay : true	,isholiday : __p(4) == "1" ? true : false
					,ismemorialday : true,end : $.fullCalendar.formatDate(__p(1).toDate("yyyyMMdd"),"yyyy-MM-dd")
					,id : "holiday"
					,title : __p(5)
				}
			}
			if(!data.viewentry) {Callfnc(null);return;}
			$.each(data.viewentry,function(_o) {	__event.push(__parse(this));});
			Callfnc(__event);
			return;
		}
		GF.ajax({ url : __holi.url, 	dataType : "json", async : true, cache : false, success: __rendHoli,
			error : function(jqXHR, txtStatus, errorThrown) {Callfnc(null);return;}});
		__holi = null;
	}
	function _loading(isloading,view) {
		if(isloading) { _isReady = false;} else {_isReady = true;}
		if(_opt._loading) {setTimeout(function() {_opt._loading(_this,isloading,view);return;},50)}
	}
	var __endless = 0;  
	function _fireComplete() {
		if (!_isReady) {__endless++;if(__endless > 500) {__endless=0;_isReady = true;} else {setTimeout(_fireComplete, 50);};return;}
		__endless=0;
		setTimeout(function() {_opt._complete(_this);return;},50);	
		return;
	}
	var __pkrless = 0;
	function _createPicker() {
		   if(typeof _opt.picker === "undefined") return;
		   if(_picker) {_picker = null };
		   var $pkr = $(_opt.picker);
		   if($pkr.size() == 0) {__pkrless++;if(__pkrless > 30) {__pkrless = 0; } else {setTimeout(_createPicker,100)};return;};
		   $pkr.datepicker("destroy");
		   $pkr.empty();
		   _picker = new GF.CalendarPicker($pkr,_this);
	}
	function _triggerPicker(calView) {
		if (typeof _opt.picker === "undefined") return;
		$(_opt.picker).trigger("calendarChange",[_this,calView]); 
	} 
	function _triggerDisplay() {
		if(!_opt.displayTrigger) {return;}	
		$(window).trigger("calendar.display",[_this,_this.getView()]);
	}
	function _viewDisplay(calView) {
		if(_opt._viewDisplay) { _opt._viewDisplay(_this,calView);}
		if(_opt._complete) { _fireComplete();}
		if(_opt.picker) { _triggerPicker(calView);}
		_triggerDisplay();	
		return; 
	}	
	function _resize(view) {
		if(_opt._windowResize) {_opt._windowResize(_this,view);return;}
	}
	function _select(start,end,allDay,evt,view) { 
		if(!start) return;
		if(!_opt._select) {return;};_opt._select(_this,start,end,allDay,evt,view);return;	
	}
	function _dayClick(date,allday,evt,view) {
		if(!_opt._dayClick) {return};_opt._dayClick(_this,date,allday,evt,view);return; 
	}
	function _eventResize(evt,dayDelta,minDelta,revFunc,jsEvt,ui,view) {
		if(!_opt._eventResize) {return};_opt._eventResize(_this,evt,dayDelta,minDelta,revFunc,jsEvt,ui,view);	return; 
	}
	function _eventDrop(evt,dayDelta,minDelta,allDay,revFunc,jsEvt,ui,view) {
		if(!_opt._eventDrop) {return;}_opt._eventDrop(_this,evt,dayDelta,minDelta,allDay,revFunc,jsEvt,ui,view);	return;
	}
	function _eventClick(evt,jsevt,view) {
		if(jsevt.isDefaultPrevented()) { return false;} else {	jsevt.preventDefault();}		
		if(typeof(evt.eventclick) != "undefined" && evt.eventclick == false) {return ;}
		if(!_opt._eventClick) {return;}_opt._eventClick(_this,evt,jsevt,view);	return;
	}
	function _renderView(view) {$(".fc-holiday",view.element).removeClass("fc-holiday");$(".fc-day-title",view.element).remove();}
	function _eventOverride(start,end,fncCall,eventHandler) { eventHandler(_this,start,end,fncCall);}
	
	this.getView = function() {return _Calendar("getView");}
	this.getOptions = function() {return _opt;}
	this.getOption = function(o) {return _opt[o];}
	this.setOption = function(o,ov) {_opt[o] = ov}
	this.getEvents = function(idOrFilter) {
		var __v = _this.getView();
		function __compArea(__e) {
			return (__e.start >= __v.visStart || (__e.end ? __e.end : __e.start) >= __v.visStart  ) 
						&& (__e.start <= __v.visEnd || (__e.end ? __e.end : __e.start) <= __v.visEnd  );	
		}
		return _this.clientEvents(function(_e,_idx) {
			return (typeof idOrFilter === "function" ? idOrFilter(_e,_idx) : 
				typeof idOrFilter === "string" ? _e.id == idOrFilter : true) && _e.id != "holiday" && __compArea(_e);
		});
	}
	this.hide = function() { $me.hide(); return;	}
	this.show = function() { $me.show(); return;}
	this.hideBody = function() {$(".fc-view.fc-view-month.fc-grid",$me).hide();}
	this.showBody = function() {$(".fc-view.fc-view-month.fc-grid",$me).show();}
	this.Calendar = function() {return $me;}
	this.isready = function() { return _isReady;}
	this.clientEvents = function(idOrFilter) {	return _Calendar("clientEvents",idOrFilter);} 
	this.changeView = function(viewName) {_Calendar("changeView",viewName);return;}
	this.contentHeight = function(height) { _Calendar("option","contentHeight",height);return;	}
	this.refetchEvents = function() {_Calendar("refetchEvents");if(_opt._complete) { _fireComplete();};_triggerDisplay();}
	this.render = function() {_Calendar("render");}
	this.resizeAll = function() {var viw = _this.getView();_resize(viw);return;}; 
	this.gotoDate = function(y,m,d) {return _Calendar.apply(_this, ['gotoDate'].concat(Array.prototype.slice.call(arguments)));	}
	this.goToday = function() {_Calendar("today");return;}
	this.addEventSource = function(handler) {
		if($.isFunction(handler)) {
			var tmpF = {
				handle : handler
				,dumy : function(start,end,callback) {
					_eventOverride(start,end,callback,handler);
					return;
				}
			};
			_dumyEvents.push(tmpF);
			_Calendar("addEventSource",tmpF.dumy);
			_fireComplete();
			return;
		}  
		_Calendar("addEventSource",handler);
		_fireComplete();
		return;
	}
	this.removeEventSource = function(handler) {
		if(typeof handler === "undefined") {
			_dumyEvents = $.grep(_dumyEvents, function(e,i) {
				_Calendar("removeEventSource",e.dumy);
				return false;
			});
			_this.refetchEvents()
			_fireComplete();
			return;
		}
		if($.isFunction(handler)) {
			_dumyEvents = $.grep(_dumyEvents,function(e,i) {
				if(e.handle === handler) {
					_Calendar("removeEventSource",e.dumy);
					return false;
				}
				return true;
			});
			_this.refetchEvents();
			_fireComplete();
			return;
		}
		_Calendar("removeEventSource",handler);
		_fireComplete();
	}
	this.destroy = function() {	_this = null;_picker = null;_dumyEvents.length = 0;_Calendar("destroy");}
	_opt.viewDisplay =  _opt._viewDisplay ? _viewDisplay : null;
	_opt.windowResize = _resize; 
	_opt.events = _opt.disableHoliday ? null : _holidayEvent;
	_opt.eventRender = _eventRender;
	_opt.select = _opt._select ? _select : null;
	_opt.dayClick = _opt._dayClick ? _dayClick : null;
	_opt.eventClick = _opt._eventClick ? _eventClick : null; 
	_opt.eventResize = _opt._eventResize ? _eventResize : null;
	_opt.eventDrop = _opt._eventDrop ? _eventDrop : null;
	_opt.renderView = _renderView;
	_opt.loading = _loading;
	_opt.complete = null; /* not event */
	if(_opt.displayTrigger) {$(window).unbind("calendar.display");}		
	_createPicker();
	$me.fullCalendar(_opt);	
	_externalEvents();
};
/* 
 * CCalendar Picker
 */
GF.CalendarPicker = function(selector,calendar,dopts) {
	var _this = this,$me = $(selector),_cal = calendar
	,_view = (_cal ? _cal.getView() : null),
	_start = (_view ? _view.start : null), _end = (_view ?  _view.end : null);
	
	function _onSelect (_date, inst) {
			var oDate = _date.toDate("yyyy-MM-dd");
			if(_cal) {_cal.gotoDate(oDate);}
			return;
	}
	function _disableDay(_odate,inst) {
		if(_start == null || _end==null) return [true,''];
		return [_start.getTime() > _odate.getTime() || _end.getTime() <= _odate.getTime(), ''];
	}
	var _dateOpt = { 
			autoSize: true
			,dateFormat : 'yy-mm-dd'
			,onSelect : _onSelect
			,beforeShowDay : _disableDay
		};
	if(dopts) {$.extend(true, _dateOpt,dopts);}
	$me.datepicker(_dateOpt);
	function _Picker() { return $me.datepicker.apply($me,arguments);} 
	this.picker = function() {return _Picker.apply(_this, arguments );}
	$me.unbind("calendarChange").bind("calendarChange",function(e,cal,v) {
		e.stopPropagation(); 
		e.preventDefault();
		_start = v.start;_end = v.end;
		$me.datepicker("setDate", _start);				 
	});
}
/*
 * NAV에서 preview 정보 삭제
 */
GF.previewInfoDelete = function( seletor ) {
	if (typeof(seletor) == "undefined"){return;}
	if (seletor == null){return;}
	if ( seletor.parents("div:last").data("actid") ) {
		GC.isPreview = false;
		//--탭보기시 이전 보기 영역 ID삭제에 Override해서 주석처리함.(mhpark)
		//GC.activeID(seletor.parents("div:last").data("actid"));		
		seletor.parents("div:last").removeData("actid");
		
	}
}
/*
 * location.href에서 #applcode 를 구한다.
 */
GF.getLocationHashcode = function() {
	function _applcodeData() {
		var _a = $("div:first").data("applcode_data");
		if ( typeof(_a) == "undefined") {_a = "";}
		return _a;
	}
	var _hash = _applcodeData();
	if ( _hash != "" ) {return _hash;}
		
	_hash = $.trim(location.hash);
	if ( _hash == "" ) {return "";}
	if ( _hash.indexOf("#") <= -1 ) {return "";}
	var _codes = _hash.split("#");
	if ( _codes[1] == "" ) {return "";}
	return _codes[1];
}
GF.getUrlHashcode = function() {
	var _hash = $.trim(location.hash);
	if ( _hash == "" ) {return "";}
	if ( _hash.indexOf("#") <= -1 ) {return "";}
	var _codes = _hash.split("#");
	if ( _codes[1] == "" ) {return "";}
	return _codes[1];
}
/*
 * appl info에서 pagename 구한다.
 */
GF.getApplPagename = function( appldata ) {
	var _menu = ["" , ""];
	try {
		if ( typeof(appldata) == "object") {
			if ( appldata.menuinfo ) {
				if ( typeof(appldata.menuinfo) == "object" ) {
					if ( $.isArray( appldata.menuinfo ) ) {
						for (var _i = 0 ; _i < appldata.menuinfo.length ; _i++) {
							if ( GC.pagegroup == "" || appldata.corpcode + "." + appldata.menuinfo[_i].pagegroup == GC.pagegroup ) {
								_menu[0] = GF.langPropEx(appldata.menuinfo[_i].pagename, appldata.menuinfo[_i].pagelangcode);
								_menu[1] = GF.langPropEx(appldata.menuinfo[_i].subpagename, appldata.menuinfo[_i].subpagelangcode);
								break;
							}
						}
					}
				}
			}
		}
	} catch(e) {}
	return _menu;
}

/*
 *  DBpath return
 */
GF.retCmtDbpath = function( opts , callfunc) {
	var _opt = opts;
	var _acode = "";
	function _retfunc( cmtpath ) {
		callfunc( cmtpath );
	}
    if (_opt.rcmtopt) {
		if (typeof _opt.rcmtopt.rcmtcode === "string") {
			_acode = _opt.rcmtopt.rcmtcode;
		}
	}
    if ( _acode == "" ) {
    	if(typeof(_opt.rhpath) != "undefined" && _opt.rhpath != "") {
    		_retfunc( _opt.rhpath );
    	} else {
    		if(typeof(_opt.rhcode) != "undefined" && _opt.rhcode != "") {
 	        	_acode = _opt.rhcode;
        	}
    	}
    }
    if( _acode != "" ) {
    	GF.getApplProfile( _acode , function(data) {
    		if(data == "") {return _retfunc( "" );}
			return _retfunc( data.appldir+"/"+data.applfilename );
		});
   }
}
/*
 * a key에 대한 cookie 값을 얻는다.
 */
GF.getCookieData = function ( a ) {
	function _getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
	var _cdata = _getCookie(a);
	if ( _cdata == null || _cdata == "") {
		//alert(a + GF.langPropEx(" 정보를 얻지 못하였습니다.", "comnmsg30"));
		return "";
	}
	return _cdata;
}
/*
 * a key에 대한 cookie  얻는다.
 */
GF.setCookieData = function(a, b, c,d){
	if(c){
		var t = new Date();
		t.setTime(new Date().getTime() + (c*24*60*60*1000));
		var e = "; expires="+ t.toGMTString();
	}else var e="";
	document.cookie = a+"="+b+ e+"; domain="+ location.hostname.right(".")+"; path=/";
}
GF.deleteCookieData  = function(a){
	 var expireDate = new Date();
	  //어제 날짜를 쿠키 소멸 날짜로 설정한다.
	  expireDate.setDate( expireDate.getDate() - 1 );
	  document.cookie = a + "= " + "; expires=" + expireDate.toGMTString() + "; path=/"
}
/*
 * 우편번호 검색
 */
GF.getAddress = function(callfunc) {	
	function _addressDlg(_url) {
		GF.dialog({
			content : {url : (new GF.CURL(_url)).url}
		,	onload : function (_dialog){
			}
		,	open: function() {
				$(this).css("overflow" , "hidden")
						.data("callfuncdata" , callfunc);
				$(this).focus();
			}
		,	title : GF.langPropEx("우편번호 검색", "zipcode")
		,	isactive : true
		,	width : 520
		,	height : 480
		,	resizable : false
		,	buttons : [
					{ 	text: "취소", text_lang : "cancel" ,click : function () {$(this).dialog("close");} }
			 ]
		});
	}
	
	GF.getApplProfile("oc0100", function(data) {
		if(data == "") return;
		_addressDlg( new GF.CURL("/"+data.appldir+"/"+data.applfilename+"/zipcode?openform").url );
	});
	
}
/*
 * 문서reload
 */
GF.activeDocReload = function() {
	try {
		$(GC.active(true)).doc().reload();
	} catch(e){}
	
}

/*
 * 더블클릭 방지
 *  , click : function(evt) {
 *	if (!GF.lockDblClick($(evt.currentTarget),3000)) { return;}
 *  또는 기본값은 2000
 *	if (!GF.lockDblClick($(evt.currentTarget)) { return;}
 */
GF.lockDblClick = function(_e,_delay)  {
	var btn = $(_e);
	if(btn.size() == 0) {return true;}
	if(btn.data("hold") == true) {return false;}
	btn.data("hold",true);
	var _pid = setTimeout(function() {
		if($(btn).size() == 0) {return;} 
		$(btn).removeData("hold");
		$(btn).removeData("holdtime"); 
	},(_delay ? _delay : 2000));
	btn.data("holdtime",_pid);
	return true;
} 
GF.unlockDblClick = function(_e) {
	var _ptime = $(_e).data("holdtime");
	if(typeof(_ptime) != "undefined") {clearTimeout(_ptime);}
	$(_e).removeData("hold");
	$(_e).removeData("holdtime");
	return;
}
/*
 * object등... 처리
 */
GF.clearObjectTag = function(selector) {
	try {
		if (typeof(selector) != "object"){return;}
		$("object,embed",selector).each(function(){
			if( $(this).parents("div:first").length > 0) {
				switch($(this).attr("id")) {
				case "senx":
					break;
				default:
					$(this).parents("div:first")[0].innerHTML = "";
					break;
				}
			}
		});
	} catch (e){}
}

//-----window open시 중앙에 위치
GF.setCenter = function(winwidth, winheight) {
	winx = Math.ceil((screen.availWidth - winwidth) / 2);
	winy = Math.ceil((screen.availHeight - winheight) / 2);
	if (winwidth == screen.availWidth) winwidth = screen.availWidth - 10;
	if (winheight == screen.availHeight) winheight = screen.availHeight - 30;
	return "left=" + winx + ",top=" + winy + ",width=" + winwidth + ",height=" + winheight;
}
//-- 사이즈
GF.getUserImg = function(empno){
	if(empno.indexOf("CN=")>-1) empno = GF.notesName(empno, "ou2")
	return empno ? "/"+ GC.site.prefpath + "/photo_by_empno/"+empno.toLowerCase()+"/$file/"+empno+".jpg" : ("/" + GC.site.resourcepath + "/core/resources/images/img/img_nophoto.jpg");
}
GF.parseView = function(_e,_x) {
	var _c = _e.entrydata[_x];
	var _type = (_c["text"] ? "text" : _c["datetime"] ? "datetime" :_c["datetimelist"]?"datetimelist": _c["number"] ? "number" : _c["textlist"] ? "textlist" : "");
	var _data = (_c["text"] || _c["datetime"] || _c["datetimelist"]  || _c["number"] || _c["textlist"]);
	/* IE7 mode에서 검색할 경우 text 유형일 경우 undefined 처리 위함  */
	if ( _type == "text" && typeof(_data) == "undefined" ) {_data = _c["text"];}			
	if ( _type == "textlist" ) {
		try {
			_data = _c["textlist"]["text"][0][0];
		} catch(e) {
			_data = "err";
		}
	}
	if ( _type == "datetimelist" ) {
		try {
			_data = _c["datetimelist"]["datetime"][0][0];
		} catch(e) {
			_data = "err";
		}
	}
	
	return (_data.length > 1 ? _data : _data[0]);
}
/* =====================================================================================
 *  SOCKET영역
===================================================================================== */
GF.socketio = {
	port : {
		_getMsgPort : function(){
			var __port = GC.site.msgwebserverport.split(GC.site.colsep)
			return __port[isNaN(GC.user.empno.right(2)) ? 0 : (GC.user.empno.right(2) % __port.length ) ]
		},
		_getPushPort : function(){
				var __port = ["9002"];
				return __port[isNaN(GC.user.empno.right(2)) ? 0 : (GC.user.empno.right(2) % 1 ) ]
		}
	},
	ucpost : {
		_session : function(){
			var _first_login = false;
			GC.socket.ucpost = io.connect(GC.site.msgwebserverhost+":"+GF.socketio.port._getMsgPort()+"/messengerNS");
			GC.socket.ucpost.on('connection', function(data) {	
				GF.log("main-server","connection")
				if(data.type == "socketId"){
					GC.socket.ucpost.emit('login', {
						'type':"WB",
						'empno': GC.user.empno,
						'userid':GC.user.userid,			
						'username': GC.user.korname,
						'ip':GC.user.curip
			        });
					
				}
			});
			GC.socket.ucpost.on('login', function(data) {
				GF.log("main-server","login")
				//--타매체에서 인증할 경우 강제 세션을 끊어줌
				if(_first_login){
					if(data.type == "WB" && GC.user.empno == data.empno){
						GC.socket.ucpost.socket.disconnect();
						return;
					}				
				}
				
				if(GC.user.empno == data.empno){
					GF.log("main-client","status")
					GC.socket.ucpost.emit('status', {
						'type':"WB",
						'empno': GC.user.empno,
						'status':"1"
			        });
				}
				
				_first_login = true;
			});
			GC.socket.ucpost.on('talk', function(data) {
				GF.log("main-server","talk")
				GF.log("main-server-talk",data)
				var chat = null;
				$.each($("[role='ucpost']","#"+GC.layout.ucpost),function(i,v){
					if($(v).data("info").roomkey == data.roomkey) {
						chat = $(v);
						return;
					}
				});
				if(chat == null){
					if(GC.user.usewebmessenger != "1")return;
					//--대화 창이 없기 때문에 창을 띄운다.
					var unid = "ucpost".universalid();
					var chat = $("<div role=\"ucpost\" id=\""+unid+"\" class=\"egate_ucpost_dialog\"></div>").appendTo($("#"+GC.layout.ucpost));
					chat.data("info",{guid:unid,roomkey:data.roomkey,start:false});
					chat.ucpost({guid:unid,roomkey:data.roomkey,start:false});	
					chat.ucpost("addMessage",data)
				}
			});
			GC.socket.ucpost.on('conf', function(data) {
				GF.log("main-server","conf")
				GF.log("main-server-conf",data)
				var ___ucpost = $("#ucband_"+data.roomkey,$("#"+GC.layout.ucpost));
				//--현사용자가 아웃
				GF.socketio.ucpost._message.__status({"roomKey":data.roomkey},function(_tf){					
					if(_tf){
						if(___ucpost.size() == 0){
							//--대화 창이 없기 때문에 창을 띄운다.
							var ___dd = $("<div id=\"ucband_"+data.roomkey+"\" class=\"egate_ucpost_dialog talk\"></div>").appendTo($("#"+GC.layout.ucpost));
							var ___opt = {
									"roomkey": data.roomkey,
									"start":false
							};
							___dd.data("info",___opt);
							var ___uc = ___dd.ucband(___opt);	
						}
					}
				})
			});
			
		}
		,_message : {
			__talk : function(data){
				GF.log("main-client","talk")
				GC.socket.ucpost.emit('talk',data);
			},
			__conf : function(data){
				GF.log("main-client","conf")
				GC.socket.ucpost.emit('conf',data);
			},
			__status : function (__json,__callback){
				//--현사용자가 아웃
				var _indata = {
						"__Click" : "0"
					,	"Writer" : GC.user.notesid, "EmpNo" : GC.user.empno
					,	"DocStatus" : "WIPEOUT"
					, 	"Action" : "band_status"
					, 	"func" : "band_status"
					,	"OrgiUnid" : __json.roomKey
				};
				var _posturl = new GF.CURL( "/" + GC.site.librarypath + "/process_docs?openform" ).url;
				GF.ajax({
					type : "POST", cache : false, async : true,
					url : _posturl, data : _indata, dataType:"html",	
					success : function(_data, status, xhr) {
						var _j = eval("("+_data+")");
						if(_j.ret== "true"){
							__callback(true);	
						}else{
							__callback(false);
						}					
					},
					error : function(xhr, status, thrown) {__callback(false);}
				});			
			}
		}
	}
	,push : {
		_session : function(){
			GC.socket.push = io.connect(GC.site.webpushhost+":"+GF.socketio.port._getPushPort());
			GC.socket.push.on('connect', function() {	
				GC.socket.push.emit('logingw', {
					'empno': GC.user.empno,
					"system_code":"eip",
					'action': "etc"
		        });
			});

			GC.socket.push.emit('login', {
			   'uid': GC.user.userid,
			   'empno': GC.user.empno,
		       'action': "etc",
			   'employeeId': GC.user.empno
			});
			
			GC.socket.push.on('logingw',function(data){
				var uri = new GF.CURL("/"+GC.site.prefpath+"/cmdpost?openform");
				var datas = {
					__click : 0
					,	agent: "(push_socket)"
					,	action: "add_socketid"
					,	data_1: data.socketId
				}
				GF.ajax({url: uri.url,	type: "post",	data: datas,	async: true
					,	success: function(jsondata,textStatus,xhr) {
						
					}
				});
			});
		}
		,_receive : function(_callback){ 
			GC.socket.push.on('pushinfo', function(data) {
				_callback(data);
			});
		}
	}
}
GF.refresh = {
	view : function(){
		$(GC.active(false)).viewform().getView().refresh();
	}
}
/* =====================================================================================
 *  자동검색영역영역
===================================================================================== */
GF.remakeQuery = function(_q){
	var __a = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ","ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
	var __b = ["귷", "끃", "늏", "듛", "뜧", "륳", "뮿", "븋", "쁗", "슣", "쓯", "윻", "즇", "쯓","츟", "큫", "튷", "픃", "흏"]
	var __str = [];
	var __f = false;
	for(var i=0 ; i < _q.length ; i++){
		 var __c = _q.substr(i,1); __f = false;
		 for(var j=0 ; j < __a.length ; j++){if(__c == __a[j]){	__str.push(__b[j]);__f = true;break;}}
		 if(!__f)__str.push(__c)
	}
	return __str.join("");
}
/* 선택자, 검색조건, _select함수, _select함수에 전달할 파라미터*/
GF.autoComplete = function(_m,_s,_select,_param){
	var cacheJsonData = [];
	var __s = typeof _s == "undefined" || _s =="" ? "all" : _s
	_m.autocomplete({
		minLength: 2
		,	delay: 500
		,	focus: function() {return false;}
		, 	position :{
			my : "left top",
			at : "left bottom"
		}
		,	search: function() {
			var lastTerm = $(this).val();
			if (lastTerm.length < this.minLength) return false;
		}
		, 	create : function(){
			$(this).data('ui-autocomplete')._renderItem = function(ul,item){
				var val = item.value.split(GC.site.fieldsep);
				if(val[0] == GC.eugp.user){
					var img = GF.getUserImg(val[3]);
					ul.css({"z-index":"10002"});
					return $( "<li>" )
				    .data( "autocomplete-item", item )
				    .append( "<a><img src=\""+img+"\"  onerror=\"this.src='"+GC.site.imgdir+"/core/resources/images/img/nophoto_18x18.jpg'\">" + item.label + "</a>" )
				    .appendTo( ul )
				}else{
					return $( "<li>" )
				    .data( "autocomplete-item", item )
				    .append( "<a>" + item.label + "</a>" )
				    .appendTo( ul );
				}
				ul.css({"display":"block"})
			}
		}
		,	select: function(e, ui) {
				if(_select)	_select({"mode":"select","data":[ui.item.value]},_param);
				var _val = ui.item.value;	
				ui.item.value = "";
			
		}
		,	open : function(){
			var _w = $(".ui-menu").width();
			//$(".ui-menu").width(_w - 4);
		}
		,	source: function(request, response) {
			var keyword =request.term;
			var _url=""; var _dt = "";
			switch(__s){
				case "all":
					_url =new GF.CURL( "/"+GC.site.orgpath+"/all_for_typeahead?openview",{start:"1",count:"-1",restrictTocategory:GF.remakeQuery(keyword)}).url
					_dt = "html"					
					break;	
				case "user":
					_url =new GF.CURL( "/"+GC.site.orgpath+"/user_for_typeahead?openview",{start:"1",count:"-1",restrictTocategory:GF.remakeQuery(keyword)}).url
					_dt = "html"
					break;
				case "dept":
					_url =new GF.CURL( "/"+GC.site.orgpath+"/dept_for_typeahead?openview",{start:"1",count:"-1",restrictTocategory:GF.remakeQuery(keyword)}).url
					_dt = "html";
					break;
				default:
					_url = new GF.CURL( "/"+GC.site.librarypath+"/(srch_usr_grp)?openagent",{"scope": __s,	"keyword": keyword,"empno": GC.user.empno}).url
					_dt = "json"
					break;
			}
			$.ajax({
				url: _url
				,	dataType: _dt
				,	success: function(jsondata) {	
					if(typeof jsondata == "string"){
						var _rs = jsondata.split("[JSON]");
						var _fs = _rs[1].substring(0,_rs[1].length -1);
						if(_fs.indexOf("{")> - 1){
							jsondata = $.parseJSON("[{\"kind\":\"all\",\"data\":["+_fs.replace(/&#91;/gi,"(").replace(/&#93;/gi,")")+"]}]")
						}else{
							jsondata = $.parseJSON("{\"key\":\"NODATA\"}")
						}
					}
					cacheJsonData[keyword] = jsondata;						
					response(typeof __s != "undefined" ?_getAllResponse(jsondata,keyword):_getResponse(jsondata, keyword));
				}
			});
		}
	}).data("autocomplete");
	function _getAllResponse(jsondata,keyword){
		var dataList1 = {};
		if(jsondata.key=="NODATA") return "";
		$.each(jsondata, function(i) { 
	  		var data = jsondata[i].data;
 			dataList1 = $.map(data, function(obj) { 
 				if(obj.kind == GC.eugp.user){
					var entry = new eu();
					entry.setInfo(obj);
					return {   							
						label: _getDisplayName(obj,GC.eugp.user)
						,	value: entry.makeString(GC.site.fieldsep) +GC.site.fieldsep +entry.info.userid + GC.site.fieldsep 
					}
				}else{
					var entry = new eg();
  					entry.setInfo(obj);
  					return {   							
  						label: _getDisplayName(obj,GC.eugp.group)
  						,	value: entry.makeString(GC.site.fieldsep) 
  					}
				}
			});
	 	});
	  	var searchdata = [dataList1];
	  	searchdata = $.map(searchdata, function(item) { 
	  		if(item.length >= 0) return item; 
	  	})
	  	return searchdata;
	}
	function _getResponse(jsondata, keyword) {
		var dataList1 = {};
		if(jsondata.key=="NODATA") return "";
		$.each(jsondata, function(i) { 
	  		var data = jsondata[i].data;
	  		if(jsondata[i].kind ==GC.eugp.user ){
	  			dataList1 = $.map(data, function(obj) { 
  					var entry = new eu();
  					entry.setInfo(obj);
  					return {   							
  						label: _getDisplayName(obj,GC.eugp.user)
  						,	value: entry.makeString(GC.site.fieldsep) +GC.site.fieldsep +entry.info.userid + GC.site.fieldsep 
  					}
  				});
	  		}else{
	  			dataList1 = $.map(data, function(obj) {
  					var entry = new eg();
  					entry.setInfo(obj);
  					return {   							
  						label: _getDisplayName(obj,GC.eugp.group)
  						,	value: entry.makeString(GC.site.fieldsep) 
  					}
  				});
	  		}
	 	});
	  	var searchdata = [dataList1];
	  	searchdata = $.map(searchdata, function(item) { 
	  		if(item.length >= 0) return item; 
	  	})
	  	return searchdata;
	}
	function _getDisplayName(data, kind) {		
		return kind == GC.eugp.user ? data.korname + " " + data.post + " / " + data.groupname : data.groupname
	}
}

GF.searchOrg = function(q,scope,callback,param) {	
	var _html = [];
	var _url = new GF.CURL("/"+GC.site.librarypath+"/(srch_usr_grp)?openagent");
	var _scope = typeof scope == "undefined" ? "user":scope;
	$.ajax({
		url: _url.url
		,	dataType: "text"
		,	data: {"scope": _scope,	"keyword": q,	"partial": "1",	"empno": GC.user.empno,	"qsrch":"1"}
		,	success: function(jsondata) {
				var myData = $.parseJSON(jsondata);
				if(typeof callback != "undefined" ||  callback){callback({"mode":"search","data":[myData]},param);return;}
		}		
	});
}
GF.block = function() {
	var wait =  '<div class="egate_loading_area"><p class="loading_img">'+GF.langProp({"msg" : "잠시만 기다려주십시오.", "langcode" : "please_wait"})+'</p></div>';
	var _bopt = {	message: wait
			,overlayCSS : {
			backgroundColor: '#aaaaaa'
			,opacity: .5	
		}
	}
	$.blockUI(_bopt)
}
GF.unblock = function() {
	$.unblockUI();
}
GF.drawCardAttach = function(_rt,_closecallback){
	var _at = $.parseJSON(_rt.replace(/\\"/gi,"\""))
	if(_at.attach_name == "")return ""
	var _ans = _at.attach_name.split(GC.site.fieldsep), _ass = _at.attach_size.split(GC.site.fieldsep), _aes =  _at.attach_ename.split(GC.site.fieldsep);
	var _tot = 0
	$.each(_ass,function(i,s){_tot += parseFloat(s)});
	
	_title = function(){
	 return	'<div class="egate_fm_file_title">'+
		'<span class="txt_btn" role="card_file_save"><span class="btn_gray">'+GF.langPropEx("파일저장","file_save")+'</span></span>'+
		'<span class="ico_btn" role="card_file_close"><span class="btn_close" title="닫기"></span></span>'
		'</div>';
	}
	_list = function(){
		var _h = '<div class="egate_file_list_area">';
		_h += '<ul class="added_file_list">'
		$.each(_ans,function(i,n){
			_h += '<li path="'+_at.attach_dbpath+'" unid="'+_at.attach_unid+'" name="'+_ans[i]+'" size="'+_ass[i]+'">'
			_h += '<span class="ip_chk_img"><input type="checkbox" name="chk_attach_card"/><span class="chk_img"></span></span>'
			_h += '<span class="egate_fm_file '+ n.rightBack(n,".").toLowerCase() +'"></span>'
			_h += '<span class="added_file_name">'+n+'</span>';
			_h += '<span class="added_file_size">'+_ass[i].toSize()+'</span>'
			_h += '</li>'
		})
		_h += '</ul>'
		_h += '</div>';
		return _h
	}
	var _ele = $('<div class="post_file_list_area">' + _title() + _list() +"</div>");
	_ele.find("li").find("span.added_file_name").off().on("click",function(){		
		var _li = $(this).parents("li")
		var _url =new GF.CURL( "/" +_li.attr("path")+ "/0/" +_li.attr("unid")+ "/$file/" + encodeURIComponent(_li.attr("name")));
		window.open(_url.url);
	})
	_ele.find("[role='card_file_save']").off().on("click",function(){
		var _fo = [], _path = "", _unid="";
		_ele.find("input[name='chk_attach_card']:checked").each(function(){
			var _li = $(this).parents("li")
			_path = _li.attr("path"); _unid =_li.attr("unid") 
			_fo.push({name:_li.attr("name"),size:_li.attr("size")});
		})
		GF.downloadAttach("folder",_path,_unid,_fo)
	})
	_ele.find("[role='card_file_close']").off().on("click",function(){
		$(this).parents("div.post_file_list_area").removeClass("on");
		if(_closecallback)_closecallback();
	});
	return $(_ele);
}
GF.eGatePlusDownload = function(_path, _unid, _flag, _filenames, _encfilenames, _filesizes, _ispopup) {
	
	debugger;
	var _tokenkey = GF.getCookieData("LtpaToken");
	var _tokentype = "LtpaToken";
	if ($.trim(_tokenkey) == "" ) {
		_tokenkey = GF.getCookieData("DomAuthSessId");
		_tokentype = "DomAuthSessId"
		if ($.trim(_tokenkey) != "" ) {
			_tokenkey = "DomAuthSessId";
		}
	}
	
	try {
		var _url = "";
		var _param = {};

		if (GC.egateplustype == "GET") {
			_url += GC.site.localplushost + ":9091/";
			_url += "&userid="			+ GC.user.userid;
			_url += "&domain="			+ location.hostname;
			_url += "&database="		+ _path;
			_url += "&viewname="		+ "0";
			_url += "&docid="			+ _unid;
			_url += "&cookiename="		+ _tokentype;
			_url += "&cookies="			+ _tokenkey;
			_url += "&urltype="			+ _flag;
			_url += "&filenames="		+ _filenames;
			_url += "&filenamesenc="	+ _encfilenames;
			_url += "&filesizes="		+ _filesizes.replace(/\//gi, ";");
			_url += "&callform="		+ "egate45/kr/eip/home/home.nsf/openpage";
			_url += "&saveods="			+ ".eml";
			_url += "&";
			
			_param = {};
		} else {
			_url = GC.site.localplushost + ":9091/";
			_param = {
				"userid"			: GC.user.userid
				, "domain"			: location.hostname
				, "database"		: _path
				, "viewname"		: "0"
				, "docid"			: _unid
				, "cookiename"		: _tokentype
				, "cookies"			: _tokenkey
				, "urltype"			: _flag
				, "filenames"		: _filenames
				, "filenamesenc"	: _encfilenames
				, "filesizes"		: _filesizes.replace(/\//gi, ";")
				, "callform"		: "egate45/kr/eip/home/home.nsf/openpage"
				, "saveods"			: ".eml"
			}
		}
		GF.ajax({
			type		: GC.egateplustype
			, url		: _url
			, async		: false
			, data		: _param
			, dataType	: "jsonp"
			, success	: function(data) {
				if (_ispopup)	window.close();
			}
			, error		: function(xhr,textStatus){
				if (_ispopup)	window.close();
			}
		});
	} catch(e) {
		GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
	}
}
GF.fileDownload = function(_file_url, _file_name){
	function _filedownloadByBLOB(_file_url, _file_name){
		
		if(GC.isIE){		
			var request = new XMLHttpRequest();
			var __file_name = _file_name;
			request.open("GET", _file_url, true); 
			request.responseType = "blob";
			request.onload = function (e) {
				if (this.status === 200) {
		
					//실제 구현후 테스트시 첨부파일 다운로드 후 호출되지 않고 바로 200이 리턴됨.(첨부파일 Header정보만 가져오는 듯)
					if(typeof __file_name == "undefined" || __file_name == ""){
						__file_name = _file_url.rightBack(_file_url, "/");
					}
					local_file_download(this.response, __file_name ,this.response.type);     
				} else {
					alert("File download failed!");
				}
			};
			request.send();
		}
		else{
			window.open(_file_url);
		}
	}
	
	try{
		_filedownloadByBLOB(_file_url, _file_name);
	}
	catch(e){
		window.open(_file_url);
	}
}
GF.downloadAttach = function(flag,dbpath, unid, fileobj){
	if(GC.getOSName() == "Windows") {
		// HTTPS 일 경우에는 HTTP로 AJAX 통신이 되지 않아서 팝업창으로 처리
		if (location.protocol.toLowerCase() == "https:") {
			var __fn = [], __fe=[], __fs=[];			
			$.each(fileobj , function(ii , o) {
				__fn.push(o.name.replace(/#/gi,""));
				__fe.push( encodeURIComponent(o.name) );
				__fs.push( o.size );
			});
			
			// Parameter를 Cookie에 생성 (Post / Storage 가 Protocol에 제약을 받음)
			GF.setCookieData("egateplus_path", GF.getRootproxyPath("/"+dbpath).right("/"));
			GF.setCookieData("egateplus_unid", unid);
			GF.setCookieData("egateplus_flag", flag);
			GF.setCookieData("egateplus_encfilename", __fe.join("/"));
			GF.setCookieData("egateplus_filename", __fn.join("/"));
			GF.setCookieData("egateplus_filesize", __fs.join("/"));
			
			var _url = location.protocol.replace(/https/i, "http") + "//" + location.host + ":" + location.port + "/egate/eip/home/home.nsf/egateplus?ReadForm&urltype=filedown";
			GF.winopen(_url, "", { location:"0",resizable:"1",status:"0",menubar:"0",scrollbars:"0",width:"500",height:"400"},false);
			return;

		// HTTP 처리 ------------------------
		} else {
			try {
				// 1. Install Chk
				_installChk = function(_callback) {
					var _url = "";
					_url += GC.site.localplushost;
					_url += ":9091/&userid=" + GC.user.userid;
					_url += "&urltype=ready";
					_url += "&callform=egate45/kr/eip/home/home.nsf/openpage";
					_url += "&saveods=.eml";
					_url += "&callback=?";
					
					try {
						GF.ajax({
							type:"GET" ,
							url : _url ,
							async : true ,
							dataType: "jsonp" ,
							success : function(data){
								if ( data.ret == "true" ) {
									_callback(data);
								} else {
									GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
								}
								return;
							},
							error: function(xhr,textStatus){
								//IE에서만 error 체크, jsonp plug-in 필요				
						    	if(!GF.confirm("PC저장함이 설치되지 않았습니다.재설치 하시겠습니까?","mail_msg31")) {
						    		return;
						    	}
						    	var _url = new GF.CURL("/"+GC.site.librarypath+"/win_pcdown?openform").url;
						    	GF.dialog({
						    		content : {url : _url}
						        	, title : GF.langPropEx("PC저장함 설치","mail_msg32")
						    		, open : function(event, ui) {
						        		$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
						        		$(this).css({"overflow":'hidden'});return;
						        	}	 	  					
						        	, isactive: true
						        	, modal:true
						        	, closeOnEscape	: false
						        	, resizable : false
						        	, height : 200
						        	, width : 400
						        	, buttons : [
						        		{
						        			text: GF.langProp({msg:"닫기", langcode:"close"})
						        			, click : function() {
						        				$(this).dialog("close");
						        				window.close();
						        			}
						        		}
						        	]
						        });
							}
						});
					} catch(e){
						GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
					}
				}
				// 2. Version Chk 
				_versionChk = function(_callback) {
					var _down = "";
					var _tmpVar = GC.site.egateplusinfo.split("^");
					var _lang = GC.user.userlang;
					if (_lang == "kr" || _lang == "") {
						_down = GC.site.host + "/egate45/kr/eip/core/egateplus.nsf/egateplus_view/" + _tmpVar[0] + "/$FILE/" + _tmpVar[1];
					} else {
						_down = GC.site.host + "/egate45/kr/eip/core/egateplus.nsf/egateplus_view/" + _tmpVar[0] + "/$FILE/" + _tmpVar[2];
					}
					var _url = "";
					_url += GC.site.localplushost;
					_url += ":9090/";
					_url += "&urltype="		+ "start";
					_url += "&installurl="	+ _down;
					_url += "&installver="	+ _tmpVar[0];
					_url += "&callform="	+ "egate45/kr/eip/home/home.nsf/openpage";
					_url += "&saveods="		+ ".eml";
					_url += "&callback=?";

					GF.ajax({
						type:"GET" ,
						url : _url ,
						async : false ,
						dataType: "jsonp" ,
						success : function(data) {
							_callback(data);
							return true;
						},
						error: function(xhr,textStatus){
						}
					});
				}
				// 다운로드
				_installChk(function() {
					_versionChk(function() {
						var _url = GC.site.localplushost;
						_url += ":9091/&userid=" + GC.user.userid;
						_url += "&urltype=ready";
						_url += "&callform=egate45/kr/eip/home/home.nsf/openpage";
						_url += "&saveods=.eml";
						_url += "&callback=?";

						try {
							$.ajax({
								type:"GET" ,
								url : _url ,
								async		: false ,
								dataType	: "jsonp" ,
								statusCode: {
							        502: function () {
							            alert('Fail!');
							        }
							    },
								success : function(data){
									if ( data.ret == "true" ) {
										_down();
									} else {
										GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
									}
								},
								error: function(xhr,textStatus) {
									GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
								}
							});
						} catch(e){
							GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
						}
					})
				});
	        } catch (e) {
	        	//GF.alert("처리중 오류가 발생하였습니다.","errmsg2");
	        }
		}
	} else {
		GF.alert("일괄 다운로드는 MS Windows에서만 지원됩니다. 그외 OS에서는 파일명을 클리해서 다운로드 하세요.","downerr2");
	}
	
	function _down(){
		debugger;
		var __fn = [], __fe=[], __fs=[];
		$.each(fileobj , function(ii , o) {
			__fn.push(o.name.replace(/#/gi,""));
			__fe.push( encodeURIComponent(o.name) );
			__fs.push( o.size );
		});
		
		var _path			= GF.getRootproxyPath("/"+dbpath).right("/");
		var _unid			= unid;
		var _flag			= flag;
		var _filenames		= __fn.join("/");
		var _encfilenames	= __fe.join("/");
		var _filesizes		= __fs.join(";");
		
		GF.eGatePlusDownload(_path, _unid, _flag, _filenames, _encfilenames, _filesizes, false)
	}
	/*
	function _down(){
		var __fn = [], __fe=[], __fs=[];
		$.each(fileobj , function(ii , o) {
			__fn.push(o.name);
			__fe.push(o.ename);
			__fs.push( o.size );
		});
		//--메일 및 프락쉬 서버 사용시 패스문제 발생함..
		var _dbpath = GF.getRootproxyPath("/"+dbpath).right("/");
		try {
			var url = GC.site.localplushost;
			url += ":9091/&userid=" + GC.user.userid;
			url += "&domain=" + location.hostname;
			url += "&database=" + _dbpath
			url += "&viewname=0";
			url += "&docid=" +unid
			url += "&cookiename=LtpaToken";
			url += "&cookies=" + GF.getCookieData("LtpaToken");
			url += "&urltype=" + flag;
			url += "&filenames=" + __fn.join("/");
			url += "&filenamesenc=" + __fe.join("/");
			url += "&filesizes=" + __fs.join(";");
			url += "&";
			
			$.getJSON(url, function(data){
				GF.log(">> _filedownload" , data.ret);
			})
		} catch(e) {
			GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
		}
	}
	var _url = GC.site.localplushost;
	_url += ":9091/&userid=" + GC.user.userid;
	_url += "&urltype=ready";
	_url += "&callback=?";
	
	try {
		GF.ajax({
			type:"GET" ,
			url : _url ,
			async : false ,
			dataType: "jsonp" ,
			success : function(data){
				if ( data.ret == "true" ) {
					_down();
				} else {
					GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
				}
			},
			error: function(xhr,textStatus){
				//IE에서만 error 체크, jsonp plug-in 필요				
		    	if(!GF.confirm("PC저장함이 설치되지 않았습니다.재설치 하시겠습니까?","mail_msg31"))return;
		    	var _url = new GF.CURL("/"+GC.site.librarypath+"/win_pcdown?openform").url;
		    	GF.dialog({content : {url : _url}
		        	,open : function() {$(this).css({"overflow":'hidden'});return;}	 	  					
		        	,isactive: true	,modal:true	,title : GF.langPropEx("PC저장함 설치","mail_msg32")
		        	,resizable : false,height : 200,width : 400
		        	,buttons : [
		        		{ text: GF.langProp({msg:"닫기", langcode:"close"}), click : function() {	$(this).dialog("close");}}
		        	]
		        });
				
//				GF.alert("첨부다운로드 모듈을 설치 하여 주시기 바랍니다." , "filemanagermodule");
//				var _durl = GC.site.imgdir +"/core/exe/egateplus_kor.exe";
//				$.fileDownload(_durl)
//				.done(function () {})
//				.fail(function () { alert('File download failed!'); });

			}
		});
	} catch(e){
		GF.alert("다운로드 처리중 오류가 발생 하였습니다." , "downerr");
	}
	*/
}
GF.chkForbiddenWord = function(applcode,word){
	var _flag = false;
	var _url = new GF.CURL("/"+GC.site.librarypath +"/(process_action_svr)?openagent")
	GF.ajax({
		type:"POST" ,
		url : _url.url,
		async : false ,
		data : {"func":"forbidden","applcode":applcode,"subject": word},
		dataType: "html" ,
		success : function(data){
			var _j = eval("("+data+")");
			if(_j.ret == "false"){
				if (applcode == "pa0100"){
					GF.alert("경조사 게시판를 이용하여 주시기 바랍니다.","comnmsg58");
				}else{
					GF.alert("표준 적요를 사용하시기 바랍니다.\문의처 : 경리팀, 회계팀 ","comnmsg57");
				}
			}else _flag = true
		},
		error: function(xhr,textStatus){}
	});
	return _flag;
}
GF.SummaryBody = function(_dbpath, _unid){
	var url = new GF.CURL("/"+_dbpath+"/0/"+_unid+"/Body?OpenField");
	var body =""
	GF.ajax({
		url : url.url
		,type : "GET"
		,async : false
		,cache : false 
		,success : function(data,textStatus,xhr) {
			var __bodys = data.match(/<body[^>]*>([^<]*(?:(?!<\/?body)<[^<]*)*)<\/body\s*>/i);
			var __unhtml = __bodys  ? __bodys[0].stripTags():""
			var _txt = __unhtml.substring(0,200)
			body = _txt;
		}
		,error : function (xhr,textStatus){}
	});
	return body;
}

document.onkeydown = function(e) { 
	var evtK = (e) ? e.which : window.event.keyCode; 
	var isCtrl = ((typeof isCtrl != 'undefined' && isCtrl) || ((e && evtK == 17) || (!e && event.ctrlKey))) ? true : false;
	if ((isCtrl && evtK == 82) || evtK == 116) { 
		if (e) { evtK = 505; } else { event.keyCode = evtK = 505;} 
	}
	if (evtK == 505) {return false;}
}
/*
 * session timeout 체크하여 로그아웃 처리 수행
 */

/*
 * update idle session time cookie 
 */
GF.updateIdleTimeout = function() {
	var dt = new Date()
	dt.adjust(0,0,0,8,0,0);
	GF.setCookieData("timeout",dt.format("yyyy-mm-dd HH:MM:ss"));
	if(top.opener)window.clearInterval(GC.timeinterval);
}
/*
 * idle session out시간 초과 여부 검사
 */
GF.chkIdleTimeout = function() {
	var sTimeout = GF.getCookieData("timeout");
	if (sTimeout=="") return "";
	
	var dt = new Date();
	var y = sTimeout.substr(0,4);
	var m = sTimeout.substr(5,2);
	var d = sTimeout.substr(8,2);
	var hh = sTimeout.substr(11,2);
	var mm = sTimeout.substr(14,2);
	var ss = sTimeout.substr(17,2);
	var dt2 = new Date(y,m-1,d,hh,mm,ss);
	var sRet = parseInt((dt2.getTime()-dt.getTime()) / (1000*60),10);
	return sRet;
}
GF.chkSession = function(responsetext) {	
	if ( typeof(responsetext) != "string" ){responsetext = null; GF.updateIdleTimeout();return;}
	if (responsetext == "") { GF.updateIdleTimeout();return;}
	responsetext.match(/<!-- JJDATA>((.|[\r\n]*)+)<\/JJDATA -->/i);
	var rdata = (RegExp.$1 ? RegExp.$1 : "");
	if (rdata == ""){ GF.updateIdleTimeout();return;}
	rdata = rdata.toLowerCase();
	if ( $.trim(rdata) == "anonymous" ) {
		responsetext = null;
		$(GC.active(true)).hide();
		//alert("일정 시간동안 사용하지 않으실 경우 자동으로 종료됩니다.\n로그인 페이지이동 합니다.");
		window.status = "";
			
		var logoutUrl = "/names.nsf?logout";
		GF.ajax({
			url : logoutUrl,dataType: "html",type : "POST",async : false,cache : false
			,success : function(data,textStatus,xhr) {
				GF.Logout();
			}
			,error : function(xhr,textStatus) { } 
		});
	}
	GF.updateIdleTimeout();
	responsetext = null;
}
GF.doDupLogout = function(lastIP, lastTime) {
	var logoutUrl = "/names.nsf?logout";
	var htmlstr = "<br>같은 아이디와 비밀번호로 다른 컴퓨터(IP:"+lastIP+")에서 " + 
	"<br>"+lastTime.substr(0,16).replace(/\+/g," ") + " 에 그룹웨어에 접속했습니다."+
	"<br><font color=red><b>ID도용이 의심되시면 비밀번호를 변경</b></font>하십시오!"+
	"<br><br>"+
	"중복 로그인 방지를 위해 그룹웨어를 로그아웃 합니다."+
	"<br>현재 컴퓨터에서 그룹웨어를 사용 하시려면 다시 로그인 하시기 바랍니다.";
	GF.dialog(	{ 
	content : htmlstr
	,isactive: false
	,width : 450
	,height : 220
	,title: "[중복로그인]되 로그아웃 됩니다."
	,autoOpen:true
	,modal:true
	,draggable: true
	,closeOnEscape:false
	,resizable: false
	,close: function() { location.href = logoutUrl; }
	,buttons : [
	{ text: "확인", click : function() {		
		GF.ajax({
			url : logoutUrl,dataType: "html",type : "POST",async : false,cache : false
			,success : function(data,textStatus,xhr) {GF.Logout();}
			,error : function(xhr,textStatus) { } 
		});
		$(this).dialog("close"); 
	} }
	]
	});
}
GF.Logout = function(){		
	var _url = "/names.nsf?logout";
	top.location.replace(_url);	
}
var TIMEOUT_INTERVAL = "";
function chkTimeout() {
	var rmin= GF.chkIdleTimeout();
	
	if(parseInt(rmin,10) > 0 && parseInt(rmin,10) <= 10) {
		window.status = "그룹웨어는 " + rmin+"분 후 자동 종료됩니다.";
	} else if(parseInt(rmin,10) <= 0) {
		//--모든 Dialog를 닫는다.
		$(".ui-dialog-content").dialog("close");
		//--혹시몰라 blockUI를 푼다.
		$.unblockUI();
		window.clearInterval(GC.timeinterval);
		window.status = "";
		
		var logoutUrl = "/names.nsf?logout";
		GF.ajax({
			url : logoutUrl,dataType: "html",type : "POST",async : false,cache : false
			,success : function(data,textStatus,xhr) {
				var msg = "일정 시간동안 사용하지 않으실 경우 자동으로 종료됩니다.<br/><br/>"+ 
				"문서 작성중인 경우 [본문저장]버튼을 이용하여 내용을 저장하십시오.<br/><br/>"+
				"창을 닫으면 로그인 페이지로 이동 합니다.";
				var _doc = $(GC.active(true));
				var _button1 = { text: "본문저장", 
						  click : function (){
							if(_doc.doc()){
								$(this).dialog("close")
								var _h='<div style="margin:5px;width:85%;height:85%">' 
								_h += '<p class="mt10">* '+GF.langProp({"msg" : "[Ctrl+C]하여 복사하고 [Ctrl+V]하여 붙여넣기 하시기 바랍니다.", "langcode" : "comnmsg1"})+'</p>';
							_h += '<textarea name="body" value="" style="margin:5px;width:95%;height:95%;z-index:10000"></textarea>';
							_h += '</div>'
							var _html = $(_h).find('textarea').val(ceditor.getBodyValue())	
							
							GF.dialog(	{ 
								content:{
									html : _html 
								}
								,isactive: true,modal:false,draggable: true,closeOnEscape:true,resizable: true,position:{ my: "center", at: "center", of: window }
								,width:500
								,height : 500
								,closeOnEscape:true
								,title : "본문저장"
								,close: function() { GF.Logout(); }
								,buttons : [
									{ text: GF.langProp({"msg":"로그아웃", "langcode":"logout"}), click : function (){
											GF.Logout();			
										} 
									}     
								]	            
							});
				    			
							}
					    }
				}
				var _button2 = { text: "로그아웃", 
				 	click : function (){
							GF.Logout();					
						} 
				}
				$.blockUI( {message:null, bindEvents:false, overlayCSS : { 
					backgroundColor: '#aaaaaa'
					,opacity: .5	
				}});
				var _button = $("[role='fm_body_editor']",GC.active(true)).size()>0  ? [_button1, _button2]:[_button2]
				GF.dialog(	{ 
					content : {
						html : "<P>&nbsp;</P><P>"+msg+"</P><P>&nbsp;</P>"
					}
					,onload : function(){
						$(".ui-dialog-titlebar-close",".ui-dialog").remove();
					}				
					,autoOpen:true
					,isactive: false
					,modal:false
					,draggable: true
					,closeOnEscape:false
					,resizable: true
					,position:{ my: "center", at: "center", of: window }
					,minHeight : 100
					,minWidth : 400				
					,title: "로그아웃"		
					,buttons : _button
				});	
			}
			,error : function(xhr,textStatus) { } 
		});
	}
}

function link_url(url){
	var homepath = "/" + GC.site.homepath + "/openpage?readform&url=";
	var wurl = homepath + GF.encodeURI(url+"&isundock=1&is_popup=1&is_popbbs=1");
	
	GF.winopen( wurl, "", { location:"0",resizable:"0",status:"0",menubar:"0",scrollbars:"0",width:"800",height:"600"},false);
}