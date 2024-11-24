const express = require("express");
const router = express.Router();
const User = require("../models/user.js");



router.get("/", async (req, res) => {
  try {
    const users= await User.find({});
  
    
    res.render("users/index.ejs", {users});
  } catch (error) {
    console.log(error);
    res.status(418).redirect("/");
  }
});

router.get("/show/:id", async (req, res) => {
  try {
    const userId =req.params.id;
    const user = await User.findById(userId);
  if(!user){
    return res.status(404).send('user not found');
  }
    res.render("users/show.ejs", {user});
  } catch (error) {
    console.log(error);
    res.status(418).redirect("/");
  }
});


module.exports = router;