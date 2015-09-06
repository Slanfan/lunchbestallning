
$(document).ready(function() {
	if(localStorage.getItem("username") != null) {
		alert("auto login/n" + localStorage.getItem("username"));
	} else {
		alert("need login");
	}
});

function login() {

	var username = $('#username').val();
    var password = $('#password').val();

    localStorage.setItem("username", username);

    PushbotsPlugin.setAlias(username);
    //PushbotsPlugin.resetBadge();
    console.log(PushbotsPlugin.getToken());


}