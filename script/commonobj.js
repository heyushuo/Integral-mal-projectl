define(["jquery"],function(require){
	return commonObj = {
        ajaxstatus:true,
        pagesize : 5,
        winH: $(window).height(),
        /*
         * rem布局
         */
        rem:function(){
            document.documentElement.style.fontSize = innerWidth/3.2 +"px";
            window.addEventListener("resize",function(){
                document.documentElement.style.fontSize = innerWidth/3.2  + "px";
            },false)
        },
        closeLayer:function(){
        	$(".add-cart-tip-layer").hide();
			$(".zhezhao").hide();
        },
        /*
         * 购物车数量加
         */
        addnum:function(){
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
			commonObj.getTotal();
       },
       /*
        * 防止在input框里输入非法数量
        */
       inputnum:function(){
       		var val=$(this).val();
			var reg=/^[0-9]{0,20}$/
			if(!reg.test(val)||val==""){
				val=1
			}
			$(this).val(val)
			commonObj.getTotal();
       },
       /*
        * 需要总积分
        */
       alljifen:function(){
        	var jifen=0;
            var reg=$(this).parents(".cart-block").find(".cart-integral");
            	var single=parseInt(reg.find(".cart-integral").text());
            	var number=reg.find(".shop-num").val();
            	jifen=jifen+single*number;
//          	$(".shop-num").each(function(){
//          		var number=$(this).val()
//          		jifen=jifen+jifen*number;
//          	})         
   		 	$(".total-integral-val").text(jifen);
         
       },
       getTotal:function(){	

       		var jifen=0;
			$("input[name='subBox']:checked").each(function(){
				var single=$(this).parents(".cart-block").find(".cart-integral").text();
				var nums=$(this).parents(".cart-block").find(".shop-num").val();
				jifen+=single*nums;
			});
			$(".total-integral-val").text(jifen);			
       },
       /*
        * 删除相应的商品
        */
       cartdel:function(){
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
						commonObj.getTotal();
		           	}
         		});
            	
            	
            },
        /*
         * 购物车数量减
         */
        reducenum:function(){
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
			commonObj.getTotal();
       },
       
        /*
         * 类目菜单
         */
        searchMenu:function(e){
	    	var menu_resource = [
			{"data":"<a href='search-kind.html'>充值卡</a><a href='search-kind.html'>话费</a>"}, 
			{"data":"<a href='search-kind.html'>床单被罩</a><a href='search-kind.html'>毛巾</a>"},
			{"data":"<a href='search-kind.html'>洗衣机</a><a href='search-kind.html'>冰箱</a>"},
			{"data":"<a href='search-kind.html'>充电器</a><a href='search-kind.html'>耳机</a>"},
			{"data":"<a href='search-kind.html'>数码相机</a><a href='search-kind.html'>拍立得</a>"},
			{"data":"<a href='search-kind.html'>电脑桌</a><a href='search-kind.html'>散热器</a>"},
			{"data":"<a href='search-kind.html'>行车记录仪</a><a href='search-kind.html'>加油卡</a>"},
			{"data":"<a href='search-kind.html'>旅行箱</a><a href='search-kind.html'>时尚饰品</a>"},
			{"data":"<a href='search-kind.html'>爽肤水</a><a href='search-kind.html'>眼线</a>"},
			{"data":"<a href='search-kind.html'>孕妇护肤</a><a href='search-kind.html'>宝宝护肤</a>"}
			];
			var idx = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".search-right").find(".sr-cnt").html(menu_resource[idx].data);
			e.preventDefault();
        },
       
        insertDiv: function (json) {
            var $mainDiv = $("#scrollAdd");
            var html = '';
           var  showlength=5;
            if(json.length<5){
                showlength=json.length;
            }

            for (var i = 0; i < showlength; i++) {              
                html += '<li><a href="#">'+
                    '<div class="triangle-topleft"></div>'+
                    '<span class="shuxing" data_url="productinfo.html">专属</span>'+
                    '<div class="leftimages fl"><canvas data-src="images/product/product1.png" ></canvas></div>'+
                     '<div class="productcontent fr">'+
                         '<p class="ptitle pl10">广联达变更算量</p>'+
                          '<p class="pdes pl10">简介这里简介这里简介这里简介这里简介这里简介这里简介这里简介介这里简介</p>'+
                          '<p class="pprice pl10">价格：<span class="green">￥5000</span></p>'+
                    '</div></a></li>';
            }
            $mainDiv.append(html);
        },
        scrollHandler: function () {
            var pageH = $(document).height()
            var scrollT = $(window).scrollTop(); //滚动条top   
             var winheight=$(window).height();							//这个为了防止ajax多次调用
           if (parseInt(scrollT)+parseInt(winheight)+50>=parseInt(pageH) && commonObj.ajaxstatus) {
                if($("#pagenumlength").val()=="1"){
               commonObj.ajaxstatus=false;
               commonObj.currentpage++;
                commonObj.getData(commonObj.currentpage)
            }else{
                return
            }
            }
        },
        /*
         * 加商品数量
         */
        addnums:function(){
            var number=parseInt($(this).prev().val());
            if(!isNaN(number)){
                if(number<1){
                    number=1;
                }else{
                  number+=1; 
                }
            }else{
                number=1

            }
           $(this).prev().val(number);
           commonObj.alljifen();
        },
        /*
         * 减商品数量
         */
        reducenums:function(){
            var number=parseInt($(this).next().val());
            if(!isNaN(number)){
                if(number<2){
                    number=1;
                }else{
                    number-=1;
                }
            }else{
                number=1
            }
            $(this).next().val(number);
            commonObj.alljifen();
        },
        /*
         * 添加到购物车
         */
        addCart:function(){
        	var number=Number($("#cartnumbers").val());
        	var num=Number($("#goodsnum").text());
            $("#goodsnum").text(num+number);
            $("#goodsnum").show();
            $(".zhezhao").css({ display : "block", height : $(document).height()});
			$(".zhezhao").show();
			$(".add-cart-tip-layer").show();
        },
        address_huitian:function(){
            var name=$(this).parents("li").find(".name").text();
            var phone=$(this).parents("li").find(".phone").text();
            var allAddress=$(this).parents("li").find(".all-address").html();
            var addressArray=allAddress.split("&nbsp;");
            var s1=addressArray[0];
            var s2=addressArray[1];
            var s3=addressArray[2];
            var addressinfo=addressArray[3];
            $("#consignee").val(name);
            $("#s1").val(s1);
            $("#s1").trigger("change");
            $("#s2").val(s2);
           $("#s2").trigger("change");
            $("#s3").val(s3);
            $("#address").val(addressinfo);
            $("#phone_mob").val(phone);

        },
        /*
         * 收货地址管理
         */
        addAddress:function(){
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
					'<div class="adr-btm"><div class="adr-btm-left"><input id="defaultAddr" class="adr-chk" type="checkbox" /><label for="defaultAddr">默认地址</label></div><div class="adr-btm-right"><a href="javascript:;"><img src="images/icon-14.png" /><label class="editAddress">编辑</label></a><a href="javascript:;"><img src="images/icon-15.png" /><label class="deleteaddress">删除</label></a></div><div class="clean"></div></div></div>';
        	if($.trim(name)!="" && $.trim(adddetailAddress)!=""&& $.trim(s1)!=""&& $.trim(phone)!=""){
        		if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
        		$("#prompt").text("请输入正确手机号");
        	}else{
        		$(".adr-box").append(addAddressHtml);
        		$(".adr-box").css("display","block");$("#address_add").css("display","none");
        		$("#sug-block").css("display","block"); 
        		$("#addAddress").val("+ 添加新的地址");
        		commonObj.clearAddress(); 
        	}
        	}else{
        		$("#prompt").text("所填资料不能为空");
        	}
        },
        deleteAddress:function(){
        	$(this).parents(".adr-block").remove();
        },
        editAddress:function(){
        	var  flag=true;
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
				commonObj.addAddress();
    		});
        },
        clearAddress:function(){
            $("#adduserName").val("");
            $("#adduserPhone").val("");
            $("#s1").val("");
            $("#s2").val("");
            $("#s3").val("");
            $("#adddetailAddress").val("");
        },
      
        
        
        
        
        
	}
})