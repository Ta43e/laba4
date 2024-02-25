const express =  require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require('path');
const { addContact, updateContact, deleteContent, getAllContacts, updateContactView, getAllContactsAdd} = require('./method/method.js');
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        goBack: () => 'window.location.href = \'/\''
    }
});
const app = express();



app.use(express.static(__dirname + '/public'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.json());

var contents = fs.readFileSync("contacs.json").toString();
var jsonContent = JSON.parse(contents);

app.get('/', (req, res)=> {
    getAllContacts(req, res);
});
app.get('/Add', (req, res)=> {
    getAllContactsAdd(req, res);

})
app.get('/Update', (req, res)=> {
    updateContactView(req, res);
})
app.post('/Add', (req, res) => addContact(req, res));
app.post('/Update', (req, res)=> updateContact(req, res));
app.post('/Delete', (req, res)=> deleteContent(req, res));


app.listen(3010, () => {
    console.log("http://localhost:3010/")
})