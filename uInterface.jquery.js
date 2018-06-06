$(document).ready(function() {
// создание трея
	$("body").append("<div id=\"uSystemTrayBox\"><div id=\"uOpenLinksBlock\"><div></div>");
	$("body, body *").disableTextSelection();
	var uBgImgWidth = $(document).width();
	var uBgImgHeight = $(document).height();
	$("#bodyBackground").css({"background-size": uBgImgWidth + "px " + uBgImgHeight + "px"});
	
	
	$("#uSystemTrayBox, #uOpenLinksBlock, #uLinksBlock").bind('contextmenu', function(e){
			e.preventDefault();
			//alert('hi there!');
			return false;
	});
	$("#uSystemTrayBox").css({"position" : "fixed","top" : "0px",	"left" : "-2px",	"border" : "2px solid #FF6600",	"padding" : "0px",	"width" : "100%",	"background-color" : "#333333",	"z-index" : "9999"});
	addLinksBlock();
	
	uClock();
	uUserMenu();
	
});

var zIndex = 0;
var focusWindow;

function setWindowFocus(idName) {
	zIndex++;
	$(".uMainFrame").parent().css({"background-color":"rgba(51,51,51,0.5)"});
	$("#" + idName).css({"z-index":zIndex, "background-color":"rgba(51,51,51,0.95)"});
	$("#uSystemTrayBox .uHiddenWindow").css({"background-color": "#666666"});
	$("#uHiddenWindow"+idName).css({"background-color": "#AAAAAA"});
	focusWindow = idName;
}

