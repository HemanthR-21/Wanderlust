const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;  // this is for when a user tries to login from adding new listing page he must to redirect to new listing page after logged-in not all-listings page
        req.flash("error", "You must be logged-in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{  
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
// |^| for saveRedirectURl
// this is bcz after login() method is triggered Passport resets the session then all the session data will be deleted
// But passport does not have access to delete the locals so if we save the redirecturl in locals
// then we can use it to redirect to the page of user!

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req,res,next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this Review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
