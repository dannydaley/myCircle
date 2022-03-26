//#region SETUP
var express = require('express');
const app = express();
var dotenv = require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));
let uuidv4 = require('uuid/v4');
const { request } = require('https');

// Session setup
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var userSession = {
  secret: "myMegaSecret",
  keys: ['key1', 'key2', 'key3'],
  originalMaxAge: 0,
  maxAge:0,
  resave: true,
  saveUninitialized: true,  
  cookie: {
    httpOnly: true,    
    secure: false,
    maxAge: 30  
  }
};

app.use(cookieParser());
app.use(session(userSession));

//#region SECURITY
// set up crypto middleware for hashing password and checking password hahses
let crypto = require('crypto');

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

//#endregion SECURITY


//#endregion SETUP

//#region IMAGES AND IMAGE UPLOAD HANDLING

// default profile picture applied to all users profilePicture field in the users table of the db on account creation
let defaultProfilePicture = "images/defaultUser.png";

//set up multer middleware for image uploads
var multer  = require('multer');

// set up storage for file uploads
const storage = multer.diskStorage({
  // set destination to public image directory
  destination: "public/images/uploads",
  filename: function(req, file, cb){
    // create a unique suffix so that image names will never have a duplicate
    //suffix consists of the date, a hyphen and then a large random number 
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
     cb(null,"IMAGE-" + uniqueSuffix + ".png");
     // generate the file name of the file to be added to the public image directory
     // filename contains path to folder to make things easier across the server
     // we append .png top the filename so that files are recognised as their format
     let fileName = "images/uploads/" + "IMAGE-" + uniqueSuffix + ".png" ;
     // update the string attached to the incoming req.body.image field
     // this is added to the database as the imageLocation
     req.body.imageLocations += fileName + ","}
});
// set up multer function to be called on uploads
let upload = multer({ storage: storage});

//#endregion IMAGES AND IMAGE UPLOAD HANDLING

//#region SQL DATABASE SETUP AND QUERIES 

// SQLite 3 setup for test db while in development
var sqlite3 = require('sqlite3').verbose();

// set up variable for access to database
let SQLdatabase = new sqlite3.Database('./database/SQLdatabase.db');

// set app.locals database to the initialised variable
app.locals.SQLdatabase = SQLdatabase;

//JSON files for dummy data on table builds
let postDataJSON = require("./database/posts.json");
let userDataJSON = require("./database/users.json");
let imagesDataJSON = require("./database/images.json");
let friendshipsDataJSON = require("./database/friendships.json");
let userActionsDataJSON = require("./database/userActions.json");
let chatsDataJSON = require("./database/chats.json");
let messagesDataJSON = require("./database/messages.json")

// SQL QUERIES
const CHECK_THAT_USERS_ARE_FRIENDS = "SELECT * FROM friendships WHERE (user1 = ? OR user2 = ?) AND (user1 = ? OR user2 = ?)";
const GET_USER_GENERAL_INFO_BY_USERNAME = "SELECT firstName, lastName, aboutMe, location, education, work, profilePicture, coverPicture FROM users WHERE username = ?";
const GET_USER_PROFILE_INFO_BY_USERNAME = "SELECT firstName, lastName, aboutMe, profilePicture, coverPicture FROM users WHERE username = ?";
const GET_POST_VOTES_BY_POST_ID = "SELECT likes, dislikes FROM blog WHERE id = ?";
const UPDATE_POST_VOTES_BY_POST_ID = "UPDATE blog SET likes = ?, dislikes = ? WHERE id = ?";
const UPDATE_PASSWORD_BY_EMAIL = "UPDATE users SET password = ?, passwordSalt = ? WHERE email = ?";
const LOOK_UP_EMAIL_BY_EMAIL = "SELECT email FROM users WHERE email = ?";
const UPDATE_EMAIL = "UPDATE users SET email = ? WHERE email = ?";
const UPDATE_USER_GENERAL_INFO = "UPDATE users SET firstName = ?, lastName = ?, aboutMe = ?, location = ?, education = ?, work = ? WHERE username = ?";
const FIND_USER = "SELECT * FROM users WHERE email = ?";
const SIGN_UP_USER = "INSERT INTO users (email, username, firstName,lastName, password, passwordSalt, profilePicture) VALUES(?,?,?,?,?,?,?)";
const GET_ALL_POSTS = "SELECT * FROM `blog` ORDER BY id DESC";
const GET_ALL_POSTS_BY_CIRCLE = "SELECT * FROM `blog` WHERE circle = ? ORDER BY id DESC";
const GET_ALL_IMAGES_BY_USER = "SELECT * FROM images WHERE ownerUsername = ? ORDER BY postId DESC";
const GET_PROFILEPICTURE_BY_USERNAME = "SELECT profilePicture FROM users WHERE username = ?";
const GET_ALL_USERS_FRIENDS = "SELECT * FROM friendships WHERE user1 =? OR user2 = ?";
const GET_NOTIFICATIONS = "SELECT userActions.* , users.firstName, users.lastName FROM `userActions` LEFT OUTER JOIN `users` ON `userActions`.`sender` = `users`.`username` WHERE recipient = ? ORDER BY actionId DESC LIMIT 50";
const GET_POSTS_BY_AUTHOR_OR_RECIPIENT = "SELECT blog.*, users.firstName, users.lastName, users.profilePicture FROM `blog` LEFT OUTER JOIN `users` ON `blog`.`author` = `users`.`username` WHERE author = ? OR recipient = ? ORDER BY id DESC";
const GET_POSTS_BY_AUTHOR_BY_CIRCLE = "SELECT * FROM `blog` WHERE author = ? AND circle = ? ORDER BY id DESC";
const SQL_ADD_BLOG_POST = "INSERT INTO `blog` (author, circle, content, date, recipient, likes, dislikes, postStrict) VALUES(?,?,?,date(),?,?,?,?)";
const GET_ALL_USERS = "SELECT * FROM users";

