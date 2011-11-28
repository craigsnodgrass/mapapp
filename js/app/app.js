//This is where the app instance is initiated
Ext.regApplication({
    name: 'app',
    defaultUrl: '',
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    launch: function() {
		//Once loaded, the parent container with all the app elements is loaded, this will be our views/Viewport.js file
        this.viewport = new app.views.Viewport();
        
    }
});