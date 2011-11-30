//This is where you will configure your web app


//SETTINGS


//Enter the URI where the web app is located on your server
var HTTP_ROOT = 'url';

//If you want to use a different source for the JSON data you can change it here
var JSON_SOURCE = 'json.php';

//HOMEPAGE

//Homepage title
var homeTitle = 'Mobile Basecamp';

//Homepage content
var homeHtml = '<div style="text-align:center"><p>BaseCamp is a knowledge base for outdoor activities and adventure travel, created by Blue Ridge Outdoors Magazine. Here, you can find a new hike, set up a rafting adventure or plan your tour for festival season. BaseCamp is constantly adding and updating new destinations and adventures, so use this app to find your next adventure.</p></div>';

//Homepage icon text
var homeTabTxt = 'Home';

//LISTING PAGE

//Listings title
var listingTitle = 'Locations Listing';

//Listing icon text
var listingTabTxt = 'Locations';


//MAP SETTING

//Starting coordinates for Map
var startLat = 37.509725842937485;
var startLng = -84.0673828125;

//Set the zoom level of the Main map
var mapZoom = 5;

//Set the zoom level of the Detail map
var detailZoom = 12;

//Set the zoom level of the Search result
var searchZoom = 15;

//Text for the link in the info window to the location detail card
var moreInfo = 'Get Directions';

//These fields are stored from the JSON call, if you would like to add field to the XML 
//file make sure to add them to this list with the appropriate type
var locationFields = [
        {name: 'post_title', type: 'string'},
        {name: 'post_type', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'post_content', type: 'string'},
        {name: 'images', type: 'object'},
        {name: 'thumb', type: 'string'},
        {name: 'marker', type: 'string'},
        {name: 'geo_latitude',  type: 'float'},
        {name: 'geo_longitude',  type: 'float'}
    ];
    
//This dictates the layout of the details card of the location, you can change it if necessary or add fields if you have already added them above
//Make sure and encapsulate field variables in curly braces
var detailsTemplate='<div><p>{post_content}</p></div>';