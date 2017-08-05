// Initialize app
function findElement(selector) {
    var box = null;
    return box = $(".page-on-center").length > 0 ? $(".view-main").find(".page-on-center " + selector) : $(".view-main").find(".page").find(selector);
}

function naxvarBg() {
    var navbar = $(".navbar-anim-on-scroll"), box = null, cls = "active";
    return 0 === navbar.length ? !1 : (box = $(".page-on-center").length > 0 ? navbar.next().find(".page-on-center .page-content") : navbar.next().find(".page .page-content"), 
    box.scrollTop() > 10 ? navbar.addClass(cls) : navbar.removeClass(cls), void box.scroll(function() {
        $(this).scrollTop() > 40 ? navbar.addClass(cls) : navbar.removeClass(cls);
    }));
}

var myApp = new Framework7({
    swipeBackPage: !1,
    pushState: !0,
    swipePanel: "left",
    modalTitle: "Title",
	init: false
}), $$ = Dom7;


var mainView = myApp.addView(".view-main", {
    dynamicNavbar: !0
});

$$(document).on("pageInit", function(e) {
    var page = e.detail.page;
	console.log('initialized');
		mainView.router.load({
		   url: 'pages/home.html',
		   ignoreCache: true,
		   reload: true
		});
	
	// index page
	if (page.name === 'indexpage') {
		console.log('Starting index page');	
	}
	
	// news home page
	if (page.name === 'home') {
	console.log('Starting home page');
		var indexText ="";
		$.ajax({
		  beforeSend: function() { myApp.showIndicator(); },
		  complete: function(){ myApp.hideIndicator(); },
		  url: "http://webhosting.sd/common7/getentries.php",
		  dataType: "jsonp",
		  jsonpCallback: "jsonCallback",
		  success: function jsonCallback(data){
					  $.each(data, function(i, field){
						if (data[i].imageurl =="null") {
							thisimageurl = "img/noimage.jpg";
						} else {
							thisimageurl= data[i].imageurl;
						}
						
						if (data[i].catid ==44) {
							catname="سياسية";
						} else if (data[i].catid ==46) {
							catname="إقتصادية";
						} else if (data[i].catid ==38) {
							catname="رياضية";
						} else if (data[i].catid ==43) {
							catname="ثقافة و فن";
						} else if (data[i].catid ==45) {
							catname="عالمية";
						} else if (data[i].catid ==42) {
							catname="تكنولوجيا";
						} else if (data[i].catid ==41) {
							catname="الأسرة و المجتمع";
						} else if (data[i].catid ==40) {
							catname="صحة و موضة";
						} else {
							catname="غير محدد";
						}
												
						indexText += '<article class="rtl">';
						indexText += '<div class="text">';
						indexText += '<h2>';
						indexText += '<a href="pages/details.html?getid=' + data[i].id +'">' + data[i].title + '</a>';
						indexText += '</h2>';
						indexText += '<span class="badge badge-secondary badge-square text-uppercase">' + catname + '</span>';
						indexText += '</div>';
						indexText += '<img width="100%" class="article-bg" src="' + thisimageurl + '" />';
						indexText += '</article>';
					  });
						$("#indexHtml").html(indexText);

					},
           error:function(XMLHttpRequest,textStatus,errorThrown){
				alert("Failed Loading Home");
           }
		});		
	}
	
	// newscat page
	if (page.name === 'newscat') {
	console.log('Starting newscat page');
	//var loadNews();
		$(function () {
		//var getid = window.location.hash.substring(16);
		var getid = page.query.getid;
		var htmlText ="";
		
				$.ajax({
						beforeSend: function() { myApp.showIndicator(); },
						complete: function(){ myApp.hideIndicator(); },
						url:'http://webhosting.sd/common7/getcat.php',
						data: {cat:getid},
						dataType: "jsonp",
						jsonpCallback: "jsonCallback",
						success:function jsonCallback(data){
							//$("#news").val(data);
							$.each(data, function(i, field){
								category=data[i].category;
								if (data[i].imageurl =="null") {
									thisimageurl = "img/noimage.jpg";
								} else {
									thisimageurl= data[i].imageurl;
								}
								htmlText += '<div class="card card-header-pic">';
								htmlText += '<div class="card-header color-white no-border" valign="bottom" style="background-image:url(\'' + thisimageurl + '\')">';
								htmlText += '<a href="pages/details.html?getid=' + data[i].id + '">' + data[i].title + '</a>';
								htmlText += '</div>';
								htmlText += '<div class="card-info">';
								htmlText += '<div class="row">';
								htmlText += '<div class="col-66 text-right">';
								htmlText += '<small>' + data[i].date + '</small>';
								htmlText += '</div>';
								htmlText += '</div>';
								htmlText += '</div>';
								htmlText += '<div class="card-content">';
								htmlText += '<div class="card-content-inner">';
								htmlText += '<p>' + data[i].content + '</p>';
								htmlText += '</div>';
								htmlText += '</div>';
								htmlText += '<div class="card-footer">';
								htmlText += '<a class="link" href="pages/details.html?getid=' + data[i].id + '"> إقرأ المزيد <span class="kkicon icon-chevron-left-square"></span></a>';
								htmlText += '</div>';
								htmlText += '</div>';
							});
							$("#category").html(category);
							$("#Results").html(htmlText);
							console.log(category);
							
						},
						error:function(XMLHttpRequest,textStatus,errorThrown){
							alert("Failed Loading News Category");
						}

					});
		});
	}

	// details page				
	if (page.name === 'details') {
	console.log('Starting details page');
		var getid = page.query.getid;
		var detailsText ="";
				$.ajax({
                    beforeSend: function() { myApp.showIndicator(); },
					complete: function(){ myApp.hideIndicator(); },
					url:'http://webhosting.sd/common7/entry.php',
					data: {getid:getid},
                    dataType: "jsonp",
					jsonpCallback: "jsonCallback",
                    success:function jsonCallback(data){
						//$("#news").val(data);
						$.each(data, function(i, field){
							if (data[0].imageurl ==null) {
								thisimageurl = "img/noimage.jpg";
							} else {
								thisimageurl= data[0].imageurl;
							}
		
							
							detailsText += '<img width="100%" src=\'' + thisimageurl + '\'>';
							detailsText += '<div class="article-data rtl">';
							detailsText += '<small class="rtl nudgeleft">';
							detailsText += '<span>' + data[0].date + '</span>';
							detailsText += '</small>';
							detailsText += '<h1 class="rtl nudgeleft">' + data[0].title + '</h1>';
							detailsText += '</div>';
							detailsText += '<div class="content-block mt-25 rtl">';
							detailsText += '<p>' + data[0].content + '</p>';
							detailsText += '</div>';
						});
						$("#detailsHtml").html(detailsText);
					},
                    error:function(XMLHttpRequest,textStatus,errorThrown){
                        alert("Failed Loading Details");
                    }
				});
	}
	/////////// end

	$(".zoom").swipebox(), $(".navbar").removeClass("navbar-clear"), "indexpage" !== page.name && "dashboard-1" !== page.name && "post" !== page.name && "menu" !== page.name && "login" !== page.name && "registration" !== page.name && "article" !== page.name && "splash" !== page.name || $(".navbar").addClass("navbar-clear");

}), $(document).ready(function() {
// enter here
myApp.init();
console.log('initialized with jquery');
window.location.href = "#!/pages/home.html";
});