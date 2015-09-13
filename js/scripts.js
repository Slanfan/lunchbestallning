$(document).ready(function() {
	if(localStorage.getItem("company") != null) {
		// nothing
	} else {
		load_menu();
	}
});

$(function () {
	$('.calendar').pickmeup({
		flat: true,
	    format  : 'Y-m-d'
	});
});

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

function show_settings() {
	if($('#main .start').hasClass('slidedRight')) {
		$('#main .start').animate({
			left: 0 + 'vw'
		}, 200);
		$('#main .start').removeClass('slidedRight');
		setTimeout(function() {
	 		$('#main .settings').toggle();
	 	}, 210);
	} else {
		$('#main .settings').toggle();
		$('#main .start').animate({
			left: 86 + 'vw'
		}, 200);
		$('#main .start').addClass('slidedRight');
	}
}

function show_menu() {
	if($('#main .start').hasClass('slidedLeft')) {
		$('#main .start').animate({
			left: 0 + 'vw'
		}, 200);
		$('#main .start').removeClass('slidedLeft');
	 	setTimeout(function() {
	 		$('#main .menu').toggle();
	 	}, 210);
	} else {
		$('#main .menu').toggle();
		$('#main .start').animate({
			left: -86 + 'vw'
		}, 200);
		$('#main .start').addClass('slidedLeft');
	}
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
