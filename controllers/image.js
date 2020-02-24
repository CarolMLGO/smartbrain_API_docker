const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2c31633468e34cce98e3318cfdcc3081'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => res.status(400).json('uable to work with API'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}