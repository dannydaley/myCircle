--------------------------------------------------------------------
====================================================================
--------------------------------------------------------------------

                            SQL DATABASE

My preferred choice for a storage solution. As the SQL database allows for multiple tables within a single space
and holds data continuously between server restarts, so it felt like a good fit for the main storage solution for my platform.
The added benefit of being able to use the tables relationally was another great plus.

SQLite3 database set up in server.js under the variable `SQLdatabase`, table setup is performed from the endpoints '/SQLDatabaseUserSetup' and '/SQLDatabaseBlogSetup'.

FILE: "SQLdatabase"

TABLE: `users`

FIELDS & DATA TYPES : 
|`id` INTEGER, PRIMARY KEY, AUTOINCREMENTS|,
|`name` VARCHAR(255)|,
|`email` VARCHAR(255), UNIQUE|,
|`password` VARCHAR(255)|,
|`passwordSalt` VARCHAR(512)|,
|`posts` INTEGER|,
|`joined` VARCHAR(255)|,
|`profilePicture` VARCHAR(255)|,
|`aboutMe` VARCHAR(255)|
|`pinnedPost` INTEGER|

----------------------------------------------------------------------

TABLE: `blog`

FIELDS & DATA TYPES : 
|`id` INTEGER, PRIMARY KEY, AUTOINCREMENTS|,
|`author` VARCHAR(255)|,
|`title` VARCHAR(255), UNIQUE|,
|`image` VARCHAR(255)|,
|`content` BLOB|,
|`link` VARCHAR(255)|,
|`date` VARCHAR(255)|,
|`recipient` VARCHAR(255)|

--------------------------------------------------------------------
====================================================================
--------------------------------------------------------------------