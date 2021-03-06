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
}
//$(".cart-buy-num").on("click",".addnum",addNum);
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
}
//$(".cart-buy-num").on("click",".reducenum",reduceNum);
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
}
/*
 * 加入购物车
 */
function addCart(){
	var number=Number($("#cartnumbers").val());
	var num=Number($("#goodsnum").text());
    $("#goodsnum").text(num+number);
    $("#goodsnum").show();
    $(".zhezhao").css({ display : "block", height : $(document).height()});
	$(".zhezhao").show();
	$(".add-cart-tip-layer").show();
}
/*
 * 关闭提示
 */
function closeLayer() {
	$(".add-cart-tip-layer").hide();
	$(".zhezhao").hide();
}

$(".gcb-left")[0].addEventListener("touchstart",addCart,false);
$(".tip-btn")[0].addEventListener("touchstart",closeLayer,false);
$(".reducenum")[0].addEventListener("touchstart",reduceNum,false);			
$(".addnum")[0].addEventListener("touchstart",addNum,false);
