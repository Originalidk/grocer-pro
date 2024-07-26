const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const fairpriceRouter = require('./routes/markets');
app.use("/markets", fairpriceRouter);

app.listen(3001, () => {
    console.log("Server listening on port 3001")
});