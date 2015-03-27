/**
 * Listing a  List  View
 */

var ListingSingleView = Backbone.View.extend({
  tagName : 'li',
  template : _.template('<% var f = default_title.split("in"); %> <li class="listing-container"> <a href="#"><div class="listing-thumb"> <img src="<%= images.small %>" /> </div> <div class="listing-info"> <div class="listing-header"> <%= f[0] %> </div> <div class="listing-subDetails"> <%= f[1] %> </div> <div class="listing-price"> 12,000 </div> </div> </a></li>'),

  initialize: function(options) {    
    this.listing = options.model;
    this.render();
  },

  //----------------------------------
  // Events and event handlers
  //Add Click and hover events
  events: {

  },

  // END Events and event handlers
  //----------------------------------

  render: function() {
    //console.log(this.listing.attributes);
    //this.$el.html('<li><a href="#" >'+ this.listing.attributes.default_title+'</a></li>')
    //console.log(this.listing.attributes);
    this.$el.html(this.template(this.listing.attributes));
    return this;
  }
  
});