var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var PolygonSchema = new Schema({
    area_id : String, 
    area_public_id : String, 
    name : String,     
    city_id : String, 
    city_name : String, 
    locality_polygon : String, 

});
module.exports = mongoose.model('locality_polygon', PolygonSchema);