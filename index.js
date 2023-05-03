const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

const dataFilePath = "./data.json";

// READ ALL DATA
app.get("/data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

// READ DATA BY ID
app.get("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const result = jsonData.find((d) => d.id === id);
    res.json(result);
  });
});

// ADD NEW DATA
app.post("/data", (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const newData = req.body;
    const lastId = jsonData[jsonData.length - 1].id;
    newData.id = lastId + 1;
    jsonData.push(newData);
    fs.writeFile(dataFilePath, JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      res.json(newData);
    });
  });
});

// UPDATE DATA BY ID
app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const newData = req.body;
    const index = jsonData.findIndex((d) => d.id === id);
    jsonData[index] = { ...jsonData[index], ...newData };
    fs.writeFile(dataFilePath, JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      res.json(jsonData[index]);
    });
  });
});

// DELETE DATA BY ID
app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    const index = jsonData.findIndex((d) => d.id === id);
    const deletedData = jsonData.splice(index, 1);
    fs.writeFile(dataFilePath, JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      res.json(deletedData[0]);
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
