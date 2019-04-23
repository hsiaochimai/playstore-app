const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const playstore = require('./playstore')

app.use(morgan('common'));
app.use(cors());

const ratingSort = function (a, b) {
    return b.Rating - a.Rating
}
const appSort = function (a, b) {
    return (a.App.toLowerCase() === b.App.toLowerCase()) ? 0
        : a.App.toLowerCase() > b.App.toLowerCase() ? 1 : -1
}

app.get('/apps', (req, res) => {

    const { genre, sort } = req.query
    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either rating or app')
        }
    }
    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Genre needs to be either Action, Puzzle, Strategy, Casual, Arcade or Card')
        }
    }

    let results = [...playstore]

    if (genre) {
        console.log(`genre filter: ${genre}`)
        results = playstore.filter(app => app.Genres.split(';').includes(genre))
    }

    if (sort === 'rating') {
        console.log(`rating sort`)
        results.sort(ratingSort)
    }
    if (sort === 'app') {
        console.log(`app sort`)
        results.sort(appSort)
    }

    return res.json(results)

})

if (require.main === module) {
    console.log('called directly, starting server');
    const port = 3333
    app.listen(port, () => console.log(`App listening on port ${port}!`))
}


module.exports = {
    app,
    appSort,
    ratingSort,
};