const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());

// Mount api router to route
const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});