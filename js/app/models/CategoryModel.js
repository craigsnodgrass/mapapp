//The model will load the locations information you entered in the locations.xml file after it has been fed through JSON

//Register the Location Model
Ext.regModel('Category', {
    fields: [
    {name: 'post_type', type: 'string'},
    {name:'locations',type:'array'}
    ],
    hasMany: {
        model: 'Locations',
        name : 'locations',
        filterProperty: 'post_type'
    }
});




var data = {
"post_type":[
{"post_type":"trails"},
{"post_type":"Adventure Guides"},
{"post_type":"brew"},
{"post_type":"Festivals and Races"},
{"post_type":"river-right"},
{"post_type":"Parks and Forests"},
{"post_type":"Campgrounds"},
{"post_type":"Rivers, Mountains, Lakes"}
]
};

//Load XML data from JSON into local store
app.stores.CategoryList = new Ext.data.Store({
    model: "Category", //Model to use for the Store
    data: data,
    sorters: [{
        			property: 'post_type', //Set the title as a sorter to the listing card can use the grouped list layout
        			direction: 'ASC'
    			}],
    proxy: {
        type: 'memory', //Load JSON from our source defined in the config file
        //url: HTTP_ROOT + '/' + JSON_SOURCE, 
        reader: {
            type: 'json',
            root: 'post_type'
        },
        id  : 'CategoryID'
    },
    getGroupString : function(record) {
		// return the first character of the address in order to group
		return record.get('post_type')[0];
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
