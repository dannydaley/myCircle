import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FeedPost from './feedPost';
import NewPost from './newPost';



  const posts = {
  "entries": [
    {
      "id": 17,
      "author": "TheOtherNewUser",
      "title": "new guy, new post",
      "image": "images/default-post-image.png",
      "content": "Wondering if this will fix the post incrementor, being a new user and there not currently being a way to delete existing users from that database, deleting posts when the counts already at 0 could just result in negative figures.. and .. well, you know how that goes.  lets see how a freshy works",
      "link": "",
      "date": "21-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 16,
      "author": "newUser123",
      "title": "Post count..",
      "image": "/images/default-post-image.png",
      "content": "seems like the post incrementor was working.. definitely my second post but says my count is currently 0?",
      "link": "",
      "date": "21-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 15,
      "author": "Daley",
      "title": "User Profiles!",
      "image": "/images/uploads/Daley-change-image-1640183949137-977696531.png",
      "content": "User profiles are now fully supported, offering users an area for visitors to come and check out all of their posts place. Coming next is the User's Space where visitors can leave comments, start discussions or share projects directly with you and vice versa!\r\n",
      "link": "",
      "date": "21-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 14,
      "author": "newUser123",
      "title": "my second post",
      "image": "/images/uploads/newUser123-image-1640097514633-418365478.png",
      "content": "seems to be an issue with my post count not incrementing..",
      "link": "",
      "date": "21-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 13,
      "author": "newUser123",
      "title": "My first post!",
      "image": "/images/default-post-image.png",
      "content": "Hey there! This is my first blog post!",
      "link": "",
      "date": "21-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 12,
      "author": "Daley",
      "title": "Posts now support HTML embeds",
      "image": "/images/uploads/Daley-change-image-1640179177434-972506776.png",
      "content": "Posts now offer the functionality to embed content such as iframes so users can get really creative with what they post (within reason)\r\n<br>\r\n<br>\r\n <iframe width=\"100%\" height=\"300\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1106070253&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/dannytdaley\" title=\"DannyDaley\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">DannyDaley</a> · <a href=\"https://soundcloud.com/dannytdaley/in-a-hurry\" title=\"In a Hurry\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">In a Hurry</a></div>",
      "link": "",
      "date": "9-12-2021",
      "recipient": "blogPost"
    },
    {
      "id": 11,
      "author": "Daley",
      "title": "The issue with 'Double safe posting..'",
      "image": "/images/uploads/Daley-change-image-1640179165255-630471660.png",
      "content": "A problem that presented itself when adding posts to the JSON file was that they weren't really all that easy to delete. With a reasonable amount of effort I managed to get the job done. Creating a new instance of the posts entries array populated with every post object apart from the one we're trying to delete, then re-writing the local file with the new object array. Hopefully now I'll run into less issues when rebooting the database as it reads from the initial JSON file, and when I do, I can be sure to be just getting up-to-date and relevant data.",
      "link": "#",
      "date": "7-11-2021",
      "recipient": "blogPost"
    },
    {
      "id": 10,
      "author": "Daley",
      "title": "Double safe posting",
      "image": "/images/uploads/Daley-change-image-1640179095807-279606443.png",
      "content": "Now when users make new posts, as well as being stored in the regular SQL database, they are also sent to an updated JSON file. This JSON file is used to reinitialize the SQL database should anything bad happen. So now things are kept up to date and relevant in case of database crashes",
      "link": "#",
      "date": "6-11-2021",
      "recipient": "blogPost"
    },
    {
      "id": 9,
      "author": "Daley",
      "title": "Unshore",
      "image": "/images/uploads/Daley-change-image-1640179029181-482976704.png",
      "content": "Unshore was a great game to work on for my first project in Falmouth University’s Games Academy. Taking the role of UI Programmer was a great chance to to have some some fun in the Unity game engine whilst being part of a multifaceted team. The theme we were given was Cornwall and “a famous dead person”, we figured that a dark horror styled game of chasing evil piskies around the island of Saint Michaels Mount while being hunted by King Arthurs ghost was pretty bang on.",
      "link": "#",
      "date": "28-2-2021",
      "recipient": "blogPost"
    },
    {
      "id": 8,
      "author": "Daley",
      "title": "Version 3 launched!",
      "image": "/images/uploads/Daley-change-image-1640179018916-921668712.png",
      "content": "Getting well enough ahead on my university work left me with a good amount of time to build version 3 of my portfolio website. After learning the Wordpress content management system and having a reasonable amount of fun with PHP, everything is working better than ever and creating new posts has never been easier! With that out of the way I've already been thinking about getting some user registration involved so users will be able to comment on future posts and lots of cool things that. Stay tuned!",
      "link": "",
      "date": "19-12-2020",
      "recipient": "blogPost"
    },
    {
      "id": 7,
      "author": "Daley",
      "title": "SmartBrain - Face Recognition App",
      "image": "/images/uploads/Daley-change-image-1640179006546-678218855.png",
      "content": "This face recognition app allows you to scan any image-link for faces within the picture, this is my first project fully leveraging an API, and a fully built back-end, allowing user registration, login and a rank based on how many images that user has entered. The data held within the database is secure, using encryption technologies such as Bcrypt.",
      "link": "https://smartbrain902101.herokuapp.com/",
      "date": "17-9-2020",
      "recipient": "blogPost"
    },
    {
      "id": 6,
      "author": "Daley",
      "title": "Final Fantasy VII:R Product Page",
      "image": "/images/uploads/Daley-change-image-1640178990716-806140201.png",
      "content": "Being a massive Final Fantasy fan, upon the release of FFVII:Remake I felt it was 100% necessary to make it the theme of my responsive web design submission for freeCodeCamp. I particularly enjoyed making a theme with a darker appeal, and using that very FF7 Mako green.",
      "link": "https://codepen.io/dannydaley/full/RwWdVEp",
      "date": "8-5-2020",
      "recipient": "blogPost"
    },
    {
      "id": 5,
      "author": "Daley",
      "title": "Website v2",
      "image": "/images/uploads/Daley-change-image-1640178891351-926713543.png",
      "content": "The second version of my portfolio website! Some reasonable design changes and definitely a little easier on the eyes than the previous version. Things are now set out a little differently and also added links in the contact me section so that viewers can find other work I have done on other platforms.",
      "link": "https://dannydaley.github.io/v2/",
      "date": "15-4-2020",
      "recipient": "blogPost"
    },
    {
      "id": 4,
      "author": "Daley",
      "title": "Makkio Ikui",
      "image": "/images/uploads/Daley-change-image-1640178952670-582718229.png",
      "content": "Inspired by the Kawaii japanese art style, of course this website was a lot of fun to make, a great use of color in the design really made it pop. It came with its challenges, but its hard to stay frustrated when you're working with these kind of images.",
      "link": "https://dannydaley.github.io/makkioikui/",
      "date": "29-3-2020",
      "recipient": "blogPost"
    },
    {
      "id": 3,
      "author": "Daley",
      "title": "Captive Design Studio",
      "image": "/images/uploads/Daley-change-image-1640178976254-497189525.png",
      "content": "I had a great time working on the Captive Design Studio site, the use of strong fonts and powerful colors was an absolute must to pull this design off and it came out looking fantastic. Definitely learned a lot about making an impact from this one.",
      "link": "https://dannydaley.github.io/captivedesign/",
      "date": "15-1-2020",
      "recipient": "blogPost"
    },
    {
      "id": 2,
      "author": "Daley",
      "title": "JavaScript Magic 8-ball",
      "image": "/images/uploads/Daley-change-image-1640178860940-706035700.png",
      "content": "Had some fun and made a small Magic 8-Ball web app using some basic HTML, CSS shapes and some simple JavaScript switch statement logic.",
      "link": "https://dannydaley.github.io/eightBall/",
      "date": "28-12-2019",
      "recipient": "blogPost"
    },
    {
      "id": 1,
      "author": "Daley",
      "title": "Website v1",
      "image": "/images/uploads/Daley-change-image-1640178791499-982229389.png",
      "content": "The first iteration of my portfolio website! Built with simple HTML5 and CSS3 and very little amount of javascript to allow for background colour changes that stick between changing pages.",
      "link": "https://dannydaley.github.io/v1/",
      "date": "17-9-2019",
      "recipient": "blogPost"
    },
    {
      "id": 0,
      "author": "",
      "title": "Pride of place.",
      "image": "/images/default-post-image.png",
      "content": "This is where your pinned post will appear, show visitors what you can do!",
      "link": "",
      "date": "",
      "recipient": ""
    }
  ]
}

