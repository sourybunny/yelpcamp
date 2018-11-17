var express=require("express")
var router=express.Router();
var Campground=require("../models/campground")
var middleware=require("../middleware/index.js")
// INDEX ROUTE
router.get("/campgrounds",function(req,res){
    // get from db
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log("oops error")
            console.log(err)
        }else{
        
            res.render("campgrounds/index",{campgrounds: allcampgrounds,currentUser: req.user});
        }
    })
  
    // res.render("campgrounds",{campgrounds: campgrounds})
})
// CREATE ROUTE
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    // res.send("you hit the post page")
    var camp=req.body.name;
    // remember change here
    var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:camp,price:price,image:image,description:description,author:author}
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err)
        }else{
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
    
    
})
// CREATE ROUTE (FORM)
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})
// show particular with description
// SHOW ROUTE
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err)
        }else{
            // console.log(foundCampground)
             res.render("campgrounds/show",{campground: foundCampground})
        }
    })
   
    // res.send("this is show page");
})

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
              res.render("campgrounds/edit", {campground: foundCampground})
        
    });
    
});


// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
// find and update correct campground
var data=req.body.campground;
Campground.findByIdAndUpdate(req.params.id,data,function(err,updatedCampground){
    if(err){
        res.redirect("/campgrounds")
    }else{
        res.redirect("/campgrounds/"+ req.params.id)
    }
})
// redirect
})
// DELETE CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    })
})


module.exports=router;