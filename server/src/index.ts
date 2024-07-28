const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const fairpriceRouter = require(path.resolve(__dirname, './routes/markets.ts'));
app.use("/markets", fairpriceRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    if (process.env.ENV !== 'test') {
        console.log(`Server listening on port ${port}`)
    }
});