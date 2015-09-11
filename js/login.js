
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
    		
    		console.log(data);
    		console.log(data.responseJSON);

    		console.log('Result: ' + data.responseJSON.result);
    		console.log('Company: ' + data.responseJSON.company);
    		console.log('Number: ' + data.responseJSON.number);
    		if(data.responseJSON.result == 'success') {
    			// store user information locally
			    localStorage.setItem("username", username);
			    localStorage.setItem("company", data.responseJSON.company);
			    localStorage.setItem("employee_number", data.responseJSON.number);
			    PushbotsPlugin.setAlias(username);
			    // PushbotsPlugin.resetBadge();
			    //Get device token
				/*
				PushbotsPlugin.getToken(function(token){
			    	console.log(token);
				});
				*/

    			// update textinfo and fade out box
    			$('#info-text').text('inloggning lyckades');
    			setTimeout(function() {
    				$('.info-box').fadeOut(500);
    			}, 1000);
    			setTimeout(function() {
    				// show main and hide login
				    $('#main').fadeIn(900);
    			}, 2000);
    			setTimeout(function() {
    				// empty inputs and hide login
    				$('#username').val('');
					$('#password').val('');
					$('#login').hide();
    			}, 3500)
    		} else {
    			// update textinfo and fade out box
    			$('#info-text').text('inloggning misslyckades, försök igen');
    			setTimeout(function() {
    				$('.info-box').fadeOut(500);
    			}, 2000);
    		}
    	}
    });
}

function logout() {

	// remove stores userinformation
	localStorage.removeItem("username");

	// hide login and hide main app
	$('#login').hide();
	$('#start').show();
	setTimeout(function() {
		// fade out main app
		$('#main').fadeOut(900);
	}, 1500);
}

function show_login() {
	// show login screen
	$('#login').show("slide", { direction: "right" }, 500);
}

function hide_login() {
	// hide login screen
	$('#login').hide("slide", { direction: "right" }, 500);
}