var ListingView =  Backbone.View.extend({
	el:$("#listing"),
	
	initialize : function(){
		this.render();
	},

	render: function(options) {
		alert('hello');
		$(this.$el).append('<li><a href="#" >From Backbone</a></li>');
    	return this;
  },

});