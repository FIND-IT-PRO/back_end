# Find it philosophy :

In this app you can find your missing stuffs or post that you’ve find somethings,

# Features :(phase 1)

## Posts (REST API)

[1]:Create a post (uploading images , adding description to your post(text )
See random posts in home page
React to a post (like,dislike,…)
Comment to a post
Simple comment on the parent post  
Reply to a comment byTag a user by name (with autocompletion) and 1 level nested comments
Remove Tag from others
Re-post
Remove a post
Editing a post
Realtime Notification (socket.io)
Receive notification
On getting tagged by someone
On getting a comment reply
On Getting a reaction to a post
Real Time Messaging (socket.io)
Request chat invitation
Chat with text
Exchanging static assets (images,videos…)
Advanced search between posts(Mongodb Atlas search) + REST API )
by a filter [geolocation coordinates , text , time range,image(AI)]
Create a map that shows the location of lost and found items, allowing users to see at a zone where items have been found and where they are currently located
Authentication (nodejs custom Authentication ) (REST API) )
Login
Sign up
Forget password
Change password
Profile Management (REST API )(FILE UPLOAD WITH express-fileuploader)
Change profile image
Change profile related information (username,address …)
Admin Dashboard
Monitoring the state of the servers (mailing server ,node server state ,mongodb state)
Remove a user
Remove a comment
Spam detection (Ai):
Malicious users, fake account boots …
Reward system:
Offer a reward for the return of a lost item, either in the form of cash or through the app's own rewards program. This could incentivize users to help each other find their missing items.
Integration with social media:
Allow users to share their lost and found listings on social media platforms to reach a wider audience and increase the chances of their item being found.
Multi-language support:
Offer support for multiple languages to make the app accessible to a global audience
Customer support:
Provide a way for users to contact customer support if they have any questions or need help using the app.

More Features :
Premuire search with ads and a paid tier
Adding questions to you be respond from people who pretend that they found the item
We can implement Ai matching between lost object and founded ones (long term goal)
……………………………………………………………………………………………………….

Data model :

Collection: Users

Fields:
user_id (string, unique)
name (string)
email (string, unique,valid)
password (string, hashed)
location (geopoint)
reward_points (integer)
profile_image (string, file ID)
username (string, unique)
address (string)
sign_up_date (date)
last_login (date)
status (string, "active" or "inactive")

Collection: Posts

Fields:
post_id (string, unique)
user_id (string)
title (string)
Body (string)
images (array of strings, file IDs)
location (geopoint)
time_range (date range)
reactions (array of objects, each with a "user_id" field and a "reaction" field)
re_posts (array of strings, each representing a "post_id")
tags (array of strings, representing user IDs)
creation_date (date)
last_edit_date (date)
status (string, "active" or "deleted")

Collection: Chat Invitations

Fields:
invitation_id (string, unique)
sender_id (string)
recipient_id (string)
status (string, "pending", "accepted", or "declined")

Collection: Chats

Fields:
chat_id (string, unique)
user_ids (array of strings)
messages (array of objects, each with a "sender_id" field, a "text" field, and a "timestamp" field)
static_assets (array of strings, each representing a file ID)
creation_date (date)
last_activity (date)
status (string, "active" or "archived")
Collection: Alerts

Fields:
alert_id (string, unique)
user_id (string)
type (string, "tag", "comment_reply", "post_reaction")
item_id (string, optional)
status (string, "unread" or "read")
Collection: Admin Dashboard

Fields:
server_status (object, with fields for each server and a status field for each)
spam_detection (object, with fields for each type of spam and a count field for each)
malicious_users (array of strings, each representing a "user_id")\_id: a unique identifier

Collection: Comment
post_id: the ID of the post the comment belongs to
user_id: the ID of the user who made the comment
text: the text of the comment
parent_comment_id: the ID of the parent comment, if this is a reply (null if this is not a reply)
created_at: a timestamp for when the comment was made

# DOCUMENTATION:

READ OUR DOCS IN DOCS/ FOLDER

## HOW TO USE THIS PROJECT

## Notes:

- This project is still in development phase
- This project is not ready for production
- Replace the .env.example file with .env file and fill the variables

## Contributing

We are open to, and grateful for, any contributions made by the community. By contributing to this project, you agree to abide by the thoughtbot [code of conduct].

[1]:
use this backend for learning purpose only
[2]:
create a branch for each feature you want to add
[3]:
contact us for more information
