const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const fairpriceRouter = require('./routes/markets');
app.use("/markets", fairpriceRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
});