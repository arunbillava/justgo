import * as mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    name: String,
    when:Date,
    teamSize:Number,
    description: String
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
