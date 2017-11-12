
$(function(){

	$(mini_menu).draggable();
	dynamics();
  	onload();
  	
	
});

var ajax_url_email = "email.php";// ФАЙЛ ЗАПРОСА
var to = "info@altoendaewoo.ru"; // ОТПРАВКА ПИСЬМА

i = {
	// GOOGLE MAP INIT
	gm_content: '<h2>DAEWOO ALTOEN</h2>'+
					'<p>Адрес: МО., г. Долгопрудный, Промышленный проезд 14, офис 314</p>'+
					'<p>Телефон: +7(495)922-3765</p>'+
					'<p>E-mail: info@altoendaewoo.ru</p>',
	gm_title : 'Мы',
	gm_icon: 					"img/icons/marker.png",

	gm_marker_position_lat:  41.296781,
	gm_marker_position_lng:  69.226306,

	gm_position_lat: 			 41.2968543,
	gm_position_lng: 			 69.2080361
};











var back_div 		= "#back-div";
var header 			= "#header";
var mini_menu  	= "#nav-mini";
var btn_bars  		= "#btn-bars";
var btn_status 	= true;


function onload(){

	$("body").append("<div id='back-div'></div>"+
							"<div class='i-dialog'><p></p></div>");

	//CLICK ACCORDION (INDEX)
	$(".index .accordion").find("button").on("click", function(){
		$(this).siblings("button").find("i").removeClass("fa-minus")
		.addClass("fa-plus")
		$(this).find("i").toggleClass("fa-minus")
	});
	//CLICK ACCORDION (CONTACTS)
	$(".map-section .contacts-content").find("h1").on("click", function(){
		var th = this;
		var d = $(th).closest(".contacts-content");
		$(d).draggable();

		$(th).find("i").toggleClass("fa-minus").toggleClass("fa-plus");

		if( ($(th).find("i").hasClass("fa-plus")) )
			$(d).draggable( {disabled: false} );
		else
			$(d).draggable( {disabled: true} );

	});

	// BANNER ANIMATE
	$(".i-banner").css({"background-position": "50% 50%", "opacity": "1"});

	// BUTTON MENU-BAR
	$(btn_bars).on("click", function(){
		if(btn_status == true){	
			btn_status = false;
			$(mini_menu).slideToggle();
			shadowDiv($(btn_bars));
			setTimeout(function(){btn_status = true}, 400);
		}
	});
	$(mini_menu+" .btn-close").on("click", function(){
		$(btn_bars).trigger("click");
	});


	var header_status = false;
	//SCROLLING
	$( window ).on("scroll", function(){
		if($(window).scrollTop() > 110 && header_status == false){
			
			$("#header-container header").addClass("header-scroll")
			
			
			header_status = true; 

		}else if($(window).scrollTop() < 110 && header_status == true){

			$("#header-container header").removeClass("header-scroll")

			
			
			header_status = false;

		}

	})

}
// SEND FORM
function sendForm(th){

	this.onsubmit = function(e){ e.preventDefault();}
	var require = $(th).serialize();
	send(require+"&to="+to);

	$(th).find("input").val("");
}

function dynamics(){
	// AOS
	AOS.init({
	  offset: 0,
	  duration: 2000,
	  delay: 100
	});
	setTimeout(function(){AOS.refresh()}, 300)
	// WOW
	new WOW({
		boxClass:     'wow',      
		animateClass: 'animated', 
		offset:       0,         
		mobile:       true,      
		live:         true
		}).init();
	//	ACCORDION (INDEX)
	$( ".ques .accordion" ).accordion({
		animate: 600,
		header: "button",
		heightStyle: "content",
		active: 2,
		collapsible: true
	});
	// SLIDER (INDEX)
	$('.index-slider').fractionSlider({
		'fullWidth': 			true,
		'controls': 			true, 
		'pager': 				false,
		'responsive': 			true,
		'timeout' : 5200,
		'dimensions': 			"1170,490",
	   'increase': 			false,
		'pauseOnHover': 		false,
		'speedIn': 				3000,
		'speedOut': 			2000
	});
	//	ACCORDION (CONTACTS)
	$(".map-section .contacts-content").accordion({
		animate: 350,
		header: "h1",
		collapsible: true
	});
	//	CAROUSEL (CATALOG-IN)
	$('.carousel-main').flickity();
	$('.carousel-nav').flickity({
	  asNavFor: '.carousel-main',
	  contain: true,
	  pageDots: false
	});
}



