const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.postReview = (async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added.!");

    res.redirect(`/listings/${listing._id}`);
});

module.exports.deleteReview = (async (req,res) => {
    let { id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}}); // to delete from the listing array also
    await Review.findByIdAndDelete(reviewId); // to delete review
    req.flash("success", "Reviewed Deleted.!");

    res.redirect(`/listings/${reviewId}`);
});