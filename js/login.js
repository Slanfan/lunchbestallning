function login() {

	// uppdatera textinfo och visa loader
	$('.info-container').removeClass('hidden');
	$('.info-container').addClass('visible');
	$('#info-text').text('kontaktar server');

    // ask for push
    if(PushbotsPlugin.isiOS()){
        PushbotsPlugin.initializeiOS("55ea8c9b177959e3438b4569");
        // get push device token
        PushbotsPlugin.getToken(function(token) {
            console.log(token);
            localStorage.setItem("pushToken", token);
        });
    }
    if(PushbotsPlugin.isAndroid()){
        PushbotsPlugin.initializeAndroid("55ea8c9b177959e3438b4569", "141134204992");
        // get push device token
        PushbotsPlugin.getToken(function(token) {
            console.log(token);
            localStorage.setItem("pushToken", token);
        });
    }

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

                // store users device token in database
                if(PushbotsPlugin.isiOS()) {
                    var platform = 'iOs';
                    var platformId = 0;
                }
                if(PushbotsPlugin.isAndroid()) {
                    var platform = 'Android';
                    var platformId = 1;
                }
                pushData = { 'employee-number': localStorage.getItem('employee-number'), 'device-token': localStorage.getItem('pushToken'), 'platform': platform, 'platform-id': platformId };
                $.ajax({
                    url: 'http://www.lunchbestallning.se/app/store-device-token-in-db.php',
                    data: pushData,
                    dataType: 'json',
                    complete: function(returnData) {
                        if ( returnData.status >= 200 && returnData.status < 300 || returnData.status === 304 ) {
                            if(data.responseJSON.result == 'success') {
                                console.log('Device token stored in db successfully');
                            } else {
                                console.log('error storing device token in db');
                            }
                        } else {
                            console.log('No connection when trying to store device token in db');
                        }
                    }
                });

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
    			setTimeout(function() {
    				$('.info-container').addClass('hidden');
    				$('.info-container').removeClass('visible');
    			}, 2000);
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
    localStorage.removeItem("pushToken");
    //Unregister device from Pushbots
    PushbotsPlugin.unregister();

    // remove device from db
    if(PushbotsPlugin.isiOS()) {
        var platform = 'iOs';
        var platformId = 0;
    }
    if(PushbotsPlugin.isAndroid()) {
        var platform = 'Android';
        var platformId = 1;
    }
    pushData = { 'employee-number': localStorage.getItem('employee-number'), 'device-token': localStorage.getItem('pushToken'), 'platform': platform, 'platform-id': platformId };
    $.ajax({
        url: 'http://www.lunchbestallning.se/app/remove-device-token-from-db.php',
        data: pushData,
        dataType: 'json',
        complete: function(returnData) {
            if ( returnData.status >= 200 && returnData.status < 300 || returnData.status === 304 ) {
                if(data.responseJSON.result == 'success') {
                    console.log('Device token removed from db successfully');
                } else {
                    console.log('error removing device token from db');
                }
            } else {
                console.log('No connection when trying to remove device token from db');
            }
        }
    });

	// hide login and hide main app
	$('#start').removeClass('hidden');
	$('#start').addClass('visible');
	$('#login').removeClass('hidden');
	$('#login').addClass('visible');
	setTimeout(function() {
		toggle_settings();
	}, 2010);
}