function toggle_login() {
	if($('#login').hasClass('right')) {
		$('#login').removeClass('right');
		$('#login').addClass('center');
	} else {
		$('#login').removeClass('center');
		$('#login').addClass('right');
	}
}

function toggle_registration() {
	if($('#registration').hasClass('right')) {
		$('#registration').removeClass('right');
		$('#registration').addClass('center');
	} else {
		$('#registration').removeClass('center');
		$('#registration').addClass('right');
	}
}

function toggle_menu() {
	if($('#main').hasClass('right')) {
		$('#main').removeClass('right');
		$('#main').addClass('center');
	} else {
		$('#main').removeClass('center');
		$('#main').addClass('right');
	}
}

function toggle_settings() {
	if($('#main').hasClass('left')) {
		$('#main').removeClass('left');
		$('#main').addClass('center');
	} else {
		$('#main').removeClass('center');
		$('#main').addClass('left');
	}
}

function load_menu() {
	// store menu-url to load in variable
	var url = 'http://www.lunchbestallning.se/app/todays-menu.php?company=' + localStorage.getItem("company");

	// load data from url and add slick slider to menu-slider
	$.get(url, function(data){
		console.log(data);
		$('#todays-menu').empty();
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
	$('#order-request').val('');

	// load confirm message text
	$('.order-message p').empty();
	$('.order-message p').append('Vänligen bekräfta beställning av <span>' + course_description + '</span>');

	// show confirm message
	$('.order-overlay').fadeIn(250);
}
function place_order() {
	// store variables
	var course_id = $('#order-course').val();
	var course_request = $('#order-request').val();
	var url = 'http://www.lunchbestallning.se/app/place_order.php';
	var data = { "course_id": course_id, "request": course_request, "username": localStorage.getItem("username"), "employee_number": localStorage.getItem("employee_number") };

	// send order
	$.ajax({
		url: url,
		data: data,
		dataType: "json",
		type: "GET",
		complete: function(data) {
			// hide order overlay
			$('.order-overlay').fadeOut(250);
			$('#order-request').val('');
			$('#order-course').val('');

			// display server message
			console.log(data);

			// check response
			if ( data.status >= 200 && data.status < 300 || data.status === 304 ) {
				// check response
				if(data.responseJSON.result == 'success') {
					// show success message
					$('.success-message p').empty();
					$('.success-message p').append('Din beställning har fått ordernummer: <b>' + data.responseJSON.order_number + '</b> och du kommer bli meddelad så fort den är bekräftad.');
					$('.success-message').show('drop', { direction: "right" }, 500);
				} else {
					// show error message
					$('.error-message p').empty();
					$('.error-message p').append('Ett fel inträffade när din beställning skulle läggas.<br><b>Vänligen försök igen!</b>');
					$('.error-message').show('drop', { direction: "right" }, 500);
				}
			} else {
				// show error message
				$('.error-message p').empty();
				$('.error-message p').append('Ingen anslutning till servern.<br><b>Vänligen kontrollera din anslutning till internet.</b>');
				$('.error-message').show('drop', { direction: "right" }, 500);
			}
		}
	});
}
function hide_message() {
	$('.order-overlay').fadeOut(250);
	$('#order-request').val('');
	$('#order-course').val('');
}
$('.error-message').click(function() {
	// hide message
	$(this).hide('drop', { direction: "left" }, 500);
});
$('.success-message').click(function() {
	// hide message
	$(this).hide('drop', { direction: "left" }, 500);
});
$('.menu-loader').click(function() {
	// store selected date
	var picked_date = $('.calendar').pickmeup('get_date', true);
	// store menu-url to load in variable
	var url = 'http://www.lunchbestallning.se/app/load-menu.php?company=' + localStorage.getItem("company") + '&date=' + picked_date;
	// load data from url and add slick slider to menu-slider
	$.get(url, function(data){
		console.log(data);
		$("#loaded-menu").removeClass();
		$('#loaded-menu').empty();
		$('#loaded-menu').append(data);
		$('#loaded-menu').slick({
			arrows: false,
			dots: true
	  	});
	});
});
$(function () {
	$('.calendar').pickmeup({
		flat: true,
	    format  : 'Y-m-d'
	});
});