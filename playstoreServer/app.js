const express= require('express');
const morgan= require('morgan')
const cors = require('cors')
const app= express();
const playstore= require('./playstore')

app.use(morgan('common'));
app.use(cors());

app.get('/apps',(req,res)=>{
    res.json(playstore)
    const {genre, sort}=req.query
if(sort){
    if(!['Rating','App'].includes(sort)){
        return res
          .status(400)
          .send('Sort must be either Rating or App')
    }
}
if(sort==='Rating'){
    console.log(`hello`)
    const ratingResults=playstore.sort(function(a,b){
        return b.Rating-a.Rating
    })
    res.json(ratingResults)
}

if(sort==='App'){
    console.log(`hello App`)
    const appResults=playstore.sort(function(a,b){
        let appA=a.App.toLowerCase()
        let appB=b.App.toLowerCase()
        if(appA < appB)
            return -1
        if(appA > appB)
            return 1
        return 0
        
    })
    res.json(appResults)
}
if(genre){
    if(!['Action','Puzzle','Strategy','Casual','Arcade','Card'].includes(genre)){
        return res
          .status(400)
          .send('Genre needs to be either Action, Puzzle, Strategy, Casual, Arcade or Card')
    }
}
let genreResults=playstore.filter(app=>app.Genres.toLowerCase().includes(genre.toLowerCase()))
if(genre) {
    genreResults.sort((a,b)=>{
        let appA=a.App.toLowerCase()
        let appB=b.App.toLowerCase()
        if(appA < appB)
            return -1
        if(appA > appB)
            return 1
        return 0
    })
    res.json(genreResults)
}


})
module.exports = app;