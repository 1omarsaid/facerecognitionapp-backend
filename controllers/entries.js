const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '74210724d48d4234ad7869e43e250b36'
});

const handleApiCall = (req, res) => {
    console.log(req.body.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data)
      })
      .catch(err => res.status(400).json(err))

}
const entriesIncrement = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch( err => res.status(400).json('Error updating image count'))
}


const entriesReset = (db) => (req, res) => {
    console.log('getting there')
    const { id } = req.body;
    db('users').where('id', '=', id)
    .update('entries', 0)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch( err => res.status(400).json('Error Reseting count'))
}

module.exports = {
    entriesIncrement,
    handleApiCall,
    entriesReset
}