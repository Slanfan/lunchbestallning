
$(document).ready(function() {
	if(localStorage.getItem("username") != null) {
		alert("auto login (" + localStorage.getItem("username") + ")");
		$('#login').hide();
	} else {
		alert("need login");
	}
});

function login() {

	// get input information
	var username = $('#username').val();
    var password = $('#password').val();

    // store user information locally
    localStorage.setItem("username", username);

    PushbotsPlugin.setAlias(username);
    //PushbotsPlugin.resetBadge();
    console.log(PushbotsPlugin.getToken());
}

function logout() {

	// remove stores userinformation
	localStorage.removeItem("username");
}
