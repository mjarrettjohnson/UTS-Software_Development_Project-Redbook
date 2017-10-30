# Express API Server

This folder contains the API server built using express that our client side React-redux app will consume.

### Config

Contains all configuration for the app including DB URI's, Secrets and Hashing Rules, User Roles and API prefixes

### Controllers

Contains the Controllers which are responsible for handling API Endpoints. These Controllers are called from the Routes.js File
which is explained later on...

### Middleware

Contains functions which handle authentication and access control and error handling

#### Server

This is the main express file which determines how the server will run. 

This file is read top to bottom, meaning the order in which things are added is important.

Here we do things such as:

- using a logger (morgan)
- using a body parser to parse JSON 
- set up our api prefixes, set up a public directory where we can serve static files (such as our react front end)
- set up method override which allows for using PUT, PATCH DELETE HTTP Requests
- And finally a basic route to serve our index.html file (the rest of the routing being handled by react)


