// import dotenv from 'dotenv';
// dotenv.config();
const dotenv = require("dotenv").config();

// import express from 'express';
// const app = express();
const express = require("express");
const app = express();

// import cors from 'cors';
// app.use(cors());
const cors = require("cors");
app.use(cors());

app.use(express.json());

// import routes from './routes/routes.js';
// routes.setupRoutes(app);
const routes = require("./routes/routes.js");
routes.setupRoutes(app);

// const port = process.env.PORT || 3000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
