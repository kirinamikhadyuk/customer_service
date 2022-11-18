const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const model = require('./model/customer');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;
const Customer = mongoose.model("customers", model.CustomerSchema);

mongoose.connect(mongoURL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("This is customers service");
});

app.post("/customer", (req, res) => {
    const customer = new Customer(req.body);
    customer.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.get("/allCustomers", (req, res) => {
    Customer.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.get("/customer/id", (req, res) => {
    Customer.findById(req.body)
        .then(data => {
            const response = !!data ? data : 'No data with specified id found'
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.delete("/customer/id", (req, res) => {
    Customer.findByIdAndDelete(req.body)
        .then(result => {
            const response = !!result ? result : 'No data with specified id found'
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
})