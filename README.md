## nodejs-crude-api
### Simple CRUD API using in-memory database underneath

#### Installation
1. Clone this repository 
```sh
git clone git@github.com:AlexanderSUS/nodejs-crude-api.git
```
2. Go to folder ```nodejs-crude-api``` and switch branch to develop
```sh
git checkout develop
```
3. Install dependencies with command
```sh
npm install
```

#### Run server
1. For run server in ***development*** mode run command 
```sh
npm run start:dev
```
2. For run server in ***production*** mode run command 
```sh
npm run start:prod
```
and you'll get bunldle.js file in ```dist``` folder that automatically runs

#### Testing
1. Run server in development mode
2. Open second terminal window
3. Run command in new terminal
```sh
npm run test
```
**ATTENTION!!!** ***If you want rerun test*** you should **restart server before running test script**.
You can restart server with command ```rs``` in server terminal and press ```Enter``` key. 

## How to use

**Run sever as described in upper scope, server will start on port 5000**.

Full address to API `http://loacalhost:5000/api/users`

Users are stored as objects that have following properties:
 - id — unique identifier (string, uuid) generated on server side
 - username — user's name (string, **required**)
 - age — user's age (number, **required**)
 - hobbies — user's hobbies (array of strings or empty array, **required**)

**Requests:**

- **GET** `api/users` is used to get all persons
  - Server answer with `status code` **200** and all users records
        
- **GET** `api/users/${userId}` 
  - Server answer with `status code` **200** and and record with `id === userId` if it exists
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
        
- **POST** `api/users` is used to create record about new user and store it in database

   POST request `body`:

       {    
            username: string,
            age: number,
            hobbies: Array<string>
       }
    
  - Server answer with `status code` **201** and newly created record
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields or `body` fields has invalid types
 
- **PUT** `api/users/{userId}` is used to update existing user

 POST request `body`:

       {    
            username: string,
            age: number,
            hobbies: Array<string>
       }

  - Server answer with` status code` **200** and updated record
  - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`) or `body` fields has invalid types
  - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
 
- **DELETE** `api/users/${userId}` is used to delete existing user from database
  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
   

Requests to non-existing endpoints (e.g. `some-non/existing/resource`) will handled (server answer with `status code` **404** and message "Resource not found")

On errors on the server side that occurs during the processing of a request will be handled with `status code` **500** and "Internal server errror" message)
