const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const port = process.env.PORT | 3000;
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));
app.get('', (req, res) => {
    // res.render('index', {
    //     names: [
    //         'Prerak',
    //         'Priti',
    //         'Astha',
    //         'Nishtha',
    //         'Rameshchandra',
    //         'Sulochana']
    // });
    res.render('index');
});

app.get('/help', (req, res) => {
    res.render('help', {message: 'This is to help you!'});
});
app.get('/about', (req, res) => {
    res.render('about', {creator: 'Prerak', title: 'Express App'});
});
app.get('/weather', (req, res) => {
    geocode.geocode(req.query.city, (error, data) => {
        if(error){
            return res.send('Location not found');
        }
        weather.weather(data, (error, w) => {
            if(error){
                return res.send('Weather not found');
            }
            res.send(w);
        })
    })
});
app.listen(port, () => {
    console.log('Server running...');
});