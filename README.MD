<!-- test this  api call to check that all is working -->

http://localhost:8080/api/v1/users/63cdaca604ff20d37d57b12d

# CRUD ON POSTS

PUT http://localhost:8080/api/v1/posts

## create a post ( insert ) (todo :image upload)

```
{
	"post":
	{
"user_id": "5f3d3c3e2f2d3c5b3c5b3c5d",
"title": "Feeling grateful for the opportunity to hike",
"body": "The fresh air, the stunning views, and the sense of accomplishment made for an unforgettable experience. I highly recommend it to anyone looking to reconnect with nature and push themselves physically.",
"status": "active",
"location": {
"type": "Point",
"coordinates": [44.26, -110.8]
}
}


}
```

## repost (todo)

## get a post by id

GET http://localhost:8080/api/v1/posts/63cec79dd41aea7cb7cedc10

## get all posts(random )

GET http://localhost:8080/api/v1/posts

## edit a post ( update )

PATCH http://localhost:8080/api/v1/posts/63cec825310f7c9d516aaef2

```
{
    "post":
    {
        "title":"my new title"
    }
}

```

## remove a post ( delete )

POST http://localhost:8080/api/v1/posts/63cec79dd41aea7cb7cedc10

# CRUD ON COMMENTS

## GET COMMENTS BY POST ID

GET localhost:8080/api/v1/comments/63cec825310f7c9d516aaef2

## POST A COMMENT (CREATE A COMMENT)

POST http://localhost:8080/api/v1/comments

```
{
  "comment":
  {
"_id": "63cec825310f7c9d516aaef3",
"user_id": "5f3d3c3e2f2d3c5b3c5b3c5f",
"post_id": "63cec825310f7c9d516aaef2",
"content": "This post is great, I can relate to it so much!",
"parent_id": null
}
}
```

## REPLY TO A COMMENT( CREATE A COMMENT POINTING ON THE PARENT COMMENT)

```
{
  "comment":
  {
"_id": "63cec825310f7c9d516aae22",
"user_id": "5f3d3c3e2f2d3c5b3c5b3c5f",
"post_id": "63cec825310f7c9d516aaef2",
"content": "This post is great, I can relate to it so much!",
"parent_id": "63cec825310f7c9d516aaef5"
}
}
```

## PATCH A COMMENT (UPDATE A COMMENT)

PATCH localhost:8080/api/v1/comments/63cec825310f7c9d516aaef3

```
{
    "comment":
    {
        "content":"my new content"
    }
}

```

## DELETE A COMMENT BY POST (ID) (DELETE COMMENTS) (ALL COMMENTS RELATED TO A POST)

DELETE localhost:8080/api/v1/posts/63cec825310f7c9d516aaef2/comments

## DELETE A COMMENT BY ID (COMMENT OWNER) (DELETE A COMMENT) (ONE COMMENT)

DELETE localhost:8080/api/v1/comments/63cec825310f7c9d516aaef4 TODO : add auth

## DELETE A COMMENT BY ID (POST OWNER) (DELETE A COMMENT) (INFO:AUTH NEED TO BE ADDED)

# CRUD ON REACTS

```

```

# CRUD ON USERES
