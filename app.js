const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

let data = fs.readFileSync('categories.json');
let categories = JSON.parse(data);
console.log(categories);

app.get('/categories', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(categories);
});

function addCustom(req, res){
    // let exercise = "exercise";
    // let sleep = "sleep";
    // let nutrition = "nutrition";
    // let recreation = "recreation";
    // let activities = "activities";
    
    let custom = "custom";
    let category = req.body.category;

    categories[custom].push(category); 

    let json = JSON.stringify(categories, null, 2);
    fs.writeFile('categories.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.post('/category', addCustom, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(201).send({});
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
