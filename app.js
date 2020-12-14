const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

let data = fs.readFileSync('entries.json');
let entries = JSON.parse(data);
console.log(entries);

app.get('/entries', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(entries);
});

// app.delete('/entry/selections/:entry', addSelections, (req, res) => {
//     res.set('Content-Type', 'application/json');
//     res.status(204).send({});
// });

function addRecord(req, res){    
    let record = "record";
    let entry = req.body.entry;

    entries[record].push(entry); 

    let json = JSON.stringify(entries, null, 2);
    fs.writeFile('entries.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.post('/entry', addRecord, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(201).send({});
});

app.delete('/entries', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send()
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});