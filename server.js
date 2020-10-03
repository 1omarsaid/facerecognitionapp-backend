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
          connectionString : process.env.DATABASE_URL,
          ssl: true
        }
});

const PORT = process.env.PORT

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send('it is working')})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.profileId(db))
app.put('/image', entries.entriesIncrement(db))
app.post('/imageUrl', (req, res) => {entries.handleApiCall(req, res)})
app.put('/resetEntries', entries.entriesReset(db))

app.listen(process.env.PORT || 3000, () => {console.log(`app is running on port ${process.env.PORT}`)})