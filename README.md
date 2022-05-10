# HAMMERGRAM
Hammergram is an instagram clone dedicated to the art of the social media bottle shot, simply put, Hammergram is a place to show off your unicorns and hammers. It is optimized for mobile viewing, but is fully functional in a browser as well.

live link: https://hammergram.herokuapp.com


## Features

### Posts

- Posts is Hammergram's primary feature. Users can share posts, uploading photos to the platform (hosted by AWS s3), and those posts are visibile on a user's profile, as well as the feeds of other users who follow the poster. If the user is lucky, maybe the "algorithm" (and by "algorithm", I mean a very rudimentary array randomizer) will show the post on the search/explore page, and expose your post to other followers worldwide.

- Users creating a post can add a caption and location (both optional) -- the only requirement is a photo!
- Users can edit their posts, adding/editing/removing the caption or location. 
- Users cannot edit the photo that is associated with the post, but users can however delete the entire post itself.

### Comments

- Comments is Hammergrams secondary primary CRD feature. Users can comment on any post whether it is theirs or not, can comments dynamically post and delete instantly. Comments are accessed by clicking on the comments icon under any post, but comments do render in read-only underneath a posting

- Users cannot update their comments, in line with the original Instagram. Comments can be deleted by the poster.

### Likes

- What would an instagram clone be without likes? Likes are CRD, and are interactable in a number of ways. Users can like any post by double tapping/clicking on an image to like/unlike create/delete a like on a specific post. They can also click on the small heart icon to like the post as well. The like count dynamically updates, as does the fill for the like icon to reflect whether or not the user likes a specific post. 

### Follows

- Following is also a key feature of instagram, and thus is also important to Hammergram. In line with instagram, the follow button renders in a number of places - a user's profile, the "..." menu on a post, on your activity page (showing who recently followed you), and on any page that lists the followers/followed users or liking users of a specific profile/post, respectively. Follower counts dynamically update when interacting with the follow button on a user's profile, or when unfollowing from the feed.

### Search

- Hammergram has a very rudimentary search feature, as users can only search for usernames and names of other users. There is added funtionality to mimic the "explore" landing page of instagram's search page, as it will randomly render a grid of posts from any users that are not you, with clickthrough ability, giving the users a way to discover and interact with posts outisde of their orbit.

## How to use this App

1. Clone This repo.

- `git clone https://github.com/breencf/HAMMERGRAM.git`

2. Install dependencies from the root directory.

- `npm install`

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL

- `CREATE USER <name> WITH CREATEDB PASSWORD <'password'>`

4. Create a .env file in the backend directory based on the .env.example found within the respective directory.
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your `JWT_SECRET`, and your desired `PORT`, (preferably 5001).
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the `5000` port to match your `PORT` configuration found in the .env file.

- `"proxy": "http://localhost:5001"`

7. Create the Database, then Migrate and Seed models.

- `npx dotenv sequelize db:create`
- `npx dotenv sequelize db:migrate`
- `npx dotenv sequelize db:seed:all`

8. Start the services in the backend directory.

- `npm start`

9. Start the services in the frontend directory, which should open the project in your default browser. IF not, navigate to http://localhost:3000

- `npm start`

10. You can create an account or login as the demo user to begin using Hammergram.



