function add_swipe_to(selector) {  
	$(selector).swipe("destroy");
	$(selector).swipe({

        swipeStatus: function(event, phase, direction, distance, duration, fingerCount) {
		console.log(distance);
			if (phase == "move") {
				if (direction == "left") {
					$(this).css({
						'left' : (distance*-1)+'px'
					});  
				}
			} 
			else if (phase == "cancel") {
				$(this).animate({
					'left' : 0
				}, 300);
			} 
			else if (phase == "end") {
				if (direction == "left") {
					$(this).animate({
						'left' : '-60vw'
					}, 200);
				}
			} 
			else {
				//???
			}
		},
		threshold: 75,
		maxTimeThreshold: 5000,
		fingers: 'all',
		allowPageScroll: 'vertical'
	});
};
$('#order-history').delegate('.action', 'click', function() {
	var action = $(this).data('action');
	var order_id = $(this).data('order_id');
	var url = 'http://www.lunchbestallning.se/app/cancel_order.php';
	var data = { "order_id": order_id };
	var $selector = $(this);

	switch (action) {
		case 'cancel':
			// send order
			$.ajax({
				url: url,
				data: data,
				dataType: "json",
				type: "GET",
				complete: function(data) {
					// check response
					if ( data.status >= 200 && data.status < 300 || data.status === 304 ) {
						// check response
						if(data.responseJSON.result == 'success') {
							// remove element
							$selector.closest('.swipe-wrapper').remove();
							console.log('Order: ' + order_id + ' canceled!');
						} else {
							// show error message
							navigator.notification.alert(
								'Ett fel inträffade när din beställning skulle läggas.\nVänligen försök igen!',
								alertDismiss,
								'Beställning',
								'Stäng'
							);
						}
					} else {
						// show error message
						navigator.notification.alert(
								'Ingen anslutning till servern.\nVänligen kontrollera din anslutning till internet.',
								alertDismiss,
								'Beställning',
								'Stäng'
							);
					}
				}
			});
			break;
		case 'hide':
			// code here
			break;
	}
});
function toggle_main_menu() {
	if($('.main-menu-container').hasClass('down')) {
		$('.main-menu-container').removeClass('down');
		$('.main-menu-container').addClass('up');
		$('.menu-arrow').addClass('up');
	} else {
		$('.main-menu-container').removeClass('up');
		$('.main-menu-container').addClass('down');
		$('.menu-arrow').removeClass('up');
	}
}
function toggle_login() {
	if($('#login').hasClass('right')) {
		$('#login').removeClass('right');
		$('#login').addClass('center');
	} else {
		$('#login').removeClass('center');
		$('#login').addClass('right');
	}
}
function toggle_about() {
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
		$('.main-menu-button-right').removeClass('full-height');
	} else {
		$('#main').removeClass('center');
		$('#main').addClass('right');
		$('.main-menu-button-right').addClass('full-height');
	}
}
function toggle_settings() {
	if($('#order-history').html() == '') {
		console.log('History is empty');
		load_order_logg();
	} else {
		console.log('History is loaded');
	}
	
	if($('#main').hasClass('left')) {
		$('#main').removeClass('left');
		$('#main').addClass('center');
		$('.main-menu-button-left').removeClass('full-height');
	} else {
		$('#main').removeClass('center');
		$('#main').addClass('left');
		$('.main-menu-button-left').addClass('full-height');
	}
}
function load_user_data() {
    $('#employee-company').html(localStorage.getItem("company"));
    $('#employee-number').html(localStorage.getItem("employee-number"));
    $('#employee-name').html(localStorage.getItem("employee-name"));
    $('#employee-email').html(localStorage.getItem("employee-email"));
}
function load_order_logg() {
	// store url to load data from
	var url = 'http://www.lunchbestallning.se/app/get-order-history.php?employee_number=' + localStorage.getItem("employee-number");
	// load data from url and add to container
	$.get(url, function(data){
		console.log(data);
		$('#order-history').empty();
		$('#order-history').append(data);
		add_swipe_to(".swipeable");
	});	
}
function load_more(start_num) {
	// remove last li from history orders (load button)
	$('.load-more').remove();
	// store url to load data from
	var url = 'http://www.lunchbestallning.se/app/get-order-history-more.php?employee_number=' + localStorage.getItem("employee-number") + '&row_num=' + start_num;
	// load data from url and add to container
	$.get(url, function(data){
		console.log(data);
		$('#history-orders').append(data)
		add_swipe_o(".swipeable");
	});
}
function zeroPad(num, places) {
	var zero = places - num.toString().length + 1;
	return Array(+(zero > 0 && zero)).join("0") + num;
}
function load_menu() {
	// store month variables
	var month_names = ["januari", "februrari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
	var month_numbers = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	// get time
	var menu_date = '';
	var today = new Date();
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	$('#todays-menu-date .text').empty();
    if(today.getHours() > 9) {
    	$('#todays-menu-date .text').append('meny ' + tomorrow.getDate() + ' ' + month_names[tomorrow.getMonth()]);
    	menu_date = tomorrow.getFullYear() + '-' + month_numbers[tomorrow.getMonth()] + '-' + zeroPad(tomorrow.getDate(), 2);
    } else {
    	$('#todays-menu-date .text').append('meny ' + today.getDate() + ' ' + month_names[today.getMonth()]);
    	menu_date = today.getFullYear() + '-' + month_numbers[today.getMonth()] + '-' + zeroPad(today.getDate(), 2);
    }

	// store menu-url to load in variable
	var url = 'http://www.lunchbestallning.se/app/todays-menu.php?company=' + localStorage.getItem("company") + '&date=' + menu_date;

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
	var msg = 'Vänligen bekräfta beställning av "' + course_description + '"';
	// show dialog
	navigator.notification.prompt(
		msg, 
		onPrompt, 
		['Beställ lunch?','test'],
		['Beställ', 'Avbryt'], 
		'Önskelmål?'
	);
}
function onPrompt(results) {
	// 1 = order | 2 = cancel
    if(results.buttonIndex == 1) {
    	var course_id = $('#order-course').val();
    	var course_request = results.input1;
		place_order(course_id, course_request);
    } else {
    	// Nothing
    	$('#order-course').val('');
    }
}
function place_order(course_id, course_request) {
	// store variables
	var url = 'http://www.lunchbestallning.se/app/place_order.php';
	var data = { "course_id": course_id, "request": course_request, "username": localStorage.getItem("username"), "employee-number": localStorage.getItem("employee-number") };

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
					navigator.notification.alert(
						'Din beställning har fått ordernummer: ' + data.responseJSON.order_number + ' och du kommer bli meddelad så fort den är bekräftad.',
						alertDismiss,
						'Beställning',
						'Stäng'
					);
					load_order_logg();
				} else {
					// show error message
					navigator.notification.alert(
						'Ett fel inträffade när din beställning skulle läggas.\nVänligen försök igen!',
						alertDismiss,
						'Beställning',
						'Stäng'
					);
				}
			} else {
				// show error message
				navigator.notification.alert(
					'Ingen anslutning till servern.\nVänligen kontrollera din anslutning till internet.',
					alertDismiss,
					'Beställning',
					'Stäng'
				);
			}
		}
	});
}
function alertDismiss() {
	console.log('Dialog closed');
}
function hide_message() {
	$('.order-overlay').fadeOut(250);
	$('#order-request').val('');
	$('#order-course').val('');
}
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