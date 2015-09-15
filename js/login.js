$(document).ready(function() {
	//PushbotsPlugin.resetBadge(); /* uncomment before release */

	if(localStorage.getItem("username") != null) {
		console.log(localStorage.getItem("username"));
		$('#start').removeClass('visible');
		$('#start').addClass('hidden');
		load_menu();
		load_user_data();
	} else {
		// nothing, show login
	}
});

function login() {

	// uppdatera textinfo och visa loader
	$('.info-container').removeClass('hidden');
	$('.info-container').addClass('visible');
	$('#info-text').text('kontaktar server');

	// get input information
	var username = $('#username').val().toLowerCase();
    var password = $('#password').val();
    var data = {"username": username, "password": password};

    // connect to database to check login
    $.ajax({
    	url: 'http://www.lunchbestallning.se/app/login.php',
    	data: data,
    	dataType: "json",
    	type: "GET",
    	success: function() {
    		// update textinfo
    		$('#info-text').text('anslutning upprättad');
    	},
    	error: function() {
    		// update textinfo
    		$('#info-text').text('anslutning misslyckades');
    		// fade out info box
    		$('.info-container').addClass('hidden');
    		$('.info-container').removeClass('visible');
    	},
    	complete: function(data) {
    		console.log(data.responseJSON);
    		
    		// check returned data
    		if(data.responseJSON.result == 'success') {
    			// store user information locally
			    localStorage.setItem("username", username);
			    localStorage.setItem("company", data.responseJSON.company);
			    localStorage.setItem("employee-number", data.responseJSON.number);
			    localStorage.setItem("employee-name", data.responseJSON.fullname);
			    localStorage.setItem("employee-email", data.responseJSON.email);
			    PushbotsPlugin.setAlias(username);

    			// update textinfo and fade out box
    			$('#info-text').text('inloggning lyckades');
    			
    			// fade out start
    			$('#start').removeClass('visible');
				$('#start').addClass('hidden');
				$('#login').removeClass('visible');
				$('#login').addClass('hidden');
				
				// empty inputs and hide login and info
				setTimeout(function() {
					toggle_login();
					$('#username').val('');
					$('#password').val('');
					$('.info-container').addClass('hidden');
    				$('.info-container').removeClass('visible');
    				// load menu in main window
			    	load_menu();
			    	// load user data
			    	load_user_data();
				}, 2010);
    		} else {
    			// update textinfo and fade out box
    			$('#info-text').text('inloggning misslyckades, försök igen');
    			$('.info-container').addClass('hidden');
    			$('.info-container').removeClass('visible');
    		}
    	}
    });
}

function logout() {

	// remove stored userinformation
	localStorage.removeItem("username");
	localStorage.removeItem("company");
	localStorage.removeItem("employee-number");
	localStorage.removeItem("employee-name");
	localStorage.removeItem("employee-email");

	// hide login and hide main app
	$('#start').removeClass('hidden');
	$('#start').addClass('visible');
	$('#login').removeClass('hidden');
	$('#login').addClass('visible');
	setTimeout(function() {
		toggle_settings();
	}, 2010);
}