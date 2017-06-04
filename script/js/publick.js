;(function(){
	//rem布局
	document.documentElement.style.fontSize = innerWidth/3.2 +"px";
    window.addEventListener("resize",function(){
        document.documentElement.style.fontSize = innerWidth/3.2  + "px";
    },false)
    //获取form表单中的值,需要为每一个input标签加上name属性
    function getFormJson(frm){
		var o = {};
		var a=$(frm).serializeArray();
		$.each(a, function() {
			if (o[this.name]!==undefined) {
				if (!o[this.name].push) {
					o[this.name]=[o[this.name]];
				}
				o[this.name].push(this.value ||'');
			}else{
				o[this.name]=this.value || '';
			}
		});
		return o;
	}
}())
