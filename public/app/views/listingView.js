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
		console.log("Length:  " + self.latlongs.length)
		if(self.latlongs.length === 0) {
			self.latlongs.push([listing.attributes.lat,listing.attributes.lng]);
			var renderMarker = new MarkListingView({model:listing.attributes,map:self.map,latlongs:self.latlongs});
		}

		for(var i=0;i < self.latlongs.length ;i++){
			console.log(self.latlongs[i][0] != listing.attributes.lat);
			if(self.latlongs[i][0] != listing.attributes.lat) {
				self.latlongs.push([listing.attributes.lat,listing.attributes.lng]);
				var renderMarker = new MarkListingView({model:listing.attributes,map:self.map,latlongs:self.latlongs})
				break;
			}
			else {
				console.log("Found");
			}
		}
		//console.log(self.latlongs);

		var renderListing = new ListingSingleView({model:listing});
		
		$(this.$el).append(renderListing.render().el)
	},

	render: function() {
		this.model.each(this.appendListing,this)
  },

});