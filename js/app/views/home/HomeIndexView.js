//This will be our homepage instance
app.views.HomeIndex = Ext.extend(Ext.Panel, {
    id:'homepage',
    html:homeHtml, //Html content set in config file
    styleHtmlContent: true,
    initComponent: function(){
        	
        	this.dockedItems = [{
            xtype: 'toolbar',
            title: homeTitle, //The homepage title from the config file
        }]   
        app.views.HomeIndex.superclass.initComponent.call(this);
    }
});

Ext.reg('HomeIndex', app.views.HomeIndex); //Register the view to be called by the main Viewport