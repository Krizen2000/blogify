# REST API Endpoints for BLOGIFY - Backend

This Document will give a quick summary for the available endpoints in the backend

```
[HTTP] -> /api (eg. http://localhost/api)
```

Pagination will only be implemented for most used endpoints. \
The endpoints start with root route as `/api`.

<br/>

---

## User Related Endpoint

```
[HTTP] -> /api/users (eg. http://localhost/api/users)
```

### [ GET Method ]

- `/api/users` - [Retrieve all users]
- `/api/users/search?username=xxxx` - [Retrieve specific user]

### [ POST Method ]

- `/api/users` - [Create new user]

### [ UPDATE Method ]

- `/api/users/:username` - [Update existing user]

### [ DELETE Method ]

- `/api/users/:username` - [Delete existing user]

<br/>

---

## Communities Related Endpoint

```
[HTTP] -> /api/communities (eg. http://localhost/api/communities)
```

### [ GET Method ]

- `/api/communities` - [Retrieve all communities]
- `/api/communities/search?communityId=xxxx` - [Retrieve specific community]

### [ POST Method ]

- `/api/communities` - [Create new community]

### [ UPDATE Method ]

- `/api/communities/:communityId` - [Update existing community]

### [ DELETE Method ]

- `/api/communities/:communityId` - [Delete existing commmunity]

<br/>

---

## Comments Related Endpoint

```
[HTTP] -> /api/comments (eg. http://localhost/api/comments)
```

### [ GET Method ]

- `/api/comments/search?blogId=xxxx&page=x&limit=x` - [Retrieve all comments for specific blog]
- `/api/comments/search?username=xxxx&page=x$limit=x` - [Retrieve all comments for specific user]
- `/api/comments/search?community=xxxx&page=x$limit=x` - [Retrieve all comments for specific communities ]

### [ POST Method ]

- `/api/comments` - [Create new comment]

### [ DELETE Method ]

- `/api/comments/:commentId` - [Delete existing product]
