const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries')

const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'omsaid',
          password : '',
          database : 'smart-brain'
        }
});

const PORT = process.env.PORT

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 3000, () => {console.log(`app is running on port ${process.env.PORT}`)})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.profileId(db))
app.put('/image', entries.entriesIncrement(db))
app.post('/imageUrl', (req, res) => {entries.handleApiCall(req, res)})
app.put('/resetEntries', entries.entriesReset(db))