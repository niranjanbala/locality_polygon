var ListingView =  Backbone.View.extend({
	el:$("#listing"),

	initialize : function(options){
		//this.model.on('reset', this.render);
        //this.model.on('add', this.appendListing, this );
        this.map = options.map;
        this.latlongs = new Array();
        this.render();
     
	},
	appendListing : function(listing) {
		//Render Each element from the view
		var self = this;
		var renderMarker;
		if(self.latlongs.length === 0) {
			self.latlongs.push([listing.attributes.lat,listing.attributes.lng]);
			renderMarker = new MarkListingView({model:listing.attributes,map:self.map,latlongs:self.latlongs});
		}

		for(var i=0;i < self.latlongs.length ;i++){
			if(self.latlongs[i][0] != listing.attributes.lat) {
				self.latlongs.push([listing.attributes.lat,listing.attributes.lng]);
				renderMarker = new MarkListingView({model:listing.attributes,map:self.map,latlongs:self.latlongs})
				break;
			}
		}
		var renderListing = new ListingSingleView({model:listing,marker:renderMarker});
		$(this.$el).append(renderListing.el)
	},

	render: function() {
		this.model.each(this.appendListing,this)
  },

});