/*
 * 加商品数量
 */
function addNum(){
	var val=parseInt($(this).prev().val());
	//isNaN() 函数用于检查其参数是否是非数字值。如果不是数字返回true
	if (!isNaN(val)) {
		if(val<1){
			val=1;
		}else{
			val++;
		}
	}else{
		val=1;
	}
	$(this).prev().val(val);
	getTotal();
}
$(".cart-buy-num").on("touchstart",".addnum",addNum);
//for (var i=0;i<$(".cart-buy-num .addnum").length;i++) {
//	$(".cart-buy-num .addnum")[i].addEventListener("touchstart",addNum,false);
//}
/*
 * 减商品数量
 */
function reduceNum(){
	var val=parseInt($(this).next().val());
	//isNaN() 函数用于检查其参数是否是非数字值。如果不是数字返回true
	if (!isNaN(val)) {
		if(val<2){
			val=1;
		}else{
			val--;
		}
	}else{
		val=1;
	}
	$(this).next().val(val);
	getTotal();
}
$(".cart-buy-num").on("touchstart",".reducenum",reduceNum);
//for (var i=0;i<$(".cart-buy-num .reducenum").length;i++) {
//	$(".cart-buy-num .reducenum")[i].addEventListener("touchstart",reduceNum,false);
//}
/*
 * 防止在input框里输入非法数量
 */
function inputNum(){
	var val=$(this).val();
	var reg=/^[0-9]{0,20}$/;
	if(!reg.test(val)||val==""){
		val=1;
	}
	$(this).val(val);
	getTotal();
}
$(".inputnum").bind("input propertychange",inputNum);
/*
 * 计算总积分
 */
function getTotal(){
	var jifen=0;
	$("input[name='subBox']:checked").each(function(){
		var single=$(this).parents(".cart-block").find(".cart-integral").text();
		var nums=$(this).parents(".cart-block").find(".shop-num").val();
		jifen+=single*nums;
	});
	$(".total-integral-val").text(jifen);	
}
/*
 * 全选商品与全不选
 */

$("input[name=checkAll]").on("click",function(){
	$('input[name="subBox"]').prop("checked",this.checked);
	$(".checkAll").prop("checked",this.checked);
	getTotal();
});
var $subBox = $("input[name='subBox']");
$subBox.on("click",function(){
	$(".checkAll").prop("checked",$("input[name='subBox']").length == $("input[name='subBox']:checked").length ? true : false);
	getTotal();
});
/*
 * 删除商品
 */
function cartDel(){
	var judge=$("input[name='checkAll']").prop("checked");
	xyPop({
		id:'xyPop_follow', 
		type:'confirm', 
		content:'您确定要删除这条数据吗？',
		btn:['确定','取消'],
 		onOk:function(){													         			
     		if(judge){
        		$(".cart-block").each(function(){
        			$(this).remove();           			
        		})
        		$("input[name='checkAll']").attr("checked",false);
        	}else{
        		if($("input[name='subBox']:checked").length>0){
        		$("input[name='subBox']:checked").parents(".cart-block").remove();
        		}
        	}
			getTotal();
       		}
 		})
}
//$(".cart-del").on("click",cartDel);
for (var i=0;i<$(".cart-del").length;i++) {
	$(".cart-del")[i].addEventListener("touchstart",cartDel,false);
}