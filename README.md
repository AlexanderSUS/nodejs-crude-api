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
### Attention

***If you want rerun test*** you should **restart server before running test script**.
You can restart server with command ```rs``` in server terminal and press ```Enter``` key. 
