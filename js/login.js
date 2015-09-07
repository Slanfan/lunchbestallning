
$(document).ready(function() {
	if(localStorage.getItem("username") != null) {
		$('#main').show();
	} else {
		$('#start').show();
	}
});

function login() {

	// uppdatera textinfo
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
    	complete: function(response) {
    		if(response == 'success') {
    			alert('Success');
    		} else {
    			alert('Error');
    		}
    	}
    });

    // store user information locally
    localStorage.setItem("username", username);

    // show main app and hide login
    /*
    $('#main').fadeIn();
    $('#login').hide();

    PushbotsPlugin.setAlias(username);
    // PushbotsPlugin.resetBadge();

    //Get device token
	PushbotsPlugin.getToken(function(token){
    	console.log(token);
	});
*/

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
	$('#login').hide("slide", { direction: "right" }, 300);
}