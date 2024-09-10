const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = (async(req,res) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });       
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
});

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) =>{  
    req.flash("success", "Welcome to Wanderlust! You are logged-In"); 
    let redirectUrl = res.locals.redirectUrl || "/listings"; // this bcz when you try to login from home page the isLoggedIn middleware is not triggered which in
    res.redirect(redirectUrl);                               // return does not trigger the redirecturl. if the redirect url is empty there is no page to redirect to.!
};

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged-out");
        res.redirect("/listings");
    });
};