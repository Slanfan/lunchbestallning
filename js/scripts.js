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

function confirm_order(course_id, course_description) {
	// set course in form
	$('#order-course').val(course_id);
	$('#order-request').val();

	// load confirm message text
	$('.order-message p').empty('');
	$('.order-message p').append('Vänligen bekräfta beställning av <b>' + course_description + '<b>');

	// show confirm message
	$('.order-overlay').fadeIn(250);

}

function place_order() {
	// store variables
	var course_id = $('#order-course').val();
	var course_request = $('#order-request').val();

	alert('Courseid: ' + course_id + ' - Request: ' + course_request);

	$('.order-overlay').fadeOut(250);
	$('#order-request').val();
	$('#order-course').val();
}

function hide_message() {
	$('.order-overlay').fadeOut(250);
}