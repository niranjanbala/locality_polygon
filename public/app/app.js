
// global for the sake of this example

var App = null;

/**
 * The App
 * Our overall **AppView** is the top-level piece of UI.
 */
var AppView = Backbone.View.extend({

    el: $("#hub"),

    //--------------------------------------
    // Event wiring (events and event handlers)

    events: {
      'click #btn_content' : 'show_content',
      'click #btn_map' : 'show_map'
    },
    infoWindow : new google.maps.InfoWindow({
        maxWidth: 350
    }),

  


    map : null,
    locationBoundary :  new google.maps.Polygon({
      fillOpacity: 0.3,
      strokeColor:"#FF0000",
      strokeWeight: 0.2,
    }),
    show_content: function() { //triggers "content" mode
     
    },

    show_map: function() { // triggers "map" mode
   

    },
  
   

    // END Events and event handlers
    //----------------------------------


    //--------------------------------------
    // Initialise map
    //--------------------------------------
    _initialize_map : function(bounds) {
      var center = new google.maps.LatLng(12.9719400, 77.5936900);
      var mapOptions = {
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: center
      };
      map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
      this.locationBoundary.setMap(map);
      map.fitBounds(bounds);
      //Adding new tile
      var imageMapType = new ImageTiles (map, {baseURL: 'http://ec2-54-69-79-243.us-west-2.compute.amazonaws.com:4000/tile/sale/{Z}/{X}/{Y}.png?layerName=listings'});
      map.overlayMapTypes.push(imageMapType);
      //Adding Grid Layer on top of that
      var self = this;
      var utfGrid = new UtfGrid('http://ec2-54-69-79-243.us-west-2.compute.amazonaws.com:4000/tile/sale/{z}/{x}/{y}.json?layerName=listings&callback={cb}');
      //On mouse Hover show the Grid
      utfGrid.on('mouseover', function (o) {
        if (o.data && o.data.name) {
          var content = "<div class='infowindow'>";
          content += "<div class='col-md-3'><img class='img-hover' src='img/placeholder.jpg' style='width:70px;height:70px;' /> </div>"; 
          content +="<div class='col-md-9' style='text-align:left;'>";
          content += "<table>";
          content +="<tr><th>Apartment: </th><td>" + o.data.name + "</td></tr>";
          content +="<tr><th>Latitude: </th><td>" + o.latLng.lat() + "</td></tr>";
          content += "<tr><th>Longitude:</th><td> " + o.latLng.lng() + "</td></tr>";
          content+="</table>";
          content +="</div>";
          content += "</div>";
          self._handleInfoWindow(o.latLng, content);
          
       } else {
        
      }
    }, utfGrid);

      utfGrid.on('mouseout', function (o) {
        // do something with o.data and o.latLng
          self.infoWindow.close();
      }, utfGrid);

      // Add UTFGrid to map
      utfGrid.setMap(map);
    },
    _handleInfoWindow: function(latLng, content){
      this.infoWindow.setContent(content);
      this.infoWindow.setPosition(latLng);
      this.infoWindow.open(map);
    },

    //--------------------------------------
    // Initialise app
    //--------------------------------------

    initialize: function() {
      var self = this;

      // cache DOM elements for faster access
      self.main = $('#main');
      self.controls = $('.nav_controls');
      self.map_canvas = $('#map_canvas');
      self.header = $('header');
      
      // initialize map
      $.get( "bangalore.json", function( data ) {
        var path = new google.maps.MVCArray;
        var bounds = new google.maps.LatLngBounds(); 
        data[0].point.forEach(function(point){
          path.insertAt(path.length, new google.maps.LatLng(point.lat, point.lng));
          bounds.extend(new google.maps.LatLng(point.lat, point.lng));
        })
        console.log(bounds);
        self.locationBoundary.setPaths(new google.maps.MVCArray([path]));
        self._initialize_map(bounds);
      });

      // Initial control positions
      // Move header up (out of window)
      self.header.css({top:'-1000px'});
      self.header.animate({top: '0px'}, 1500);

      // hide all controls
      self.controls.hide();
      self.controls.css({top: '80%'});
      var listings = new ListingResults();
      listings.fetch({
        success : function(data){
          var list_view = new ListingView({model:data.attributes.listing_details,map:self.map});
            //console.log(data.attributes.listing_details);
         }
      });
    }
});

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function() {
  App = new AppView();
});
