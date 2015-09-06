
$(document).ready(function() {
	if(localStorage.getItem("username") != null) {
		$('#main').show();
	} else {
		$('#start').show();
	}
});

function login() {

	// get input information
	var username = $('#username').val();
    var password = $('#password').val();

    // store user information locally
    localStorage.setItem("username", username);

    // show main app and hide login
    $('#main').show();
    $('#login').hide();

    PushbotsPlugin.setAlias(username);
    // PushbotsPlugin.resetBadge();

    //Get device token
	PushbotsPlugin.getToken(function(token){
    	console.log(token);
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
	$('#login').show();
}