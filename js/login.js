
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
    console.log(PushbotsPlugin.getToken());

    // show main app
    $('#main').slideUp('slow');
}

function logout() {

	// remove stores userinformation
	localStorage.removeItem("username");
}
