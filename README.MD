<!-- test this  api call to check that all is working -->



#Voici un résumé de mon travail. :man_technologist:	 

## Mise en place de trois tableaux(models). TypeObjet-Details-Contact avec relations one to one entre Details et TypeObjet et Details et Contact 

 ### pour tester  CROUD : 
 #### POST (typeobjet)
 #### POST http://localhost:8080/typeObjet  
       
  ```
  {
    "categorie":"phone",
    "sousCatergorie":"samsung" }
  ```
         
  ####   POST (contact) POST http://localhost:8080/contact  
```
       {
    "nome":"wahabi",
    "prenom":"azdine",
    "tel":"0265059022",
    "email":"wahabi@hotmail.com"
}
```
  ### POST (details): http://localhost:8080/detail 
  ```
    {
   "text":"Projet Test",
   "images":"https://mongoosejs.com/docs/api/model.html#model_Model-findByIdAndUpdate",
   "typeObjet_id":"----??", :grin:	 Il faut copier ici l'identifiant de typeObjet, qui a déjà été créé.
   "typeObjet_id":"----??"   :grin:  	 Il faut copier ici l'identifiant typeObjet , qui a déjà été créé. }
   ```
   
 ## Il faut d'abord supprimer le document detail qui a été créé.   
        
### DELETE http://localhost:8080/detail/copier ici L'id details(_id)
	
            vérifier est ce que les models associe TypeObjet et Contact sont aussi inactive 	
          
          le code qui faire ca : 
           j'ai declaré deux fonction au niveau de controller Details : inactiveTypeObjet() et 
            inactiveContact qui permettent de archiver les models ({status:"inactive"})

          

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
