const express = require('express');
const app = express();
const contacts = require('./contacts');

// Make a variable to refer to
// the built-in express static
// middlware.
const static = express.static;

const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Tell Express to register the
// static middleware, and tell it what
// directory to look in for static files.
app.use(static('public'));


// Home page! Show the user a welcome message
app.get('/', (req, res) => {
  // res.send('HAAAAAAAAAYyyy');
  res.render('home', {
    layout: 'homepage',
    message: "Welcome to the contacts app!",
    headerText: "Contacts App Home Page"
  });
});

// Contacts List page: show the user all contacts
app.get('/contacts', (req, res) => {
  // res.send(contacts.users);
  res.render('contacts-list', {
    contactsArray: contacts.users
  });
});

// Contacts Detail page: show the user all info for one contact
app.get('/contacts/:id', (req, res) => {
  // res.send(`You are viewing details for ${req.params.id}`);
  let id = req.params.id;
  let contact = contacts.users.find((user) => {
    return user.id === id;
  });
  // TODO: check if `contact` is valid
  // (meaning, is it undefined or a real obj)
  // res.send(contact);
  if (contact) {
    res.render('contact-detail', {
      contact
    });
  } else {
    // how to do a redirect???
    // res.redirect('/');
    res.send(`<h1>Contact id ${id} does not exist. Go away.</h1>`);
  }

});

app.listen(3000, () => {
    console.log('Your express app is running at http://localhost:3000 yayyayayaya');
});