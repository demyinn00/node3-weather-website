const path = require('path'); // a core module
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configurations
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// Looks for a match in this directory
// In this case there are no pages to open in this directory
// But there are CSS files that the hbs files access
app.use(express.static(publicDirectoryPath));
      
// render allows us to access the hbs files
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'David Em-Yinn'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Em-Yinn'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Welcome to the help page',
        title: 'Help',
        name: 'David Em-Yinn'
    });
});

            // request, response
app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        });
    }
    
    geocode(req.query.address, 
        (error, {latitude, longitude, location} = {}) => {
            if (error)
            {
                return res.send({error});
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Em-Yinn',
        error: 'Help article not found.'
    });
});

// Must be last or else it will always go to the 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Em-Yinn',
        error: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});