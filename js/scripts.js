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