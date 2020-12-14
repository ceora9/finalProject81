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

let refinedData = fs.readFileSync('goals.json');
let goals = JSON.parse(refinedData);
console.log(goals);

app.get('/activities', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(activities);
});

function addSelections(req, res){
    let goal = "goal";
    
    let activity = req.params.activity;
    activities[goal].push(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.delete('/activity/selections/:activity', addSelections, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send({});
});

function addCustom(req, res){    
    let custom = "custom";
    let activity = req.body.activity;

    activities[custom].push(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

function addRefined(req, res){    
    let refined = "refined";
    let activity = req.body.activity;

    goals[refined].push(activity); 

    let json = JSON.stringify(goals, null, 2);
    fs.writeFile('goals.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.post('/activity', addCustom, addSelections, addRefined, (req, res) => {
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

function deleteGoalActivity(req, res){
    let goal = "goal";
    let activity = req.params.activity;
    activities[goal].splice(activity); 

    let json = JSON.stringify(activities, null, 2);
    fs.writeFile('activities.json', json, 'utf8', err => {
        if(err) throw err;
        res.status(201).send({});
    });
};

app.delete('/activity/goal/:activity', deleteGoalActivity, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(204).send({});
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});