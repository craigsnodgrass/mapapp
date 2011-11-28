//The main view port contains all three cards: "Home","Listing", and "Map"
app.views.Viewport = Ext.extend(Ext.TabPanel, {
    fullscreen: true,
    layout: 'fit',
    cardSwitchAnimation: 'slide', //The animation used when switching between the main cards
    statusBarStyle: 'black', 
    tabBar: {
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    items : [{ //We set the three items to be included in the viewport setting the titles from the config file
    	 		title:  homeTabTxt,
                iconCls: 'home2',
                xtype: 'HomeIndex',
            },{
                title: listingTabTxt,
                iconCls: 'list',
                xtype: 'CategoryList',
            },{
                title: 'Map',
                iconCls: 'locate',
                xtype: 'MapMain'
            },
            
         ],
    	initComponent: function() {
		//Must apply superslass while component is being constructed, don't worry about this		
         app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});