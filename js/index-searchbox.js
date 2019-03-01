/*调用搜索接口*/
var oTxt = document.getElementById("key");
var oList = document.getElementById("jiekou");

oTxt.oninput = function() {
	var oScript = document.createElement("script");
	//oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oTxt.value+"&json=1&cb=aa";
	oScript.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + oTxt.value + "&callback=aa";//截取接口相对应的地方
	document.body.appendChild(oScript);
	oList.style.display = "inline";
	if(oTxt.value == ""){
		oList.style.display = "none";
	}
}

function aa(data) {
	//console.log(data);
	data = data.result;
	var str = "";
	data.forEach((item) => {
		//str += "<li><a href=' "+item+"'>"+item+"</a></li>"
		str += "<li><a href='https://s.taobao.com/search?q=" + item[0] + "'>" + item[0] + "</a></li>"
	});
	oList.innerHTML = str;
}

