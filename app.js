const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
require('dotenv').config();

//async errors

//middlewares
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

//product routes
app.get('/', (req, res) => {
  res.send('Store API');
});

app.use('/api/v1/products', productRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    //DB connection
    await connectDB(process.env.MONGODB_URL);
    //starting server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
