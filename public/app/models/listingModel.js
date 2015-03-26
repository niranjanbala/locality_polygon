var Listings = Backbone.Model.extend({

	//urlRoot:"http://stage.commonfloor.com/api/listing-v2/get-listings?city=Bangalore&property_location_filter[]=region_4e71a187c011e&property_location_filter[]=area_234&house_type[]=Apartment&house_type[]=Villa&posted_by[]=Builder&posted_by[]=Owner",
	urlRoot :"listing.json",

    initialize:function () {
        this.listings = new ListingCollection();
        this.listings.url = this.urlRoot;
    }

});

var ListingCollection = Backbone.Collection.extend({
	model : Listings,
	
});

var ListingResults = Backbone.Model.extend({
	
	defaults : {
		total_pages:0,
		result_count:0,
		slot_sort_params: false,
		listing_details : new ListingCollection(),
	},
	
	parse : function(response){
		var listingCollection = new ListingCollection();
		listingCollection.add(response.results.listings_detail);
		this.set({listing_details:listingCollection});
	},
	url : 'listing.json'
});
