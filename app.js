const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// Create express application
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beerData => {console.log('Beers from the database: ', beerData);
    const data = {beerData : beerData}
    res.render('beers', data);})
    .catch(error => console.log(error));
    
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {console.log('Beers from the random database: ', responseFromAPI);
      const data = {beersFromAPI : responseFromAPI}
      res.render('random-beer',data);
    })
    .catch (error => console.log(error));
 
});

app.get('/beers/beer/:Id', (req, res, next) => {
  let varID = req.params.Id;
  console.log('req.params.Id :'+req.params.Id);
  punkAPI
    .getBeers()
    .then(beersFromApi => {console.log('Beers from the database: ', beersFromApi);
    console.log(varID);
    //const data = {beersFromApi : beersFromApi}
    const beerData = beersFromApi.filter(beer => beer.id == varID);
    const data = {beerData : beerData};
    console.log('data',data);
    console.log('req.params.Id :'+req.params.Id);
    console.log(req.params);
    //res.send(req.params);
    res.render('beers', data);})
    .catch(error => console.log(error));
    
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