//#region SQL SETUP ENDPOINTS

// users table setup endpoint
app.get('/SQLDatabaseUserSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `users`');
    //recreate the users table
    // SQLdatabase.query('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) UNIQUE COLLATE NOCASE, email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), posts int, joined varchar(255), profilePicture varchar(255), aboutMe text, pinnedPost INTEGER)');
    SQLdatabase.run('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), aboutMe text, location varchar(255), education varchar(255), work varchar(255), profilePicture varchar(255), coverPicture varchar(255))');
    //create array of users from the dummy data JSON file
    let users = userDataJSON.users  
    // insert each element in the array of object into the users table in the database
    users.forEach( (user) => {
      // SQL query to run
      SQLdatabase.run('INSERT INTO `users` (username, firstName, lastName, email, password, passwordSalt, aboutMe, location, education, work, profilePicture, coverPicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)', 
        // values passed in from current iteration of the users array
        [user.username, user.firstName, user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.location, user.education, user.work, user.profilePicture, user.coverPicture ]);
    });
  });
  //respond with success page
  res.send("user-db-done");
})
//blog table setup endpoint
app.get('/SQLDatabaseBlogSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `blog`');
    // create blog table
    SQLdatabase.run('CREATE TABLE `blog` ( id INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(255), content text,  date varchar(255), circle varchar(255), recipient varchar(255), likes int, dislikes int, postStrict int)');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < postDataJSON.entries.length; i++) {
      rows[i] = [postDataJSON.entries[i].id, postDataJSON.entries[i].author, postDataJSON.entries[i].content, postDataJSON.entries[i].date, postDataJSON.entries[i].circle,postDataJSON.entries[i].recipient, postDataJSON.entries[i].likes, postDataJSON.entries[i].dislikes, postDataJSON.entries[i].postStrict]
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

// set up blog table in database
app.get('/SQLDatabaseImagesSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `images`');
    // create blog table
    SQLdatabase.run('CREATE TABLE `images` ( ownerUsername varchar(255), imageLocation varchar(255), postId int)');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < imagesDataJSON.entries.length; i++) {
      rows[i] = [imagesDataJSON.entries[i].ownerUsername, imagesDataJSON.entries[i].imageLocation, imagesDataJSON.entries[i].postId]
    }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `images` VALUES(?,?,?)', row);
      // increment users post count according to author of currently processed post      
    });
  })
  // render success page
  console.log("image table built");
  res.send("image-db-done");
})

app.get('/SQLDatabaseFriendshipsSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `friendships`');
    // create blog table
    SQLdatabase.run('CREATE TABLE `friendships` ( user1 varchar(255), user2 varchar(255))');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < friendshipsDataJSON.entries.length; i++) {
      rows[i] = [friendshipsDataJSON.entries[i].user1, friendshipsDataJSON.entries[i].user2]
    }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `friendships` VALUES(?,?)', row);
      // increment users post count according to author of currently processed post      
    });
  })
  // render success page
  console.log("friendships table built");
  res.send("friendships-db-done");
})

app.get('/SQLDatabaseUserActionsSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `userActions`');
    // create blog table

    SQLdatabase.run('CREATE TABLE `userActions` ( actionId INTEGER PRIMARY KEY AUTOINCREMENT, type varchar(255), sender varchar(255), recipient varchar(255), message varchar(255), seen int, approved int, date varchar(255), relativePost int)');
    //create base rows
    let rows = userActionsDataJSON.userActions;
    //loop through posts.json to populate rows array
    // for (let i = 0; i < userActionsDataJSON.userActions.length; i++) {
    //   rows[i] = [userActionsDataJSON.userActions.[i].user1, userActionsDataJSON.userActions.[i].user2]
    // }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `userActions` VALUES(?,?,?,?,?,?,?,?,?)', row.id, row.type, row.sender, row.recipient, row.message, row.seen, row.approved, row.date, row.relativePost);
      // increment users post count according to author of currently processed post      
    });
  })
  // render success page
  console.log("userActions table built");
  res.send("userActions-db-done");
})

