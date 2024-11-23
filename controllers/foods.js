// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

//finduser_id and find user_id all pantry

router.get("/", async (req, res) => {
 try{
  const {_id} = res.locals.user;
  const {pantry} =await User.findById(_id)
  //console.log(pantry)
  res.render("foods/index.ejs", {pantry});
 
  } catch (error) {
    console.log(error);
    res.status(418).redirect("/");
  };
});

  //create pantry

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", async (req, res) => {
  try {
    //look  up the user from req.session
    const {_id} = req.session.user;
    //console.log(req.session.user);
    const todoUser = await User.findById(_id );
    //console.log(toddUser);
    //console.log(req.body);
    const pantryData = {
      name: req.body.foodname,
    };

    todoUser.pantry.push(pantryData);
    await todoUser.save();
    //console.log(pantryData);
    res.status(200).redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


  //delete pantry item
 
  
  router.delete('/:itemId',async (req,res) =>{
    try{  
      //look up the user from req.session
     const currentUser = await User.findById(req.session.user._id);
    //  console.log(req.session.user._id);
    //  console.log(req.params.itemId);
     currentUser.pantry.id(req.params.itemId).deleteOne();

    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
    } catch(error){
      //if any errors,log them and redirect back home 
      console.log(error);
      res.redirect('/')
    }
  });
    
//edit food
  
  router.get("/:itemId/edit", async(req,res) =>{
    try{  
      console.log("Session User:", req.session.user);
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) {
      throw new Error("User not found");
    }
    const currentFood =currentUser.pantry.id(req.params.itemId);
    if(!currentFood){
      throw new Error('food item not food');
    }
    res.render('edit.ejs',{user:currentUser,
      item:currentFood
    })

    }catch(error){
      console.log(error);
      res.redirect('/')
    }
  });

  

//update food

router.put('/:itemId',async(req,res)=>{
  try{
    const currentUser =await User.findById(req.session.user._id);
    const currentFood =await currentUser.pantry.id(req.params.itemId);
    if(!currentFood){
      throw new Error('Food item not food')
    }
    currentFood.name=req.body.foodname;
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`)
  } catch(error){
    console.log(error);
    res.redirect('/');
  }
});





  
 
  




module.exports = router;
