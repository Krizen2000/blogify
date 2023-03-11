# Blogify

- This project helps users to create their own blogs for fun.
- The site is built with react, bootstrap, webpack
- The api is built with node, express, mongodb with JWT Auth

#### Minimum Requirements:

1. CPU: 2core
2. RAM: 4GB
3. Storage: HDD

> **Advice**
> The minimum requirements are given in an assumption it will be run on a Linux machine

# Quick Run Instructions

1. Clone or download the project.
2. In indiviual folders(website,api) install the node modules using

```
npm install .
```

3. Then go to the MongoDB Atlas, create an account then a cluster and get the API token
4. Create a `.env` file in api folder with an entry:

```
MONGO_URI = "<your-mongodb-token>"
JWT_KEY = "<your-jwt-token>"
```

ADDITIONALLY if running locally use to prevent CORS errors and port conflict

```
PORT = 3120
CORS_URL = "http://localhost:3000"
```

5. Now in website we will do the same by creating `.env` file with values

```
# API URL [if running locally use "http://localhost:3120"]
REACT_APP_API_URL="<your-backend-url>"
```
