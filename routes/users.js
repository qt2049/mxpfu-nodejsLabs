const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  res.send(users.filter(item => item.email === req.params.email))
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let email = req.query.email;
  let dob = req.query.DOB;
  if (firstName == null) {
    res.status(400).send("firstName shall be defined!")
    return;
  }
  if (lastName == null) {
    res.status(400).send("lastName shall be defined!")
    return;
  }
  if (email == null) {
    res.status(400).send("email shall be defined!")
    return;
  }
  if (dob == null) {
    res.status(400).send("dob shall be defined!")
    return;
  }
  if (users.filter(item => item.email === req.query.email).length > 0) {
    res.status(500).send("user already defined!")
    return;
  }
  users.push({
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "DOB": dob
  });
  res.status(204).send("user added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
