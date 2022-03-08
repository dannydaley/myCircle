//#region setup
var express = require('express');
const app = express();
var dotenv = require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));




// set up crypto middleware
let crypto = require('crypto');
const { captureRejectionSymbol } = require('events');

// number of iterations to jumble the hash
const iterations = 1000;

//set up char length of hash
const hashSize = 64;

// which hashing algorithm will be used
const hashAlgorithm = 'sha256';

// create a hash salt/pepper
const generatePepper = crypto.randomBytes(256).toString('hex');

//this function returns a hash of the password, combined with the pepper and the salt.
function passwordHash(thePassword, theSalt) {  
  const pepper = process.env.PEPPER;
   return crypto.pbkdf2Sync(thePassword, pepper + theSalt, iterations, hashSize, hashAlgorithm).toString('hex');
}


//#endregion
var sqlite3 = require('sqlite3').verbose();
let SQLdatabase = new sqlite3.Database('./database/SQLdatabase.db');
app.locals.SQLdatabase = SQLdatabase;


//#region SQL DATABASE STUFF 
//get the saved post information from external JSON file
// mainly for keeping up to date when new post are created etc
let postDataJSON = require("./database/posts.json");
let userDataJSON = require("./database/users.json");
const { Console } = require('console');

const GET_USER_PROFILE_INFO = "SELECT name, joined, posts, profilePicture, aboutMe, pinnedPost FROM users WHERE name = ?" // SQL command
const GET_ALL_POSTS = "SELECT * FROM `blog` ORDER BY id DESC"; // SQL command
const GET_ALL_POSTS_BY_CIRCLE = "SELECT * FROM `blog` WHERE circle = ? ORDER BY id DESC"; // SQL command
const GET_RECENT_POSTS = "SELECT * FROM blog WHERE recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const BLOG_DELETE_POST = "DELETE FROM `blog` WHERE title = ? AND id = ?"; // SQL command
const GET_POSTS_BY_AUTHOR = "SELECT * FROM `blog` WHERE author = ? ORDER BY id DESC" // SQL command
const GET_POSTS_BY_AUTHOR_BY_CIRCLE = "SELECT * FROM `blog` WHERE author = ? AND circle = ? ORDER BY id DESC" // SQL command
const GET_RECENT_POSTS_BY_AUTHOR = "SELECT * FROM blog WHERE author = ? AND recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const SQL_ADD_BLOG_POST = "INSERT INTO `blog` (author, image,  link, circle, content,date, recipient) VALUES(?,?,?,?,?,?,?)" // 
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
    SQLdatabase.run('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), aboutMe text, location varchar(255), education varchar(255), work varchar(255), profilePicture varchar(255))');
    //create test rows
    let rows = []    
    for (let i = 0; i < userDataJSON.users.length; i++) {
      rows[i] = [userDataJSON.users[i].username, userDataJSON.users[i].firstName, userDataJSON.users[i].lastName, userDataJSON.users[i].email, userDataJSON.users[i].password, userDataJSON.users[i].passwordSalt, userDataJSON.users[i].aboutMe, userDataJSON.users[i].location, userDataJSON.users[i].education, userDataJSON.users[i].work, userDataJSON.users[i].profilePicture]
    }
    // add rows to database
    rows.forEach( (row) => {
      SQLdatabase.run('INSERT INTO `users` (username, firstName, lastName, email, password, passwordSalt, aboutMe, location, education, work, profilePicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)', row);
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
    SQLdatabase.run('CREATE TABLE `blog` ( id INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(255), title varchar(255), image varchar(255), content text, link varchar(255), date varchar(255), circle varchar(255), recipient varchar(255) )');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < postDataJSON.entries.length; i++) {
      rows[i] = [postDataJSON.entries[i].id, postDataJSON.entries[i].author, postDataJSON.entries[i].title, postDataJSON.entries[i].image, postDataJSON.entries[i].content, postDataJSON.entries[i].link, postDataJSON.entries[i].date, postDataJSON.entries[i].circle,postDataJSON.entries[i].recipient]
    }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `blog` VALUES(?,?,?,?,?,?,?,?,?)', row);
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

app.post('/getFeed', (req, res, next) => {  
  let SQLdatabase = req.app.locals.SQLdatabase;  
  // grab all posts
    if (req.body.circle === 'general') {
      SQLdatabase.all(GET_ALL_POSTS, [  ], (err, rows) => {
        if (err) {
          console.log("errorrrrr")
          res.status(500).send(err.message);
          return;
        }  
        console.log(req.body.circle)     
        res.json(rows);
      })
    } else {
      SQLdatabase.all(GET_ALL_POSTS_BY_CIRCLE, [ req.body.circle ], (err, rows) => {
        if (err) {
          console.log("errorrrrr")
          res.status(500).send(err.message);
          return;
        }  
        console.log(req.body.circle)     
        res.json(rows);
      })
    }
  })

  app.post('/getFeedByUser', (req, res, next) => {  
    let SQLdatabase = req.app.locals.SQLdatabase;  
    // grab all posts
      if (req.body.circle === 'general') {
        SQLdatabase.all(GET_POSTS_BY_AUTHOR, [ req.body.user ], (err, rows) => {
          if (err) {
            console.log("errorrrrr")
            res.status(500).send(err.message);
            return;
          }  
          res.json(rows);
        })
      } else {
        SQLdatabase.all(GET_POSTS_BY_AUTHOR_BY_CIRCLE, [ req.body.user, req.body.circle ], (err, rows) => {
          if (err) {
            console.log("errorrrrr")
            res.status(500).send(err.message);
            return;
          }  
          console.log(req.body.circle)     
          res.json(rows);
        })
      }
    })

// #endregion 


app.post('/getUserGeneralInfo', (req, res) => {
  let SQLdatabase = req.app.locals.SQLdatabase;  
  SQLdatabase.get("SELECT firstName, lastName, aboutMe, location, education, work, profilePicture FROM users WHERE username = ?", req.body.user, (err, rows) => {
    if (err) {
      console.log("ERROR GETTING INFO")
      res.status(500).send(err)
    }
    res.json(rows)
  }
)})

app.post('/signin', (req, res) => {  
    //ready the data
    let data = req.body;
    // init database
    let SQLdatabase = req.app.locals.SQLdatabase;
    // rename for easier access
    const FIND_USER = "SELECT * FROM users WHERE email = ?" 
    SQLdatabase.get(FIND_USER, data.email, (err, rows) => {
      if (err) {
        console.log(ERRROORRRRRRR);
        res.status(500).send(err)
      }
      let salt = generatePepper;

      console.log(salt)
      console.log("break")
      console.log(passwordHash(data.password, salt))
      // console.log(passwordHash(data.password, ))
      let user = rows
      console.log(rows.email)
      if (user!== undefined && user.password === passwordHash(data.password, user.passwordSalt)) {
        res.json({
          status: 'success',
          firstName: rows.firstName,
          lastName: rows.lastName,
          username: rows.username,
          profilePicture: rows.profilePicture
        }) 

      }
    else {
      console.log("WRONG INFOOOOOOOOOO")
      res.json({
        status: 'failed',
        message: 'incorrect email or password'
      })
    }  
    })
    }
)

/* POST login data to validate login page */
// router.post('/login', (req, res, next) => {
//   //ready the data
//   let data = req.body;
//   // init database
//   let SQLdatabase = req.app.locals.SQLdatabase;
//   // rename for easier access
//   let db = SQLdatabase;
//   // set up command, select all from user database with THIS email
//   const FIND_USER = "SELECT * FROM users WHERE email = ?"  
//   // run the command with the email being passed in 
//     db.query(FIND_USER, [data.email], (err, rows) => {  
//       if (err) {  
//         // if user not found respond with an error      
//         found = false;
//         res.status(500).send(err);               
//       }
//       let user = rows[0]
//       /* if we get a user back, and the stored password matches the output of running the hashing
//        function on what the user entered along with the stored password salt, set up the session
//        variables and log the user in   */
//         if (user !== undefined && user.password === passwordHash(data.password, user.passwordSalt)){
//         //create the session data
//         req.session.userData = {
//         };
//         // add user data to the session for referencing across the site 
//         req.session.userData.sessionUsername = user.name;         
//         req.session.userData.sessionUserPosts = user.posts;
//         req.session.userData.sessionUserDateJoined = user.joined;
//         req.session.userData.sessionUserProfilePicture = user.profilePicture;
//         req.session.userData.sessionUserAboutMe = user.aboutMe;
//         req.session.userData.sessionUserIsLoggedIn = true; 
//         res.render('loggedIn', { name: req.session.userData.sessionUsername, posts: req.session.userData.sessionUserPosts, dateJoined: req.session.userData.sessionUserDateJoined, profilePicture: req.session.userData.sessionUserProfilePicture, title: 'You are logged in!', loggedIn: changeNavLoginButton(sessionExists(req)) });  
//       }
//       // otherwise invalid user or pass
//       else {
//         found = false;      
//         res.render('failedLogin', { title: 'Log in', loggedIn: changeNavLoginButton(sessionExists(req)) });
//       }       
//     })   
// })

app.post('/newPost', (req, res) => {
  console.log(req.body)
  let SQLdatabase = req.app.locals.SQLdatabase;
console.log(req.body.postData)
  SQLdatabase.get("SELECT profilePicture FROM users WHERE username = ?", [ req.body.postData.author ], (err, profilePicture) => {
    if (err) {
      console.log("failed on profile pic grab")
      console.log(req.body)
      res.status(500).send(err.message);
      return;
    } 
    console.log(profilePicture)
    req.body.postData.image = profilePicture
     SQLdatabase.run(SQL_ADD_BLOG_POST, [
      req.body.postData.author,
      req.body.postData.image.profilePicture,
      req.body.postData.link,
      req.body.circle,
      req.body.postData.postContent,
      req.body.postData.data,
      req.body.postData.recipient
    ],  (err, rows) => {
      if (err) {
        console.log("errorrrrr")
        res.status(500).send(err.message);
        return;
      }  
      console.log(req.body.postData)          
      res.json('success');
    })
  }
  )

  }
  );



app.listen(process.env.PORT)
console.log("server.js running on port " + process.env.PORT)