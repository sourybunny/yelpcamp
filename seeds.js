var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
   { name: "Cloud's Rest",
    image: "http://www.lake-tawakoni.org/wp-content/uploads/2015/08/Holiday-Marina-tent-camping.jpg",
    description: "Lonely place"
   },
    { name: "Baby's Nest",
    image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1440478008/campground-photos/csnhvxn0qcki2id5vxnc.jpg",
    description: "so beautiful"
   },
    { name: "Loonavala",
    image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
    description: "spiritual feeling"
   },
    { name: "Goa beach",
    image: "http://www.chriscampground.com/images/homepage/ChrisCmpg_01.JPG",
    description: "vacation point"
   }
     ]



function seedDB(){
 Campground.remove({},function(err){
    if(err){
        console.log(err);
    }
                console.log("removed all cammpgrounds");
                // add a few campgrounds
        //         data.forEach(function(seed){
        //         Campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err)
        //         }else{
        //             console.log("Added a campground");
        //             // add comment to each seed
                    
        //             Comment.create({
        //                 text: "this is a beautiful plce. must visit",
        //                 author: "Homer"
        //             },function(err,comment){
        //                 if(err){
        //                     console.log(err)
        //                 }else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("created new comment");
        //                 }
        //             })
        //         }
        //      })
                
        //   })

})   
}

module.exports= seedDB;
