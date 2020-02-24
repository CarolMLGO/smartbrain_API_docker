const express = require('express');
const bodyParser = require('body-parser'); //Get the json body from request.body
const bcrypt = require('bcrypt-nodejs'); //hashing library
const cors = require('cors'); //Uses additional HTTP headers to tell a browser to let a web application running at one origin have permission to access selected resources from a server at a different origin. 
const knex = require('knex'); // SQL query builder for Postgres, MSSQL, MYSQL,MariaDB, SQLite3, Oracle, and Amazon Redshift. connect database to server

const register = require('./controllers/register'); // import modules
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//run it on local host: connect database to server
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //local host
        user: 'postgres',
        password: '198933jone',
        database: 'smart_brain'
    }
});

// deploy on heroku: connect database to server
// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: true
//     }
// });

// how to access data from database
// db.select('*').from('users').then(
//     data => {
//         console.log(data)
//     });


// const path = require('path'); //it's a core module, do not need to install
const app = express();
app.use(bodyParser.json());
app.use(cors());

//test front end connection
// app.get('/', (req, res) => {
//     db.select('*').from('users').where({ email: "fuqionglei2014@gmail.com" }).then(
//         data => {
//             res.send(data)
//         });
//     // res.send('server is working')
// })

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT}`);
})