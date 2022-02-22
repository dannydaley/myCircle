//#region setup
var express = require('express');
const app = express();
var dotenv = require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

//#endregion
var sqlite3 = require('sqlite3').verbose();
let SQLdatabase = new sqlite3.Database('./database/SQLdatabase.db');
app.locals.SQLdatabase = SQLdatabase;


//#region SQL DATABASE STUFF 
//get the saved post information from external JSON file
// mainly for keeping up to date when new post are created etc
let postDataJSON = require("./database/posts.json");
let userDataJSON = require("./database/users.json");

const GET_USER_PROFILE_INFO = "SELECT name, joined, posts, profilePicture, aboutMe, pinnedPost FROM users WHERE name = ?" // SQL command
const GET_ALL_POSTS = "SELECT * FROM `blog` ORDER BY id DESC"; // SQL command
const GET_ALL_POSTS_BY_RECIPIENT = "SELECT * FROM `blog` WHERE recipient = ? ORDER BY id DESC"; // SQL command
const GET_RECENT_POSTS = "SELECT * FROM blog WHERE recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const BLOG_DELETE_POST = "DELETE FROM `blog` WHERE title = ? AND id = ?"; // SQL command
const GET_POSTS_BY_AUTHOR = "SELECT * FROM `blog` WHERE author = ? AND recipient = ? ORDER BY id DESC" // SQL command
const GET_RECENT_POSTS_BY_AUTHOR = "SELECT * FROM blog WHERE author = ? AND recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const SQL_ADD_BLOG_POST = "INSERT INTO `blog` (author, title, image, content, link, date, recipient) VALUES(?,?,?,?,?,?,?)" // 
const SQL_UPDATE_BLOG =  "UPDATE `blog` SET title = ?, image = ?, link = ?, author = ?, content = ? WHERE id = ?" //SQL command
const SQL_UPDATE_USER_PROFILE = "UPDATE users SET profilePicture = ?, aboutMe = ? WHERE name = ?" // SQL command
const SQL_UPDATE_USERS_PINNED_POST = "UPDATE users SET pinnedPost = ? WHERE name = ?" // SQL command
const GET_ALL_USERS = "SELECT * FROM users"; // SQL command

/* Database setup endpoint */
app.get('/SQLDatabaseUserSetup', (req, res, next) => {
  let SQLdatabase = req.app.locals.SQLdatabase;
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `users`');
    //recreate the users table
    // SQLdatabase.query('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) UNIQUE COLLATE NOCASE, email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), posts int, joined varchar(255), profilePicture varchar(255), aboutMe text, pinnedPost INTEGER)');
    SQLdatabase.run('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) UNIQUE , email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), posts int, joined varchar(255), profilePicture varchar(255), aboutMe text, pinnedPost INTEGER)');
    //create test rows
    let rows = []    
    for (let i = 0; i < userDataJSON.users.length; i++) {
      rows[i] = [userDataJSON.users[i].name, userDataJSON.users[i].email, userDataJSON.users[i].password, userDataJSON.users[i].passwordSalt, userDataJSON.users[i].posts, userDataJSON.users[i].joined, userDataJSON.users[i].profilePicture,userDataJSON.users[i].aboutMe, userDataJSON.users[i].pinnedPost]
    }
    // add rows to database
    rows.forEach( (row) => {
      SQLdatabase.run('INSERT INTO `users` (name, email, password, passwordSalt, posts, joined, profilePicture, aboutMe, pinnedPost) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', row);
    });
  })
  //render success page
  console.log("user table built");
  res.send("user-db-done");
})
// set up blog table in database
app.get('/SQLDatabaseBlogSetup', (req, res, next) => {
  let SQLdatabase = req.app.locals.SQLdatabase;
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `blog`');
    // create blog table
    SQLdatabase.run('CREATE TABLE `blog` ( id INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(255), title varchar(255), image varchar(255), content text, link varchar(255), date varchar(255), recipient varchar(255) )');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < postDataJSON.entries.length; i++) {
      rows[i] = [postDataJSON.entries[i].id, postDataJSON.entries[i].author, postDataJSON.entries[i].title, postDataJSON.entries[i].image, postDataJSON.entries[i].content, postDataJSON.entries[i].link, postDataJSON.entries[i].date, postDataJSON.entries[i].recipient]
    }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `blog` VALUES(?,?,?,?,?,?,?,?)', row);
      // increment users post count according to author of currently processed post
      
    });
  })
  // render success page
  console.log("blog table built");
  res.send("blog-db-done");
})

/*==============================DEBUGGING AND TESTING ENDPOINTS========================*/
/* GET all users */
app.get('/getAllUsers', (req, res, next) => {
  let SQLdatabase = req.app.locals.SQLdatabase;
  // grab all user data
  SQLdatabase.all(GET_ALL_USERS, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
  })
})

/* GET all blog posts */
app.get('/getAllPosts', (req, res, next) => {  
  let SQLdatabase = req.app.locals.SQLdatabase;
  // grab all posts
  SQLdatabase.all(GET_ALL_POSTS, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }    
    res.json(rows);
  })
})
/*========================END OF DEBUGGING AND TESTING ENDPOINTS========================*/

//#endregion


//#region endpoints
app.get('/', (req, res) => {
    console.log("port" + process.env.PORT + " '/' visited")
    res.send("BACK END IS LISTENING ON PORT " + process.env.PORT)
})

const Users = {
  "users" : [
      {
          "username": "Daley",
          "email": "danny@email.com",
          "password": "pass",
          "passwordSalt": "859fe9e3fa07cb9cc81bbd1d58da2747d4282c4d9abbf2f372a8c73f68b7ef323a08b98da1401d8b639b1310f8094c7a1950e4a85300f70f7a92536b4b1a860bf759128ac9632b807100f48af7f906fbf14d27f4a16293eccb024f5182db76f356a3644a4c542ff35a17bd3a7b19a757a2fa318fbd3a45e62129a10fa481503233e9a998518b91430244157e328e7129c84a0d478e7d3c2360f0357d5b1a64d0d70de494436dcb84798bf8b629ee2089683e1b5d4faca23b1c5c43d031928684be00ce96b42a73269ddadf688c6737458642b5100d9db29be6594f327f4b44234786ecd407b2c98e52d766439e7742ac937ca58811b284c",
      }
    ]
  }


// app.get('/', (req, res, next) => {  
//   let SQLdatabase = req.app.locals.SQLdatabase;
//   // grab all posts
//   SQLdatabase.all(GET_ALL_POSTS, [], (err, rows) => {
//     if (err) {
//       res.status(500).send(err.message);
//       return;
//     }    
//     res.send(rows);
//   })
// })

app.get('/getFeed', (req, res, next) => {  
  let SQLdatabase = req.app.locals.SQLdatabase;  
  // grab all posts
  SQLdatabase.all(GET_ALL_POSTS, [], (err, rows) => {
    if (err) {
      console.log("errorrrrr")
      res.status(500).send(err.message);
      return;
    }       
    res.json(rows);
  })
})

// #endregion 

app.post('/signin', (req, res) => {  
  if (req.body.email === Users.users[0].email &&
    req.body.password === Users.users[0].password){      
     res.json('success') 
    }
    else {
      res.json('credential failure')
    }  
})

app.post('/newPost', (req, res) => {
  console.log(req.body)
  res.json('success')
})


app.listen(process.env.PORT)
console.log("server.js running on port " + process.env.PORT)