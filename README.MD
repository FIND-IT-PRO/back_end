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

# CRUD ON REACTS

```

```

# CRUD ON USERES
