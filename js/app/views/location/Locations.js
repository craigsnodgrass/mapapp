app.views.LocationsList = Ext.extend(Ext.Panel, {
    layout: 'card',
    fullscreen: true,
    scrolling: 'vertical',
    initComponent: function() {
    	//Check if device is a phone, if so only display the title since the viewport is smaller
    	 if (!Ext.is.Phone) {
	        	var listTemplate = '{post_title} - <span class="list-address">{post_content}</span>';
	        	
	      } else {
	      		var listTemplate = '{post_title}';
	      
	      }
        this.list = new Ext.List({
            grouped: false,
            indexBar: false,
            itemTpl: listTemplate,
            store: app.stores.LocationsList,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
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
                //afterrender: function(filter){filter.getStore().load();},
                //afterrender: function(filter){Ext.StoreMgr.get(app.stores.LocationsList).sync('{post_type}');}
            },
            //afterrender: function(filter){Ext.StoreMgr.get(app.stores.LocationsList).sync('{post_type}');},
       
        });
        
        this.items = this.listpanel;
        
        app.views.LocationsList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
			  	var locationCard = new app.views.LocationDetail({
            				store: app.stores.LocationsList,
                			prevCard: this.listpanel,
                			record: records[0],
            			});

            			this.setActiveItem(locationCard, 'slide');
            
                     
        }
    }
});

Ext.reg('LocationsList', app.views.LocationsList);