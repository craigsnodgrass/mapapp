//This component will render the main map in the "details" section of each location
app.views.MapIndex = Ext.extend(Ext.Panel, {
    coords: [startLat, startLng], //Pass lat and lng variables
    id: 'map',
    initComponent: function(){
    	app.stores.LocationsList.load(); //Load the locations information from the datastore create on startup
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]); // Set the start lat and lng for the google maps
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.mapText,
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
					//Create link to open location in maps.google.com
                    Ext.Msg.confirm('Open Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = this.permLink;
                    }, this);
                }
            }]
        }]
        //Create new Info Window with location address
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
        	id: 'mainmap',
        	store: app.stores.LocationsList,
			//Set options for new map
            mapOptions : {
                center : position,
                zoom: 10,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    Ext.dispatch({
                    	controller: app.controllers.map,
                    	action: 'map_rendered',
                    	map: map
                	});

               	}
            }
        });
        
        this.items = this.map;
        
        app.views.MapIndex.superclass.initComponent.call(this);
    }
});

Ext.reg('MapIndex', app.views.MapIndex);