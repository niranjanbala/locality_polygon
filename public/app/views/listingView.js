var ListingView =  Backbone.View.extend({
	el:$("#listing"),

	initialize : function(options){
		//this.model.on('reset', this.render);
        //this.model.on('add', this.appendListing, this );
        this.render();
	},
	appendListing : function(listing) {
		//Render Each element from the view
		var renderListing = new ListingSingleView({model:listing});
		$(this.$el).append(renderListing.render().el)
	},

	render: function() {
		this.model.each(this.appendListing,this)
  },

});