This project consists of
- 2 frontends, and 1 backend using Node.js

(in progress) The focus of frontend 1 is to
- allow read posts/comment to post by anyone who visits

(done) The focus of frontend 2 is to
- login/authenticate user
- protect resources
- persists login with JWT tokens, (up to 15 min)
- talk to backend api, allowing create/read/delete of posts on database
- only one person, the blog owner, can login

Database used: mongoDB

![alt](./mongodb.png)

What is the relationship between the models in the database?
- There's 3 models, Comment, Post, and User
- A User can post any number of posts, a post belongs to one user
- A comment belongs to one post, a Post can have any number of comments
![alt](./IMG_3427.JPG)

![alt](./schemas.png)

Frontend 2 is for an admin user to write, delete, and publish blog posts

![alt](./f2.png)

![alt](./f2_1.png)

Technologies used: HTML, CSS, Typescript, Node.js, Snowpack web bundler
