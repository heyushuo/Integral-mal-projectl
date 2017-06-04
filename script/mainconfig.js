require.config({
	shim:{
	    	'xyPop':{
		        deps:['jquery']
		    }
		},
	paths:{
		jquery:"./libs/jquery",
		swiper:"./js/swiper.min",
        diqu:"./js/diqu2",
        xyPop:"./js/xyPop",
        commonObj:"./commonobj"
	}
})
require(['jquery','swiper','commonObj','diqu','xyPop'],function($,swiper,commonObj,diqu,xyPop){
    $(function(){
    	/*
    	 * 首页轮播
    	 */
        var topSlider=new Swiper('.swiper1', {
            autoplay: 3000,
			loop: true,
			pagination: '.swiper-pagination',
			paginationClickable: true
        });
        /*
    	 * rem布局
    	 */
 		commonObj.rem();
 		/*
 		 * 添加到购物车和购物车页面
 		 */
   		$(".gcb-left").on("touchstart",commonObj.addCart);
 		$(".tip-btn").on("touchstart",commonObj.closeLayer);
 		$(".reducenum").on("click",commonObj.reducenum);
		$(".inputnum").bind("input propertychange",commonObj.inputnum)
 		$(".addnum").on("click",commonObj.addnum);
 		$("input[name=checkAll]").on("click",function(){$('input[name="subBox"]').prop("checked",this.checked);$(".checkAll").prop("checked",this.checked);commonObj.getTotal();});
 		var $subBox = $("input[name='subBox']");
	    $subBox.on("click",function(){
	    $(".checkAll").prop("checked",$("input[name='subBox']").length == $("input[name='subBox']:checked").length ? true : false);
			commonObj.getTotal();
	    }); 
            
        $(".cart-del").on("click",commonObj.cartdel);
        /*
         * 总积分
         */
        $(".shop-num").on("change",commonObj.alljifen);
        
 		/*
         * 类目菜单
         */
        $(".search-left").find("li").on("click",commonObj.searchMenu)
        /*
         * 地址管理
         */
        if($("select[name='sheng']").length>0){
            new PCAS("sheng","shi","qu","","","");
        }
        $("#addAddress").on("click",function(){$(".adr-box").css("display","none");$("#address_add").css("display","block");$("#sug-block").css("display","none");});
        $("#submit_address").on("click",commonObj.addAddress);
        $(".adr-box").on("click",".deleteaddress",commonObj.deleteAddress);
        $(".adr-box").on("click",".editAddress",commonObj.editAddress);











   })
})