app.get('/SQLDatabaseChatsSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `chats`');
    // create blog table

    SQLdatabase.run('CREATE TABLE `chats` ( chatId INTEGER PRIMARY KEY AUTOINCREMENT, user1 varchar(255), user2 varchar(255), seenByUser1 int, seenByUser2 int, lastActive varchar(255))' ,(err) => {
      if (err){
        console.log(err)
      }
    })
    //create base rows
    let rows = chatsDataJSON.entries;
    //loop through posts.json to populate rows array
    // for (let i = 0; i < userActionsDataJSON.userActions.length; i++) {
    //   rows[i] = [userActionsDataJSON.userActions.[i].user1, userActionsDataJSON.userActions.[i].user2]
    // }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `chats` (chatId, user1, user2, seenByUser1, seenByUser2, lastActive) VALUES(?,?,?,?,?, datetime())', [row.chatId,row.user1, row.user2, row.seenByUser1, row.seenByUser2], (err) => {
        if (err){
          console.log(err)
        }
      })
      // increment users post count according to author of currently processed post      
    })
  })
    // render success page
    console.log("chats table built");
    res.send("chats-db-done");
})

app.get('/SQLDatabaseMessagesSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `messages`');
    // create blog table

    SQLdatabase.run('CREATE TABLE `messages` ( chatId INTEGER, messageId INTEGER PRIMARY KEY AUTOINCREMENT, sender varchar(255), recipient varchar(255), message text, date varchar(255), seen int)' ,(err) => {
      if (err){
        console.log(err)
      }
    })
    //create base rows
    let rows = messagesDataJSON.entries;
    //loop through posts.json to populate rows array
    // for (let i = 0; i < userActionsDataJSON.userActions.length; i++) {
    //   rows[i] = [userActionsDataJSON.userActions.[i].user1, userActionsDataJSON.userActions.[i].user2]
    // }
    // populate SQL command with rows array populated from posts.json
    rows.forEach( (row) => {
      // insert rows to table
      SQLdatabase.run('INSERT INTO `messages` (chatId, messageId, sender, recipient, message, date, seen) VALUES(?,?,?,?,?,datetime(),?)', [row.chatId,row.messageId, row.sender, row.recipient, row.message, row.seen], (err) => {
        if (err){
          console.log(err)
        }
      })
      // increment users post count according to author of currently processed post      
    });
  })
  // render success page
  console.log("messages table built");
  res.send("messages-db-done");
})

/*==============================DEBUGGING AND TESTING ENDPOINTS========================*/
/* GET all users */
app.get('/getAllUsers', (req, res, next) => {
  // grab all user data
  SQLdatabase.all(GET_ALL_USERS, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
  })
})

/*GET all images */
app.get('/getAllImages', (req, res, next) => {  // grab all user data
  SQLdatabase.all("SELECT * FROM images",  (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  })
})

/* GET all blog posts */
app.get('/getAllPosts', (req, res, next) => {  
  // grab all posts
  SQLdatabase.all(GET_ALL_POSTS, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }    
    res.json(rows);
  })
})

/* GET all friendships */
app.get('/getAllFriendships', (req, res, next) => {
  // grab all user data
  SQLdatabase.all("SELECT * FROM friendships", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
  })
})

/* GET all UserActions */
app.get('/getAllUserActions', (req, res, next) => {
  // grab all user data
  SQLdatabase.all("SELECT * FROM userActions", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
  })
})

app.get('/getAllChats', (req, res) => {
  SQLdatabase.all("SELECT * FROM `chats`", (err, rows) => {
    if (err){
      console.log(err)
      return
    }
    res.send(rows)
  })
})

app.get('/getAllMessages', (req, res, next) => {
  // grab all user data
  SQLdatabase.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
  })
})
/*========================END OF DEBUGGING AND TESTING ENDPOINTS========================*/

//#endregion

//#region endpoints

app.get('/', (req, res) => {
    console.log("port" + process.env.PORT + " '/' visited")
    res.send("BACK END IS LISTENING ON PORT " + process.env.PORT)
})

//#region SIGN UP & SIGN IN 
app.post('/signUp', (req, res) => {  
  //set up variables from the request for better readability
  let { signUpEmail, signUpUserName,signUpFirstName, signUpLastName, signUpPassword, confirmSignUpPassword } = req.body;
  //if both password fields match
  if (signUpPassword === confirmSignUpPassword) {
    //generate salt to store
    let passwordSalt = generatePepper;
    //generate password to store, using password from the confirm field, and the generated salt
    let storePassword = passwordHash(confirmSignUpPassword, passwordSalt);
    //assign default profile picture
    let profilePicture = defaultProfilePicture;
    //Create a new user in the user database with the fields from the form, the default profile picture and the generated password hash and salt
    SQLdatabase.run(SIGN_UP_USER, [ signUpEmail, signUpUserName, signUpFirstName, signUpLastName, storePassword, passwordSalt, profilePicture ], (err, rows) => {
      if (err) {
        console.log("failed to add user to database")
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username") {
          console.log("USERNAME ALREADY EXISTS")
          res.json("duplicate username")
          return
        }
        if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
          console.log("EMAIL ALREADY EXISTS")
          res.json("duplicate email")
          return
          // res.render("registrationError", { cause: "email", loggedIn: changeNavLoginButton(sessionExists(req)) })
        }
        res.status(500).send(err.message);
        return
      }
      //respond with success 
      res.json('sign up success');   
    })    
  } else {
    //response if password fields dont match
    res.json("PASSWORDS DONT MATCH")
  }
})