function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: i.gm_position_lat, lng: i.gm_position_lng},
			disableDefaultUI: true,
			mapTypeId: 'terrain',
			styles: [
				{elementType: 'geometry', stylers: [{color: '#ececec'}]},
				{elementType: 'labels.text.fill', stylers: [{color: '#797979'}]},
				{elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
				{
					featureType: 'landscape.natural',
					elementType: 'geometry',
					stylers: [{color: '#f7f7f7'}]
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [{color: '#f7f7f7'}]
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry.fill',
					stylers: [{color: '#e5e5e5'}]
				},
				{
					featureType: 'road',
					elementType: 'geometry',
					stylers: [{color: '#ffffff'}]
				},
				{
					featureType: 'road.local',
					elementType: 'labels.text.fill',
					stylers: [{color: '#806b63'}]
				},
				{
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [{color: '#f7f7f7'}]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.fill',
					stylers: [{color: '#ffffff'}]
				},
				{
					featureType: 'transit.line',
					elementType: 'labels.text.stroke',
					stylers: [{color: '#ffffff'}]
				},
				{
					featureType: 'transit.station',
					elementType: 'all',
					stylers: [{visibility: 'off'}]
				},
				{
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [{color: '#ececec'}]
				}
			]
	});
	var marker = new google.maps.Marker({
		position: {lat: i.gm_marker_position_lat, lng: i.gm_marker_position_lng},
		map: map,
		icon: i.gm_icon,
		title: i.gm_title
	});
	var infoWindow = new google.maps.InfoWindow({
		content: i.gm_content
	});
	marker.addListener('click', function(){
		if (marker.getAnimation() !== null){
			infoWindow.open(map, marker);
			marker.setAnimation(null);
		}else{
			infoWindow.close(map, marker);
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}

	});

}//initMap end



function send(require){

	ajPost(ajax_url_email, require, function(data){
		switch(data*1){
			case 0:
				status = "Заполните все поля";break;
			case 1:
				status = "Ваше письмо успешно отправлено "/*+to*/;break;
			case 2:
				status = "Ваше письмо не удалось отправить";break;
			default: 
				status = "Временно не доступен";
		}
		shadowDiv();
		$(".i-dialog").css("display", "inline-table").find("p").text(status);
		$(back_div).click(function(){
			$(".i-dialog").css("display", "").find("p").text("");
			shadowDiv();
		});
	}, function(success){
	
	});
	
}

function inputCheked(form){
	var input = $(form+" input");
	for(var i=0; i<input.length;i++){
		if(input[i].value.length == 0)
			return false;
		else
			return true;
	}
}
function ajPost(u, d, s, c){
	$.ajax({
		type: "POST",
		url: u,
		data: d,
		success: s,
		statusCode: {
			404: function(){alert("Страница не найдена, Увы");}
		},
		complete: c
	});
}
 $.fn.disOpacity = function( time ){
 	var o = $(this);
 	if(o.css("display") == "none"){
 		o.css("display", "block");
 		setTimeout(function(){o.css("opacity", "1")}, 5);
 		return "none";
 	}else{
 		o.css("opacity", "0");
 		setTimeout(function(){o.css("display", "none");},time || 300);
 		return "block";
 	}
 }

function shadowDiv(el){
	div = $(back_div);
	if(div.disOpacity() == "none"){
		div.on("click", function(){
				if(el || null != null)
					el.eq(0).trigger("click");
				else
					console.log("no");
			
			});
	}else{
		div.off("click");
		div.disOpacity();
	}
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}