var uWindow = function(idName, windowName, image, pX, pY, Width, Height, Content) {

	if($("#" + idName + " .uSystemPanel").size() > 0) {
		$("#" + idName).show();
		$("#uHiddenWindow"+idName).show();
		setWindowFocus(idName);
		return;
	}
	
	if ($("#"+idName).size() == 0) {
		$("body").append("<div id=\"" + idName+ "\"></div>");
	}
	
	setWindowFocus(idName);
	
	$("#" + idName).fadeIn();
	
	// сохранение исходных данных
	var wndIdName = idName;
	var wndName = windowName;
	var wndImage = image;
	var wndX = pX;
	var wndY = pY;
	var wndWidth = Width;
	var wndHeight = Height;
	zIndex++;
	// извлечение контента из элемента
		var content = $("#"+ idName).html();
		if (Content != "") content = Content;
	// создание окошка
		// добавление внутреннего каркаса
		$("#" + idName).html("<div class=\"uSystemPanel\"><div class=\"uSystemPanelControls\"><ul><li>_</li><li>&#8660;</li><li>x</li></ul></div><div class=\"uSystemPanelText\">"+windowName+"</div></div><div class=\"uMainFrame\"></div>");
		// стилизация родительского блока
		$("#" + idName).css({"z-index":zIndex,"position": "absolute","top": pX+"px","left": pY+"px","width": Width+"px","height": Height+"px","border": "2px solid #FF6600","padding": "0px","background": "url("+image+") no-repeat","background-color": "rgba(51,51,51,0.95)","border-radius": "5px"});
		// стилизация блока с контентом
		$("#" + idName + " .uMainFrame").css({"width": Width - 8 + "px","height": Height - 35 + "px","border": "1px solid black","margin": "0px 0px 0px 3px","padding": "0px","background-color": "white","overflow": "scroll"});
		// стилизация системной панели
		$("#" + idName + " .uSystemPanel").css({"width": "100%","height": "30px","cursor": "default"});
		// стилизация блока системных кнопок
		$("#" + idName + " .uSystemPanelControls").css({"float": "right", "margin":"0px 0px 0px 0px"});
		// общий стиль системных кнопок
		$("#" + idName + " .uSystemPanelControls li").css({"background-color": "rgba(150,150,150,1)", "color" : "white", "font-weight": "bold", "float": "left","border": "1px solid black","border-left": "0px","border-top": "0px", "border-bottom":"2px solid #FF6600", "width": "30px","height": "20px","text-align": "center"});
		// кнопка сворачивания
		$("#" + idName + " .uSystemPanelControls li:eq(0)").css({"border-left": "2px solid #FF6600","border-radius": "0px 0px 0px 5px"});
		// стилизация кнопок сворачивания и развертывания при наведении курсора мыши
		$("#" + idName + " .uSystemPanelControls li:eq(0), #" + idName + " .uSystemPanelControls li:eq(1)").mouseover(function() {$(this).stop().animate({"background-color": "#0066FF"});});
		$("#" + idName + " .uSystemPanelControls li:eq(0), #" + idName + " .uSystemPanelControls li:eq(1)").mouseout(function() {$(this).stop().animate({"background-color": "#999999"});});
		// кнопка закрытия
		$("#" + idName + " .uSystemPanelControls li:eq(2)").css({"border-right": "0px", "width" : "50", "border-radius":"0px 3px 0px 0px"});
		// стилизация кнопки закрытия при наведении курсора мыши
		$("#" + idName + " .uSystemPanelControls li:eq(2)").mouseover(function() {$(this).stop().animate({"background-color": "#FF0000"});});
		$("#" + idName + " .uSystemPanelControls li:eq(2)").mouseout(function()  {$(this).stop().animate({"background-color": "#999999"});});
		$("#" + idName + " .uSystemPanelText").css({color:"#FFFFFF","line-height" : "30px", "vertical-align":"middle","text-shadow": "0px 0px 10px white, 0px 0px 10px white","float": "left","height": "30px","margin-left": "35px","font-size": "15px","vertical-align": "middle"});
		// добавление контента в блок контента
		$("#" + idName + " .uMainFrame").html(content);
		// добавление возможности перетаскивания окошка за системную панель
		$("#" + idName).draggable({
			handle : ".uSystemPanel", 
			containment: 'window', 
			stop: function(event, ui) { 
				var val = $("#uSystemTrayBox").height();
				if (ui.position.top < val)  
					$("#" + idName).animate({"top" : val + "px"});
			}
		});
	// установление событий основным элементам управления.
		// установления фокуса на выбранное окно, при помощи z-index
		$("#" + idName).mousedown(function() {
			setWindowFocus(idName);
		});
		// закрытие окна и его удаление
		$("#" + idName + " .uSystemPanelControls li:eq(2)").click(function() {
			// при помощи метода "parent" обращаемся к главному элементу, потом прячем и удаляем.
			$(this).parent().parent().parent().parent().fadeOut(function() {$(this).hide();});
			// удаляем из трея связывающую кнопку
			$("#uHiddenWindow"+idName).hide();
		});
		// клик по кнопке сворачивания
		$("#" + idName + " .uSystemPanelControls li:eq(0)").click(function() {
			$(this).parent().parent().parent().parent().fadeToggle();
		});
		// клик по кнопке разворачивания
		$("#" + idName + " .uSystemPanelControls li:eq(1)").click(function() {
			// выбираем ширину и высоту окна
			var windowWidth = $(window).width() - 4;
			var windowHeight = $(window).height() - 43;
			var wndW = $("#" + idName).width();
			var wndH = $("#" + idName).height();
			var pos = $("#" + idName).position();
			//var thisText = $(this).text();
			if (windowWidth != wndW || windowHeight != wndH) {
				pX = pos.top; pY = pos.left;
				$("#" + idName).animate({"width":windowWidth, "height":windowHeight, "top": 39, "left": 0});
				$("#" + idName + " .uMainFrame").animate({"width":windowWidth - 8, "height":windowHeight - 35});
				$("#" + idName).draggable( 'disable' );
				$(this).html("&#8658;&#8656;");
			}
			else {
				$("#" + idName).animate({"width":wndWidth, "height":wndHeight, "top": pX, "left": pY});
				$("#" + idName + " .uMainFrame").animate({"width":wndWidth - 8, "height":wndHeight - 35});
				$("#" + idName).draggable( 'enable' );
				$(this).html("&#8660;");
			}
		});
		
	// making system tray icon
		addWindowTrayBox(idName, windowName);
		

		$("#" + idName + " .uSystemPanel").bind('contextmenu', function(e){
			e.preventDefault();
			//alert('hi there!');
			return false;
		});
	}