app.post('/signin', (req, res) => {  
  //pull data from request body for better readbility
  let { email, password } = req.body;
 //search if user exists using email address
  SQLdatabase.get(FIND_USER, email, (err, rows) => {
    if (err) {
      console.log("error at database");
      res.status(500).send(err)
    }
    //assign any returned rows to user variable
    let user = rows  
    //if a user exists, and their stored password matches the output of the hashing function
    // with their password entry..  
    if (user!== undefined && user.password === passwordHash(password, user.passwordSalt)) {
      req.session.userData = {
      };
      console.log(rows)
        req.session.userData.isSignedIn= true;
        req.session.userData.userFirstName = rows.firstName;
        req.session.userData.userLastName=  rows.lastName;
        req.session.userData.loggedInUsername= rows.username;
        req.session.userData.userProfilePicture= rows.profilePicture;
        req.session.userData.userCoverPicture= rows.coverPicture;
      console.log(req.session)
      //respond with user data
      res.json({
        status: 'success',
        isSignedIn: req.session.userData.isSignedIn,
        firstName: req.session.userData.userFirstName,
        lastName: req.session.userData.userLastName,
        username: req.session.userData.loggedInUsername,
        profilePicture: req.session.userData.userProfilePicture,
        coverPicture: req.session.userData.userCoverPicture
        // firstName: rows.firstName,
        // lastName: rows.lastName,
        // username: rows.username,
        // profilePicture: rows.profilePicture
      })
    } else {     
      console.log("invalid user credentials")
      //otherwise respond with failure message
      res.json({
      status: 'failed',
      message: 'incorrect email or password'
      })
    }  
  })
})

app.get('/refreshSessionStatus', (req, res) => {
  console.log("refreshing session")
  if (req.session.userData !== undefined) {
      res.json({
    status: 'session-exists',
    isSignedIn: req.session.userData.isSignedIn,
    firstName: req.session.userData.userFirstName,
    lastName: req.session.userData.userLastName,
    username: req.session.userData.loggedInUsername,
    profilePicture: req.session.userData.userProfilePicture
  })

  }
  else{
    res.json("no session")
  }

})


//#endregion SIGN UP & SIGN IN 

//#region UPDATE ACCOUNT INFO

app.post('/updateUserGeneralInfo', (req, res) => {
  //pull variables from request body for better readability
  const { firstName, lastName, aboutMe, location, education, work, username  } = req.body;  
  //update users general information in database
  SQLdatabase.run(UPDATE_USER_GENERAL_INFO, firstName, lastName, aboutMe, location, education, work, username, (err, rows) => {
    if (err){
      //error response
      res.json("ERROR AT DATABASE")
    }
    //success response
    res.json("success at database")
  })
})

app.post('/updateUserLoginInfo', (req, res) => {
  //pull variables from request body for better readability
  let { email, password, changeEmail, changePassword, changePasswordConfirm  } = req.body;
  //search for user by email
  SQLdatabase.get(FIND_USER, email, (err, rows) => {
    if (err) {
      console.log("error at database");
      res.status(500).send(err)
    }
    // if a user is found, apply it to user variable 
    let user = rows
    // if a user exists and the password stored matches the output of the hashing function with the entered password plus the stored salt.. 
    if (user!== undefined && user.password === passwordHash(password, user.passwordSalt)) {
      //if the change password field has been updated..
      if (changePassword) {
        // if password and confirm fields match..
        if (changePassword === changePasswordConfirm) {    
          //generate a new salt to store  
          let passwordSalt = generatePepper;
          //generate a new password hash to store using the hashing function, passing in the new password entry and the newly generated salt
          let storePassword = passwordHash(changePassword, passwordSalt);          
          // apply the password to the database where the email matches the users
          SQLdatabase.run(UPDATE_PASSWORD_BY_EMAIL, [ storePassword, passwordSalt, email ], (err, rows) => {
            if (err){
              console.log("error at database with password")          
            }
            console.log("success with changing password")
          })
        }
        // if changeEmail field has been updated
        if (changeEmail) {
          // look up user using their existing email adress
          SQLdatabase.get(LOOK_UP_EMAIL_BY_EMAIL, email, (err, rows) => {
            if (err){
              console.log(err)
            }
            // if no rows are returned
            if (!rows) {
              //notify email doesnt exist
                console.log("current email not in database")
              return
            }
            else {
              //otherwise, update the email with the new changeEmail entry
              SQLdatabase.run(UPDATE_EMAIL, [ changeEmail, email], (err, rows)=> {
              if (err){
                return
              }    
              })
            }
          })
        }
      }
      //respond with success on completion of changes
  res.json("success with changes")
    } else {
      // password verification doesnt validate, respond with inv credentials
      console.log("incorrect validation")
      res.json("incorrect validation")
    }  
  })
})
//#endregion UPDATE ACCOUNT INFO END

