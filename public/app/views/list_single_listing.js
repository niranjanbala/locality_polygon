/**
 * Listing a  List  View
 */

var ListingSingleView = Backbone.View.extend({
  tagName : 'li',
  
  //template : _.template('app/templates/listingItem.html'),

  initialize: function(options) {    
    this.marker_view = options.marker; //retain instance of google marker
    this.listing = options.model;
    this.render();
  },

  //----------------------------------
  // Events and event handlers
  //Add Click and hover events
  events: {
    'mouseover a': 'show_listing_info',
    'mouseout a': 'hide_listing_info',
  },

  show_listing_info : function() {
    if(this.marker_view != undefined) {
      this.marker_view.show_listing_info.call(this.marker_view.marker);  
    }
  },
  hide_listing_info : function(){
    if(this.marker_view != undefined){
      this.marker_view.hide_listing_info.call(this.marker_view.marker);
    }
  },

  // END Events and event handlers
  //----------------------------------

  render: function() {
    //console.log(this.listing.attributes);
    //this.$el.html('<li><a href="#" >'+ this.listing.attributes.default_title+'</a></li>')
    //console.log(this.listing.attributes);
    var self = this;
    return $.get('app/templates/listingItem.html', function (data) {
            template = _.template(data, {attributes:self.listing.attributes});
            self.$el.html(template);//adding the template content to the main template.
        }, 'html');
    //this.$el.html(this.template(this.listing.attributes));
    //return this;
  }
  
});