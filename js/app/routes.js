//The router will allow use to call functions from the map controller by URL, for example "#Map/Browse/5" will padd the value of 5 to the map controller action "Browse"
Ext.Router.draw(function(map) {
    map.connect('Map/browse/:id', {controller: 'Map', action: 'browse'});
    map.connect('Map/:action', {controller: 'Map'});
    map.connect('Map', {controller: 'Map'});
    map.connect(':controller/:action');
    map.connect(':controller');

});