//#region GET FEEDS

app.post('/getFeed', (req, res, next) => {  
  // grab all posts
  if (req.body.circle === 'general') {
    SQLdatabase.all(GET_ALL_POSTS, [  ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }     
      res.json(rows);
    })
  } else {
    // get all posts from the database according to the corresponding circle
    SQLdatabase.all(GET_ALL_POSTS_BY_CIRCLE, [ req.body.circle ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }  
      res.json(rows);
    })
  }
})

app.post('/getFeedByUser', (req, res, next) => {  
  //set up variables from the request body
  let { loggedInUsername, userProfileToGet } = req.body;
  let isFriendsWithLoggedInUser = false;
  SQLdatabase.all(CHECK_THAT_USERS_ARE_FRIENDS, [ loggedInUsername, loggedInUsername, userProfileToGet, userProfileToGet ], (err, rows) => {
    if(err){
      console.log("error at database with friendships");
      res.json("error at database with friendships");
      return
    }    
    rows.length > 0 || loggedInUsername === userProfileToGet ? isFriendsWithLoggedInUser = true : isFriendsWithLoggedInUser = false;
    if (req.body.circle === 'general') {
      SQLdatabase.all(GET_POSTS_BY_AUTHOR_OR_RECIPIENT, [ userProfileToGet, userProfileToGet ], (err, posts) => {
        if (err) {
          console.log("error at database", err);
          res.status(500).send(err.message);
          return;
        }
        let postIds = []
        posts.forEach(post => {
          postIds.push(post.id);
          post.images = [];
          })        
          SQLdatabase.all("SELECT images.imageLocation, images.postId FROM `images` WHERE postId IN  ("+postIds.join(',')+")", (err, images) => {           
          images.forEach(image => posts.forEach(post=> {image.postId === post.id ? post.images.push(image.imageLocation): '' }))     
     
          res.json({
            isFriendsWithLoggedInUser: isFriendsWithLoggedInUser,
          posts: posts
          })      
      })
      })
    } else {
      SQLdatabase.all(GET_POSTS_BY_AUTHOR_BY_CIRCLE, [ userProfileToGet, userProfileToGet ], (err, posts) => {
        if (err) {
          console.log("error at database");
          res.status(500).send(err.message);
          return;
        }   
        let postIds = []
        posts.forEach(post => {
          postIds.push(post.id);
          post.images = [];
          })        
          SQLdatabase.all("SELECT images.imageLocation, images.postId FROM `images` WHERE postId IN  ("+postIds.join(',')+")", (err, images) => {           
          images.forEach(image => posts.forEach(post=> {image.postId === post.id ? post.images.push(image.imageLocation): '' }))
          res.json({
            isFriendsWithLoggedInUser: isFriendsWithLoggedInUser,
            posts: posts
          })
        })
      })
    }
  })
})
//#endregion GET FEEDS

//#region GET USER INFO 

app.post('/getAllImagesByUser', (req, res, next) => {
  //set up variables from the request body
  let user = req.body.user
    // grab all user data
  SQLdatabase.all(GET_ALL_IMAGES_BY_USER, user, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  })
})


app.post('/getUserGeneralInfo', (req, res) => {
  //set up variables from the request body
  let user = req.body.user
   SQLdatabase.get(GET_USER_GENERAL_INFO_BY_USERNAME, user , (err, rows) => {
    if (err) {
      console.log("error getting general user info")
      res.status(500).send(err)
      }
      res.json(rows)
  })
})

app.post('/getUserProfile', (req, res) => {
  //set up variables from the request body
  let { loggedInUsername, userProfileToGet }  = req.body
  SQLdatabase.all("SELECT * FROM friendships WHERE (user1 = ? OR user2 = ?) AND (user1 = ? OR user2 = ?)", [ loggedInUsername, loggedInUsername, userProfileToGet, userProfileToGet ], (err, rows) => {
    if(err){
      console.log("error at database with friendships")
      res.json("error at database with friendships")
      return
    }
    let isFriendsWithLoggedInUser = false        
    rows.length > 0 || loggedInUsername === userProfileToGet ? isFriendsWithLoggedInUser = true : isFriendsWithLoggedInUser = false;
    SQLdatabase.get(GET_USER_PROFILE_INFO_BY_USERNAME, userProfileToGet, (err, rows) => {
      if (err) {
        console.log("error at database")
        res.json("error at db")
        return
      }     res.json({
        isFriendsWithLoggedInUser: isFriendsWithLoggedInUser,
        profileData: rows
      })
    })    
  })
})

app.post('/getAllFriends', (req, res) => {
  //set up variables from the request body
  let user = req.body.user
  SQLdatabase.all(GET_ALL_USERS_FRIENDS, user, user, (err, rows) => {
    if(err){
      console.log("error at database with friendships")
      res.json("error at database with friendships")
      return
    }
    let data = []
    rows.forEach(element => element.user1 === user ? data.push(element.user2) : data.push(element.user1));  
    res.json(data.sort())
  })
})

//#endregion GET USER INFO 

//#region POST CREATION, COMMENTING, VOTING 

app.post('/newPost', upload.array('imagesArray', 4), (req, res) => {
  //set up variables from the request body 
  let { imageLocations, recipient, username, postContent, postStrict, circle } = req.body;
    if(imageLocations){
      images = req.body.imageLocations.split(',')  
      images[0] = images[0].replace('undefined', '')
    }
    // OLD STYLE FUNCTION AT THE END FOR this.lastID SUPPORT
      SQLdatabase.run(SQL_ADD_BLOG_POST, [ username, circle, postContent, recipient, 0, 0, postStrict], function(err){
        if (err) {
            console.log(err)
        }
        let postId = this.lastID;
        if (req.body.imageLocations !== undefined) {
          images.forEach(image => image.length > 0 ? 
            SQLdatabase.run("INSERT INTO images (ownerUsername, imageLocation, postId) VALUES (?,?,?)", [username, image, postId],(err) => {
          if (err) {
              console.log(err)
          }
        }) : '')                      
          res.json({data: "success"})     
        }
        else {
          res.json({data: "success"})   
        }                
      })  
    })
  

app.post('/votePost', (req, res) => {
  //set up variables from the request body
  let { like, dislike, postId, sender, recipient } = req.body
  let message = " reacted to your post!"
        SQLdatabase.run("INSERT INTO userActions (type, sender, recipient, message, seen, approved, date, relativePost) VALUES (?,?,?,?,?,?, DATE(),?)", ["reaction", sender, recipient, message, false, false, postId], (err, rows) => {
    if (err){
      console.log("error applying like to post at user action database")
      res.json("error applying like to post at user action database")
      return
    }
    console.log("success applying like to post at user action database")
  })
  SQLdatabase.run(UPDATE_POST_VOTES_BY_POST_ID, [like, dislike, postId], (err, rows) => {
    if (err){
      console.log("error applying like to post at database" + err)
      res.json("error applying like to post at database")
      return
    }
    console.log("success applying like to post at database")
    res.json("success applying like to post at database")
    return
  }) 
})


  app.post('/setNotificationAsSeen', (req, res) => {
    //set up variables from the request body
    let { actionId } = req.body;
    SQLdatabase.run("UPDATE userActions SET seen = true WHERE actionId = ?", actionId, (err, rows) => {
      if (err) {
        console.log("error setting notification as seen")
        res.json("error setting notification as seen")
      }
      console.log("success setting notification as seen")
      res.json("success")
    })
  })
//#endregion POST CREATION, COMMENTING, VOTING 

// #endregion 
app.post('/getNotifications', (req, res) => {
  //set up variables from the request body
  let user = req.body.user
  SQLdatabase.all(GET_NOTIFICATIONS, [user], (err, notifications) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    SQLdatabase.all("SELECT * FROM chats WHERE `user1` = ? AND `seenByuser1` = false OR `user2` = ? AND `seenByUser2` = false", [ user, user ], (req, messages) => {
      
      res.json({
        notifications: notifications,
        messages: messages
      })
    })
    
  })
})
//#region GET FEEDS

app.post('/getAllUsersChats', (req, res) => {
  let user = req.body.user  
  SQLdatabase.all("SELECT chats.*, `users`.`firstName`, `users`.`lastName`, `users`.`profilePicture` FROM chats LEFT OUTER JOIN `users` ON (`chats`.`user1` != ? AND `chats`.`user1` = `users`.`username`) OR (`chats`.`user2` != ? AND `chats`.`user2` = `users`.`username`) WHERE `user1` = ? OR `user2` = ? ORDER BY lastActive DESC", [ user, user, user, user ], (err, rows) => {
    if (err){                                                            
      console.log(err)
    }
    console.log(rows)
    res.json(rows)
  })
})

app.post('/getChat', (req, res) => {
  let { user, chatId } = req.body
  SQLdatabase.all("SELECT chats.*, `users`.`firstName`, `users`.`lastName`, `users`.`profilePicture` FROM chats LEFT OUTER JOIN `users` ON (`chats`.`user1` != ? AND `chats`.`user1` = `users`.`username`) OR (`chats`.`user2` != ? AND `chats`.`user2` = `users`.`username`) WHERE chatId = ?", [user, user, req.body.chatId], (err, chatData) => {
    if (err){
      console.log(err)
    }
    SQLdatabase.all("SELECT * FROM `messages` WHERE chatId = ? ORDER BY date", [chatId], (err, messages) => {
      if (err) {
        console.log(err)
      }
      console.log(messages)
      res.json({
        chatData: chatData[0],
        messages: messages
      })
    })
  })
})

app.post('/newMessage', (req, res) => {
  let { chatId, sender, message, recipient } = req.body;
  if (!chatId) {
    SQLdatabase.run("INSERT INTO chats (user1, user2, seenByUser1, seenByUser2, lastActive) VALUES (?, ?, ?, ?, datetime())", [sender, recipient, true, false], (err, chat) => {
      chatId = this.lastId
    })
  }
  SQLdatabase.run("INSERT INTO messages (chatId, sender, message, recipient, date, seen) VALUES (?, ?, ?, ?, datetime(), ?)", [ chatId, sender, message, recipient, false], (err, rows) => {
    if (err) {
      console.log(err)
    }
    res.json("success")
  })
})


app.post('/getFeedFriendsOnly', (req, res) => { 
  //set up variables from the request body
  let user = req.body.user
  let friendsList = []  
  friendsList[0] = "'" + user + "'";
    SQLdatabase.all(GET_ALL_USERS_FRIENDS,  [user, user], (err, rows) => {
      if(err){
        console.log("error at database with friendships")      
        return
      }
      rows.forEach(element => element.user1 === user ? friendsList.push("'"+ element.user2 + "'") : friendsList.push("'"+element.user1+"'"))
      if (req.body.circle === "general") {        
        SQLdatabase.all("SELECT blog.*, users.firstName, users.lastName, users.profilePicture FROM `blog` LEFT OUTER JOIN `users` ON `blog`.`author` = `users`.`username` WHERE author IN  ("+friendsList.join(',')+") AND ((postStrict = false OR circle = 'general') AND recipient = ?) ORDER BY id DESC", [ 'none' ],(err, posts) => {
          if (err) {
            console.log(err)
          }  
          let postIds = []
          posts.forEach(post => {
            postIds.push(post.id);
            post.images = [];
            })        
            SQLdatabase.all("SELECT images.imageLocation, images.postId FROM `images` WHERE postId IN  ("+postIds.join(',')+")", (err, images) => {           
            images.forEach(image => posts.forEach(post=> {image.postId === post.id ? post.images.push(image.imageLocation): '' }))      
           
            res.json({
            posts: posts
            })      
        })
      })
      } else {
      SQLdatabase.all("SELECT blog.*, users.firstName, users.lastName, users.profilePicture FROM `blog` LEFT OUTER JOIN `users` ON `blog`.`author` = `users`.`username` WHERE circle = ? AND author IN ("+friendsList.join(',')+") ORDER BY id DESC", req.body.circle, (err, posts) => {
        if (err) {
          console.log(err)
        }  
        let postIds = []
        posts.forEach(post => {
          postIds.push(post.id);
          post.images = [];
          })        
          SQLdatabase.all("SELECT images.imageLocation, images.postId FROM `images` WHERE postId IN  ("+postIds.join(',')+")", (err, images) => {           
          images.forEach(image => posts.forEach(post=> {image.postId === post.id ? post.images.push(image.imageLocation): '' }))         
        res.json({
          posts: posts        
        })  
      })
    })}
  }) 
})   
  
app.post('/getFriends', (req, res) => {
  //set up variables from the request body
  let user = req.body.user
  let friendsList = []  
  friendsList[0] = "'" + user + "'";
  SQLdatabase.all(GET_ALL_USERS_FRIENDS,  [user, user], (err, rows) => {
    if(err){
      console.log("error at database with friendships")      
      return
    }  
    rows.forEach(element => element.user1 === user ? friendsList.push("'"+ element.user2 + "'") : friendsList.push("'"+element.user1+"'"))          
    SQLdatabase.all("SELECT firstName, lastName, profilePicture FROM users WHERE username IN  ("+friendsList.join(',')+")",(err, FriendData) => {
      if (err) {
        console.log(err)
      }
      res.json(FriendData)
    })
  })
})
app.post('/friendRequest', (req, res) => {
  
  //set up variables from the request body 
  let { sender, recipient } = req.body
  let type = "friendRequest";   
  let message = " wants to be your friend!";
  let seen = false;
  let relativePost = null  
  SQLdatabase.get("SELECT * FROM userActions WHERE type = ? AND sender = ?", [type, sender], (err, rows) => {
    if (err) {
      console.log(err)
      res.json(err)
      return
    }
    if (!rows) {
      SQLdatabase.run("INSERT INTO userActions (type, sender, recipient, message, seen,approved, date, relativePost) VALUES(?,?,?,?,?,?,date(),?)", [type, sender, recipient, message, seen, false, relativePost] , (err, rows) => {
        if (err) {
          console.log(err)
          res.status(500).send(err.message);
          return;
        }
        console.log("friend request sent")
        res.json("request sent")
      })
    } else {
      SQLdatabase.run("DELETE FROM userActions WHERE type = ? AND sender = ?", [type, sender], (err, rows) => {
        if (err){
          console.log(err)
          res.json(err)
          return
        }
        console.log("friend request deleted")
        res.json("request deleted")
      })
    }
  })
})

app.post('/confirmFriendRequest', (req, res) => {
  //set up variables from the request body
  let { sender, recipient } = req.body
  let type = "friendRequest"
  SQLdatabase.run("DELETE FROM userActions WHERE sender = ? AND recipient = ? AND type = ?", [sender, recipient, type], (err, rows) => {
    if (err) {
      console.log(err)
      res.json(err)
    }
    // INSERT INTO users (email, username, firstName,lastName, password, passwordSalt, profilePicture) VALUES(?,?,?,?,?,?,?)
    SQLdatabase.run("INSERT INTO friendships (user1, user2) VALUES (?,?)", [sender, recipient], (err, rows) => {
      if(err){
        console.log(err)
        res.json(err)
      }
      SQLdatabase.run
      console.log("friend added successfully")
      res.json("success")
    })
  })
})

