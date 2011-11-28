  	function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
     	}
     	function onDeviceReady(){
     	  $('a#refresh_button').click(function() {
     		loadJson();
     		return false;
     	  });
     	  
     	  loadJson();
     	};
     	
    $.getJSON(){
     	  $.mobile.showPageLoadingMsg();
     	  $.getJSON('http://basecamp.blueridgeoutdoors.com/mobile-basecamp/Application/json.php', function(data) {
    		var new_content = '';
			
            $.each(data.markers1, function(key, val) {
              if ("post_type" in val) {
                new_content = new_content + '<li>' + val["post_type"] + ' (' + val["post_type"] + ')</li>';
              	
              }
            });
            if (new_content != '') {
              //alert("found new_content");
              $('p#main_content').remove();
              $('div#content ul').remove();
              $('div#content a').before('<ul data-inset="true" data-role="listview"></ul>');
              $('div#content ul').addClass("ui-listview ui-listview-inset ui-corner-all ui-shadow");
              var catlist = $('div#content ul');
              catlist.listview();
              catlist.append(new_content);
              $('div#content ul li').addClass("ui-li ui-li-static ui-body-c");
              $('div#content ul li:first').addClass("ui_corner-top");
              $('div#content ul li:last').addClass("ui-corner-bottom");
              catlist.listview('refresh');
            };
          });
     	  $.mobile.hidePageLoadingMsg();
     	};