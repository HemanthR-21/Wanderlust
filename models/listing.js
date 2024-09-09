const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        url: String,
        filename: String,
    
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: Schema.Types.ObjectId,
        ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing)=> { // post mongoose middleware to delete the reviews of listing when we delete the listing itself
    if(listing){  // condition to apply this only when a listing is passed here 
    await Review.deleteMany({_id: {$in: listing.reviews}});  //deleting the reviews which r part of listing review's array
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;