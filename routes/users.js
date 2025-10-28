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
    // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
    res.send(JSON.stringify({users}, null, 4));
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
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        /*
        Include similar code here for updating other attributes as needed
        */
       // Extract and update firstName if provided
        let firstName = req.query.firstName;
        if (firstName) {
            filtered_user.firstName = firstName;
        }
        // Extract and update lastName if provided
        let lastName = req.query.lastName;
        if (lastName) {
            filtered_user.lastName = lastName;
        }
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
