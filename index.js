const express = require('express');
const app = express();
const contacts = require('./contacts');

// Home page! Show the user a welcome message
app.get('/', (req, res) => {
  res.send('HAAAAAAAAAYyyy');
});

// Contacts List page: show the user all contacts
app.get('/contacts', (req, res) => {
  res.send(contacts.users);
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
  res.send(contact);
});

app.listen(8888, () => {
    console.log('Your express app is running at http://localhost:8888');
});