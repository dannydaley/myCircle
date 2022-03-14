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

//#region IMAGE UPLOAD HANDLING

//set up multer middleware for image uploads
var multer  = require('multer');

//set up storage location
const storage = multer.diskStorage({
  
  //set up save destination
  destination: function (req, file, cb) {     
     cb(null, 'public/images/uploads') 
  }, //set up filename
  filename: function (req, file, cb) {
    if (file.fieldname !== undefined) {
      // delete the attached image
    }  
    //create unique suffix for naming
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    if (req.body.context === "blogPost") {
      // create filename (author + filename + unique suffix + filetype)
      cb(null, req.body.author + '-' + file.fieldname + '-' + uniqueSuffix + '.png')
      // reset the request.body.image field with the image location + new filename to be put in the database as a link
      req.body.image = "/images/uploads/" + req.body.author + '-' + file.fieldname + '-' + uniqueSuffix + '.png'
    }    
    // if upload image field on form is left blank..
    else {
      console.log("file fieldname is undefined")
      return
    }
  }
})

// set upload storage to the previously set up desitnation
const upload = multer({ storage: storage });
/* END OF IMAGE UPLOAD HANDLING */



//#endregion IMAGE UPLAOD HANDLING

let defaultProfilePicture = "images/defaultUser.png"

//#region SQL DATABASE STUFF 
//get the saved post information from external JSON file
// mainly for keeping up to date when new post are created etc

var sqlite3 = require('sqlite3').verbose();
let SQLdatabase = new sqlite3.Database('./database/SQLdatabase.db');
app.locals.SQLdatabase = SQLdatabase;

let postDataJSON = require("./database/posts.json");
let userDataJSON = require("./database/users.json");
let imagesDataJSON = require("./database/images.json");
let friendshipsDataJSON = require("./database/friendships.json");
const { Console } = require('console');


  
const GET_USER_GENERAL_INFO_BY_USERNAME = "SELECT firstName, lastName, aboutMe, location, education, work, profilePicture FROM users WHERE username = ?"
const GET_USER_PROFILE_INFO_BY_USERNAME = "SELECT firstName, lastName, aboutMe, profilePicture, coverPicture FROM users WHERE username = ?"
const GET_POST_VOTES_BY_POST_ID = "SELECT likes, dislikes FROM blog WHERE id = ?"
const UPDATE_POST_VOTES_BY_POST_ID = "UPDATE blog SET likes = ?, dislikes = ? WHERE id = ?"
const UPDATE_PASSWORD_BY_EMAIL = "UPDATE users SET password = ?, passwordSalt = ? WHERE email = ?"
const LOOK_UP_EMAIL_BY_EMAIL = "SELECT email FROM users WHERE email = ?"
const UPDATE_EMAIL = "UPDATE users SET email = ? WHERE email = ?"
const UPDATE_USER_GENERAL_INFO = "UPDATE users SET firstName = ?, lastName = ?, aboutMe = ?, location = ?, education = ?, work = ? WHERE username = ?"
const FIND_USER = "SELECT * FROM users WHERE email = ?"
const SIGN_UP_USER = "INSERT INTO users (email, username, firstName,lastName, password, passwordSalt, profilePicture) VALUES(?,?,?,?,?,?,?)"
const GET_USER_PROFILE_INFO = "SELECT name, joined, posts, profilePicture, aboutMe, pinnedPost FROM users WHERE name = ?" // SQL command
const GET_ALL_POSTS = "SELECT * FROM `blog` ORDER BY id DESC"; // SQL command
const GET_ALL_POSTS_BY_CIRCLE = "SELECT * FROM `blog` WHERE circle = ? ORDER BY id DESC"; // SQL command
const GET_ALL_IMAGES_BY_USER = "SELECT * FROM images WHERE ownerUsername = ? ORDER BY postId DESC"
const GET_PROFILEPICTURE_BY_USERNAME = "SELECT profilePicture FROM users WHERE username = ?"
const GET_RECENT_POSTS = "SELECT * FROM blog WHERE recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const BLOG_DELETE_POST = "DELETE FROM `blog` WHERE title = ? AND id = ?"; // SQL command
const GET_ALL_USERS_FRIENDS = "SELECT * FROM friendships WHERE user1 =? OR user2 = ?"
const GET_POSTS_BY_AUTHOR = "SELECT * FROM `blog` WHERE author = ? ORDER BY id DESC" // SQL command
const GET_POSTS_BY_AUTHOR_BY_CIRCLE = "SELECT * FROM `blog` WHERE author = ? AND circle = ? ORDER BY id DESC" // SQL command
const GET_RECENT_POSTS_BY_AUTHOR = "SELECT * FROM blog WHERE author = ? AND recipient = ? ORDER BY id DESC LIMIT 5"; // SQL command
const SQL_ADD_BLOG_POST = "INSERT INTO `blog` (author, image, circle, content, date, recipient, likes, dislikes) VALUES(?,?,?,?,?,?,?,?)" // 
const SQL_UPDATE_BLOG =  "UPDATE `blog` SET title = ?, image = ?, link = ?, author = ?, content = ? WHERE id = ?" //SQL command
const SQL_UPDATE_USER_PROFILE = "UPDATE users SET profilePicture = ?, aboutMe = ? WHERE name = ?" // SQL command
const SQL_UPDATE_USERS_PINNED_POST = "UPDATE users SET pinnedPost = ? WHERE name = ?" // SQL command
const GET_ALL_USERS = "SELECT * FROM users"; // SQL command

