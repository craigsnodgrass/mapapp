var lastMarkerSearch;
var DataLoaded = 0;
var infowindow = null;

//Set last user marker to delete once new search is completed
function addLastSearchMarker(marker){
	lastMarkerSearch = marker;
}

app.controllers.map = new Ext.regController('Map', {
 
	loaded: function(options) { //You can fire a custom event once the map has loaded here
    },
    map_rendered: function(options) { //Function to retrieve locations from the datastore and create markers for the main map
    	infowindow = new google.maps.InfoWindow({
			content: "empty for now..."
		});
		//Loop through each item in the datastore and set a marker
    	for(var i = 0; i < app.stores.LocationsList.data.items.length; i++){
  			var thumbnail;
  			//check if thumb is set
           	if(app.stores.LocationsList.data.items[i].get('thumb') != ''){
           		thumbnail = '<img align="left" style="padding-right:5px" src="' + HTTP_ROOT + '/images/' + app.stores.LocationsList.data.items[i].get('thumb') + '"/>';
           	} else {
           		thumbnail = '';
           	}
           	//create new marker from the store with the locations info
            var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(app.stores.LocationsList.data.items[i].get('geo_latitude'), app.stores.LocationsList.data.items[i].get('geo_longitude')),
                 map: MainMap.map, //Our main map
                 //icon: HTTP_ROOT + app.stores.LocationsList.data.items[i].get('marker'), //Apply custom marker
                 html: thumbnail + "<b>" + app.stores.LocationsList.data.items[i].get('post_title') + "</b>" + "<br/><a class='more-info' href='http://maps.google.com/maps?q="+ app.stores.LocationsList.data.items[i].get('geo_latitude') + ","+app.stores.LocationsList.data.items[i].get('geo_longitude')+"'>" + moreInfo +"</a>",
                 internalId: [i]
            });
            
            //create info window popup for marker
            var infowindow = new google.maps.InfoWindow({
					content: ""
			});

			google.maps.event.addListener(marker, 'mousedown', function () {

				infowindow.setContent(this.html);
				MainMap.map.setCenter(this.position);
				infowindow.open(MainMap.map, this);
			});

        }

    },
    //open the items detail card directly from the map on click
    browse: function(options)	{
    	window.location.hash = "";
    	Ext.getBody().mask('<div class="loading">Loading&hellip;</div>');
    	//create new instance of the card
            	this.locationCardMap = new app.views.MapDetail({
            				store: app.stores.LocationsList,
            				floating: true,
                			prevCard: mapPanel,
                			record: app.stores.LocationsList.data.items[options.id],
            			});

       Ext.getBody().unmask();
       //show the locations card
          		this.locationCardMap.show({
        					type: 'slide',
        					direction: 'left',
        					duration: 500,
    					});
    },
   searchMap: function(options)	{
 		//Geocode the value given from the search field
    	Geocoder.geocode({ 'address': options.searchField}, function(results, status) {
    		//remove previous search marker if it exists
    		if (lastMarkerSearch != undefined){
    			lastMarkerSearch.setMap(null);
    		}
      		if (status == google.maps.GeocoderStatus.OK) {
        			MainMap.map.setCenter(results[0].geometry.location); //Move the map to the new position
        			var searchMarker = new google.maps.Marker({ //Create new marker from the adress
            			map: MainMap.map,
            			position: results[0].geometry.location,
            			id: 'search'
        			});
        			
        			addLastSearchMarker(searchMarker); //Set the new search as the last searched item
        			MainMap.map.setZoom(searchZoom); //Change the zoom level
      		} else {
				//Set error if geocode was not succesful
				Ext.Msg.alert('Search Error', 'Could not find address: ' + status, Ext.emptyFn);
      		}

    	});
    	
    	
    },
    //get current location if user allows permission
    currentLocation: function(options)	{
    		if (lastMarkerSearch != undefined){
    			lastMarkerSearch.setMap(null);
    		}
			var geo = new Ext.util.GeoLocation({ //New Geolocator instance to determine current location
			    autoUpdate: false,
			    timeout:1000,
			    listeners: {
			        locationupdate: function (geo) {
						//If location is found create a new marker and move map view
			            currentPosition = new google.maps.LatLng(geo.latitude, geo.longitude);
			            MainMap.map.setCenter(currentPosition);
			            var currentLocationMarker = new google.maps.Marker({
            				map: MainMap.map,
            				position: currentPosition
        				});
        			addLastSearchMarker(currentLocationMarker);
			        MainMap.map.setZoom(searchZoom); 
			        },
			        //display an error if location could not be determined
			        locationerror: function (   geo,
			                                    bTimeout, 
			                                    bPermissionDenied, 
			                                    bLocationUnavailable, 
			                                    message) {
			            if(bTimeout){
			                Ext.Msg.alert('Location Error', 'Your location could not be determined', Ext.emptyFn);

			            }else{
			                Ext.Msg.alert('Location Error', 'Location unavailable', Ext.emptyFn);
			            }
			        }
			    }
			});
			geo.updateLocation();    
    }
});