app.views.CategoryList = Ext.extend(Ext.Panel, {
    layout: 'card',
    fullscreen: true,
    scrolling: 'vertical',
    initComponent: function() {
        //Check if device is a phone, if so only display the title since the viewport is smaller
         if (!Ext.is.Phone) {
                var listTemplate = '{post_type}';
                
          } else {
                var listTemplate = '{post_type}';
          
          }
        this.list = new Ext.List({
            grouped: false,
            indexBar: false,
            itemTpl: '{post_type}',
            store: app.stores.CategoryList,
            listeners: {
            	selectionchange: function(list, index) {
            		//something?.setActiveItem('LocationsList', {type:'slide', direction:'left'});
            		app.stores.CategoryList.onSelect;
            		var curCat = '{post_type}';
            		app.stores.CategoryList.clearFilter();
            		app.stores.CategoryList.filter('{post_type}',curCat);
            	},
            	}           
        	});
        
        this.listpanel = new Ext.Panel({
            layout: 'fit',
            items: this.list,
            dockedItems: [{
                xtype: 'toolbar',
                title: listingTitle
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this },
                
            },
            //afterrender: function(filter){filter.getStore('CategoryList').load('{post_type}');},
            
        });
        
        this.items = this.listpanel;
        
        app.views.CategoryList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
                var categoryCard = new app.views.LocationsList({
                            store: app.stores.LocationsList,
                            prevCard: this.listpanel,
                            record: records[0]
                        });
                		this.setActiveItem(categoryCard, 'slide');
                        /*var store = app.stores.LocationsList;
                    	var categoryFilter = new Ext.util.Filter({
                    		property:'post_type',
                    		value:'post_type'
                    	});
                    	store.clearFilter();
                    	store.filter(categoryFilter);*/
                    	
            
                     
        }
    }
});

Ext.reg('CategoryList', app.views.CategoryList);