var laCenter = new google.maps.LatLng(startLat, startLng); //Set starting coordinates from configuration file
var Geocoder = new google.maps.Geocoder(); //Create instance of the google maps geocoder

//Create a static map instance so we can access it later and not have to reload each time
var MainMap = new Ext.Map({
        	id: 'mainmap',
        	layout: 'card',
        	styleHtmlContent: true,
        	store: app.stores.LocationsList,
            mapOptions : {
                center : laCenter,  //Set map center from coordinated
                zoom: mapZoom, //Set map initial zoom
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT //Set map controls
                }
            },
            listeners: {
                maprender : function(comp, map){ //Once map has been rendered we fire the controller to populate it will our locations
                    Ext.dispatch({
                    	controller: app.controllers.map,
                    	action: 'map_rendered',
                    	map: map
                	});

                                    }
            }
        });


app.views.MapMain = Ext.extend(Ext.Panel, {
    id: 'mapPanel',
    mapText: '',
    permLink: '',
    address: 'test',
    items: MainMap, //Include the map instance from above
    initComponent: function(){	//Setup items in the top toolarbar
       this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
				    xtype: 'button',
				   	iconCls: 'locate3',
				   	iconMask: true,
				    itemId: 'LocateBtn',
				    ui: 'plain',
				    listeners: {
        					tap: function() {
          						Ext.dispatch({ //Fire Map Controller Action on tap
                    				controller: app.controllers.map, //Our map controller instance
                    				action: 'currentLocation' //Function to get our current location if available
                				});
        					}
						}
				    },
		            {	xtype: 'spacer', flex: 1	}, //Spacer insure both elements are on the far left and right
		            {
                   		xtype: 'searchfield', //Search bar component
                    	name: 'mapSearchValue',
                    	placeholder: 'MapSearch',
                    	listeners : {
	                        change: this.onMapFieldChange,  //Fire action to search user entry
	                        keyup: function(field, e) {
	                            var key = e.browserEvent.keyCode;
	                            if (key === 13) {
	                                field.blur();
	                            }
	                        },
                        scope : this
                    	}
		            }
        	]
        }]
                
        app.views.MapMain.superclass.initComponent.call(this);
    },
    
    onMapFieldChange : function(comp, value) {
     	Ext.dispatch({
                    	controller: app.controllers.map, //Fire Map controller action to geocode searched term
                    	action: 'searchMap', // Action in map controller to handle request
                    	searchField: value //Value from the search field
                	});
        this.fireEvent('mapSearch', value, this);
    }
});

Ext.reg('MapMain', app.views.MapMain);