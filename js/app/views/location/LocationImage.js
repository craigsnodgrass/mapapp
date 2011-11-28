app.views.LocationImage = Ext.extend(Ext.Panel, {
layout: 'fit',
padding: '0px',
autoHeight:true,
initComponent: function(){

		    	 var picture;
		    	//check if images is set and is an array
		    	if(this.record.images.image.length >= 1 && this.record.images.image instanceof Array){
		    		this.pictureData = new Array(this.record.images.length);
		         	
		         	for(var i = 0; i < this.record.images.image.length; i++){
		         		
		         		picture = {
		         		html: '<img class="slide-show" src="http://src.sencha.io/' + HTTP_ROOT + '/images/' + this.record.images.image[i] + '"/>',
		         		}
		         		this.pictureData[i] = picture;
		         	}
		         	this.items = [{
		        			xtype: 'carousel',
			        		items: this.pictureData
		           	}];
		         //check if images is set and is a string
		         }else if(this.record.images.image.length >= 1){
		    	 
		    	 this.items = [{
		        			xtype: 'carousel',
			        		items: {
		         				html: '<img class="slide-show" src="http://src.sencha.io/' + HTTP_ROOT + '/images/' + this.record.images.image + '"/>',
		         		}
		           	}];

		    	 //If no images are present
		    	 } else {
		         this.items = '';

		         }

	        
	        app.views.LocationImage.superclass.initComponent.call(this);
	    },

});

Ext.reg('LocationImage', app.views.LocationImage);