/* Database setup endpoint */
app.get('/SQLDatabaseUserSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `users`');
    //recreate the users table
    // SQLdatabase.query('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255) UNIQUE COLLATE NOCASE, email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), posts int, joined varchar(255), profilePicture varchar(255), aboutMe text, pinnedPost INTEGER)');
    SQLdatabase.run('CREATE TABLE `users` (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), aboutMe text, location varchar(255), education varchar(255), work varchar(255), profilePicture varchar(255), coverPicture varchar(255))');
    //create test rows
    let rows = []    
    for (let i = 0; i < userDataJSON.users.length; i++) {
      rows[i] = [
        userDataJSON.users[i].username,
        userDataJSON.users[i].firstName,
        userDataJSON.users[i].lastName,
        userDataJSON.users[i].email,
        userDataJSON.users[i].password,
        userDataJSON.users[i].passwordSalt,
        userDataJSON.users[i].aboutMe,
        userDataJSON.users[i].location,
        userDataJSON.users[i].education,
        userDataJSON.users[i].work,
        userDataJSON.users[i].profilePicture,
        userDataJSON.users[i].coverPicture
    ]
    }
    // add rows to database
    rows.forEach( (row) => {
      SQLdatabase.run('INSERT INTO `users` (username, firstName, lastName, email, password, passwordSalt, aboutMe, location, education, work, profilePicture, coverPicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)', row);
    });
  })
  //render success page
  console.log("user table built");
  res.send("user-db-done");
})
// set up blog table in database
app.get('/SQLDatabaseBlogSetup', (req, res, next) => {  
  //these queries must run one by one - dont try and delete and create tables at the same time.
  SQLdatabase.serialize( () => {
    //delete the table if it exists..
    SQLdatabase.run('DROP TABLE IF EXISTS `blog`');
    // create blog table
    SQLdatabase.run('CREATE TABLE `blog` ( id INTEGER PRIMARY KEY AUTOINCREMENT, author varchar(255), image varchar(255), content text,  date varchar(255), circle varchar(255), recipient varchar(255), likes int, dislikes int )');
    //create base rows
    let rows = [];
    //loop through posts.json to populate rows array
    for (let i = 0; i < postDataJSON.entries.length; i++) {
      rows[i] = [postDataJSON.entries[i].id, postDataJSON.entries[i].author, postDataJSON.entries[i].image, postDataJSON.entries[i].content, postDataJSON.entries[i].date, postDataJSON.entries[i].circle,postDataJSON.entries[i].recipient, postDataJSON.entries[i].likes, postDataJSON.entries[i].dislikes]
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

app.post('/getAllImagesByUser', (req, res, next) => {
  // grab all user data
  SQLdatabase.all(GET_ALL_IMAGES_BY_USER, [ req.body.user ], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(rows);
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
/*========================END OF DEBUGGING AND TESTING ENDPOINTS========================*/

//#endregion


//#region endpoints

app.get('/', (req, res) => {
    console.log("port" + process.env.PORT + " '/' visited")
    res.send("BACK END IS LISTENING ON PORT " + process.env.PORT)
})

//#region SIGN UP & SIGN IN 
app.post('/signUp', (req, res) => {
  let SQLdatabase = req.app.locals.SQLdatabase;    
  let { signUpEmail, signUpUserName,signUpFirstName, signUpLastName, signUpPassword, confirmSignUpPassword } = req.body;
  if (signUpPassword === confirmSignUpPassword) {
    let passwordSalt = generatePepper;
    let storePassword = passwordHash(confirmSignUpPassword, passwordSalt);
    let profilePicture = defaultProfilePicture;
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
      res.json('sign up success');   
    })    
  } else {
    res.json("PASSWORDS DONT MATCH")
  }
})

app.post('/signin', (req, res) => {  
  //ready the data
  let data = req.body;
  // init database
  let SQLdatabase = req.app.locals.SQLdatabase;
  // rename for easier access   
  SQLdatabase.get(FIND_USER, data.email, (err, rows) => {
    if (err) {
      console.log("error at database");
      res.status(500).send(err)
    }
    let user = rows    
    if (user!== undefined && user.password === passwordHash(data.password, user.passwordSalt)) {
      res.json({
        status: 'success',
        firstName: rows.firstName,
        lastName: rows.lastName,
        username: rows.username,
        profilePicture: rows.profilePicture
      })
    } else {     
      console.log("invalid user credentials")
      res.json({
      status: 'failed',
      message: 'incorrect email or password'
      })
    }  
  })
})

//#endregion SIGN UP & SIGN IN 

//#region UPDATE ACCOUNT INFO

app.post('/updateUserGeneralInfo', (req, res) => {
  const { firstName, lastName, aboutMe, location, education, work, username  } = req.body;  
  SQLdatabase.run(UPDATE_USER_GENERAL_INFO, firstName, lastName, aboutMe, location, education, work, username, (err, rows) => {
    if (err){
      console.log("error at database")
      res.json("ERROR AT DATABASE")
    }
    console.log("success at database")
    res.json("success at database")
  })
})

app.post('/updateUserLoginInfo', (req, res) => {
  let { email, password, changeEmail, changePassword, changePasswordConfirm  } = req.body;
  
  SQLdatabase.get(FIND_USER, email, (err, rows) => {
    if (err) {
      console.log("error at database");
      res.status(500).send(err)
    }
    let user = rows
    if (user!== undefined && user.password === passwordHash(password, user.passwordSalt)) {
      if (changePassword) {
        if (changePassword === changePasswordConfirm) {      
          let passwordSalt = generatePepper;
          let storePassword = passwordHash(changePassword, passwordSalt);          
          SQLdatabase.run(UPDATE_PASSWORD_BY_EMAIL, [ storePassword, passwordSalt, email ], (err, rows) => {
            if (err){
              console.log("error at database with password")          
            }
            console.log("success with changing password")
          })
        }
        if (changeEmail) {
          SQLdatabase.get(LOOK_UP_EMAIL_BY_EMAIL, email, (err, rows) => {
            if (err){
              console.log(err)
            }
            if (!rows) {
                console.log("current email not in database")
              return
            }
            else {
              SQLdatabase.run(UPDATE_EMAIL, [ changeEmail, email], (err, rows)=> {
              if (err){
                console.log("error at database changing email")
                return
              }   
              console.log("success with changes in email")        
              })
            }
          })
        }
      }
  res.json("success with changes")
    } else {
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
  // grab all posts
  if (req.body.circle === 'general') {
    SQLdatabase.all(GET_POSTS_BY_AUTHOR, [ req.body.user ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }  
      res.json(rows);
    })
  } else {
    SQLdatabase.all(GET_POSTS_BY_AUTHOR_BY_CIRCLE, [ req.body.user, req.body.circle ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }   
      res.json(rows);
    })
  }
})
//#endregion GET FEEDS

//#region GET USER INFO 

app.post('/getImagesByUser', (req, res, next) => {  
  // grab all posts
  if (req.body.circle === 'general') {
    SQLdatabase.all(GET_POSTS_BY_AUTHOR, [ req.body.user ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }  
      res.json(rows);
    })
  } else {
    SQLdatabase.all(GET_POSTS_BY_AUTHOR_BY_CIRCLE, [ req.body.user, req.body.circle ], (err, rows) => {
      if (err) {
        console.log("error at database")
        res.status(500).send(err.message);
        return;
      }   
      res.json(rows);
    })
  }
})

app.post('/getUserGeneralInfo', (req, res) => {
   SQLdatabase.get(GET_USER_GENERAL_INFO_BY_USERNAME, req.body.user, (err, rows) => {
    if (err) {
      console.log("error getting general user info")
      res.status(500).send(err)
      }
      res.json(rows)
  })
})

app.post('/getUserProfile', (req, res) => {
  console.log(req.body)
  SQLdatabase.get(GET_USER_PROFILE_INFO_BY_USERNAME, req.body.user, (err, rows) => {
    if (err) {
      console.log("error at database")
      res.json("error at db")
      return
    }
    res.json(rows)
  })
})

app.get('/getAllFriends', (req, res) => {
  let user = 'Daley'
  SQLdatabase.all(GET_ALL_USERS_FRIENDS, user, user, (err, rows) => {
    if(err){
      console.log("error at database with friendships")
      res.json("error at database with friendships")
      return
    }
    let data = []   
    rows.forEach(element => element.user1 === user ? data.push(element.user2) : data.push(element.user1)
  );
    console.log("FRIENDS LIST")
    console.log(data)
    res.json(data)
  })
})
//#endregion GET USER INFO 

//#region POST CREATION, COMMENTING, VOTING 
app.post('/newPost', (req, res) => {  
  SQLdatabase.get(GET_PROFILEPICTURE_BY_USERNAME, [ req.body.postData.author ], (err, profilePicture) => {
    if (err) {
      console.log("failed on profile pic grab")
      res.status(500).send(err.message);
      return;
    }     
    console.log(profilePicture)
    console.log(req.body.postData)

    SQLdatabase.run(SQL_ADD_BLOG_POST, [ req.body.postData.author, profilePicture.profilePicture, req.body.circle, req.body.postData.postContent,req.body.postData.date, req.body.postData.recipient, 0, 0],  (err, rows) => {
      if (err) {
        console.log("error")
        console.log(err)
        res.status(500).send(err.message);
        return;
      }    
      res.json('success');
    })
  })
});

app.post('/votePost', (req, res) => {
  let { like, dislike, postId } = req.body
  SQLdatabase.get(GET_POST_VOTES_BY_POST_ID, postId, (err, rows) => {
    if (err) {
      console.log("ERROR GETTING LIKES")
    }
    like += rows.likes;
    dislike += rows.dislikes;
  })

  SQLdatabase.run(UPDATE_POST_VOTES_BY_POST_ID, [like, dislike, postId], (err, rows) => {
    if (err){
      console.log("error applying like to post at database")
      res.json("error applying like to post at database")
      return
    }
    console.log("success applying like to post at database")
    res.json("success applying like to post at database")
    return
  })
})
//#endregion POST CREATION, COMMENTING, VOTING 

// #endregion 

app.listen(process.env.PORT)
console.log("server.js running on port " + process.env.PORT)




//#region GET FEEDS
app.post('/getFeedFriendsOnly', (req, res) => {  
  // grab all posts
  let user = req.body.user
  let friendsList = []
  friendsList[0] = user  
  SQLdatabase.all(GET_ALL_USERS_FRIENDS,  [user, user], async (err, rows) => {
    if(err){
      console.log("error at database with friendships")      
      return
    } 

    "1,2,3,4,5"

    rows.forEach(element => element.user1 === user ? friendsList.push(element.user2) : friendsList.push(element.user1))
    let filter = []
    let feed = []
    if (req.body.circle === "general") {
      await SQLdatabase.all("SELECT * FROM blog WHERE author IN = ("+myListStr+")", async (err, rows) => {
        if (err) {
          console.log(err)
        }
        feed = rows     
        await feed.forEach(element => friendsList.forEach(friend => {
          if (element.author === friend){
            if (filter[0] !== undefined && element.id < filter[0].id) {
              filter.unshift(element)
            } else {
              filter.push(element)
            }         
          } else {
            return
          }
        }))
        res.json(filter)      
      })
    }
    else {
      await SQLdatabase.all(GET_ALL_POSTS_BY_CIRCLE, req.body.circle, async (err, rows) => {
        if (err) {
          console.log(err)
        }
        feed = rows     
        await feed.forEach(element => friendsList.forEach(friend => {
          if (element.author === friend){
              filter.push(element)                    
          } else {
            return
          }
        }))
        res.json(filter)      
      })
    }
  })  
})

app.get('/getFriendsPosts', (req, res) => {
  let friends = ["newUser1234","mjpswanwick","Rodwayyy","yojivia","Daley90210","angied65"]
  let filter = []
  let feed = []
  SQLdatabase.all("SELECT * FROM blog", async (err, rows) => {
      if (err) {
        console.log(err)
      }
      feed = rows     
       await feed.forEach(element => friends.forEach(friend => {
         if (element.author === friend){
           if (filter[0] !== undefined && element.id < filter[0].id) {
             filter.unshift(element)
           }
           else {
             filter.push(element)
           }         
        } else {
          return
        } 
      }))       
         res.json(filter)      
    })
  })
    

   
 


app.get('/getAllFriends', (req, res) => {

})