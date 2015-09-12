$(document).ready(function() {
	if(localStorage.getItem("company") != null) {
		// nothing
	} else {
		load_menu();
	}
});

function load_menu() {
	// store menu-url to load in variable
	var url = 'http://www.lunchbestallning.se/app/todays-menu.php?company=' + localStorage.getItem("company");

	// load data from url and add slick slider to menu-slider
	/*
	$('#todays-menu').load(url, function(){
		$('#todays-menu').slick({
			arrows: false,
			dots: true
	  	});
	});
	*/
	$('#todays-menu').append('<div class="menu-item"><div class="menu-item-container"><div class="image-wrapper"><img src="img/menu-icons/menu-fisk.png" /></div><p>Fisk och skaldjursgryta med aioli och krutonger</p></div></div><div class="menu-item"><div class="menu-item-container"><div class="image-wrapper"><img src="img/menu-icons/menu-soppa.png" /></div><p>Ärtsoppa med fläsk samt pannkakor</p></div></div><div class="menu-item"><div class="menu-item-container"><div class="image-wrapper"><img src="img/menu-icons/menu-vilt.png" /></div><p>Viltskav med potatispuré och svartvinbärsgelé</p></div></div>')
}