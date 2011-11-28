//View for details page
app.views.LocationPanel = Ext.extend(Ext.Panel, {
	layout: 'card',
	scroll: 'vertical',
	fullscreen: true,
	initComponent: function(){
		      	var template = new Ext.XTemplate(detailsTemplate);
		        this.items = [{
		        	scroll: 'vertical',
		            styleHtmlContent: true,
		            tpl: template,	
		            data: this.record  }
		            ];
		            	        
		        app.views.LocationPanel.superclass.initComponent.call(this);
		    },

});

Ext.reg('LocationPanel', app.views.LocationPanel);