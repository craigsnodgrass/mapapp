//The model will load the locations information you entered in the locations.xml file after it has been fed through JSON

//Register the Location Model
Ext.regModel('Locations', {
    fields: locationFields,
    belongsTo: 'Category',
    
});
//Load XML data from JSON into local store


app.stores.LocationsList = new Ext.data.Store({
    model: "Locations", //Model to use for the Store
    /*filters: [
              {
                  property: 'post_type',
                  value: null
              }
          ],*/
    sorters: [{
        			property: 'post_title', //Set the title as a sorter to the listing card can use the grouped list layout
        			direction: 'ASC'
    			}],
    proxy: {
        type: 'ajax', //Load JSON from our source defined in the config file
        url: HTTP_ROOT + '/' + JSON_SOURCE,
        reader: {
            type: 'json',
            root: 'markers1'
        },

        id  : 'LocationsID'
    },
    getGroupString : function(record) {
		// return the first character of the address in order to group
		return record.get('post_title')[0];
	},
    
    listeners: {
        'load': function (t, r, s) {
			//Fire custom event once all the load is complete
            Ext.dispatch({
                controller: app.controllers.map,
                action: 'loaded',
                records: r
            });
        },
    },
  autoLoad : true //We start loading the info into the datastore immediately after the app is started to make it available ASAP
    
});