function addWindowTrayBox(idName, windowName) {
		$("#uSystemTrayBox").append("<div id=\"uHiddenWindow"+idName+"\" class=\"uHiddenWindow\">"+windowName+"</div>");
		$("#uHiddenWindow"+idName).css({ "line-height" : "38px", "vertical-align":"middle", "border": "2px solid #FF3300", "border-bottom" : "0px", "border-top" : "0px", "margin" : "0px 1px 0px 1px", "text-shadow": "0px 0px 10px white, 0px 0px 10px white","padding" : "0px 5px 0px 5px", "width": "110px","height": "38px","float": "left","margin-left": "2px","overflow": "hidden","background-color": "#AAAAAA", "cursor":"default", "border-radius": "0px"});
		$("#uHiddenWindow"+idName).attr("alt",idName);
		$("#uHiddenWindow"+idName).click(function() {
			var WNDID = $("#uHiddenWindow"+idName).attr("alt");
			zIndex++;
			if (WNDID == focusWindow) {
				$("#" + WNDID).fadeToggle(function() {
				$(".uMainFrame").parent().css({"background-color": "rgba(51,51,51,0.5)"});	
					$("#" + WNDID).css({"z-index":zIndex, "background-color": "rgba(51,51,51,0.95)"});
				});
			} else {
				$("#" + WNDID).fadeIn();
				setWindowFocus(WNDID);
			}
		});
		$("#uHiddenWindow"+idName).mouseover(function() {
			$(this).stop().animate({"background-color": "#AAAAAA"});
		});
		$("#uHiddenWindow"+idName).mouseout(function() {
			$(this).stop().animate({"background-color": "#666666"});
		});
		
}

function addLinksBlock() {
	var linksVal = $("#uLinksBlock li").size() * 44;
	//var curTop = 0;
	var blockHeight = $(window).height();
	var alowedTopVal = 0 - (linksVal - blockHeight);

	$("#uOpenLinksBlock").css({"margin" : "0px 20px 0px 0px", "float" : "left", "border-right" : "2px solid #FF6600","width" : "38px","height" : "38px","z-index" : 99999,"background-color" : "#00FF99"});

	$("#uOpenLinksBlock").mouseover(function() {
		$(this).stop().animate({"background-color" : "#00FFFF"});
	});
	
	$("#uOpenLinksBlock").mouseout(function() {
		$(this).stop().animate({"background-color" : "#00FF99"	});
	});
	
	$("#uOpenLinksBlock").click(function() {
		$("#uLinksBlock").animate({"left" : "0px"}, function() {
			$("#uSystemTrayBox").animate({"left":"298px"});
		});
	});
	
	$("#uLinksBlock").css({"background-color":"#333333", "position" : "fixed","top" : "0px","left" : "-300px","width" : "300px","height" : "100%","overflow" : "hiden","z-index" : 999999,"cursor" : "default"});
	$("#uLinksBlock div").css({position:"relative", top:0});
	$("#uLinksBlock").mousewheel(function(elem, delta) {
	var curTop = parseInt($("#uLinksBlock div").css("top"));
		switch( delta ) {
		case -1: 
			if ( curTop > (alowedTopVal - 132) ) {
				curTop -= 35;
				$("#uLinksBlock div").css({top:curTop});
			}
			break;
		
		case 1:
			if (curTop < 0) {
				curTop += 35;
				$("#uLinksBlock div").css({top:curTop});
			}
			break;
		}
	});
	
	$("#uLinksBlock li").css({color : "#FFFFFF", "border" : "2px solid #FF6600","border-top" : "0px","height" : "40px","padding-left" : "50px","background" : "url(test.png) no-repeat","background-size" : "40px 40px","vertical-align" : "middle","line-height" : "40px"});
	
	$("#uLinksBlock li").mouseover(function() {
		$(this).stop().animate({"background-color" : "#00FFFF", color : "#000000"}, 300);
	});

	$("#uLinksBlock li").mouseout(function() {
		$(this).stop().animate({"background-color" : "#FFFFFF"}, 300, function () {
			$(this).animate({"background-color" : "#333333", color : "#FFFFFF"}, 300);
		});
	});
	
	$("#uLinksBlock").mouseleave(function() {
		$("#uLinksBlock").animate({"left" : "-300px"}, function() {
			$("#uSystemTrayBox").animate({"left":"-2px"}, function() {
				$("#uLinksBlock div").css({top:0});
				$("#uLinksBlock li").css({"background-color":"#333333"});
			});
		});
	});
	
	/*
	$("#uHide").css({"background-color" : "#9999FF", "border" : "3px solid #FF6600","border-top" : "0px","height" : "40px","padding-right" : "30px","text-align" : "right","vertical-align" : "middle","line-height" : "40px"});
	
	$("#uHide").mouseover(function() {
		$(this).stop().animate({"background-color" : "#00FF99"}, 200);
	});
	
	$("#uHide").mouseout(function() {
		$(this).stop().animate({"background-color" : "#9999FF"}, 200);
	});
	
	$("#uHide").click(function() {
		$("#uLinksBlock").animate({"left" : "-300px"}, function() {
			$("#uSystemTrayBox").animate({"left":"-2px"});
		});
	});
	
	*/

}