const getFeed = () => {
  fetch('http://localhost:3001/getFeed', {
      method: 'get'
      // headers: {'Content-Type': 'application/json'},
      // body: JSON.stringify({
      //     'email': this.state.signInEmail,
      //     'password': this.state.signInPassword
      // })
     
  }).then(console.log(Response.toString))
  // this.props.onRouteChange('home')
}

const feed = getFeed();

console.log("FFFFFFFFFFFFFEEEEEEEEEEEEEEDDDDDDDDDDDDDDDDDDD" + feed)

export default function Feed() {
  return (
    <div style={{backgroundColor: '#010101', display: 'flex', justifyContent: 'space-between', paddingBottom: '100px'}}>
        <div style={{width: '30%', height: '100px'}}></div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg" sx={{zIndex: 10, bgcolor: '#343434', borderRadius: '0px 0px 30px 30px', width: '100%', pb: 2, ml: 2, mr:2,  mt: 12}}>
                    <NewPost />
                    <Box sx={{ padding: 2, bgcolor: 'none'}}>
                        <Stack spacing={2} sx={{  width: '100%', margin: '50px auto 0'}}> 
                        {/* loop for displaying posts */}
                            {posts.entries.map(item => (
                                <FeedPost author={item.author} content={item.content} />
                            ))}
                        </Stack>
                    </Box>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        End of posts
                    </Typography>
                </Container>
            </React.Fragment>
        <div style={{width: '30%', height: '100px'}}></div>
    </div>  
  );
}