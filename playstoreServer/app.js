const express= require('express');
const morgan= require('morgan')
const cors = require('cors')
const app= express();
const playstore= require('./playstore')

app.use(morgan('common'));
app.use(cors());

app.get('/apps',(req,res)=>{
    const {genre=" ",sort}=req.query
    console.log(req.query)
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

//     genreResults
//       .sort((a, b) => {
//         return a[genre] > b[Genres] ? 1 : a[Genres] < b[Genres] ? -1 : 0;
//     }); 
//   }  

//   res
//     .json(genreResults);
// });


//     playstore.Rating.sort((a,b)=>{
//         return a[sort]> b[sort] ? 1: a[sort] < b[sort] ? -1 :0;
//     })
// }
// else

})
app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });