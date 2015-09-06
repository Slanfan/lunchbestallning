
$(document).ready(function() {
	if(localStorage.getItem("username") != null) {
		//alert("auto login (" + localStorage.getItem("username") + ")");
		// hide login
		$('#login').hide();
	} else {
		// hide main
		$('#main').hide();
		//alert("need login");
	}
});

function login() {

	// get input information
	var username = $('#username').val();
    var password = $('#password').val();

    // store user information locally
    localStorage.setItem("username", username);

    PushbotsPlugin.setAlias(username);
    // PushbotsPlugin.resetBadge();

    //Get device token
	PushbotsPlugin.getToken(function(token){
    	console.log(token);
	});

    // show main app and hide login
    $('#login').hide();
    $('#main').show();

}

function logout() {

	// remove stores userinformation
	localStorage.removeItem("username");

	// show login and hide main app
	$('#main').hide();
	$('#login').show();
}
