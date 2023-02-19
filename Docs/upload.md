# PROCESS EXPLANATION:

you upload a file and you get a link to it (public link )

# example :dealing with images:(you can deal with more support types of files)

such as (supported files type [images,videos, audios ])

# ROUTES:

## GET /images , it is simply consuming the URL of the image in <img src="https://findit.blob.core.windows.net/images/testimages099c7a00-9cef-11ed-86eb-35cb833df65e1png2ba3ba50-9cfe-11ed-9d85-a57fa5c7bf6dpngfee748f0-9cfe-11ed-bdef-4905d67e8e58png03a37fc0-9d73-11ed-b7be-cba4ddf553a7.png2225c4c0-9d92-11ed-b82a-978fca0c481c.png" alt="img test"></img>

## POST images upload and image/images and get the URL of it as a response

POST http://localhost:8080/api/v1/uploads?categorie=images

```
const res = await fetch(
"http://localhost:8080/api/v1/uploads?categorie=images",
{
method: "POST",
body: formData,
}
);
```

## PUT /images , replacing the current image with another images(one file per request)

PUT http://localhost:8080/api/v1/uploads?categorie=images

```
 const res = await fetch(
 "http://localhost:8080/api/v1/uploads?categorie=images",
 {
 method: "PUT",
 body: formData,
 headers: {
 "file-url":
 "https://findit.blob.core.windows.net/images/testimages099c7a00-9cef-11ed-86eb-35cb833df65e1png2ba3ba50-9cfe-11ed-9d85-a57fa5c7bf6dpngfee748f0-9cfe-11ed-bdef-4905d67e8e58png1060a250-9d01-11ed-a132-89f192a384f6png95878c50-9d01-11ed-a132-89f192a384f6.png28de7800-9d7b-11ed-a767-d1e9c4efb080.png",
  },
 }
);
```

## DELETE /images archive /delete the image from the storage

DELETE http://localhost:8080/api/v1/uploads?categorie=images

```
"body":
{
"url":"https://findit.blob.core.windows.net/images/Screenshot%20from%202023-01-24%2016-25-58.png"
}

```

coding example :https://github.com/sohaibMan/file-uplaod-front-end-react-app-
check this repo for more details about how the implementation works

# FILE UPLAOD CONSTRAINS :

max size : 5mb

supported format :

images: ["jpg", "jpeg", "png", "gif"],
videos: ["mp4", "avi", "mov", "mkv"],
audios: ["mp3", "wav", "ogg"],

MAX FILE UPLAODE :5
NOTE : you can change the max file upload in the .env file
