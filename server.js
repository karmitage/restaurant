var express = require("express");
var path = require("path");

var app = express();

var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables = [];

var waitlist = [];


// Routes

// home route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

//make a reservation
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//view tables
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays the table object 
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays waitlist object
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/api/tables", function (req, res) {
    var newReservation = req.body;

    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
    }
    else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
})

//Starts server listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT)
})