app.post('/refuseFriendRequest', (req, res) => {
  //set up variables from the request body
  let { sender, recipient } = req.body
  let type = "friendRequest"
  SQLdatabase.run("DELETE FROM userActions WHERE sender = ? AND recipient = ? AND type = ?", [sender, recipient, type], (err, rows) => {
    if (err) {
      console.log(err)
      res.json(err)
    }
    console.log("friend refused successfully")
    res.json("success")

  })
})

app.post('/search', (req, res) => {
  SQLdatabase.all("SELECT firstName, lastName, username, profilePicture, firstname || ' ' || lastname AS full_name FROM users WHERE full_name LIKE '%' || ? || '%' OR username LIKE ? || '%'", [req.body.search, req.body.search], (err, rows) => {
    if (err) {
      console.log("Error at database", err)
      res.json("error at database")
      return
    }
    res.json({
      status: 'success',
      results: rows})
  })
})

app.post("/changeProfilePicture", upload.single('image'), (req, res) => {     
  const classifiedsadd = { image: req.file.filename };  
  var params = [ req.file.filename, req.body.username ]  
  req.body.imageLocations = req.body.imageLocations.replace('undefined', '')  
  let image = req.body.imageLocations.replace(',','')             
  console.log(image)  
      SQLdatabase.run("UPDATE users SET profilePicture = ? WHERE username = ?", [image, req.body.username], (err, result) => {
          if (err) {
          console.log("error adding picture to database")
          res.json("error adding picture to database")
          }
          // "SELECT userActions.* , users.firstName, users.lastName FROM `userActions` LEFT OUTER JOIN `users` ON `userActions`.`sender` = `users`.`username` WHERE reci
          SQLdatabase.all("SELECT users.firstName, users.lastName FROM users WHERE username = ? LIMIT 1", req.body.username, (err, rows) => {
              if (err) {
                  console.log(err)
              }
              console.log(req.body)
              if (!rows) {
                SQLdatabase.get("SELECT ")
              }
              //USE A REGULAR FUNCTION DECLARATION AT THE END OF THIS LINE AS this.LastID FOR GETTING THE LATEST ENTRY DOESNT SUPPORT ES6
              SQLdatabase.run(SQL_ADD_BLOG_POST, [ req.body.username, "general",  `${rows[0].firstName} ${rows[0].lastName} has changed their profile picture!`,"none", 0, 0, false], function(err, result) {                  
                  if (err) {
                      console.log(err)
                  }
                  //MOST RECENT POST ID (THIS ONE)
                  let postId = this.lastID;
                  SQLdatabase.run("INSERT INTO images (ownerUsername, imageLocation, postId) VALUES (?,?,?)", [req.body.username, image, postId], (err, rows) => {
                    if (err) {
                        console.log(err)
                    }                     
                   res.json({profilePicture: req.body.image})                     
                })

          })
      })
  })
})

app.post("/changeCoverPicture", upload.single('image'), (req, res) => {
  req.body.imageLocations = req.body.imageLocations.replace('undefined', '')  
  let image = req.body.imageLocations.replace(',','')
  SQLdatabase.run("UPDATE users SET coverPicture = ? WHERE username = ?", [image, req.body.username], (err, result) => {
    if (err) {
    console.log("error adding picture to database")
    res.json("error adding picture to database")
    }
    // "SELECT userActions.* , users.firstName, users.lastName FROM `userActions` LEFT OUTER JOIN `users` ON `userActions`.`sender` = `users`.`username` WHERE reci
    SQLdatabase.all("SELECT users.firstName, users.lastName FROM users WHERE username = ? LIMIT 1", req.body.username, (err, rows) => {
      if (err) {
          console.log(err)
      }
      //USE A REGULAR FUNCTION DECLARATION AT THE END OF THIS LINE AS this.LastID FOR GETTING THE LATEST ENTRY DOESNT SUPPORT ES6
      SQLdatabase.run(SQL_ADD_BLOG_POST, [ req.body.username, "general",  `${rows[0].firstName} ${rows[0].lastName} has changed their profile cover picture!`,"none", 0, 0, false], function(err, result) {                  
        if (err) {
            console.log(err)
        }
        //MOST RECENT POST ID (THIS ONE)
        let postId = this.lastID;
        SQLdatabase.run("INSERT INTO images (ownerUsername, imageLocation, postId) VALUES (?,?,?)", [req.body.username, image, postId], (err, rows) => {
          if (err) {
              console.log(err)
          }                     
          res.json({coverPicture: req.body.image})                     
        })
      })
    })
  })
})

 app.post('/refreshData', (req, res) => {
   SQLdatabase.get("SELECT firstName, lastName, profilePicture FROM users WHERE username = ?", req.body.loggedInUsername, (err, rows)=> {
     let userData = rows;
     res.json(userData)
   })
 })

app.listen(process.env.PORT)
console.log("server.js running on port " + process.env.PORT)