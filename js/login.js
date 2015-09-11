
$(document).ready(function() {

	//PushbotsPlugin.resetBadge();

	if(localStorage.getItem("username") != null) {
		$('#main').show();
	} else {
		$('#start').show();
	}
});

function login() {

	// uppdatera textinfo och visa loader
	$('.info-box').show();
	$('#info-text').text('kontaktar server');


	// get input information
	var username = $('#username').val().toLowerCase();
    var password = $('#password').val();
    var ajaxResponse;
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
    	},
    	complete: function(data) {
    		var response = JSON.parse(data);
    		alert(response.result);
    		if(response.result == 'success') {
    			// store user information locally
			    localStorage.setItem("username", username);
			    localStorage.setItem("company", response.company);
			    localStorage.setItem("employee_number", response.number);
			    PushbotsPlugin.setAlias(username);
			    // PushbotsPlugin.resetBadge();
			    //Get device token
				PushbotsPlugin.getToken(function(token){
			    	console.log(token);
				});

    			// update textinfo and fade out box
    			$('#info-text').text('inloggning lyckades');
    			setTimeout(function() {
    				$('#info-box').fadeOut('slow');
    			}, 2000);
    			setTimeout(function() {
    				// show main and hide login
				    $('#main').fadeIn();
				    $('#login').hide();
    			}, 2500);
    		} else {
    			// update textinfo and fade out box
    			$('#info-text').text('inloggning misslyckades, försök igen');
    			setTimeout(function() {
    				$('.info-box').fadeOut('slow');
    			}, 2000);
    		}
    	}
    });
}

function logout() {

	// remove stores userinformation
	localStorage.removeItem("username");

	// show login and hide main app
	$('#main').hide();
    $('#login').hide();
}

function show_login() {
	// show login screen
	$('#login').show("slide", { direction: "right" }, 500);
}

function hide_login() {
	// hide login screen
	$('#login').hide("slide", { direction: "right" }, 500);
}