navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var weatherKey = "a69c3d11bd54ee9d92fb154f91b049b8";
	var weatherURL = "https://api.darksky.net/forecast/" + weatherKey + "/" + lat + "," + long + "?units=si";
	$.getJSON(weatherURL, {
		format: "jsonp"
	}).done(function(data) {
		var timezone = data["timezone"];
		var currently = data["currently"];
		var temp = Number(currently["temperature"]);
        
        if(temp > 5) {
            $("#in_out").html("You're going out! It's " + temp + "degrees in " + timezone);
            $("#in_out_des").html("Ah time to get off your lazy ass and go do something... outside. Look to your right to find something to do in " + timezone);

            //time to change the what do page
            //show things to do nearby
            //nearest train station
			var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=500&key=AIzaSyC1uSzGZknbiXuaRpu4As02HIOSaXWBTDM";
            $.getJSON(placesAPI, {
                format: "jsonp"
            }).done(function(data) {
				var results = data["results"];
				var first = results[0];
				var second = results [1];
				var third = results[2];
                var newWord = "<h1>Here are some things to do</h1><br> <h3>" + first["name"] + "</h3><br>" + "<h4>" + first["vicinity"] + "</h4><br><h3>" + second["name"] + "</h3><br><h4>" + second["vicinity"] + "</h4><br><h3>" + third["name"] + "</h3><br><h4>" + third["vicinity"] + "</h4><br>";
                
                $(".what_do").html(newWord);
 
            });
            
        } else {
            $("#in_out").html("Ah you can stay indoors. u lucky prick it's only " + temp + "degrees!!");
            $("#in_out_des").html("You can now enjoy your sweet demise alone in your room with yourself and the internet, we're all proud of you... ");

            //time to change the what do page
            //show links for people who are bored
            //nearest takeaway that delivers
			//reddit
			//facebook
            var newWords = "<ul> <li><a href='http://reddit.com'>Reddit</a></li> <li><a href='http://facebook.com'>Facebook</a></li><li><a href='http://youtube.com'>Youtube</a></li><li><a href='http://tumblr.com'>Tumblr</a></li> <li> <img src='img/cat.jpg' alt=''> </li>"
            $(".what_do").html(newWords);
        }
	});

});
