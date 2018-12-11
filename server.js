const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
fs = require('fs');
var id = 1;
var countID;

//Show all users
app.get("/all", (req,res)=>{
  const data = fs.readFileSync('./storage.json', 'utf-8')
  res.json(JSON.parse(data));
})

//Creating New Users by enter data in this order "/create/:name/:email/:state"
app.put('/create/:name/:email/:state', (req,res)=>{
  id++;
  countID = id;
  let users = require(`./storage.json`)
  let newUser = {
    id: countID,
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  users.push(newUser);
  fs.writeFileSync(`./storage.json`, JSON.stringify(users))
  res.end('created!')
})

//Get a user info by name
app.get("/user/:name",(req,res)=>{
  const data = fs.readFileSync('./storage.json', 'utf-8')
  let allUsers = JSON.parse(data);
  let name = req.params.name
  res.json(allUsers.filter((allUsers)=>allUsers.name==name))
  })

// UPDATE THE USER
app.put('/update/:id/:name/:email/:state', (req,res)=>{
  let users = require(`./storage.json`)
  let updateUser = {
    id: req.params.id,
    name: req.params.name,
    email: req.params.email,
    state: req.params.state
  }
  update = users.map((user)=>{
    if(user.name==req.params.name){
      user = updateUser
    }
    return user;
  })
  fs.writeFileSync(`./storage.json`, JSON.stringify(update))
  
  const data = fs.readFileSync('./storage.json', 'utf-8');//show updated array.
  res.json(JSON.parse(data));
})


// DELETE ROUTE
app.delete('/:name', (req,res)=>{
  let users = require(`./storage.json`)
  let updatedUsers = users.filter((user)=>user.name != req.params.name)
  fs.writeFileSync(`./storage.json`, JSON.stringify(updatedUsers))
  res.end('deleted!')
})

app.use((req,res)=>{
  res.sendStatus(404)
})

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})

