jQuery(document).ready(function($) {


	//Set up the variables for our HTML elements

	var button = jQuery('.button');
	var preloader = jQuery('#preloader');
	var longitudediv = jQuery('.longitude');
	var lattitudediv = jQuery('.lattitude');
	var locationdiv = jQuery('.location');
	var browserdiv = jQuery('#browser');

	function exportPosition(position) {

		// Get the geolocation properties and set them as variables
		latitude = position.coords.latitude;
		longitude  = position.coords.longitude;

	

		// Insert the google maps iframe and change the location using the variables returned from the API
		jQuery('#map').html('<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+latitude+','+longitude+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z=11&amp;output=embed"></iframe>');
		longitudediv.html('Longitude: '+longitude);
		lattitudediv.html('Latitude: '+latitude);
		//display navigatr info
		browserdiv.html('appCodeName: ' +navigator.appCodeName);
		jQuery('#browser').html('appCodeName: ' +navigator.appCodeName);

		//Make a call to the Google maps api to get the name of the location
		jQuery.ajax({
		  url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true',
		  type: 'POST',
		  dataType: 'json',
		  success: function(data) {
		  	//If Successful add the data to the 'location' div
		   locationdiv.html('Location: '+data.results[0].address_components[2].long_name);
		  },
		  error: function(xhr, textStatus, errorThrown) {
		  		   errorPosition();
		  }
		});
		
	}

	function errorPosition() {
    				alert('Sorry couldn\'t find your location');
		  		   pretext.show();
    		}

   
//Check if the browser support geolocation

if (navigator.geolocation) {

	button.click(function(e) {
		e.preventDefault();
		preloader.show();
		navigator.geolocation.getCurrentPosition(exportPosition, errorPosition);
		browserdiv.html('appCodeName: ' +navigator.appCodeName);
	});

} else {
	alert('Sorry your browser doesn\'t support the Geolocation API');	
}

});
