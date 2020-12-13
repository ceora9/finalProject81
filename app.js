const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

let data = fs.readFileSync('activities.json');
let activities = JSON.parse(data);
console.log(activities);

app.get('/activities', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(activities);
});

function addCustom(req, res){
    // let exercise = "exercise";
    // let sleep = "sleep";
    // let nutrition = "nutrition";
    // let recreation = "recreation";
    // let activities = "activities";
    
    let custom = "custom";
    let activity = req.body.activity;

    activities[custom].push(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.post('/activity', addCustom, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(201).send({});
});

app.delete('/activities', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send()
});

function completeActivity(req, res){
    let goal = "goal";
    let activity = req.params.activity;
    activities[goal].push(activity); 

    let custom = "custom";
    activities[custom].splice(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.delete('/activity/custom/:activity', completeActivity, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send({});
});

function deletegoalActivity(req, res){
    let goal = "goal";
    let activity = req.params.activity;
    activities[goal].splice(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.delete('/activity/goal/:activity', deletegoalActivity, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send({});
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
