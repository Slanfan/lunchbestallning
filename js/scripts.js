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
	$.get(url, function(data){
		console.log(data);
		$('#todays-menu').append(data);
		$('#todays-menu').slick({
			arrows: false,
			dots: true
	  	});
	});
}

function place_order(course_id) {

	alert('place order on course: ' + course_id);

}