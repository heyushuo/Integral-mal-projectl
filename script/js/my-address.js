/*
 * 保存地址
 */
function saveAddress(){
	var name=$("#adduserName").val();
    var phone=$("#adduserPhone").val();
    var s1=$("#s1").val();
    var s2=$("#s2").val();
    var s3=$("#s3").val();
    var adddetailAddress=$("#adddetailAddress").val();
  	var addAddressHtml='<div class="adr-block">'+
			'<div class="adr-top"><table class="adr-tbl" cellpadding="0" cellspacing="0" border="0">'+
				'<tr><td class="userName"  align="left">'+name+'</td><td class="userPhone" align="left">'+phone+'</td><td rowspan="2" style="width: 8%;">></td></tr>'+
				'<tr><td colspan="2" align="left"><span class="adr-sp">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+ '&nbsp;'+adddetailAddress+'</span></td></tr>'+
				'</table></div>'+
			'<div class="adr-btm"><div class="adr-btm-left"><input id="defaultAddr" class="adr-chk" type="checkbox" /><label for="defaultAddr">默认地址</label></div><div class="adr-btm-right"><a href="javascript:;" class="editAddress" ><img src="images/icon-14.png" /><label>编辑</label></a><a href="javascript:;" class="deleteAddress" ><img src="images/icon-15.png" /><label>删除</label></a></div><div class="clean"></div></div></div>';
	if($.trim(name)!="" && $.trim(adddetailAddress)!=""&& $.trim(s1)!=""&& $.trim(phone)!=""){
		if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
		$("#prompt").text("请输入正确手机号");
	}else{
		$(".adr-box").append(addAddressHtml);
		$(".adr-box").css("display","block");$("#address_add").css("display","none");
		$("#sug-block").css("display","block"); 
		$("#addAddress").val("+ 添加新的地址");
		clearAddress(); 
	}
	}else{
		$("#prompt").text("所填资料不能为空");
	}
}
$("#submit_address")[0].addEventListener("touchstart",saveAddress,false);
/*
 * 删除地址
 */
function deleteAddress(){
	$(this).parents(".adr-block").remove();
}
$(".adr-box").on("touchstart",".deleteAddress",deleteAddress);

//for (var i=0;i<$(".adr-box .deleteAddress").length;i++) {
////	$(".adr-box .deleteAddress")[i].addEventListener("touchstart",deleteAddress,false);
//	$(".adr-box").on("touchstart",".deleteAddress",deleteAddress);
//}

/*
 * 编辑地址
 */
function editAddress(){
	var name=$(this).parents(".adr-block").find(".userName").text();
    var phone=$(this).parents(".adr-block").find(".userPhone").text();
    var allAddress=$(this).parents(".adr-block").find(".adr-sp").html();
    var addressArray=allAddress.split("&nbsp;");
    var s1=addressArray[0];
    var s2=addressArray[1];
    var s3=addressArray[2];
    var detailAdress=addressArray[3];
    $(this).parents(".adr-block").remove();
    $("#adduserName").val(name);
    $("#s1").val(s1);
    $("#s1").trigger("change");
    $("#s2").val(s2);
    $("#s2").trigger("change");
    $("#s3").val(s3);
    $("#s3").trigger("change");
    $("#adddetailAddress").val(detailAdress);
    $("#adduserPhone").val(phone);
    $("#sug-block").css("display","none");
    $(".adr-box").css("display","none");$("#address_add").css("display","block");
    $(".back").on("click",function(e){
		 e.preventDefault();
		$(".adr-box").css("display","block");$("#address_add").css("display","none");        			
		$("#sug-block").css("display","block");$("#addAddress").val("+ 添加新的地址");
		$(this).unbind("click");
		saveAddress();
	});
}
$(".adr-box").on("touchstart",".editAddress",editAddress);
//for (var i=0;i<$(".adr-box .editAddress").length;i++) {
//	$(".adr-box .editAddress")[i].addEventListener("touchstart",editAddress,false);
//}
/*
 *	每次添加地址后,清空信息
 */
function clearAddress(){
	$("#adduserName").val("");
    $("#adduserPhone").val("");
    $("#s1").val("");
    $("#s2").val("");
    $("#s3").val("");
    $("#adddetailAddress").val("");
    $("#email").val("");
    $("#prompt").text("");
}
/*
 * 添加地址
 */
function addAddress(){
	$(".adr-box").css("display","none");
	$("#address_add").css("display","block");
	$("#sug-block").css("display","none");
	$(".back").on("click",function(e){
		e.preventDefault();
		$(".adr-box").css("display","block");$("#address_add").css("display","none");        			
		$("#sug-block").css("display","block");$("#addAddress").val("+ 添加新的地址");
		$(this).unbind("click");
		clearAddress();
	});
}
$("#addAddress")[0].addEventListener("touchstart",addAddress,false);
/*
 * 三级联动(省市区)
 */
if($("select[name='sheng']").length>0){
    new PCAS("sheng","shi","qu","","","");
}