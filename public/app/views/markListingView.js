/**
 * ADD A Marker on  a  Listing
 */

var MarkListingView = Backbone.View.extend({
  
  tagName : 'li',

  initialize: function(options) {    
	  var self = this;

      self.model = options.model;
      self.latlongs = options.latlongs;
      self.map = options.map;
      //console.log("LatLng" + new google.maps.LatLng(self.model.lat,self.model.lng));

      self.marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(self.model.lat,self.model.lng),
          animation: google.maps.Animation.DROP,
          icon : 'app/images/icons/house.png',
          title: self.model.default_title,
          id : self.model.lisiting_id
      });

      self.marker.infowindow = new google.maps.InfoWindow({
        	content: self.marker.title
      });

      google.maps.event.addListener(self.marker, 'mouseover', self.show_listing_info);
      google.maps.event.addListener(self.marker, 'mouseout', self.hide_listing_info);
      google.maps.event.addListener(self.marker, 'click', self.show_listing_detail);
  },

  //----------------------------------
  // Events and event handlers
  //Add Click and hover events
  show_listing_detail : function() {
      this.infowindow.close();
      App.show_content();
    },
    hide_listing_info : function() {
      this.infowindow.close();
    },
    show_listing_info : function() {
      this.infowindow.open(this.map, this);
    },


  // END Events and event handlers
  //----------------------------------

  render: function() { },
  
});