function uClock() {
	$("body").append("<div id=\"uClock\"></div>");
	$("body").append("<div id='uBorderLeft'></div> <div id='uBorderRight'></div> <div id='uBorderBottom'></div>");
	$("#uClock").append("<div>00</div> <div>:</div> <div>00</div> <div>:</div> <div>00</div>");
	// определяем массивы имен для месяцев и дней недели
    var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
    var dayNames= ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"]
	// создаем новый объект для хранения даты
    var newDate = new Date();
	// извлекаем текущую дату в новый объект
    newDate.setDate(newDate.getDate());
    // выводим день число месяц и год
    $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
 
    setInterval( function() {
        // создаем новый объект для хранения секунд
        var seconds = new Date().getSeconds();
        // добавляем отсутствующий ноль
        $("#uClock div:eq(4)").html(( seconds < 10 ? "0" : "" ) + seconds);
    },1000);
 
    setInterval( function() {
        // создаем новый объект для хранения минут
        var minutes = new Date().getMinutes();
        // добавляем отсутствующий ноль
        $("#uClock div:eq(2)").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
 
    setInterval( function() {
        // создаем новый объект для хранения часов
        var hours = new Date().getHours();
        // добавляем отсутствующий ноль
        $("#uClock div:eq(0)").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
}

// uWeather
(function( $ ) {
  $.fn.uWeather = function() {
	var idName = this.attr("id");
	$.ajax({
		url: "jquery.simpleWeather/uWeather.simpleWeather.html",
		cache: false,
		success: function(data){
			new uWindow(idName, "Weather", "test.png", 300, 300, 750, 500, data);
			getWeather();
			$("#"+idName+" .uMainFrame").css({"background-color" : "#333333", "overflow":"hidden" });
		}
	});
  };
})( jQuery );

// uActiveLink
(function( $ ) {
  $.fn.uActiveLink = function(posX, posY) {
	var idName = this.attr("id");
	$("#"+idName).attr("class","uActiveLink");
	$("#"+idName).css({left:posX, bottom: posY});
	$("#"+idName).mouseenter(function() {
		$(this).stop().animate({bottom: -2}, 200);
	});
	$("#"+idName).mouseleave(function() {
		$(this).stop().animate({bottom: -20}, 200);
	});
  };
})( jQuery );

function uFastLink(URL, name) {
	var index = $("body .uFastLink").size();
	$("body").append("<div class='uFastLink'></div>");
	$("body .uFastLink:eq("+index+")").append("<div class='uFastLinkBorder'><div class='uFastLinkHead'></div><div class='uFastLinkTitle'>"+name+"</div></div>");
	$("body .uFastLink:eq("+index+") .uFastLinkTitle").click(function () {
		window.open(URL);
	});
	$("body .uFastLink:eq("+index+")").draggable({handle : ".uFastLinkHead",stop: function(event, ui) { 
				var val = $("#uSystemTrayBox").height();
				if (ui.position.top < val)  
					$(this).animate({"top" : val + "px"});
			}});
}

function uUserMenu() {
	$("body").append("<div id='uUserMenu'><div class='uUserMenuTitle'>User Menu</div></div>");
	$("#uUserMenu").append("<div class='uUserMenuContainer'></div>");
	$("#uUserMenu .uUserMenuContainer").append("<ul></ul>");
	$("#uUserMenu ul").append("<li>Create web link</li>");
	$("#uUserMenu li:eq(0)").click(function() {
		var URL = prompt("Enter the URL of the web site");
		if (!URL) return;
		var name = prompt("Enter link name");
		uFastLink(URL, name);
	});
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	$("#uUserMenu ul").append("<li>Menu item 2</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	$("#uUserMenu ul").append("<li>Menu item 3</li>");
	var count = $("#uUserMenu li").size();
	$("#uUserMenu div").css({height: count * 30 + 12});
	
	$("#uUserMenu .uUserMenuTitle").click(function() {
		var count = $("#uUserMenu li").size();
		$("#uUserMenu .uUserMenuContainer").show();
		$("#uUserMenu .uUserMenuContainer li").css({opacity: 0, "background-color":"#333333"});
		$("#uUserMenu .uUserMenuContainer").animate({opacity:1, left: -2}, function() {
			for (var i = 0; i < count; i++) {
				$("#uUserMenu li:eq("+i+")").stop().delay(i*30).animate({opacity: 1});
			}
		});
		
	});
	
	$("#uUserMenu").mouseleave(function() {
		var count = $("#uUserMenu li").size();
		
		for (var i = 0; i < count; i++) {
			$("#uUserMenu li:eq("+i+")").stop().delay(i*30).animate({opacity: 0});
		}
		$("#uUserMenu .uUserMenuContainer").delay(30 * count).animate({opacity:0, left: -200},function() {
			$(this).hide();
		});
	});
	
	$("#uUserMenu li").mouseover(function() {
		$(this).stop().animate({opacity: 1},500);
		$(this).stop().animate({"background-color":"#666699", opacity:1},200);
	});
	
	$("#uUserMenu li").mouseout(function() {
		$(this).stop().animate({"background-color":"#444555"}, function() {
			$(this).animate({"background-color":"#333333"});
		});
	});
	
}

(function( $ ) {
  $.fn.uNexusBox = function() {
	var idName = this.attr("id");


	$("#uNexusBox").mouseenter(function() {
		$("#uNexusBox").stop().animate({right: -10});
	});
	
	$("#uNexusBox").mouseleave(function() {
		$("#uNexusBox").stop().animate({right: -82});
	});
	
	$("#uNexusBox li").mouseover(function() {
		$(this).stop().animate({right: 8},100);
	});
	
	$("#uNexusBox li").mouseleave(function() {
		$(this).stop().animate({right: 0},300);
	});
	
  };
})( jQuery );

jQuery.fn.extend({ 
    disableTextSelection : function() { 
            this.each(function() { 
                    this.onselectstart = function() { return false; }; 
                    this.unselectable = "on"; 
                    jQuery(this).css('-moz-user-select', 'none'); 
            }); 
    },
    enableTextSelection : function() { 
            this.each(function() { 
                    this.onselectstart = function() {}; 
                    this.unselectable = "off"; 
                    jQuery(this).css('-moz-user-select', 'auto'); 
            }); 
    }
});

