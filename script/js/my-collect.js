/*
 * 删除相应的收藏
 */
function deleteCollect(){
	$(this).parent().parent().remove();
}
//$(".mc-list .mc-list-r-main").on("click",deleteCollect);
for (var i=0;i<$(".mc-list .mc-list-r-main").length;i++) {
	$(".mc-list .mc-list-r-main")[i].addEventListener("touchstart",deleteCollect,false);
}

/*
 * tab切换全部商品 有效商品 失效商品
 */
function tabCollect(){
	var index=$(this).index();
	$(this).children().addClass("active1").parent().siblings().children().removeClass("active1");
	$(".tab .mc-tab").eq(index).show().siblings().hide();
}
//$(".mc-nav li").on("click",tabCollect);
for (var i=0;i<$(".mc-nav li").length;i++) {
	$(".mc-nav li")[i].addEventListener("touchstart",tabCollect,false);
}
